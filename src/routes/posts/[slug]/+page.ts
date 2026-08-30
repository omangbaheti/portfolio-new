import { error } from '@sveltejs/kit';

export const prerender = true;

// All markdown posts for prerendering + slug resolution.
const modules = import.meta.glob('../../../content/posts/*.md', { eager: true }) as Record<
	string,
	{ metadata: Record<string, unknown>; default: unknown }
>;

export const entries = () =>
	Object.keys(modules).map((path) => ({ slug: path.split('/').pop()!.replace('.md', '') }));

export async function load({ params }: { params: { slug: string } }) {
	const match = Object.entries(modules).find(([path]) => path.endsWith(`/${params.slug}.md`));
	if (!match) error(404, 'Post not found');

	const [, module] = match;
	return {
		metadata: module.metadata,
		content: module.default
	};
}
