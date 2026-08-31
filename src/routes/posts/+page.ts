import { getPosts } from '$lib/content.js';

// Reads frontmatter of all markdown posts, newest first.
export function load() {
	return { posts: getPosts() };
}