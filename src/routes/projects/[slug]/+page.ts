import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects.js';

// Prerender every project detail page for the static adapter.
export const prerender = true;
export const entries = () => projects.map((p) => ({ slug: p.slug }));

// Finds a project by slug and attaches an optional markdown body
// (src/content/projects/<slug>.md) so detail pages can be written in markdown.
export async function load({ params }: { params: { slug: string } }) {
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) error(404, 'Project not found');

	let Body: unknown = null;
	const modules = import.meta.glob('../../../content/projects/*.md', {
		eager: true
	}) as Record<string, { default: unknown }>;
	for (const [path, mod] of Object.entries(modules)) {
		if (path.endsWith(`/${params.slug}.md`)) {
			Body = mod.default;
			break;
		}
	}

	return { project, Body };
}
