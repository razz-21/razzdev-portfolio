<script lang="ts">
	import { Pause, Play } from '@lucide/svelte';
	import type { DiscRingScene } from '$lib/three/createDiscRingScene';

	let ready = $state(false);
	let playing = $state(false);
	let scene = $state.raw<DiscRingScene>();

	function attachBackground(element: HTMLDivElement) {
		let disposed = false;
		let loading = false;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || loading) return;
				loading = true;
				observer.disconnect();
				void import('$lib/three/createDiscRingScene')
					.then(({ createDiscRingScene }) => {
						if (disposed) return;
						scene = createDiscRingScene(element, {
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

<div class="disc-background" aria-hidden="true">
	<div class="disc-glow"></div>
	<div class="disc-fallback" class:resolved={ready}>
		{#each Array.from({ length: 16 }, (_, index) => index) as index (index)}
			<span style={`--angle: ${index * 22.5}deg`}></span>
		{/each}
	</div>
	<div class="disc-canvas" class:ready {@attach attachBackground}></div>
	<div class="disc-shade"></div>
</div>
{#if ready}
	<button
		type="button"
		class="motion-control liquid-glass-strong"
		aria-label={playing
			? 'Pause contact background animation'
			: 'Play contact background animation'}
		onclick={() => scene?.setPaused(playing)}
	>
		{#if playing}<Pause size={12} />{:else}<Play size={12} />{/if}
		<span>{playing ? 'Pause animation' : 'Play animation'}</span>
	</button>
{/if}

<style>
	.disc-background {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
		background: #16091d;
	}
	.disc-glow,
	.disc-canvas,
	.disc-fallback,
	.disc-shade {
		position: absolute;
		inset: 0;
	}
	.disc-glow {
		background: radial-gradient(
			ellipse at 50% -20%,
			#9d7bad 0,
			#57326c 32%,
			#301132 62%,
			#100714 90%
		);
	}
	.disc-canvas {
		opacity: 0;
		transition: opacity 900ms;
	}
	.disc-canvas.ready {
		opacity: 0.95;
	}
	.disc-fallback {
		perspective: 900px;
		opacity: 0.65;
	}
	.disc-fallback.resolved {
		opacity: 0;
	}
	.disc-fallback span {
		position: absolute;
		left: 50%;
		top: 45%;
		width: clamp(70px, 11vw, 140px);
		aspect-ratio: 1;
		border-radius: 50%;
		background: linear-gradient(145deg, #ddccec, #67488a 26%, #160820 52%, #be75c1 90%);
		border: 2px solid #e3c9ee99;
		box-shadow:
			3px 4px 0 #81b9de66,
			inset 0 -3px 12px #e5a2ff66;
		transform: translate(-50%, -50%) rotate(var(--angle)) translateX(clamp(205px, 35vw, 490px))
			rotateY(45deg);
	}
	.disc-shade {
		background:
			radial-gradient(ellipse at 50% 43%, #130b20c9 0, #130b2070 27%, transparent 60%),
			linear-gradient(to bottom, #0004, transparent 18% 62%, #000 98%);
	}
	.motion-control {
		position: absolute;
		right: max(20px, calc((100% - 1280px) / 2), 4.4%);
		top: 26px;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		min-height: 38px;
		border-radius: 24px;
		font-size: 10px;
		color: #eadff4;
		cursor: pointer;
	}
	.motion-control:hover {
		background-color: #ffffff12;
		color: white;
	}
	@media (max-width: 600px) {
		.disc-canvas {
			inset-inline: -20%;
		}
		.disc-shade {
			background:
				radial-gradient(ellipse at 50% 40%, #130b20d9, #130b2077 43%, transparent 70%),
				linear-gradient(to bottom, #0003, transparent 20% 55%, #000 95%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.disc-canvas {
			transition: none;
		}
	}
</style>
