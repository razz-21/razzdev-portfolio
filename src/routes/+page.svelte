<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import SelectedWork from '$lib/components/sections/SelectedWork.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Expertise from '$lib/components/sections/Expertise.svelte';
	import TechStack from '$lib/components/sections/TechStack.svelte';
	import CtaFooter from '$lib/components/sections/CtaFooter.svelte';
	import { profile } from '$lib/data/portfolio';
</script>

<svelte:head>
	<title>Razz — Software Developer & Creative Builder</title>
	<meta
		name="description"
		content="Ernesto Razo Jr (Razz) is a software developer in the Philippines. Explore thoughtful web applications, mobile experiences, and creative development."
	/>
	<meta name="theme-color" content="#050505" />
	<meta property="og:title" content="Razz — Thoughtful code. Meaningful experiences." />
	<meta property="og:description" content={profile.bio} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={profile.portraitUrl} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to content</a>
<div id="top"></div>
<Navbar />
<main id="main-content"><Hero /><SelectedWork /><About /><Expertise /><TechStack /></main>
<CtaFooter />

<style>
	.skip-link {
		position: fixed;
		top: 10px;
		left: 10px;
		transform: translateY(-150%);
		padding: 12px 20px;
		border-radius: 6px;
		background: #fff;
		color: #111;
		z-index: 100;
		font-size: 14px;
	}
	.skip-link:focus {
		transform: none;
	}
</style>
