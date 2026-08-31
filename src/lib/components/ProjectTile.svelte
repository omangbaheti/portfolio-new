<script lang="ts">
	import type { Project } from '$lib/data/projects.js';
	import { reveal } from '$lib/reveal';

	let {
		project,
		revealDelay = 0
	}: { project: Project; revealDelay?: number } = $props();
</script>

<a class="tile press" href="/projects/{project.slug}" use:reveal={{ delay: revealDelay }}>
	<!-- Thumbnail: renders static img or animated gif -->
	<div class="thumb-wrap">
		<img class="thumb" src={project.img} alt={project.alt} loading="lazy" />
		<span
			class="tag mono-label"
			class:tag-xr={project.discipline === 'xr'}
			class:tag-ux={project.discipline === 'ux'}
		>
			{project.discipline === 'xr' ? 'DEV' : 'RESEARCH'}
		</span>
		<span class="case mono-label">CASE ↗</span>
	</div>

	<div class="body">
		<div class="meta mono-label">
			<span class="id">{project.id}</span>
			<span class="year">{project.year}</span>
		</div>
		<h3 class="title display">{project.title}</h3>
		<span class="subtitle mono-label">{project.subtitle}</span>
		<p class="desc">{project.desc}</p>
		<div class="tags">
			{#each project.tags as t (t)}
				<span class="pill mono-label">{t}</span>
			{/each}
		</div>
	</div>
</a>

<style>
	.tile {
		display: flex;
		flex-direction: column;
		border: 2px solid var(--char);
		border-radius: 16px;
		box-shadow: var(--flat-shadow);
		background: var(--char);
		overflow: hidden;
		color: inherit;
		text-decoration: none;
		transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
	}
	.tile:hover {
		transform: translateY(-3px);
		box-shadow: var(--flat-shadow);
		background: var(--cream);
	}

	/* Thumbnail (starts as a dark cinematic strip) */
	.thumb-wrap {
		position: relative;
		overflow: hidden;
		aspect-ratio: 16 / 10;
		background: var(--char-2);
	}
	.thumb {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.3s;
		/* gifs animate on their own; still apply subtle filter for mood */
		filter: brightness(0.9) contrast(1.05) saturate(0.95);
	}
	.tile:hover .thumb {
		transform: scale(1.04);
	}

	.tag {
		position: absolute;
		top: 12px;
		left: 12px;
		font-family: var(--font-subs);
		font-weight: 500;
		letter-spacing: 0.12em;
		font-size: 10px;
		padding: 4px 10px;
		background: rgba(239, 227, 208, 0.15);
		color: var(--cream);
		border: 1px solid rgba(239, 227, 208, 0.35);
		text-transform: uppercase;
		border-radius: 6px;
	}
	.tag-xr {
		color: var(--orange);
		border-color: var(--orange);
	}
	.tag-ux {
		color: var(--cream);
		border-color: var(--cream);
	}
	.case {
		position: absolute;
		top: 12px;
		right: 12px;
		font-size: 10px;
		letter-spacing: 0.08em;
		color: var(--cream);
		background: rgba(28, 27, 25, 0.7);
		padding: 4px 8px;
		opacity: 0;
		transition: opacity 0.15s;
		border-radius: 6px;
	}
	.tile:hover .case {
		opacity: 1;
	}

	.body {
		padding: 18px 20px 20px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.meta {
		display: flex;
		justify-content: space-between;
		color: var(--orange);
		font-size: 10px;
		margin-bottom: 6px;
	}
	.title {
		color: var(--cream);
		font-size: clamp(1.3rem, 2.6vw, 1.7rem);
		line-height: 0.95;
	}
	.tile:hover .title {
		color: var(--char);
	}
	.subtitle {
		color: var(--orange);
		font-size: 10px;
		letter-spacing: 0.08em;
	}
	.desc {
		font-size: 13px;
		line-height: 1.6;
		font-weight: 300;
		color: rgba(239, 227, 208, 0.7);
		margin-top: 8px;
	}
	.tile:hover .desc {
		color: var(--char);
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 14px;
	}
	.pill {
		font-size: 9px;
		letter-spacing: 0.08em;
		color: var(--cream);
		border: 1px solid rgba(239, 227, 208, 0.35);
		padding: 3px 8px;
		border-radius: 6px;
	}
	.tile:hover .pill {
		color: var(--char);
		border-color: rgba(28, 27, 25, 0.35);
	}
</style>