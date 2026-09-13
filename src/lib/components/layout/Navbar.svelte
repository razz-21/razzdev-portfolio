<script lang="ts">
	import { ArrowUpRight, Menu, X } from '@lucide/svelte';
	import { profile } from '$lib/data/portfolio';
	let open = $state(false);
	let active = $state('home');
	const links = [
		{ id: 'home', label: 'Home' },
		{ id: 'work', label: 'Work' },
		{ id: 'about', label: 'About' },
		{ id: 'expertise', label: 'Expertise' }
	];
	function trackSections() {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) active = entry.target.id;
			},
			{ rootMargin: '-20% 0px -55% 0px', threshold: 0 }
		);
		for (const link of links) {
			const section = document.getElementById(link.id);
			if (section) observer.observe(section);
		}
		return () => observer.disconnect();
	}
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') open = false;
	}}
/>
<header class="site-header" {@attach trackSections}>
	<div class="page-shell header-inner">
		<a class="wordmark" href="#home" aria-label="Razz — home" onclick={() => (open = false)}
			>razz<span>.</span></a
		>
		<nav class="desktop-nav liquid-glass-strong" aria-label="Main navigation">
			{#each links as link (link.id)}<a
					href={'#' + link.id}
					class:active={active === link.id}
					aria-current={active === link.id ? 'location' : undefined}>{link.label}</a
				>{/each}
		</nav>
		<a class="header-contact" href={'mailto:' + profile.email}
			>Let’s talk <ArrowUpRight size={16} /></a
		>
		<button
			class="menu-button liquid-glass-strong"
			type="button"
			aria-label={open ? 'Close navigation' : 'Open navigation'}
			aria-expanded={open}
			aria-controls="mobile-navigation"
			onclick={() => (open = !open)}
		>
			{#if open}<X size={20} />{:else}<Menu size={20} />{/if}
		</button>
	</div>
	{#if open}
		<nav id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation">
			{#each links as link (link.id)}<a href={'#' + link.id} onclick={() => (open = false)}
					>{link.label}<ArrowUpRight size={20} /></a
				>{/each}
			<a href="#contact" onclick={() => (open = false)}>Let’s talk<ArrowUpRight size={20} /></a>
		</nav>
	{/if}
</header>

<style>
	.site-header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 40;
		background: linear-gradient(#050505ed, #050505ad 65%, transparent);
	}
	.header-inner {
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.wordmark {
		font-family: var(--font-heading);
		font-size: 41px;
		font-style: italic;
		letter-spacing: -0.065em;
		line-height: 1;
	}
	.wordmark span {
		color: #aaa69e;
	}
	.desktop-nav {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		padding: 5px;
		border-radius: 100px;
		display: flex;
		gap: 4px;
		background-color: #19191960;
	}
	.desktop-nav a {
		color: #a6a6a3;
		border-radius: 30px;
		padding: 10px 22px;
		font-size: 12px;
		transition:
			background 0.2s,
			color 0.2s;
	}
	.desktop-nav a:hover {
		color: #fff;
	}
	.desktop-nav a.active {
		background: #ffffff10;
		color: #fff;
		box-shadow: inset 0 1px 0 #ffffff0c;
	}
	.header-contact {
		display: inline-flex;
		gap: 19px;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #ffffff40;
		padding-bottom: 6px;
	}
	.header-contact:hover {
		border-color: white;
	}
	.menu-button {
		display: none;
		width: 44px;
		height: 44px;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}
	.mobile-nav {
		display: none;
	}
	@media (max-width: 700px) {
		.header-inner {
			height: 80px;
		}
		.wordmark {
			font-size: 36px;
		}
		.desktop-nav,
		.header-contact {
			display: none;
		}
		.menu-button {
			display: flex;
		}
		.mobile-nav {
			display: flex;
			flex-direction: column;
			padding: 14px 26px 26px;
			border-bottom: 1px solid #ffffff18;
			background: #0b0b0bf5;
			backdrop-filter: blur(30px);
		}
		.mobile-nav a {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 17px 0;
			border-bottom: 1px solid #ffffff0f;
			font-size: 20px;
		}
	}
</style>
