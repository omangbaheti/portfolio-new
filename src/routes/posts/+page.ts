// Reads frontmatter of all markdown posts, newest first.
export async function load() {
	const modules = import.meta.glob('../../content/posts/*.md', { eager: true }) as Record<
		string,
		{
			metadata: {
				title?: string;
				date?: string;
				description?: string;
				tags?: string[];
				embed?: string;
			};
		}
	>;

	const posts = Object.entries(modules)
		.map(([path, module]) => ({
			slug: path.split('/').pop()!.replace('.md', ''),
			...module.metadata
		}))
		.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

	return { posts };
}
