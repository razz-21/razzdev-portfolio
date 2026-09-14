import type { Attachment } from 'svelte/attachments';

interface RevealOptions {
	delay?: number;
	distance?: number;
	scale?: number;
}

/** Reveal once on entry, keeping server-rendered and reduced-motion content visible. */
export function reveal({
	delay = 0,
	distance = 28,
	scale = 1
}: RevealOptions = {}): Attachment<HTMLElement> {
	return (element) => {
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (preference.matches || !('IntersectionObserver' in window) || !element.animate) return;

		const animation = element.animate(
			[
				{ opacity: 0, transform: `translateY(${distance}px) scale(${scale})` },
				{ opacity: 1, transform: 'none' }
			],
			{ duration: 1000, delay, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' }
		);
		animation.pause();

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					observer.disconnect();
					animation.play();
				}
			},
			{ threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
		);

		function finish() {
			observer.disconnect();
			// Release the animated styles so hover effects can take over naturally.
			animation.cancel();
			preference.removeEventListener('change', onPreferenceChange);
			element.removeEventListener('focusin', finish);
		}

		function onPreferenceChange() {
			if (preference.matches) finish();
		}

		// Keyboard users should never focus an invisible link while a reveal is waiting.
		element.addEventListener('focusin', finish);
		preference.addEventListener('change', onPreferenceChange);
		animation.onfinish = finish;
		observer.observe(element);

		return finish;
	};
}
