<script lang="ts">
	import { page } from '$app/state';

	let open = $state(false);

	const links = [
		{ route: '/', label: 'Home' },
		{ route: '/projects', label: 'Work' },
		{ route: '/publications', label: 'Publications' },
		{ route: '/posts', label: 'Posts' },
		{ route: '/about', label: 'About' },
		{ route: '/contact', label: 'Contact' }
	];

	const isActive = (route: string) =>
		route === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(route);
</script>

<header class="topbar">
	<div class="topbar-inner">
		<!-- Logo / brand mark top-left -->
		<a href="/" class="brand">
			<span class="stamp" aria-hidden="true">OB</span>
			<span class="brand-name display">OMANG<br />BAHETI</span>
		</a>

		<!-- Nav -->
		<nav class="desktop">
			{#each links as l (l.route)}
				<a href={l.route} class:active={isActive(l.route)}>{l.label}</a>
			{/each}
		</nav>

		<!-- Mobile menu button -->
		<button class="menu-btn mono-label" onclick={() => (open = !open)}>
			{open ? '[CLOSE]' : '[MENU]'}
		</button>
	</div>

	{#if open}
		<div class="mobile">
			{#each links as l (l.route)}
				<a href={l.route} onclick={() => (open = false)}>{l.label}</a>
			{/each}
		</div>
	{/if}
</header>

<style>
	.topbar {
		background: var(--beige);
		border-bottom: 1px solid var(--hairline);
	}
	.topbar-inner {
		max-width: 1100px;
		margin: 0 auto;
		padding: 14px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.stamp {
		width: 44px;
		height: 44px;
		background: var(--char);
		color: var(--beige);
		display: grid;
		place-items: center;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 16px;
		letter-spacing: 0.02em;
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
	}
	.brand-name {
		font-size: 17px;
		color: var(--char);
	}

	.desktop {
		display: none;
		align-items: center;
		gap: 30px;
	}
	@media (min-width: 768px) {
		.desktop {
			display: flex;
		}
	}
	.desktop a {
		font-family: var(--font-subs);
		font-weight: 500;
		font-size: 13px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--char);
		padding: 4px 0;
		position: relative;
	}
	.desktop a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--orange);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.2s;
	}
	.desktop a:hover::after,
	.desktop a.active::after {
		transform: scaleX(1);
	}
	.desktop a.active {
		color: var(--orange);
	}
	.desktop a:hover {
		color: var(--orange);
	}

	.menu-btn {
		display: inline-block;
		background: none;
		border: none;
		color: var(--char);
		cursor: pointer;
	}
	@media (min-width: 768px) {
		.menu-btn {
			display: none;
		}
	}

	.mobile {
		background: var(--char);
		color: var(--cream);
		border-top: 1px solid var(--orange);
		padding: 16px 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.mobile a {
		font-family: var(--font-subs);
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
</style>