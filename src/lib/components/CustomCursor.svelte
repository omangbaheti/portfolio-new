<script lang="ts">
	import { onMount, tick } from 'svelte';

	/* ============================================================
	   CustomCursor — arcade cursor with a continuous ribbon trail.
	   A smooth tapered ribbon flows behind the pointer and the
	   burnt-orange point marks the exact position, per DESIGN.MD.
	   - Auto-disabled on touch/coarse pointers and reduced motion.
	   - Ribbon is charcoal on light surfaces, cream on dark panels.
	   ============================================================ */

	// Ribbon silhouette (history is sampled once per animation frame)
	const RIBBON_LEN = 22; // history samples spanned by the visible ribbon
	const HEAD_WIDTH = 12; // ribbon width at the head (px)
	const HISTORY_LEN = 64; // sampled trail positions (circular push/shift)
	const SMOOTH = 22; // exponential cursor lag factor (per second)

	// Elements that should trigger the "interactive" hover growth
	const INTERACTIVE =
		'a, button, input, textarea, select, summary, label, [role="button"], [tabindex], .press, .anim-wub';

	// Theme colors (mirror of the :root vars in app.css, read by the canvas)
	const CHAR = '#1c1b19';
	const CREAM = '#d9d5c9';

	let rootEl = $state<HTMLDivElement | undefined>();
	let canvasEl = $state<HTMLCanvasElement | undefined>();
	let ctx: CanvasRenderingContext2D | null = null;
	let canvasW = 0;
	let canvasH = 0;

	let active = $state(false); // custom cursor should run
	let visible = $state(false); // pointer is inside the window & has moved
	let hovering = $state(false); // over an interactive element
	let pressed = $state(false); // primary button down while hovering
	let dark = $state(false); // sampled surface is a dark panel

	// Pointer target vs. smoothed position
	let tx = 0;
	let ty = 0;
	let cx = 0;
	let cy = 0;
	let hasPos = false;
	let lastMoveAt = 0;
	let lastNow = 0;
	let raf = 0;

	const history: { x: number; y: number }[] = [];

	let lastSampleEl: Element | null = null;

	/* ---------- Surface sampling ---------- */

	// Walk up the ancestor chain until we hit an opaque background; a dark
	// one flips the ribbon to cream so it stays visible on charcoal panels.
	function isDarkUnder(el: Element | null): boolean {
		let node: Element | null = el;
		for (let depth = 0; node && depth < 8; depth++) {
			const cs = getComputedStyle(node);
			const m = cs.backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
			if (m) {
				const alpha = m[4] !== undefined ? parseFloat(m[4]) : 1;
				if (alpha > 0.25) {
					const lum = 0.2126 * +m[1] + 0.7152 * +m[2] + 0.0722 * +m[3];
					return lum < 110;
				}
			}
			node = node.parentElement;
		}
		return false;
	}

	// Recompute hover/theme only when the element under the pointer changes —
	// the usual case (moving inside one panel) stays nearly free.
	function sample(x: number, y: number) {
		const el = document.elementFromPoint(x, y);
		if (el === lastSampleEl) return;
		lastSampleEl = el;
		hovering = !!el?.closest(INTERACTIVE);
		dark = isDarkUnder(el);
	}

	/* ---------- Events ---------- */

	function onPointerMove(e: PointerEvent) {
		tx = e.clientX;
		ty = e.clientY;
		lastMoveAt = performance.now();
		if (!hasPos) {
			cx = tx;
			cy = ty;
			hasPos = true;
		}
		visible = true;
		sample(e.clientX, e.clientY);
	}

	function onPointerDown(e: PointerEvent) {
		if (e.button === 0 && hovering) pressed = true;
	}
	const onPointerUp = () => (pressed = false);
	const onLeave = () => (visible = false);

	function resizeCanvas() {
		if (!canvasEl) return;
		const dpr = Math.min(2, window.devicePixelRatio || 1);
		canvasW = window.innerWidth;
		canvasH = window.innerHeight;
		canvasEl.width = Math.round(canvasW * dpr);
		canvasEl.height = Math.round(canvasH * dpr);
		canvasEl.style.width = `${canvasW}px`;
		canvasEl.style.height = `${canvasH}px`;
		ctx = canvasEl.getContext('2d');
		ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	/* ---------- Ribbon rendering ---------- */

	function withAlpha(hex: string, a: number) {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r},${g},${b},${a})`;
	}

	function draw(fade: number) {
		if (!ctx) return;
		ctx.clearRect(0, 0, canvasW, canvasH);
		if (fade <= 0 || history.length < 3) return;

		const count = Math.min(history.length, RIBBON_LEN);
		const pts = history.slice(-count);

		// Light [1,2,1] smoothing on the sample points prevents kinks when the
		// pointer changes direction quickly.
		const sx: number[] = [];
		const sy: number[] = [];
		for (let i = 0; i < count; i++) {
			const p = pts[i];
			if (i === 0) {
				sx.push((p.x * 2 + pts[1].x) / 3);
				sy.push((p.y * 2 + pts[1].y) / 3);
			} else if (i === count - 1) {
				sx.push((p.x * 2 + pts[count - 2].x) / 3);
				sy.push((p.y * 2 + pts[count - 2].y) / 3);
			} else {
				sx.push((pts[i - 1].x + p.x * 2 + pts[i + 1].x) / 4);
				sy.push((pts[i - 1].y + p.y * 2 + pts[i + 1].y) / 4);
			}
		}

		// Edge normals (perpendicular to the local direction)
		const nx: number[] = [];
		const ny: number[] = [];
		for (let i = 0; i < count; i++) {
			let dx: number;
			let dy: number;
			if (i === 0) {
				dx = sx[1] - sx[0];
				dy = sy[1] - sy[0];
			} else if (i === count - 1) {
				dx = sx[count - 1] - sx[count - 2];
				dy = sy[count - 1] - sy[count - 2];
			} else {
				dx = sx[i + 1] - sx[i - 1];
				dy = sy[i + 1] - sy[i - 1];
			}
			const len = Math.hypot(dx, dy) || 1;
			nx.push(-dy / len);
			ny.push(dx / len);
		}

		const color = dark ? CREAM : CHAR;
		// Tapered polygon: width grows toward the head (t = 1)
		ctx.beginPath();
		for (let i = 0; i < count; i++) {
			const t = i / (count - 1);
			const w = (HEAD_WIDTH * Math.pow(t, 0.75)) / 2;
			ctx.lineTo(sx[i] + nx[i] * w, sy[i] + ny[i] * w);
		}
		for (let i = count - 1; i >= 0; i--) {
			const t = i / (count - 1);
			const w = (HEAD_WIDTH * Math.pow(t, 0.75)) / 2;
			ctx.lineTo(sx[i] - nx[i] * w, sy[i] - ny[i] * w);
		}
		ctx.closePath();

		const head = pts[count - 1];
		const tail = pts[0];
		const g = ctx.createLinearGradient(head.x, head.y, tail.x, tail.y);
		g.addColorStop(0, color);
		g.addColorStop(1, withAlpha(color, 0));
		ctx.globalAlpha = fade * 0.85;
		ctx.fillStyle = g;
		ctx.fill();
		ctx.globalAlpha = 1;

		// Rounded head cap so the ribbon blends into the orange core dot
		ctx.beginPath();
		ctx.arc(head.x, head.y, HEAD_WIDTH / 2, 0, Math.PI * 2);
		ctx.fillStyle = withAlpha(color, fade * 0.9);
		ctx.fill();
	}

	/* ---------- Animation loop ---------- */

	function frame(now: number) {
		raf = requestAnimationFrame(frame);
		if (!active) return;

		if (lastNow === 0) lastNow = now;
		const dt = Math.min(0.05, (now - lastNow) / 1000);
		lastNow = now;

		if (hasPos && rootEl) {
			// Framerate-independent exponential smoothing toward the pointer
			const k = 1 - Math.exp(-SMOOTH * dt);
			cx += (tx - cx) * k;
			cy += (ty - cy) * k;
			rootEl.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;

			history.push({ x: cx, y: cy });
			if (history.length > HISTORY_LEN) history.shift();
		}

		// Trail fades out shortly after the pointer parks, then resets so a
		// later move doesn't resurrect a stale streak.
		const idle = now - lastMoveAt;
		let fade = 1;
		if (idle > 150) fade = Math.max(0, 1 - (idle - 150) / 320);
		if (fade === 0 && history.length > 0) history.length = 0;

		draw(fade);
	}

	/* ---------- Lifecycle ---------- */

	onMount(() => {
		if (typeof window.matchMedia !== 'function') return;

		const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
		const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

		const apply = async () => {
			const on = fine.matches && !noMotion.matches;
			document.documentElement.classList.toggle('custom-cursor', on);
			active = on;
			if (on) {
				await tick();
				resizeCanvas();
				if (raf) cancelAnimationFrame(raf);
				raf = requestAnimationFrame(frame);
			} else {
				cancelAnimationFrame(raf);
				history.length = 0;
				hasPos = false;
				lastNow = 0;
				lastSampleEl = null;
				hovering = false;
				pressed = false;
				visible = false;
				ctx = null;
				canvasW = 0;
				canvasH = 0;
			}
		};

		void apply();

		fine.addEventListener('change', apply);
		noMotion.addEventListener('change', apply);

		window.addEventListener('resize', resizeCanvas);
		window.addEventListener('pointermove', onPointerMove, { passive: true });
		window.addEventListener('pointerdown', onPointerDown, { passive: true });
		window.addEventListener('pointerup', onPointerUp);
		window.addEventListener('blur', onLeave);
		document.addEventListener('mouseleave', onLeave);

		return () => {
			cancelAnimationFrame(raf);
			fine.removeEventListener('change', apply);
			noMotion.removeEventListener('change', apply);
			window.removeEventListener('resize', resizeCanvas);
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('pointerdown', onPointerDown);
			window.removeEventListener('pointerup', onPointerUp);
			window.removeEventListener('blur', onLeave);
			document.removeEventListener('mouseleave', onLeave);
			document.documentElement.classList.remove('custom-cursor');
		};
	});
</script>

{#if active}
	<canvas class="trail-canvas" class:visible aria-hidden="true" bind:this={canvasEl}></canvas>
	<div
		class="cursor-root"
		class:visible
		class:hovering
		class:pressed
		bind:this={rootEl}
		aria-hidden="true"
	>
		<span class="core"></span>
	</div>
{/if}

<style>
	/* Full-viewport canvas behind the cursor; the ribbon is drawn in JS */
	.trail-canvas {
		position: fixed;
		inset: 0;
		z-index: 2147482999; /* just under .cursor-root */
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.15s ease;
	}
	.trail-canvas.visible {
		opacity: 1;
	}

	.cursor-root {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 2147483000;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.15s ease;
		will-change: transform;
	}
	.cursor-root.visible {
		opacity: 1;
	}

	/* Burnt-orange point — marks the exact pointer position */
	.core {
		position: absolute;
		left: 0;
		top: 0;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--orange);
		transform: translate(-50%, -50%);
		transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	/* Interactive hover: grow the dot */
	.cursor-root.hovering .core {
		transform: translate(-50%, -50%) scale(2);
	}

	/* Press: smack it down */
	.cursor-root.pressed .core {
		transform: translate(-50%, -50%) scale(1.5);
	}

	@media print {
		.trail-canvas,
		.cursor-root {
			display: none;
		}
	}
</style>