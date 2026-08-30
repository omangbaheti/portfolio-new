<script lang="ts">
	import { projects, type Discipline } from '$lib/data/projects.js';
	import ProjectTile from './ProjectTile.svelte';

	let filter = $state<'all' | Discipline>('all');
	const visible = $derived(
		filter === 'all' ? projects : projects.filter((p) => p.discipline === filter)
	);
</script>

<section id="work" class="work">
	<div class="section-head container">
		<div>
			<span class="eyebrow">SELECTED WORKS</span>
			<h2 class="display sect-title">Arcade<br />Cabinet</h2>
		</div>

		<!-- Filter — fightstick function keys -->
		<div class="filters">
			{#each [{ k: 'all', l: 'F1 ALL' }, { k: 'xr', l: 'F2 DEV' }, { k: 'ux', l: 'F3 RESEARCH' }] as f (f.k)}
				<button
					class="filter-btn display"
					class:active={filter === f.k}
					onclick={() => (filter = f.k)}
				>
					{f.l}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid container">
		{#each visible as project (project.slug)}
			<ProjectTile {project} />
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
	.filters {
		display: inline-flex;
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
		align-self: flex-start;
		background: var(--beige);
	}
	.filter-btn {
		font-family: var(--font-subs);
		font-weight: 500;
		letter-spacing: 0.1em;
		font-size: 12px;
		background: transparent;
		color: var(--char);
		border: none;
		border-right: 2px solid var(--char);
		padding: 12px 20px;
		cursor: pointer;
		text-transform: uppercase;
		transition: background 0.15s, color 0.15s;
	}
	.filter-btn:last-child {
		border-right: none;
	}
	.filter-btn:hover {
		background: var(--char);
		color: var(--cream);
	}
	.filter-btn.active {
		background: var(--orange);
		color: var(--cream);
		border-color: var(--char);
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