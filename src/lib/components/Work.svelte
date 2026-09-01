<script lang="ts">
	import { projects } from '$lib/data/projects.js';
	import ProjectTile from './ProjectTile.svelte';
	import { reveal } from '$lib/reveal';
</script>

<section id="work" class="work">
	<div class="section-head container" use:reveal>
		<h2 class="display sect-title">Featured Works</h2>
	</div>

	<div class="grid container">
		{#each projects as project, i (project.slug)}
			<ProjectTile {project} revealDelay={Math.min(i, 5) * 70} />
		{/each}
	</div>
</section>

<style>
	.work {
		padding: 80px 0 40px;
	}
	@media (min-width: 768px) {
		.work {
			padding: 100px 0 40px;
		}
	}

	.section-head {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 0 24px;
	}
	@media (min-width: 860px) {
		.section-head {
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
		}
	}

	.sect-title {
		font-size: clamp(2.6rem, 8vw, 5rem);
		color: var(--char);
		margin-top: 10px;
		line-height: 0.85;
	}

	.grid {
		padding: 0 24px;
		margin-top: 48px;
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