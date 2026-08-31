import type { Component } from 'svelte';

/** Frontmatter schema for markdown posts. */
export interface PostMeta {
	title?: string;
	date?: string;
	description?: string;
	tags?: string[];
	embed?: string;
}

type MdModule = {
	default: Component;
	metadata?: Record<string, unknown>;
};

const toSlug = (path: string) => path.split('/').pop()!.replace('.md', '');

const postModules = import.meta.glob('../content/posts/*.md', { eager: true }) as Record<
	string,
	MdModule
>;
const projectModules = import.meta.glob('../content/projects/*.md', { eager: true }) as Record<
	string,
	MdModule
>;
const publicationModules = import.meta.glob('../content/publications/*.md', { eager: true }) as Record<
	string,
	MdModule
>;

export type PostLite = { slug: string } & PostMeta;

/** All posts, newest first (for the listing page). */
export function getPosts(): PostLite[] {
	return Object.entries(postModules)
		.map(([path, mod]) => ({ slug: toSlug(path), ...(mod.metadata as PostMeta) }))
		.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}

/** A single post by slug, with its typed metadata and compiled body. */
export function getPost(slug: string): { slug: string; metadata: PostMeta; content: Component } | undefined {
	const path = Object.keys(postModules).find((p) => toSlug(p) === slug);
	if (!path) return undefined;
	return {
		slug,
		metadata: (postModules[path].metadata ?? {}) as PostMeta,
		content: postModules[path].default
	};
}

/** Compiled markdown body component for a project/publication, if it exists. */
export function getDetailBody(
	folder: 'projects' | 'publications',
	slug: string
): Component | undefined {
	const map = folder === 'projects' ? projectModules : publicationModules;
	const path = Object.keys(map).find((p) => toSlug(p) === slug);
	return path ? map[path].default : undefined;
}