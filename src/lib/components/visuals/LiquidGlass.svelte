<script lang="ts">
	import type { GlassScene } from '$lib/three/createGlassScene';

	let { paused = false }: { paused?: boolean } = $props();
	let ready = $state(false);
	let scene = $state.raw<GlassScene>();

	function attachSculpture(element: HTMLDivElement) {
		let disposed = false;

		void import('$lib/three/createGlassScene')
			.then(({ createGlassScene }) => {
				if (disposed) return;
				scene = createGlassScene(element, {
					paused,
					onReady: () => (ready = true),
					onError: () => (ready = false)
				});
			})
			.catch(() => {
				// The static glass sculpture also works when WebGL is unavailable.
				if (!disposed) ready = false;
			});

		return () => {
			disposed = true;
			scene?.destroy();
		};
	}

	// This attachment only synchronizes playback; changing the prop keeps the scene alive.
	function attachPlayback() {
		scene?.setPaused(paused);
	}
</script>

<div class="liquid-sculpture" aria-hidden="true">
	<div class="sculpture-halo"></div>
	<div class="glass-fallback" class:resolved={ready}>
		<div class="glass-loop loop-one"></div>
		<div class="glass-loop loop-two"></div>
		<div class="glass-loop loop-three"></div>
	</div>
	<div
		class="sculpture-canvas"
		class:ready
		{@attach attachSculpture}
		{@attach attachPlayback}
	></div>
	<div class="sculpture-shadow"></div>
</div>

<style>
	.liquid-sculpture {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 300px;
		isolation: isolate;
	}

	.sculpture-halo {
		position: absolute;
		inset: 10% 0 5%;
		z-index: -1;
		border-radius: 50%;
		background: radial-gradient(ellipse, rgb(154 166 180 / 6%), transparent 65%);
	}

	.sculpture-canvas,
	.glass-fallback {
		position: absolute;
		inset: 0;
		transition: opacity 700ms ease;
	}

	.sculpture-canvas {
		opacity: 0;
	}

	.sculpture-canvas.ready {
		opacity: 1;
	}

	.glass-fallback {
		perspective: 800px;
		pointer-events: none;
	}

	.glass-fallback.resolved {
		opacity: 0;
	}

	.glass-loop {
		position: absolute;
		top: 17%;
		left: 24%;
		width: 49%;
		height: 66%;
		border: clamp(25px, 5vw, 46px) solid rgb(210 216 221 / 10%);
		border-radius: 46% 54% 50% 50%;
		background: linear-gradient(
			115deg,
			rgb(255 255 255 / 8%),
			transparent 30% 65%,
			rgb(255 255 255 / 9%)
		);
		box-shadow:
			inset 3px 1px 2px rgb(255 255 255 / 90%),
			inset -8px -4px 8px rgb(255 255 255 / 12%),
			4px 2px 1px rgb(255 255 255 / 50%),
			-5px -3px 8px rgb(255 255 255 / 6%),
			12px 12px 30px rgb(0 0 0 / 80%);
		transform: rotate(-36deg) rotateY(40deg);
	}

	.loop-two {
		transform: rotate(29deg) rotateY(55deg) rotateX(25deg);
	}

	.loop-three {
		transform: rotate(93deg) rotateY(60deg) rotateX(-25deg);
	}

	.sculpture-shadow {
		position: absolute;
		bottom: 7%;
		left: 24%;
		width: 52%;
		height: 4%;
		border-radius: 50%;
		background: #000;
		filter: blur(13px);
		opacity: 0.8;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.sculpture-canvas,
		.glass-fallback {
			transition: none;
		}
	}
</style>
