<script lang="ts">
	let { data } = $props();
	const project = $derived(data.project);
	const Body = $derived(data.Body);
</script>

<svelte:head>
	<title>{project.title} // OMANG BAHETI</title>
</svelte:head>

<article class="proj-page">
	<header class="proj-head container">
		<span class="mono-label meta">
			CASE / {project.id} · {project.year}
		</span>
		<h1 class="display title">{project.title}</h1>
		<span class="subtitle mono-label">{project.subtitle}</span>

		<div class="tags">
			{#each project.tags as t (t)}
				<span class="pill mono-label">{t}</span>
			{/each}
		</div>
	</header>

	<div class="art container">
		<div class="art-frame panel grain">
			<img src={project.img} alt={project.alt} class="photo" />
			<span class="handle mono-label">@_HANDLE</span>
		</div>
	</div>

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
					<p class="lede">{project.desc}</p>
				</div>
			</div>
		{/if}

		<div class="meta-strip mono-label">
			<span>{project.platform}</span>
			<span class="sep">·</span>
			<span>{project.engine}</span>
			<span class="sep">·</span>
			<span>{project.year}</span>
			<span class="sep">·</span>
			<span>{project.discipline === 'xr' ? 'XR / DEV' : 'UX RESEARCH'}</span>
		</div>
	</div>
</article>

<style>
	.proj-page {
		padding: 48px 0 60px;
	}
	.container {
		max-width: 820px;
		margin: 0 auto;
		padding: 0 24px;
	}
	.proj-head {
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
		font-size: clamp(2rem, 6vw, 3.6rem);
		color: var(--char);
		line-height: 0.92;
		margin: 10px 0 8px;
	}
	.subtitle {
		color: var(--orange);
		font-size: 12px;
	}
	.tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-top: 20px;
	}
	.pill {
		color: var(--orange);
		border: 1px solid var(--orange);
		padding: 4px 10px;
		font-size: 9px;
		border-radius: 6px;
	}

	.art {
		margin-top: 28px;
	}
	.art-frame {
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
		position: relative;
		overflow: hidden;
	}
	.photo {
		width: 100%;
		height: clamp(280px, 44vw, 460px);
		object-fit: cover;
		display: block;
		filter: brightness(0.85) contrast(1.05) saturate(0.9);
	}
	.handle {
		position: absolute;
		bottom: 10px;
		left: 12px;
		color: var(--cream);
		opacity: 0.7;
	}

	.body {
		max-width: 860px;
		margin: 0 auto;
		margin-top: 32px;
		padding: 0 24px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 22px;
	}
	.meta-strip {
		color: var(--orange);
		font-size: 11px;
		text-align: center;
		letter-spacing: 0.05em;
	}
	.sep {
		opacity: 0.4;
		margin: 0 8px;
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
</style>
