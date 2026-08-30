<script lang="ts">
	const stats = [
		{ n: '8+', label: 'Years XR' },
		{ n: '200+', label: 'Participants' },
		{ n: '22', label: 'Shipped' },
		{ n: '3', label: 'GDC Talks' }
	];

	const skillGroups = [
		{ label: 'XR DEV', items: ['Unreal Engine 5', 'Unity 6', 'OpenXR / WebXR', 'HLSL / Shader Graph', 'Rollback Netcode'] },
		{ label: 'UX RESEARCH', items: ['User Interviews', 'Usability Testing', 'Think-Aloud', 'Eye Tracking', 'Diary Studies'] },
		{ label: 'ANALYSIS', items: ['Thematic Coding', 'Affinity Mapping', 'Journey Mapping', 'Statistical Analysis', 'Heuristic Eval'] },
		{ label: 'TOOLS', items: ['Figma / FigJam', 'Dovetail', 'C++ / C# / Python', 'SPSS / R', 'Miro'] }
	];

	let {
		portrait = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&h=900&fit=crop&auto=format',
		location = 'AMSTERDAM, NL',
		year = '2024',
		setup = 'PLAYER 1 — KAI'
	} = $props();
</script>

<section id="about" class="about">
	<div class="container grid">
		<!-- Portrait -->
		<div class="portrait-col">
			<div class="portrait panel flat-shadow">
				<img src={portrait} alt="Portrait" class="portrait-img" />
				<span class="mono-label portrait-cap">{setup}</span>
			</div>
			<div class="portrait-meta">
				<span class="mono-label">{location}</span>
				<span class="mono-label">{year}</span>
			</div>
		</div>

		<!-- Bio -->
		<div class="bio-col">
			<div class="head">
				<span class="eyebrow">PLAYER PROFILE</span>
				<h2 class="display title">About</h2>
			</div>

			<div class="bio">
				<p>
					I'm Omang Baheti — XR developer and UX researcher, eight years building and studying
					immersive technology from both sides of the monitor.
				</p>
				<p>
					Research gives engineering decisions an empirical anchor. Engineering makes research
					actionable — a usability finding can become a pull request the same day.
				</p>
				<p>
					Previously at <span class="hi">Niantic Labs</span>, <span class="hi">Ready at Dawn</span>,
					and <span class="hi">Microsoft Research</span>. Now independent.
				</p>
			</div>

			<!-- Stats -->
			<div class="stats">
				{#each stats as s (s.label)}
					<div class="stat panel-dk flat-shadow">
						<span class="display stat-n">{s.n}</span>
						<span class="mono-label stat-label">{s.label}</span>
					</div>
				{/each}
			</div>

			<!-- Skills -->
			<div class="skills">
				{#each skillGroups as group (group.label)}
					<div class="skill-group">
						<span class="mono-label group-label">{group.label}</span>
						<ul>
							{#each group.items as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		padding: 60px 0 80px;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
		padding: 0 24px;
	}
	@media (min-width: 900px) {
		.grid {
			grid-template-columns: 4fr 8fr;
			gap: 64px;
		}
	}

	.portrait {
		border: 2px solid var(--char);
		position: relative;
	}
	.portrait-img {
		width: 100%;
		height: 420px;
		object-fit: cover;
		filter: contrast(1.05) saturate(0.85);
	}
	.portrait-cap {
		position: absolute;
		bottom: 10px;
		left: 10px;
		background: var(--orange);
		color: var(--cream);
		padding: 4px 10px;
	}
	.portrait-meta {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	.head {
		margin-bottom: 32px;
	}
	.title {
		font-size: clamp(2.6rem, 8vw, 5rem);
		color: var(--char);
		margin-top: 8px;
		line-height: 0.85;
	}
	.bio {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 54ch;
		font-size: 15px;
		font-weight: 300;
		line-height: 1.7;
		margin-bottom: 40px;
	}
	.hi {
		color: var(--orange);
		font-weight: 500;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		margin-bottom: 48px;
	}
	@media (min-width: 640px) {
		.stats {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.stat {
		border: 2px solid var(--char);
		padding: 20px 16px;
		position: relative;
	}
	.stat-n {
		color: var(--orange);
		font-size: 34px;
		display: block;
		margin-bottom: 6px;
	}
	.stat-label {
		color: var(--cream);
	}

	.skills {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 28px;
	}
	@media (min-width: 640px) {
		.skills {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.group-label {
		color: var(--orange);
		font-size: 11px;
	}
	.skill-group ul {
		list-style: none;
		margin-top: 14px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.skill-group li {
		font-size: 13px;
		font-weight: 300;
		position: relative;
		padding-left: 14px;
	}
	.skill-group li::before {
		content: '▸';
		color: var(--char);
		position: absolute;
		left: 0;
	}
</style>