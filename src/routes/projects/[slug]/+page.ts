import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects.js';
import { getDetailBody } from '$lib/content.js';

// Prerender every project detail page for the static adapter.
export const prerender = true;
export const entries = () => projects.map((p) => ({ slug: p.slug }));

// Finds a project by slug and attaches an optional markdown body
// (src/content/projects/<slug>.md) so detail pages can be written in markdown.
export function load({ params }: { params: { slug: string } }) {
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) error(404, 'Project not found');

	return { project, Body: getDetailBody('projects', params.slug) };
}