<script lang="ts">
	import { reveal } from '$lib/reveal';

	const twoVoice = [
		{
			role: 'Developer',
			body: 'I build in Unreal and Unity — shaders, netcode, spatial interaction, performance profiling. I own the implementation, not just the spec.'
		},
		{
			role: 'Researcher',
			body: 'I plan and run user studies, analyse qualitative and quantitative data, and translate findings into decisions that actually ship.'
		}
	];

	const process = [
		{ n: '01', title: 'RESEARCH FIRST', body: "Every project begins with understanding people — who they are, what they expect, and where current systems fail them." },
		{ n: '02', title: 'PROTOTYPE IN ENGINE', body: "Paper wireframes don't capture spatial feel. I prototype in Unity or Unreal early so decisions are grounded in real physics and latency." },
		{ n: '03', title: 'TEST IN CONTEXT', body: 'Lab studies miss the messy middle. Sessions run in living rooms, offices, and public spaces.' },
		{ n: '04', title: 'SHIP & LOOP', body: 'Post-launch telemetry and follow-up studies feed the next cycle. Publishable findings go back into the community.' }
	];
</script>

<section id="process" class="process">
	<div class="container">
		<div class="head" use:reveal>
			<span class="eyebrow">HOW I WORK</span>
			<h2 class="display title">Process</h2>
		</div>

		<!-- Two-voice panel -->
		<div class="two-voice">
			{#each twoVoice as v, idx (v.role)}
				<div
					class="voice panel grain"
					use:reveal={{ delay: idx * 90 }}
				>
					<div class="voice-head">
						<span class="voice-dot first={idx === 0}" aria-hidden="true"></span>
						<span class="mono-label voice-role" class:orange={idx === 0} class:cream-text={idx !== 0}>
							{v.role}
						</span>
					</div>
					<p class="voice-body mono-label">{v.body}</p>
				</div>
			{/each}
		</div>

		<!-- Steps -->
		<div class="steps">
			{#each process as s, i (s.n)}
				<div
					class="step panel-dk grain"
					use:reveal={{ delay: i * 90 }}
				>
					<span class="step-n display">{s.n}</span>
					<h3 class="display step-title">{s.title}</h3>
					<p class="step-body mono-label">{s.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.process {
		padding: 80px 0 40px;
	}
	.head {
		padding: 0 24px;
		margin-bottom: 48px;
	}
	.title {
		font-size: clamp(2.6rem, 8vw, 5rem);
		color: var(--char);
		margin-top: 8px;
		line-height: 0.85;
	}
	.two-voice {
		padding: 0 24px;
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
		max-width: 760px;
		margin-bottom: 48px;
	}
	@media (min-width: 768px) {
		.two-voice {
			grid-template-columns: 1fr 1fr;
		}
	}
	.voice {
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
		padding: 24px;
	}
	.voice-head {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 16px;
	}
	.voice-dot {
		width: 10px;
		height: 10px;
		background: var(--orange);
		display: inline-block;
	}
	.voice-role {
		font-size: 12px;
		letter-spacing: 0.16em;
	}
	.orange {
		color: var(--orange);
	}
	.cream-text {
		color: var(--cream);
	}
	.voice-body {
		color: var(--cream);
		font-size: 11px;
		line-height: 1.9;
		text-transform: none;
	}

	.steps {
		padding: 0 24px;
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}
	@media (min-width: 900px) {
		.steps {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.step {
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
		padding: 22px;
		position: relative;
	}
	.step-n {
		color: var(--orange);
		font-size: 44px;
		display: block;
		margin-bottom: 18px;
	}
	.step::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		border-top: 18px solid var(--orange);
		border-right: 18px solid transparent;
	}
	.step-title {
		color: var(--cream);
		font-size: 14px;
		letter-spacing: 0.06em;
		margin-bottom: 14px;
	}
	.step-body {
		color: var(--cream);
		opacity: 0.82;
		font-size: 10px;
		line-height: 1.9;
		text-transform: none;
	}
</style>