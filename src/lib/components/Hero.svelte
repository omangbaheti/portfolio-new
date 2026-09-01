<script lang="ts">
	let { name = 'OMANG BAHETI' } = $props();
	import vrImage from '../../assets/VRHeadset.png?url';
	import SocialIcon from '$lib/components/SocialIcon.svelte';

	// Split the name into letters for the hover-raise wave
	const titleWords = $derived(name.split(' ').map((w) => w.split('')));
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
	<span class="eyebrow page-sub">VR/AR Developer | HCI/UX Researcher | Game Developer | Software Engineer</span>
</div>

<!-- Large hero panel -->
<section class="hero panel grain">
	<!-- halftone texture accents -->
	<div class="dotburst burst-tl" aria-hidden="true"></div>
	<div class="dotburst burst-br" aria-hidden="true"></div>

	<div class="hero-grid">
		<!-- VR headset -->
		<div class="hero-art">
			<img class="vr-photo bob" src={vrImage} alt="VR headset illustration" />
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
					<SocialIcon name="email" href="mailto:contact@omang.ca" label="Email" size={32} lift />
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
		font-size: 18px;
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

	/* ---- headset ---- */
	.hero-art {
		position: relative;
	}
	.vr-photo {
		width: 100%;
		height: auto;
		object-fit: contain;
		display: block;
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
		animation: bob 2s steps(1, end) infinite;
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
			scale: 1.15;
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