<script lang="ts">
	import { reveal } from '$lib/reveal';

	let { data } = $props();
	const posts = $derived(data.posts);
</script>

<svelte:head>
	<title>Posts // OMANG BAHETI</title>
</svelte:head>

<section class="post-page">
	<div class="container head">
		<span class="eyebrow">DEV NOTES</span>
		<h2 class="display title">Posts</h2>
	</div>

	<div class="container list">
		{#each posts as post, i (post.slug)}
			<a
				class="post box anim-wub press"
				href="/posts/{post.slug}"
				use:reveal={{ delay: Math.min(i, 5) * 70 }}
			>
				<span class="display post-date">{post.date}</span>
				<div class="post-main">
					<h3 class="display post-title">{post.title}</h3>
					{#if post.description}
						<p>{post.description}</p>
					{/if}
				</div>
				<span class="mono-label read">LOAD CARTRIDGE →</span>
			</a>
		{:else}
			<span class="mono-label">No cartridges on record.</span>
		{/each}
	</div>
</section>

<style>
	.post-page {
		padding: 64px 0 40px;
	}
	.head {
		padding: 0 24px;
		margin-bottom: 40px;
	}
	.title {
		font-size: clamp(2.6rem, 8vw, 5rem);
		color: var(--char);
		margin-top: 8px;
		line-height: 0.85;
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 0 24px;
	}
	.post {
		display: grid;
		grid-template-columns: 1fr;
		gap: 12px;
		padding: 22px;
		background: var(--beige);
		box-shadow: var(--flat-shadow);
		border-radius: 14px;
		transition: background 0.15s;
	}
	@media (min-width: 820px) {
		.post {
			grid-template-columns: 110px 1fr auto;
			align-items: baseline;
		}
	}
	.post:hover {
		background: var(--char);
	}
	.post-date {
		color: var(--orange);
		font-size: 16px;
	}
	.post-title {
		color: var(--char);
		font-size: clamp(1.2rem, 3vw, 1.8rem);
		margin-bottom: 4px;
	}
	.post:hover .post-title {
		color: var(--cream);
	}
	.post p {
		font-size: 14px;
		font-weight: 300;
		color: rgba(28, 27, 25, 0.7);
	}
	.post:hover p {
		color: var(--cream);
	}
	.read {
		color: var(--char);
	}
	.post:hover .read {
		color: var(--orange);
	}
</style>