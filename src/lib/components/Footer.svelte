<script lang="ts">
	import SocialIcon from './SocialIcon.svelte';
</script>

<footer class="footer box">
	<div class="container footer-inner">
		<!-- Social icons -->
		<div class="footer-actions">
			<div class="social-inline">
				<SocialIcon name="email" href="mailto:omang@baheti.dev" label="Email" />
				<SocialIcon name="scholar" href="https://scholar.google.com" label="Scholar" external />
				<SocialIcon name="linkedin" href="https://www.linkedin.com" label="LinkedIn" external />
				<SocialIcon name="github" href="https://github.com" label="GitHub" external />
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--char);
		border: none;
		border-top: 2px solid var(--char);
		margin-top: 26px;
	}
	.footer-inner {
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		padding: 21px 24px;
	}

	/* Social icons */
	.footer-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
	.social-inline {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 28px;
	}
</style>