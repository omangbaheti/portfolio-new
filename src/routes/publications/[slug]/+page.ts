import { error } from '@sveltejs/kit';
import { publications } from '$lib/data/publications.js';

// Prerender every publication detail page for the static adapter.
export const prerender = true;
export const entries = () => publications.map((p) => ({ slug: p.slug }));

// Finds a publication by slug and attaches an optional markdown body
// (src/content/publications/<slug>.md) so abstract/detail pages can be written in markdown.
export async function load({ params }: { params: { slug: string } }) {
	const pub = publications.find((p) => p.slug === params.slug);
	if (!pub) error(404, 'Publication not found');

	let Body: unknown = null;
	const modules = import.meta.glob('../../../content/publications/*.md', {
		eager: true
	}) as Record<string, { default: unknown }>;
	for (const [path, mod] of Object.entries(modules)) {
		if (path.endsWith(`/${params.slug}.md`)) {
			Body = mod.default;
			break;
		}
	}

	return { pub, Body };
}
