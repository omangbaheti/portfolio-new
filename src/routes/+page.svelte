<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Work from '$lib/components/Work.svelte';
	import Process from '$lib/components/Process.svelte';
	import About from '$lib/components/About.svelte';
	import Publications from '$lib/components/Publications.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>OMANG BAHETI — XR & Game Developer / UX Researcher</title>
</svelte:head>

<div class="home">
	<Hero />
	<Work />
	<Publications />
	<About />
	<Process />
	<Contact />
</div>

<style>
	/* Clear the sticky header when scrolling to section anchors. */
	:global(section[id]) {
		scroll-margin-top: 84px;
	}
</style>