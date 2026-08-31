<script lang="ts">
	let { data } = $props();
	// mdsvex default export is the compiled markdown component
	const Content = $derived(data.content);
</script>

<svelte:head>
	<title>{data.metadata.title} // OMANG BAHETI</title>
</svelte:head>

<article class="article">
	<header class="article-head container">
		<a class="back mono-label anim-wub press" href="/posts">← ALL POSTS</a>
		<span class="mono-label meta">POST / {data.metadata.date}</span>
		<h1 class="display title">{data.metadata.title}</h1>
		{#if data.metadata.tags}
			<div class="tags">
				{#each data.metadata.tags as tag (tag)}
					<span class="pill mono-label">{tag}</span>
				{/each}
			</div>
		{/if}
	</header>

	{#if data.metadata.embed}
		<div class="embed-wrap container">
			<span class="mono-label meta">EMBED / VIDEO</span>
			<div class="embed-frame panel">
				<iframe
					src={data.metadata.embed}
					title="Embedded video"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		</div>
	{/if}

	<div class="prose-wrap container">
		<div class="prose box panel-dk">
			<div class="prose-inner">
				<Content />
			</div>
		</div>
	</div>
</article>

<style>
	.article {
		padding: 48px 0 60px;
	}
	.article-head {
		max-width: 860px;
		padding: 0 24px;
	}
	.back,
	.meta {
		display: block;
		color: var(--orange);
	}
	.back {
		margin-bottom: 20px;
	}
	.back:hover {
		color: var(--char);
	}
	.title {
		font-size: clamp(2rem, 6vw, 3.6rem);
		color: var(--char);
		line-height: 0.95;
		margin: 12px 0 16px;
	}
	.tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.pill {
		color: var(--orange);
		border: 1px solid var(--orange);
		padding: 4px 10px;
		font-size: 9px;
		border-radius: 6px;
	}

	.embed-wrap {
		max-width: 860px;
		padding: 0 24px;
		margin-top: 24px;
	}
	.embed-frame {
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
		margin-top: 10px;
	}
	iframe {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		border: none;
	}
	.prose-wrap {
		max-width: 860px;
		padding: 0 24px;
		margin-top: 28px;
	}
	.prose {
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
		padding: 0;
		overflow: hidden;
	}
	.prose-inner {
		padding: 36px 32px;
	}
	@media (min-width: 640px) {
		.prose-inner {
			padding: 44px 40px;
		}
	}
</style>