<script lang="ts">
	import { onMount, tick } from 'svelte';

	/* ============================================================
	   CustomCursor — arcade cursor with a fading dot-comet trail.
	   Halftone-dot comet + burnt-orange point, per DESIGN.MD.
	   - Auto-disabled on touch/coarse pointers and reduced motion.
	   - Trail is charcoal on light surfaces, cream on dark panels;
	     the cursor dot grows over interactive elements.
	   ============================================================ */

	const TRAIL_DOTS = 14; // pre-rendered dot elements
	const HISTORY_LEN = 64; // sampled trail positions (circular push/shift)
	const SPREAD = 3; // dot i trails i*SPREAD samples behind the pointer
	const MAX_DOT = 9; // head dot diameter (px)
	const MIN_DOT = 3.5; // tail dot diameter (px)
	const SMOOTH = 22; // exponential cursor lag factor (per second)

	// Elements that should trigger the "interactive" hover growth
	const INTERACTIVE =
		'a, button, input, textarea, select, summary, label, [role="button"], [tabindex], .press, .anim-wub';

	let rootEl = $state<HTMLDivElement | undefined>();
	let dotEls: HTMLSpanElement[] = [];

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
	// one flips the cursor/trail to cream so it stays visible on charcoal panels.
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
		if (fade === 0 && history.length > 0) {
			history.length = 0;
		}

		for (let i = 0; i < dotEls.length; i++) {
			const dot = dotEls[i];
			const src = history.length - 1 - (i * SPREAD + 1);
			if (src >= 0 && fade > 0) {
				const p = history[src];
				const t = 1 - i / (dotEls.length - 1); // 1 → head, 0 → tail
				const size = MIN_DOT + (MAX_DOT - MIN_DOT) * Math.pow(t, 1.4);
				const op = fade * 0.9 * Math.pow(t, 1.8);
				dot.style.opacity = op.toFixed(3);
				dot.style.width = `${size.toFixed(1)}px`;
				dot.style.height = `${size.toFixed(1)}px`;
				// Dots live inside the root, which is itself translated to the cursor
				// each frame — offset each dot relative to the cursor or the trail
				// double-shifts and gradually deserts the pointer.
				const dx = p.x - cx;
				const dy = p.y - cy;
				dot.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) translate(-50%, -50%)`;
			} else {
				dot.style.opacity = '0';
			}
		}
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
				dotEls = Array.from(rootEl?.querySelectorAll<HTMLSpanElement>('.dot') ?? []);
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
			}
		};

		void apply();

		fine.addEventListener('change', apply);
		noMotion.addEventListener('change', apply);

		window.addEventListener('pointermove', onPointerMove, { passive: true });
		window.addEventListener('pointerdown', onPointerDown, { passive: true });
		window.addEventListener('pointerup', onPointerUp);
		window.addEventListener('blur', onLeave);
		document.addEventListener('mouseleave', onLeave);

		return () => {
			cancelAnimationFrame(raf);
			fine.removeEventListener('change', apply);
			noMotion.removeEventListener('change', apply);
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
	<div
		class="cursor-root"
		class:visible
		class:hovering
		class:pressed
		class:dark
		bind:this={rootEl}
		aria-hidden="true"
	>
		{#each Array(TRAIL_DOTS) as _, i (i)}
			<span class="dot"></span>
		{/each}
		<span class="core"></span>
	</div>
{/if}

<style>
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

	/* Halftone comet dots */
	.dot {
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 50%;
		background: var(--char);
		opacity: 0;
		will-change: transform, opacity;
	}

	/* Flip the trail to cream on dark panels */
	.cursor-root.dark .dot {
		background-color: var(--cream);
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
		.cursor-root {
			display: none;
		}
	}
</style>