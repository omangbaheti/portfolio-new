<script lang="ts">
	let { name = 'OMANG BAHETI' } = $props();
	import { backOut, backIn } from 'svelte/easing';
	import { onDestroy } from 'svelte';

	import vrImage from '../../assets/VRHeadset.png?url';
	import controllerImg from '../../assets/controller.png?url';
	import gridImg from '../../assets/grid.png?url';
	import neuralImg from '../../assets/neural-network.png?url';
	import notebookImg from '../../assets/notebook.png?url';
	import robotImg from '../../assets/robot.png?url';
	import SocialIcon from '$lib/components/SocialIcon.svelte';

	// Split the name into letters for the hover-raise wave
	const titleWords = $derived(name.split(' ').map((w) => w.split('')));

	/* ------------------------------------------------------------------
	   Hover fan-out: each asset starts stacked at the headset centre
	   (opacity 0, scale 0.6) and tweens out to its clock position.
	   Positions are % of the stage so the orbit stays proportional on
	   every viewport.  z: 1 = grid (behind headset), 3 = in front.
	------------------------------------------------------------------ */
	type Pose = { x: number; y: number; rot: number; s: number; o: number };

	const CENTER: Pose = { x: 50, y: 50, rot: 0, s: 0.6, o: 0 };

	const lerpPose = (a: Pose, b: Pose, t: number): Pose => ({
		x: a.x + (b.x - a.x) * t,
		y: a.y + (b.y - a.y) * t,
		rot: a.rot + (b.rot - a.rot) * t,
		s: a.s + (b.s - a.s) * t,
		o: a.o + (b.o - a.o) * t
	});

	// Final fan-out poses (x/y = % of stage centre, rot = settle degrees).
	// Order here sets the stagger: robot(12) → grid(2) → controller(6) →
	// grid(7) → neural(9) → notebook(5).
	// tdur/tdelay tune the tilt-stop-motion per asset so robot & controller
	// rock out of sync (different duration + phase offset).
	const fans = [
		{ key: 'robot',      src: robotImg,      z: 3, w: 29,   anim: 'tilt', tdur: 1.3,  tdelay: 0,     to: { x: 28, y: 8,   rot: 0, s: 1, o: 1 } },
		{ key: 'grid-2',     src: gridImg,       z: 1, w: 38, to: { x: 68, y: 33, rot: 4,  s: 1, o: 1 } },
		{ key: 'controller', src: controllerImg, z: 3, w: 31, anim: 'tilt', tdur: 1.7,  tdelay: -0.4, to: { x: 50, y: 106, rot: 0, s: 1, o: 1 } },
		{ key: 'grid-7',     src: gridImg,       z: 1, w: 38, to: { x: 20, y: 91, rot: -4, s: 1, o: 1 } },
		{ key: 'neural',     src: neuralImg,     z: 3, w: 24, anim: 'bob',  to: { x: 16, y: 90, rot: 0, s: 1, o: 1 } },
		{ key: 'notebook',   src: notebookImg,   z: 3, w: 38, anim: 'bob',  to: { x: 86, y: 94, rot: 0, s: 1, o: 1 } }
	];

	// Reactive poses keyed by asset key (top-level $state = clean runes).
	let poses = $state<Record<string, Pose>>({});
	for (const f of fans) poses[f.key] = { ...CENTER };

	// In-flight tween queue driven by a single requestAnimationFrame loop.
	type Tween = {
		key: string;
		from: Pose;
		to: Pose;
		start: number;
		delay: number;
		duration: number;
		easing: (t: number) => number;
	};
	let active: Tween[] = [];
	let raf = 0;

	function tick(now: number) {
		const next: Tween[] = [];
		for (const p of active) {
			const elapsed = now - p.start - p.delay;
			if (elapsed < 0) {
				next.push(p); // still in stagger delay — hold current pose
				continue;
			}
			const t = Math.min(elapsed / p.duration, 1);
			poses[p.key] = lerpPose(p.from, p.to, p.easing(t));
			if (t < 1) next.push(p);
		}
		active = next;
		raf = next.length ? requestAnimationFrame(tick) : 0;
	}

	function animate(hover: boolean) {
		// Cancel any in-flight tweens; each asset resumes from its current pose.
		active = [];
		const now = performance.now();
		fans.forEach((f, i) => {
			const to = hover ? f.to : CENTER;
			const delay = hover ? i * 40 : (fans.length - 1 - i) * 30;
			const duration = hover ? 700 : 490; // exit ~70% of entrance
			active.push({
				key: f.key,
				from: { ...poses[f.key] },
				to,
				start: now,
				delay,
				duration,
				easing: hover ? backOut : backIn
			});
		});
		if (!raf) raf = requestAnimationFrame(tick);
	}

	onDestroy(() => {
		if (raf) cancelAnimationFrame(raf);
	});
