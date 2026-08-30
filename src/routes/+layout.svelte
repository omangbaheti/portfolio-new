<script lang="ts">
	import '../app.css';
	import '../lib/styles/prose.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<div id="app">
	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>
