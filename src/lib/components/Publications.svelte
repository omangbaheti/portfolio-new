<script lang="ts">
	import { publications } from '$lib/data/publications.js';
	import { reveal } from '$lib/reveal';
</script>

<section id="publications" class="pub-section">
	<div class="container head" use:reveal>
		<span class="eyebrow">RESEARCH LOG</span>
		<h2 class="display title">Publications</h2>
	</div>

	<div class="container list">
		{#each publications as pub, i (pub.title)}
			<article
				class="pub panel flat-shadow"
				use:reveal={{ delay: Math.min(i, 4) * 90 }}
			>
				<div class="pub-side">
					{#if pub.img}
						<img class="pub-thumb" src={pub.img} alt="" />
					{:else}
						<span class="display pub-year">{pub.year}</span>
					{/if}
				</div>
				<div class="pub-main">
					<a class="pub-link" href="/publications/{pub.slug}">
						<h3 class="display pub-title">{pub.title}</h3>
					</a>
					<span class="mono-label pub-authors">{pub.authors}</span>
					<p class="pub-venue">{pub.venue}</p>
					<div class="tags">
						{#each pub.tags as tag (tag)}
							<span class="pill mono-label">{tag}</span>
						{/each}
					</div>
				</div>
				<div class="pub-links">
					{#if pub.doi}
						<a class="btn-ghosty" href="https://doi.org/{pub.doi}" target="_blank" rel="noreferrer">DOI ↗</a>
					{/if}
					{#if pub.pdf}
						<a class="btn-ghosty" href={pub.pdf} target="_blank" rel="noreferrer">PDF ↗</a>
					{/if}
					<a class="btn-ghosty" href="/publications/{pub.slug}">DETAILS ↗</a>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.pub-section {
		padding: 80px 0 40px;
	}
	.head {
		padding: 0 24px;
		margin-bottom: 40px;
	}
	.title {
		font-size: clamp(2.6rem, 8vw, 5rem);
		color: var(--char);
		margin-top: 8px;
		line-height: 0.85;
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 0 24px;
	}
	.pub {
		border: 2px solid var(--char);
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
		padding: 24px;
		position: relative;
		overflow: hidden;
	}
	@media (min-width: 820px) {
		.pub {
			grid-template-columns: 140px 1fr auto;
			align-items: start;
		}
	}
	.pub::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		border-top: 26px solid var(--orange);
		border-right: 26px solid transparent;
	}

	.pub-year {
		color: var(--orange);
		font-size: 30px;
	}
	.pub-thumb {
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border: 2px solid var(--char);
		display: block;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 12px;
	}
	.pill {
		color: var(--orange);
		border: 1px solid var(--orange);
		padding: 4px 10px;
		font-size: 9px;
		border-radius: 6px;
	}

	.pub-title {
		color: var(--cream);
		font-size: clamp(1.2rem, 3vw, 1.8rem);
		line-height: 1.05;
		margin-bottom: 6px;
	}
	.pub-link:hover .pub-title {
		color: var(--orange);
	}
	.pub-authors {
		color: var(--cream);
		opacity: 0.8;
	}
	.pub-venue {
		color: var(--orange);
		font-size: 13px;
		font-weight: 300;
		margin-top: 8px;
	}

	.pub-links {
		display: flex;
		gap: 12px;
		align-self: flex-end;
	}
	@media (min-width: 820px) {
		.pub-links {
			flex-direction: column;
			gap: 10px;
			align-self: center;
		}
	}
	.btn-ghosty {
		font-family: var(--font-subs);
		font-weight: 500;
		font-size: 12px;
		letter-spacing: 0.1em;
		color: var(--cream);
		border: 1px solid var(--cream);
		padding: 8px 16px;
		text-transform: uppercase;
		transition: background 0.15s, color 0.15s;
	}
	.btn-ghosty:hover {
		background: var(--orange);
		border-color: var(--orange);
		color: var(--cream);
	}
</style>