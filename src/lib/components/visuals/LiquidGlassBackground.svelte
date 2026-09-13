<script lang="ts">
	import { Pause, Play } from '@lucide/svelte';
	import { hlsVideo, type VideoPlaybackController } from '$lib/attachments/hlsVideo';

	let playing = $state(false);
	let controller = $state.raw<VideoPlaybackController>();
	const attachVideo = hlsVideo({
		src: 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8',
		onController: (value) => {
			controller = value;
		},
		onPlaybackChange: (value) => {
			playing = value;
		}
	});
</script>

<div class="glass-background" aria-hidden="true">
	<div class="purple-ambient"></div>
	<video
		{@attach attachVideo}
		autoplay
		loop
		muted
		playsinline
		preload="none"
		tabindex="-1"
		class="glass-video"
	></video>
	<div class="content-shade"></div>
	<div class="edge-fade top-fade"></div>
	<div class="edge-fade bottom-fade"></div>
</div>
<button
	type="button"
	class="motion-toggle liquid-glass-strong"
	onclick={() => controller?.toggle()}
	aria-label={playing ? 'Pause hero background video' : 'Play hero background video'}
	disabled={!controller}
>
	{#if playing}<Pause size={12} />{:else}<Play size={12} />{/if}
	<span>{playing ? 'Pause motion' : 'Play motion'}</span>
</button>

<style>
	.glass-background {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}
	.purple-ambient {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 50% 59%, #4f286230 0, #24113322 30%, #050505 68%);
	}
	.purple-ambient::after {
		content: '';
		position: absolute;
		left: -15%;
		top: 34%;
		width: 130%;
		height: 49%;
		border-radius: 50%;
		border: 1px solid #d5a3ff1f;
		box-shadow:
			inset 0 -25px 65px #9360d521,
			0 14px 60px #bd89fa16;
		transform: rotate(-13deg);
	}
	.glass-video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 0.88;
		/* Keep the stream's original violet glass and pink specular highlights. */
	}
	.content-shade {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 50% 45%, #07030d45, transparent 69%);
	}
	.edge-fade {
		position: absolute;
		left: 0;
		right: 0;
		height: 180px;
	}
	.top-fade {
		top: 0;
		background: linear-gradient(#050505, transparent);
	}
	.bottom-fade {
		bottom: 0;
		height: 220px;
		background: linear-gradient(transparent, #050505);
	}
	.motion-toggle {
		position: absolute;
		z-index: 3;
		bottom: 91px;
		right: max(56px, calc((100% - 1280px) / 2));
		display: inline-flex;
		align-items: center;
		gap: 8px;
		min-height: 36px;
		padding: 9px 14px;
		border-radius: 30px;
		color: #ddd0eb;
		background-color: #27193140;
		font-size: 10px;
		transition:
			background 0.2s,
			color 0.2s;
	}
	.motion-toggle:hover {
		background-color: #5b3b713d;
		color: #fff;
	}
	.motion-toggle:disabled {
		opacity: 0.4;
	}
	@media (max-width: 900px) {
		.motion-toggle {
			right: 32px;
		}
	}
	@media (max-width: 700px) {
		/* Preserve the wide ribbon silhouette rather than cropping to its center. */
		.glass-video {
			width: 190%;
			max-width: none;
			left: -45%;
			opacity: 0.8;
		}
		.content-shade {
			background: radial-gradient(ellipse at 50% 42%, #10061966, transparent 80%);
		}
		.motion-toggle {
			right: 20px;
			bottom: 88px;
		}
	}
</style>