</script>

<!-- Title block: name at top center in black, subtitle in leverless style -->
<div class="title-block">
	<h1 class="display page-title" aria-label={name}>
		<span aria-hidden="true">
			{#each titleWords as word, wi (wi)}
				{#if wi > 0}{' '}{/if}
				{#each word as ch, ci (`${wi}-${ci}`)}
					<span class="ltr" style="--d:{ci * 24}ms">{ch}</span>
				{/each}
			{/each}
		</span>
	</h1>
	<span class="eyebrow page-sub">Software/XR Developer | UX Researcher | Game Designer</span>
</div>

<!-- Large hero panel -->
<section class="hero panel grain">
	<!-- halftone texture accents -->
	<div class="dotburst burst-tl" aria-hidden="true"></div>
	<div class="dotburst burst-br" aria-hidden="true"></div>

	<div class="hero-grid">
		<!-- VR headset + orbiting assets -->
		<div
			class="hero-art"
			role="img"
			aria-label="VR headset with orbiting project icons"
			onmouseenter={() => animate(true)}
			onmouseleave={() => animate(false)}
		>
			<div class="stage">
					{#each fans as f (f.key)}
						<div
							class="orbit"
							class:grid={f.key.startsWith('grid')}
							aria-hidden="true"
							style:width="{f.w}%"
							style:z-index={f.z}
							style:left="{poses[f.key].x}%"
							style:top="{poses[f.key].y}%"
							style:opacity={poses[f.key].o}
							style:transform="translate(-50%, -50%) rotate({poses[f.key].rot}deg) scale({poses[f.key].s})"
						>
							<img
								class="orbit-img {f.anim === 'tilt' ? 'tilt' : ''} {f.anim === 'bob' ? 'bob-up' : ''}"
								src={f.src}
								alt=""
								style:animation-duration={f.tdur ? f.tdur + 's' : ''}
								style:animation-delay={f.tdelay !== undefined ? f.tdelay + 's' : ''}
							/>
						</div>
					{/each}

				<img class="vr-photo bob" src={vrImage} alt="VR headset illustration" />
			</div>
		</div>

		<!-- Description + actions -->
		<div class="hero-info">
			<p class="hero-desc">
				Building immersive experiences in virtual, augmented &amp; mixed reality — researched,
				designed, and shipped for the arcade of tomorrow.
			</p>

			<div class="hero-actions">
				<a href="#work" class="btn-work display press">View Work</a>
				<a href="#contact" class="btn-contact display press">Contact Me</a>

				<div class="social-inline">
					<SocialIcon name="email" href="mailto:omang@baheti.dev" label="Email" size={32} lift />
					<SocialIcon
						name="scholar"
						href="https://scholar.google.com"
						label="Scholar"
						size={32}
						lift
						external
					/>
					<SocialIcon
						name="linkedin"
						href="https://www.linkedin.com"
						label="LinkedIn"
						size={32}
						lift
						external
					/>
					<SocialIcon
						name="github"
						href="https://github.com"
						label="GitHub"
						size={32}
						lift
						external
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ---- title block ---- */
	.title-block {
		text-align: center;
		padding: 56px 24px 20px;
	}
	.page-title {
		color: var(--char);
		font-size: clamp(2.6rem, 9vw, 6rem);
		line-height: 0.9;
	}
	/* Per-letter hover raise — bigger, slower wave than the header brand,
	   scaled for display type */
	.ltr {
		display: inline-block;
		transition:
			transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
			color 0.15s ease;
		transition-delay: var(--d, 0ms);
	}
	.page-title:hover .ltr {
		transform: translateY(-0.09em);
		color: var(--orange);
		transition-delay: calc(var(--d, 0ms) / 2);
	}
	.page-title .ltr:hover {
		transform: translateY(-0.14em) rotate(-3deg);
		color: var(--orange);
		transition-delay: 0ms;
	}
	.page-sub {
		color: var(--orange);
		display: block;
		margin-top: 16px;
		font-weight: 700;
	}

	/* ---- hero ---- */
	.hero {
		max-width: 960px;
		margin: 28px auto 0;
		padding: 28px 24px;
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
		position: relative;
		overflow: hidden;
	}
	@media (min-width: 768px) {
		.hero {
			padding: 44px 48px;
		}
	}

	/* ---- headset stage + fan-out ---- */
	.hero-art {
		position: relative;
		overflow: visible;
		padding: 60px 48px 76px;
	}
	.stage {
		position: relative;
	}

	/* Headset is the in-flow base of the stage; z-index 2 puts it between
	   the grid (1) and the front assets (3). */
	.vr-photo {
		width: 100%;
		height: auto;
		object-fit: contain;
		display: block;
		position: relative;
		z-index: 2;
	}

	/* Stop-motion bob: discrete translateY steps, no easing between frames.
	   Plays only while the headset is being hovered. */
	@keyframes bob {
		0% {
			transform: translateY(0);
		}
		20% {
			transform: translateY(-8px);
	}
		40% {
			transform: translateY(-3px);
		}
		60% {
			transform: translateY(-10px);
		}
		80% {
			transform: translateY(-2px);
		}
		100% {
			transform: translateY(0);
		}
	}
	.bob {
		animation: none;
	}
	.hero-art:hover .bob {
		animation: bob 1s steps(1, end) infinite;
	}

	/* Orbiting assets — absolutely centred on the stage, moved by tweens.
	   The wrapper carries the tweened pose; the inner img carries the idle
	   stop-motion (tilt/bob) so the two transforms compose instead of clash. */
	.orbit {
		position: absolute;
		display: block;
		will-change: transform, opacity, left, top;
	}
	.orbit-img {
		display: block;
		width: 100%;
		height: auto;
	}

	/* Stop-motion satellites: discrete keyframes, no easing between frames */
	@keyframes satTilt {
		0% {
			transform: rotate(-6deg);
		}
		30% {
			transform: rotate(6deg);
		}
		55% {
			transform: rotate(-3deg);
		}
		80% {
			transform: rotate(5deg);
		}
		100% {
			transform: rotate(-6deg);
		}
	}
	@keyframes satBob {
		0% {
			transform: translateY(0);
		}
		25% {
			transform: translateY(-9px);
		}
		50% {
			transform: translateY(-3px);
		}
		75% {
			transform: translateY(-7px);
		}
		100% {
			transform: translateY(0);
		}
	}
	/* Idle animations only play while the fan-out is shown (hover) */
	.hero-art:hover .orbit-img.tilt {
		animation: satTilt 1.3s steps(1, end) infinite;
	}
	.hero-art:hover .orbit-img.bob-up {
		animation: satBob 1.2s steps(1, end) infinite;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
		align-items: center;
	}
	@media (min-width: 860px) {
		.hero-grid {
			grid-template-columns: 6fr 4fr;
		}
	}

	.hero-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 28px;
	}
	.hero-desc {
		color: var(--cream);
		font-family: var(--font-mono);
		font-size: 14px;
		line-height: 1.8;
	}

	.hero-actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		flex-wrap: wrap;
	}
	.btn-work {
		display: inline-block;
		color: var(--cream);
		font-size: 15px;
		letter-spacing: 0.08em;
		padding: 14px 28px;
		border: 2px solid var(--cream);
		box-shadow: var(--flat-shadow);
		transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
	}
	.btn-work:hover {
		background: var(--cream);
		border-color: var(--cream);
		color: var(--char);
		transform: rotate(-1.5deg) scale(1.08);
	}
	.btn-contact {
		display: inline-block;
		background: var(--orange);
		color: var(--cream);
		font-size: 15px;
		letter-spacing: 0.08em;
		padding: 14px 28px;
		border: 2px solid var(--orange);
		box-shadow: var(--flat-shadow);
		transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
		/* Subtle idle "breathing" — animates the individual `scale` property so
		   it composes with the hover/press transforms instead of fighting them. */
		animation: breathe 2.8s ease-in-out infinite;
	}
	.btn-contact:hover {
		background: var(--char);
		border-color: var(--orange);
		transform: rotate(1.5deg) scale(1.08);
	}
	@keyframes breathe {
		0%,
		100% {
			scale: 1;
		}
		50% {
			scale: 1.085;
		}
	}

	.social-inline {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.burst-tl {
		position: absolute;
		top: 0;
		left: 0;
		width: 150px;
		height: 150px;
		pointer-events: none;
		mask-image: radial-gradient(circle at 0 0, #000 0%, transparent 70%);
		opacity: 0.5;
	}
	.burst-br {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 160px;
		height: 160px;
		pointer-events: none;
		mask-image: radial-gradient(circle at 100% 100%, #000 0%, transparent 70%);
		opacity: 0.4;
	}
</style>
