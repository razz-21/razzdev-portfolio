<script lang="ts">
	import { Pause, Play } from '@lucide/svelte';
	import type { DotWaveScene } from '$lib/three/createDotWaveScene';

	let ready = $state(false);
	let playing = $state(false);
	let scene = $state.raw<DotWaveScene>();

	function attachBackground(element: HTMLDivElement) {
		let disposed = false;
		let loading = false;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || loading) return;
				loading = true;
				observer.disconnect();
				void import('$lib/three/createDotWaveScene')
					.then(({ createDotWaveScene }) => {
						if (disposed) return;
						scene = createDotWaveScene(element, {
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

<div class="dot-wave-background" aria-hidden="true">
	<div class="dot-fallback" class:resolved={ready}></div>
	<div class="dot-canvas" class:ready {@attach attachBackground}></div>
	<div class="dot-shade"></div>
</div>
{#if ready}
	<button
		type="button"
		class="motion-control liquid-glass-strong"
		aria-label={playing ? 'Pause about background animation' : 'Play about background animation'}
		onclick={() => scene?.setPaused(playing)}
	>
		{#if playing}<Pause size={12} />{:else}<Play size={12} />{/if}
		<span>{playing ? 'Pause animation' : 'Play animation'}</span>
	</button>
{/if}

<style>
	.dot-wave-background {
		position: absolute;
		inset: -100px auto -90px 50%;
		width: 100vw;
		transform: translateX(-50%);
		z-index: -1;
		pointer-events: none;
		mask-image: linear-gradient(to bottom, transparent, black 12% 78%, transparent);
	}
	.dot-canvas,
	.dot-fallback,
	.dot-shade {
		position: absolute;
		inset: 0;
	}
	.dot-canvas {
		opacity: 0;
		transition: opacity 900ms;
	}
	.dot-canvas.ready {
		opacity: 0.7;
	}
	.dot-fallback {
		background: radial-gradient(circle, #c9e6f2 1.2px, transparent 1.8px) 0 0 / 6px 6px;
		mask-image: repeating-linear-gradient(
			125deg,
			transparent 0 10%,
			#0009 18%,
			transparent 28% 38%
		);
		opacity: 0.35;
	}
	.dot-fallback.resolved {
		opacity: 0;
	}
	.dot-shade {
		background: linear-gradient(90deg, transparent 18%, #080b0d44 40%, #080b0db8 65%, #080b0d22);
	}
	.motion-control {
		position: absolute;
		right: 0;
		top: -65px;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		min-height: 38px;
		border-radius: 24px;
		font-size: 10px;
		color: #c0cdd7;
		cursor: pointer;
	}
	.motion-control:hover {
		background-color: #ffffff12;
		color: white;
	}
	@media (max-width: 700px) {
		.dot-wave-background {
			inset-block: -70px -65px;
		}
		.dot-canvas.ready {
			opacity: 0.55;
		}
		.dot-shade {
			background: linear-gradient(to bottom, transparent 25%, #080b0d99 55%, #080b0dbb);
		}
		.motion-control {
			top: -52px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.dot-canvas {
			transition: none;
		}
	}
</style>
