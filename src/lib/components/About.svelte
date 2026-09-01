<script lang="ts">
	import { reveal } from '$lib/reveal';

	const stats = [
		{ n: '3+', label: 'Years XR' },
		{ n: '90+', label: 'Participants' },
		{ n: '6', label: 'Papers Authored' },
		{ n: '150+', label: 'Students Taught' }
	];

	const skillGroups = [
		{ label: 'LANGUAGES', items: ['C#', 'C / C++', 'Python', 'TypeScript', 'JavaScript', 'Rust', 'Go', 'GLSL / HLSL', 'R', 'Nix'] },
		{ label: 'XR / GAME ENGINES', items: ['Unity', 'Unreal', 'Godot', 'XR Interaction Toolkit', 'WebXR', 'Meta XR SDK', 'AR Foundation', 'Photon Fusion', 'Three.js', 'ROS2'] },
		{ label: 'RESEARCH METHODS', items: ['Usability Testing', 'Quantitative User Studies', 'Qualitative Analysis', 'Survey Design', 'Behavioral Data Analysis', 'Statistical Analysis (SPSS / R)'] },
		{ label: 'AI / DATA', items: ['PyTorch', 'TensorFlow / Keras', 'Pandas / NumPy', 'Computer Vision', 'LLMs', 'LangChain'] },
		{ label: 'WEB / MOBILE', items: ['Node.js', 'React', 'React Native', 'Next.js', 'Flutter', 'HTML / CSS'] },
		{ label: 'CLOUD / INFRA', items: ['AWS / GCP', 'Firebase / Supabase', 'MySQL / PostgreSQL', 'MongoDB / Redis', 'Docker / Kubernetes', 'Linux / NixOS', 'Git', 'Figma'] }
	];

	let {
		portrait = '/img/author.png',
		location = 'TORONTO, ON',
		year = '2026',
		setup = 'PLAYER 1 — OMANG'
	} = $props();
</script>

<section id="about" class="about">
	<div class="container grid">
		<!-- Portrait -->
		<div class="portrait-col" use:reveal={{ delay: 60 }}>
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
		<div class="bio-col" use:reveal={{ delay: 90 }}>
			<div class="head">
				<span class="eyebrow">PLAYER PROFILE</span>
				<h2 class="display title">About</h2>
			</div>

			<div class="bio">
				<p>
					I'm Omang Baheti — an XR engineer with 3+ years building immersive systems in
					<span class="hi">Unity, Unreal, and Godot</span>, and 2+ years in HCI and UX research.
					I bring production engineering discipline and research rigour to spatial computing
					problems that haven't been solved yet.
				</p>
				<p>
					Research gives engineering decisions an empirical anchor; engineering makes research
					actionable — a usability finding can become a pull request the same day.
				</p>
				<p>
					At the <span class="hi">OVI Lab (UBC)</span> I built research systems from scratch and ran
					studies with <span class="hi">90+ participants</span>, authoring papers accepted at
					<span class="hi">ISMAR</span>, <span class="hi">MobileHCI</span>, and
					<span class="hi">GI</span>. I co-designed an open-source game development course reaching
					150+ students, and earned my MSc in CS (HCI/XR). Now building from
					<span class="hi">Toronto</span>.
				</p>
			</div>

			<!-- Stats -->
			<div class="stats">
				{#each stats as s, i (s.label)}
				<div
					class="stat panel-dk flat-shadow"
					use:reveal={{ delay: i * 80 }}
				>
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