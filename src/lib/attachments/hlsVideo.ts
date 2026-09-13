import type { Attachment } from 'svelte/attachments';
import type Hls from 'hls.js';

export interface VideoPlaybackController {
	toggle: () => void;
}

interface HlsVideoOptions {
	src: string;
	onController?: (controller: VideoPlaybackController | undefined) => void;
	onPlaybackChange?: (playing: boolean) => void;
}

/** Lazily attaches an HLS stream and releases media resources on navigation. */
export function hlsVideo({
	src,
	onController,
	onPlaybackChange
}: HlsVideoOptions): Attachment<HTMLVideoElement> {
	return (video) => {
		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
		let hls: Hls | undefined;
		let disposed = false;
		let initializing = false;
		let initialized = false;
		let manifestReady = false;
		let nearby = false;
		let userPaused: boolean | null = null;

		const motionAllowed = () => (userPaused === null ? !motionPreference.matches : !userPaused);
		const shouldPlay = () => nearby && motionAllowed() && !document.hidden && !disposed;
		const publishPlayback = () => onPlaybackChange?.(!video.paused && !video.ended);
		const play = () => {
			if (shouldPlay()) {
				void video.play().catch(() => {
					// A rejected earlier request must not overwrite a newer playback state.
					if (!disposed) publishPlayback();
				});
			}
		};

		async function initialize() {
			if (disposed || initialized || initializing || !shouldPlay()) return;
			initializing = true;
			try {
				const { default: HlsPlayer } = await import('hls.js');
				if (disposed || !shouldPlay()) return;
				// Prefer MSE when supported; native HLS handles browsers such as iOS Safari.
				// Some embedded browsers advertise native HLS without a working decoder.
				if (!HlsPlayer.isSupported() && video.canPlayType('application/vnd.apple.mpegurl')) {
					video.src = src;
					video.load();
					initialized = true;
					play();
				} else {
					if (!HlsPlayer.isSupported()) return;
					hls = new HlsPlayer({
						autoStartLoad: false,
						maxBufferLength: 12,
						maxMaxBufferLength: 20,
						capLevelToPlayerSize: true
					});
					manifestReady = false;
					hls.on(HlsPlayer.Events.MANIFEST_PARSED, () => {
						manifestReady = true;
						syncPlayback();
					});
					hls.on(HlsPlayer.Events.ERROR, (_event, data) => {
						if (data.fatal) {
							hls?.destroy();
							hls = undefined;
							initialized = false;
							manifestReady = false;
							userPaused = true;
							video.pause();
							onPlaybackChange?.(false);
						}
					});
					hls.loadSource(src);
					hls.attachMedia(video);
					initialized = true;
				}
			} catch {
				// The CSS background remains visible if the stream or player is unavailable.
				onPlaybackChange?.(false);
			} finally {
				initializing = false;
			}
		}

		function syncPlayback() {
			if (!shouldPlay()) {
				video.pause();
				if (hls && !manifestReady) {
					// stopLoad aborts the manifest, but startLoad cannot restart it.
					// Recreate this unfinished player the next time it is needed.
					hls.destroy();
					hls = undefined;
					initialized = false;
				} else hls?.stopLoad();
				return;
			}
			if (!initialized) void initialize();
			else {
				if (hls && !manifestReady) return;
				hls?.startLoad();
				play();
			}
		}

		function onMotionPreferenceChange() {
			userPaused = null;
			syncPlayback();
		}

		video.muted = true;
		// Let the attachment decide when autoplay is appropriate.
		video.autoplay = false;
		video.addEventListener('play', publishPlayback);
		video.addEventListener('pause', publishPlayback);
		video.addEventListener('ended', publishPlayback);
		video.addEventListener('canplay', play);
		motionPreference.addEventListener('change', onMotionPreferenceChange);
		document.addEventListener('visibilitychange', syncPlayback);
		onController?.({
			toggle: () => {
				userPaused = !video.paused;
				syncPlayback();
			}
		});

		const observer = new IntersectionObserver(
			([entry]) => {
				nearby = entry.isIntersecting;
				syncPlayback();
			},
			{ rootMargin: '180px' }
		);
		observer.observe(video);

		return () => {
			disposed = true;
			observer.disconnect();
			motionPreference.removeEventListener('change', onMotionPreferenceChange);
			document.removeEventListener('visibilitychange', syncPlayback);
			video.removeEventListener('play', publishPlayback);
			video.removeEventListener('pause', publishPlayback);
			video.removeEventListener('ended', publishPlayback);
			video.removeEventListener('canplay', play);
			hls?.destroy();
			video.pause();
			video.removeAttribute('src');
			video.load();
			onController?.(undefined);
		};
	};
}
