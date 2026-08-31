<script lang="ts">
	import { tick } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { expoOut } from 'svelte/easing';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let open = $state(false);

	// Brand name split into letters for the hover-raise effect
	const brandWords: string[][] = ['OMANG', 'BAHETI'].map((w) => w.split(''));

	const links = [
		{ href: '#work', label: 'Work' },
		{ href: '#publications', label: 'Publications' },
		{ href: '#about', label: 'About' },
		{ href: '#process', label: 'Process' },
		{ href: '#contact', label: 'Contact' }
	];

	let active = $state('');

	// Sliding pill position
	let navEl: HTMLElement | undefined = $state();
	const pill = tweened(
		{ x: 0, y: 0, w: 0, h: 0, visible: 'none' },
		{ duration: 500, easing: expoOut }
	);

	$effect(() => {
		if (!navEl) return;
		const current = active;
		const linkEl = current
			? navEl.querySelector<HTMLAnchorElement>(`a[href="${current}"]`)
			: null;
		const navRect = navEl.getBoundingClientRect();
		if (!linkEl) {
			pill.set({ x: 0, y: 0, w: 0, h: 0, visible: 'none' });
			return;
		}
		const r = linkEl.getBoundingClientRect();
		pill.set({
			x: r.left - navRect.left,
			y: r.top - navRect.top,
			w: r.width,
			h: r.height,
			visible: 'auto'
		});
	});

	async function onClick(e: MouseEvent, href: string) {
		e.preventDefault();
		const id = href.slice(1);
		if (page.url.pathname === '/') {
			scrollToSection(id);
		} else {
			await goto('/');
			await tick();
			scrollToSection(id);
		}
		open = false;
	}

	// While a programmatic smooth-scroll is in flight, the scroll-spy must not
	// touch `active` — otherwise it flips through every section the viewport
	// passes and the sliding pill tween restarts mid-flight (jerky motion).
	let spyLock = false;
	let spyLockTimer: ReturnType<typeof setTimeout> | undefined;

	function lockSpy() {
		spyLock = true;
		clearTimeout(spyLockTimer);
		// `scrollend` fires when the smooth scroll actually settles (Chrome 114+,
		// Firefox 109+, Safari 17.4+); the timeout is the fallback for older browsers.
		document.addEventListener('scrollend', unlockSpy, { once: true });
		spyLockTimer = setTimeout(unlockSpy, 1200);
	}

	function unlockSpy() {
		spyLock = false;
		clearTimeout(spyLockTimer);
	}

	function smoothScrollTo(el: HTMLElement) {
		lockSpy();
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function scrollToSection(id: string) {
		const el = document.getElementById(id);
		if (el) {
			smoothScrollTo(el);
			active = '#' + id;
			history.replaceState(null, '', '/#' + id);
		}
	}

	$effect(() => {
		const pathname = page.url.pathname;
		const ids = links.map((l) => l.href.slice(1));
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter(Boolean) as HTMLElement[];

		// Only track scroll-spy on the single-page home view
		if (pathname !== '/' || sections.length === 0) {
			active = '';
			return;
		}

		const onScroll = () => {
			if (spyLock) return; // programmatic scroll in progress — keep the pill on target
			const line = 90;
			const doc = document.documentElement;
			const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
			if (atBottom && sections.length) {
				active = '#' + sections[sections.length - 1].id;
				return;
			}
			let idx = -1;
			for (let i = 0; i < sections.length; i++) {
				const r = sections[i].getBoundingClientRect();
				if (line < r.top) break;
				if (line < r.top + 0.8 * r.height) {
					idx = i;
					break;
				}
				idx = i + 1;
			}
			if (idx >= sections.length) idx = sections.length - 1;
			active = idx >= 0 ? '#' + sections[idx].id : '';
		};

		// Throttle scroll handling to animation frames (cheap reads, no layout thrash).
		let raf = 0;
		const onScrollThrottled = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(onScroll);
		};
		onScroll();
		window.addEventListener('scroll', onScrollThrottled, { passive: true });

		// Handle arriving with a hash (e.g. /#work from another page)
		if (window.location.hash) {
			const id = window.location.hash.slice(1);
			const el = document.getElementById(id);
			if (el) setTimeout(() => smoothScrollTo(el), 60);
		}

		return () => {
			window.removeEventListener('scroll', onScrollThrottled);
			cancelAnimationFrame(raf);
			unlockSpy();
			active = '';
		};
	});
