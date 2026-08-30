<script lang="ts">
	let { name = 'OMANG BAHETI' } = $props();
	import vrImage from '../../assets/VRHeadset.png?url';
</script>

<!-- Title block: name at top center in black, subtitle in leverless style -->
<div class="title-block">
	<h1 class="display page-title">{name}</h1>
	<span class="eyebrow page-sub">Software/XR Developer | UX Researcher | Game Designer</span>
</div>

<!-- Large hero panel -->
<section class="hero panel grain">
	<!-- halftone texture accents -->
	<div class="dotburst burst-tl" aria-hidden="true"></div>
	<div class="dotburst burst-br" aria-hidden="true"></div>

	<div class="hero-grid">
		<!-- VR headset product image -->
		<div class="hero-art">
			<img class="vr-photo" src={vrImage} alt="VR headset illustration" />
		</div>

		<!-- Description + actions -->
		<div class="hero-info">
			<p class="hero-desc">
				Building immersive experiences in virtual, augmented &amp; mixed reality — researched,
				designed, and shipped for the arcade of tomorrow.
			</p>

			<div class="hero-actions">
				<a href="/projects" class="btn-work display">View Work</a>
				<a href="/contact" class="btn-contact display">Contact Me</a>

				<div class="social-inline">
					<a class="social-icon" href="mailto:omang@baheti.dev" title="Email">
						<svg viewBox="0 0 80 80" class="mini">
							<g transform="translate(14 14) scale(2.1667)">
								<path class="so" d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
								<rect class="so" x="2" y="4" width="20" height="16" rx="2" />
							</g>
						</svg>
					</a>
					<a class="social-icon" href="https://scholar.google.com" title="Scholar" target="_blank" rel="noreferrer">
						<svg viewBox="0 0 80 80" class="mini">
							<g class="sb" transform="translate(14 14) scale(2.1667)">
								<path d="M10.93 2.045c-.547.366-3.22 2.14-5.938 3.945C2.272 7.794.05 9.286.05 9.304c0 .019.136.11.305.2.167.096 2.85 1.583 5.965 3.31l5.656 3.143.144-.074c.082-.04 2.169-1.232 4.642-2.642l4.493-2.568.027 7.947h2.668V9.319l-3.46-2.32c-4.664-3.124-8.392-5.586-8.484-5.606-.045-.008-.527.287-1.076.652M5.355 16.633l.014 2.005 3.31 1.987 3.31 1.982 3.337-2 3.332-2.005V16.62c0-1.092-.013-1.983-.027-1.983s-1.318.782-2.9 1.741l-3.306 1.996-.431.256-1.32-.791a604.12 604.12 0 0 1-3.286-1.979l-2.005-1.21c-.024-.008-.032.883-.027 1.983" />
							</g>
						</svg>
					</a>
					<a class="social-icon" href="https://www.linkedin.com" title="LinkedIn" target="_blank" rel="noreferrer">
						<svg viewBox="0 0 80 80" class="mini">
							<g class="sb" transform="translate(14 14) scale(2.1667)">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</g>
						</svg>
					</a>
					<a class="social-icon" href="https://github.com" title="GitHub" target="_blank" rel="noreferrer">
						<svg viewBox="0 0 80 80" class="mini">
							<g class="sb" transform="translate(14 14) scale(2.1667)">
								<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
							</g>
						</svg>
					</a>
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
	.page-sub {
		color: var(--orange);
		display: block;
		margin-top: 16px;
		font-weight: 700;
	}

	/* ---- icon row (combined social box) ---- */
	.g {
		fill: none;
		stroke: var(--cream);
		stroke-width: 3;
	}
	.accent {
		stroke: var(--orange);
	}

	/* ---- hero ---- */
	.hero {
		max-width: 860px;
		margin: 28px auto 0;
		padding: 24px 20px;
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
		position: relative;
		overflow: hidden;
	}
	@media (min-width: 768px) {
		.hero {
			padding: 28px 30px;
		}
	}

	.vr-photo {
		width: 100%;
		height: auto;
		object-fit: contain;
		display: block;
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
		transform: scale(1.06);
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
	}
	.btn-contact:hover {
		background: var(--char);
		border-color: var(--orange);
		transform: scale(1.06);
	}

	.social-inline {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.social-icon {
		display: inline-block;
		width: 40px;
		height: 40px;
		color: var(--cream);
		transition: transform 0.15s, color 0.15s;
	}
	.social-icon:hover {
		color: var(--orange);
		transform: scale(1.1);
	}
	.social-icon .mini {
		width: 40px;
		height: 40px;
		display: block;
	}
	/* brand glyphs: filled path (simple-icons) */
	.sb {
		fill: currentColor;
	}
	/* email glyph: stroked path (lucide mail) */
	.so {
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
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