<script lang="ts">
	import { page } from '$app/state';
</script>

<section class="err">
	<span class="eyebrow">SYSTEM ERROR</span>
	<div class="box err-box">
		<span class="display big">{page.status === 404 ? '404' : 'FAULT'}</span>
		<h1 class="display title">{page.status === 404 ? 'PAGE NOT FOUND' : 'SYSTEM FAULT'}</h1>
		<p class="mono-label msg">
			{page.status === 404 ? 'No sector here. Insert another coin.' : page.error?.message}
		</p>
		<a class="btn mono-label" href="/">← BACK TO START</a>
	</div>
</section>

<style>
	.err {
		min-height: 70vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		padding: 48px 24px;
		text-align: center;
	}
	.err-box {
		max-width: 460px;
		width: 100%;
		background: var(--char);
		padding: 48px 32px;
		box-shadow: var(--flat-shadow);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}
	.big {
		color: var(--orange);
		font-size: 64px;
	}
	.title {
		color: var(--cream);
		font-size: 26px;
	}
	.msg {
		color: var(--cream);
		opacity: 0.8;
	}
	.btn {
		margin-top: 10px;
		background: var(--orange);
		color: var(--cream);
		padding: 14px 24px;
		border: 2px solid var(--orange);
		letter-spacing: 0.1em;
	}
	.btn:hover {
		background: var(--cream);
		color: var(--char);
	}
</style>