import { error } from '@sveltejs/kit';
import { getPost, getPosts } from '$lib/content.js';

export const prerender = true;

export const entries = () => getPosts().map((p) => ({ slug: p.slug }));

export function load({ params }: { params: { slug: string } }) {
	const post = getPost(params.slug);
	if (!post) error(404, 'Post not found');
	return post;
}