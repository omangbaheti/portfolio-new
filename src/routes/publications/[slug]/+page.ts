import { error } from '@sveltejs/kit';
import { publications } from '$lib/data/publications.js';
import { getDetailBody } from '$lib/content.js';

// Prerender every publication detail page for the static adapter.
export const prerender = true;
export const entries = () => publications.map((p) => ({ slug: p.slug }));

// Finds a publication by slug and attaches an optional markdown body
// (src/content/publications/<slug>.md) so abstract/detail pages can be written in markdown.
export function load({ params }: { params: { slug: string } }) {
	const pub = publications.find((p) => p.slug === params.slug);
	if (!pub) error(404, 'Publication not found');

	return { pub, Body: getDetailBody('publications', params.slug) };
}