</script>

<header class="topbar">
	<div class="topbar-inner">
		<!-- Logo / brand mark top-left -->
		<a href="#work" class="brand press" onclick={(e) => onClick(e, '#work')} aria-label="Omang Baheti">
			<span class="stamp" aria-hidden="true">OB</span>
			<span class="brand-name display" aria-hidden="true">
				{#each brandWords as word, wi (wi)}
					{#if wi > 0}<br />{/if}
					{#each word as ch, ci (`${wi}-${ci}`)}
						<span class="ltr" style="--d:{ci * 18}ms">{ch}</span>
					{/each}
				{/each}
			</span>
		</a>

		<!-- Nav -->
		<nav class="desktop" bind:this={navEl}>
			<span
				class="nav-pill"
				style="
					width: {$pill.w}px;
					height: {$pill.h}px;
					transform: translate({$pill.x}px, {$pill.y}px);
					visibility: {$pill.visible};
				"
			></span>
			{#each links as l (l.href)}
				<a
					href={l.href}
					class:active={active === l.href}
					class="anim-wub"
					onclick={(e) => onClick(e, l.href)}
				>{l.label}</a
				>
			{/each}
		</nav>

		<!-- Mobile menu button -->
		<button class="menu-btn mono-label anim-wub press" onclick={() => (open = !open)}>
			{open ? '[PAUSE]' : '[PRESS START]'}
		</button>
	</div>

	{#if open}
		<div class="mobile">
			{#each links as l (l.href)}
				<a href={l.href} class:active={active === l.href} onclick={(e) => onClick(e, l.href)}>{l.label}</a>
			{/each}
		</div>
	{/if}
</header>

<style>
	.topbar {
		background: var(--beige);
		border-bottom: 1px solid var(--hairline);
		position: sticky;
		top: 0;
		z-index: 50;
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
		line-height: 1.05;
	}
	/* Per-letter hover raise — springy hop with a slight cascade between
	   neighbouring letters via transition-delay */
	.ltr {
		display: inline-block;
		transition:
			transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
			color 0.15s ease;
		transition-delay: var(--d, 0ms);
	}
	.brand:hover .ltr {
		transform: translateY(-4px);
		color: var(--orange);
		transition-delay: calc(var(--d, 0ms) / 2);
	}
	.brand .ltr:hover {
		transform: translateY(-6px) rotate(-3deg);
		color: var(--orange);
		transition-delay: 0ms;
	}

	.desktop {
		display: none;
		align-items: center;
		gap: 30px;
		position: relative;
	}
	@media (min-width: 768px) {
		.desktop {
			display: flex;
		}
	}
	/* Sliding highlight pill */
	.nav-pill {
		position: absolute;
		top: 0;
		left: 0;
		background: var(--orange);
		border-radius: 10px;
		z-index: 0;
		will-change: transform, width, height;
	}
	.desktop a {
		font-family: var(--font-subs);
		font-weight: 500;
		font-size: 13px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--char);
		padding: 7px 14px;
		position: relative;
		z-index: 1;
		border-radius: 10px;
		transition: color 0.15s ease;
	}
	.desktop a:hover {
		color: var(--orange);
	}
	.desktop a.active {
		color: var(--cream);
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
		padding: 6px 12px;
	}
	.mobile a.active {
		color: var(--orange);
		background: rgba(217, 110, 58, 0.15);
		border-radius: 8px;
	}
</style>