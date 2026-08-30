<script lang="ts">
	import { projects } from '$lib/data/projects.js';
	import ProjectTile from './ProjectTile.svelte';

	const highlighted = $derived(projects.filter((p) => p.highlight));
</script>

<section id="highlights" class="highlights">
	<div class="head container">
		<span class="eyebrow">HIGHLIGHTS</span>
		<h2 class="display sect-title">Featured<br />Work</h2>
	</div>

	<div class="grid container">
		{#each highlighted as project (project.slug)}
			<ProjectTile {project} />
		{/each}
	</div>
</section>

<style>
	.highlights {
		padding: 80px 0 40px;
	}
	.head {
		padding: 0 24px;
	}
	.sect-title {
		font-size: clamp(2.6rem, 8vw, 5rem);
		color: var(--char);
		margin-top: 10px;
		line-height: 0.85;
	}
	.grid {
		padding: 0 24px;
		margin-top: 40px;
		display: grid;
		grid-template-columns: 1fr;
		gap: 28px;
	}
	@media (min-width: 700px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1000px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>