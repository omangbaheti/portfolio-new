/**
 * reveal — scroll-triggered entrance.
 *
 * Usage: use:reveal on an element (optionally with a stagger delay in ms):
 *   <div use:reveal={{ delay: 100 }}>
 *
 * Adds `.revealed` once the element scrolls into view. Combined with the
 * `.reveal` base styles in app.css it pops in with a playful overshoot.
 * Automatically respects prefers-reduced-motion.
 */
export function reveal(node: HTMLElement, opts: { delay?: number } = {}) {
	const delay = opts.delay || 0;

	node.classList.add('reveal');

	const apply = () => {
		node.style.animationDelay = `${delay}ms`;
		node.classList.add('revealed');
		observer.disconnect();
	};

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					apply();
					break;
				}
			}
		},
		// threshold 0 (any pixel) — a fraction-based threshold never fires
		// reliably for elements taller than ~the viewport (e.g. publication cards)
		{ threshold: 0, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	// If the element is already above the viewport when we mount (e.g. the
	// user jumped down before hydration finished), reveal immediately —
	// IntersectionObserver won't fire and no scroll event may follow.
	requestAnimationFrame(() => {
		if (node.getBoundingClientRect().bottom < 0) apply();
	});

	// Fallback: if a fast scroll / anchor jump leapfrogs the element past the
	// viewport between frames, the observer never sees it intersect. Reveal
	// anything that ends up entirely above the viewport.
	let raf = 0;
	const onScroll = () => {
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(() => {
			if (node.getBoundingClientRect().bottom < 0) apply();
		});
	};
	window.addEventListener('scroll', onScroll, { passive: true });

	return {
		update(newOpts: { delay?: number }) {
			node.style.animationDelay = `${newOpts.delay || 0}ms`;
		},
		destroy() {
			observer.disconnect();
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(raf);
		}
	};
}