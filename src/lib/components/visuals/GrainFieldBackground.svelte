<script lang="ts">
	import { Pause, Play } from '@lucide/svelte';
	import type { GrainFieldScene } from '$lib/three/createGrainFieldScene';

	let ready = $state(false);
	let playing = $state(false);
	let scene = $state.raw<GrainFieldScene>();

	function attachBackground(element: HTMLDivElement) {
		let disposed = false;
		let loading = false;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || loading) return;
				loading = true;
				observer.disconnect();
				void import('$lib/three/createGrainFieldScene')
					.then(({ createGrainFieldScene }) => {
						if (disposed) return;
						scene = createGrainFieldScene(element, {
							onReady: (value) => (ready = value),
							onPlaybackChange: (value) => (playing = value)
						});
					})
					.catch(() => {
						if (!disposed) ready = false;
					});
			},
			{ rootMargin: '200px' }
		);
		observer.observe(element);
		return () => {
			disposed = true;
			observer.disconnect();
			scene?.destroy();
		};
	}
</script>

<div class="grain-background" aria-hidden="true">
	<div class="grain-fallback" class:resolved={ready}></div>
	<div class="grain-canvas" class:ready {@attach attachBackground}></div>
</div>
{#if ready}
	<button
		type="button"
		class="motion-control liquid-glass-strong"
		aria-label={playing
			? 'Pause expertise background animation'
			: 'Play expertise background animation'}
		onclick={() => scene?.setPaused(playing)}
	>
		{#if playing}<Pause size={12} />{:else}<Play size={12} />{/if}
		<span>{playing ? 'Pause animation' : 'Play animation'}</span>
	</button>
{/if}

<style>
	.grain-background {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
		background: #dceaf4;
	}
	.grain-canvas,
	.grain-fallback {
		position: absolute;
		inset: 0;
	}
	.grain-fallback {
		background:
			radial-gradient(ellipse 58% 42% at 78% 28%, #6aa8d8 0%, transparent 72%),
			radial-gradient(ellipse 48% 52% at 16% 88%, #b5d3ec 0%, transparent 70%),
			radial-gradient(ellipse 36% 32% at 38% 46%, #efe6c8 0%, transparent 68%),
			radial-gradient(ellipse 70% 50% at 18% 22%, #c5def0 0%, transparent 75%),
			linear-gradient(180deg, #e4eef6, #f3f7fb);
		opacity: 1;
		transition: opacity 900ms;
	}
	.grain-fallback.resolved {
		opacity: 0;
	}
	.grain-canvas {
		opacity: 0;
		transition: opacity 900ms;
	}
	.grain-canvas.ready {
		opacity: 1;
	}
	.motion-control {
		position: absolute;
		z-index: 2;
		top: 24px;
		right: max(20px, calc((100% - 1280px) / 2));
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		min-height: 38px;
		border-radius: 24px;
		font-size: 10px;
		color: #3a4450;
		cursor: pointer;
		pointer-events: auto;
	}
	.motion-control:hover {
		background-color: #ffffff7a;
		color: #161b22;
	}
	@media (max-width: 700px) {
		.motion-control {
			top: 16px;
			right: 16px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.grain-canvas {
			transition: none;
		}
		.grain-fallback.resolved {
			transition: none;
		}
	}
</style>
