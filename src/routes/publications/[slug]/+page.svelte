<script lang="ts">
	let { data } = $props();
	const pub = $derived(data.pub);
	const Body = $derived(data.Body);
</script>

<svelte:head>
	<title>{pub.title} // OMANG BAHETI</title>
</svelte:head>

<article class="pub-page">
	<header class="pub-head container">
		<span class="mono-label meta">RESEARCH / {pub.year}</span>
		<h1 class="display title">{pub.title}</h1>
		<span class="mono-label authors">{pub.authors}</span>
		<p class="venue">{pub.venue}</p>

		<div class="tags">
			{#each pub.tags as tag (tag)}
				<span class="pill mono-label">{tag}</span>
			{/each}
		</div>

		<div class="links">
			{#if pub.doi}
				<a class="btn-ghosty anim-wub press" href="https://doi.org/{pub.doi}" target="_blank" rel="noreferrer">DOI ↗</a>
			{/if}
			{#if pub.pdf}
				<a class="btn-ghosty anim-wub press" href={pub.pdf} target="_blank" rel="noreferrer">PDF ↗</a>
			{/if}
		</div>
	</header>

	<div class="body container">
		{#if Body}
			<div class="prose box panel-dk">
				<div class="prose-inner">
					<Body />
				</div>
			</div>
		{:else}
			<div class="prose box panel-dk">
				<div class="prose-inner">
					<p class="lede">
						Full abstract, methods, and results for this paper have not been written up yet.
						Drop a markdown file at <code>src/content/publications/{pub.slug}.md</code> and it
						will be typeset here automatically.
					</p>
				</div>
			</div>
		{/if}
	</div>
</article>

<style>
	.pub-page {
		padding: 48px 0 60px;
	}
	.container {
		max-width: 820px;
		margin: 0 auto;
		padding: 0 24px;
	}
	.pub-head {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.meta {
		color: var(--orange);
		display: block;
	}
	.title {
		font-size: clamp(1.9rem, 6vw, 3.2rem);
		color: var(--char);
		line-height: 0.95;
		margin: 10px 0 10px;
	}
	.authors {
		color: var(--char);
		opacity: 0.75;
	}
	.venue {
		color: var(--orange);
		font-weight: 300;
		margin-top: 8px;
	}
	.tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-top: 22px;
	}
	.pill {
		color: var(--orange);
		border: 1px solid var(--orange);
		padding: 4px 10px;
		font-size: 9px;
		border-radius: 6px;
	}
	.links {
		display: flex;
		gap: 12px;
		margin-top: 26px;
	}
	.btn-ghosty {
		font-family: var(--font-subs);
		font-weight: 500;
		font-size: 12px;
		letter-spacing: 0.1em;
		color: var(--char);
		border: 1px solid var(--char);
		padding: 8px 16px;
		text-transform: uppercase;
		transition: background 0.15s, color 0.15s;
	}
	.btn-ghosty:hover {
		background: var(--orange);
		border-color: var(--orange);
		color: var(--cream);
	}

	.body {
		max-width: 860px;
		margin: 0 auto;
		margin-top: 34px;
		padding: 0 24px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	.prose {
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
		overflow: hidden;
		min-width: 0;
		width: 100%;
	}
	.prose-inner {
		padding: 32px 28px;
		min-width: 0;
	}
	@media (min-width: 640px) {
		.prose-inner {
			padding: 40px 36px;
		}
	}
	.lede {
		color: var(--cream);
		font-family: var(--font-mono);
		font-size: 14px;
		line-height: 1.8;
	}
	code {
		font-family: var(--font-mono);
		font-size: 13px;
		background: rgba(239, 227, 208, 0.12);
		border: 1px solid rgba(239, 227, 208, 0.2);
		padding: 1px 6px;
		color: var(--orange);
	}
</style>
