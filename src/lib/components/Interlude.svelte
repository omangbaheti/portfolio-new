<script lang="ts">
	let {
		line1 = 'Two disciplines.',
		line2 = 'One practice.',
		caption = 'MODE SELECT / XR × RESEARCH'
	} = $props();
</script>

<section class="interlude panel grain">
	<div class="container">
		<span class="eyebrow inter-eyebrow">{caption}</span>
		<h2 class="display inter-line">
			{line1}<br />
			<span class="accent">{line2}</span>
		</h2>
	</div>
</section>

<style>
	.interlude {
		margin: 72px auto;
		padding: 70px 0;
		border-top: 2px solid var(--char);
		border-bottom: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
	}
	.inter-eyebrow {
		color: var(--orange);
		display: block;
		margin-bottom: 20px;
	}
	.inter-line {
		color: var(--cream);
		font-size: clamp(2.4rem, 8vw, 5.5rem);
		line-height: 0.9;
	}
	.accent {
		color: var(--orange);
	}
</style>