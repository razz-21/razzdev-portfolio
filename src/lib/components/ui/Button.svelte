<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	interface Props {
		href?: string;
		download?: string;
		onclick?: (event: MouseEvent) => void;
		variant?: 'glass' | 'solid' | 'quiet';
		children: Snippet;
		arrow?: boolean;
		class?: string;
		target?: '_blank' | '_self';
		label?: string;
	}
	let {
		href,
		download,
		onclick,
		variant = 'glass',
		children,
		arrow = true,
		class: className = '',
		target,
		label
	}: Props = $props();
	const styles = $derived([
		'button',
		variant,
		variant === 'glass' && 'liquid-glass-strong',
		className
	]);
</script>

{#snippet content()}
	<span>{@render children()}</span>
	{#if arrow}<ArrowUpRight size={17} strokeWidth={1.6} />{/if}
{/snippet}

{#if href && download}
	<a {href} {download} {onclick} rel="external" class={styles} aria-label={label}>
		{@render content()}
	</a>
{:else if href && /^(https?:|mailto:)/.test(href)}
	<a {href} {onclick} {target} rel="external noopener noreferrer" class={styles} aria-label={label}>
		{@render content()}
	</a>
{:else if href?.startsWith('#')}
	<a href="#{href.slice(1)}" {onclick} {target} class={styles} aria-label={label}>
		{@render content()}
	</a>
{:else if href}
	<a href={resolve(href as '/')} {onclick} {target} class={styles} aria-label={label}>
		{@render content()}
	</a>
{:else}
	<button type="button" {onclick} class={styles} aria-label={label}>
		{@render content()}
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 22px;
		min-height: 48px;
		padding: 13px 23px;
		border-radius: 100px;
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		transition:
			background 0.25s,
			transform 0.25s,
			box-shadow 0.25s;
	}
	.button:hover {
		transform: translateY(-2px);
	}
	.button :global(svg) {
		flex-shrink: 0;
		transition: transform 0.25s;
	}
	.button:hover :global(svg) {
		transform: translate(2px, -2px);
	}
	.solid {
		background: #f0efec;
		color: #111;
		border: 1px solid #f0efec;
		box-shadow: 0 2px 12px #ffffff09;
	}
	.solid:hover {
		background: white;
		box-shadow: 0 3px 20px #ffffff15;
	}
	.glass {
		color: #f0efec;
	}
	.glass:hover {
		background: #ffffff0d;
	}
	.quiet {
		border: 1px solid #ffffff15;
		color: #cacac4;
	}
	.quiet:hover {
		background: #ffffff09;
		color: white;
	}
</style>
