<script lang="ts">
	import { reveal } from '$lib/attachments/reveal';
	import { tick } from 'svelte';
	import { X } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import DiscRingBackground from '$lib/components/visuals/DiscRingBackground.svelte';
	import { contactChannels, profile } from '$lib/data/portfolio';

	type DialogKind = 'privacy' | 'terms' | 'contact';
	let dialog: HTMLDialogElement | undefined;

	function attachDialog(element: HTMLDialogElement) {
		dialog = element;
		return () => {
			dialog = undefined;
		};
	}
	let dialogKind = $state<DialogKind>('privacy');
	let previouslyFocused: HTMLElement | null = null;

	const emailHref = `mailto:${profile.email}?subject=${encodeURIComponent('I have an app in mind')}`;

	async function openDialog(kind: DialogKind, trigger: EventTarget | null) {
		previouslyFocused = trigger instanceof HTMLElement ? trigger : null;
		dialogKind = kind;
		await tick();
		dialog?.showModal();
	}

	function restoreFocus() {
		previouslyFocused?.focus();
		previouslyFocused = null;
	}
</script>

<section id="contact" class="cta-section" aria-labelledby="cta-heading">
	<DiscRingBackground />

	<div class="page-shell cta-content">
		<div class="cta-copy">
			<p class="eyebrow" {@attach reveal({ distance: 16 })}>HAVE SOMETHING IN MIND?</p>
			<h2 id="cta-heading" {@attach reveal({ delay: 100, distance: 36 })}>
				Your next app<br />starts here.
			</h2>
			<p class="cta-description" {@attach reveal({ delay: 180 })}>
				Good things start with a conversation. Tell me what you’re imagining,<br
					class="desktop-break"
				/>
				and let’s work out how to bring it to life. No pressure. Just possibilities.
			</p>
			<div class="cta-actions" {@attach reveal({ delay: 260, distance: 20 })}>
				<Button href={emailHref} variant="glass">Email Me</Button>
			</div>
		</div>

		<footer {@attach reveal({ distance: 16 })}>
			<div class="footer-identity">
				<a class="wordmark" href="#home" aria-label="Razz, back to top">razz<span>.</span></a>
				<p>© 2026 {profile.name}. All rights reserved.</p>
			</div>
			<div class="footer-links">
				<button type="button" onclick={(event) => openDialog('privacy', event.currentTarget)}
					>Privacy</button
				>
				<button type="button" onclick={(event) => openDialog('terms', event.currentTarget)}
					>Terms</button
				>
				<button type="button" onclick={(event) => openDialog('contact', event.currentTarget)}
					>Contact</button
				>
			</div>
		</footer>
	</div>
</section>

<dialog {@attach attachDialog} aria-labelledby="portfolio-dialog-title" onclose={restoreFocus}>
	<div class="dialog-content">
		<button
			class="close-dialog"
			type="button"
			onclick={() => dialog?.close()}
			aria-label="Close dialog"><X size={19} /></button
		>
		{#if dialogKind === 'privacy'}
			<p class="eyebrow">THE SMALL PRINT</p>
			<h2 id="portfolio-dialog-title">Your privacy.</h2>
			<div class="policy-copy">
				<p>
					This portfolio has no contact form, account system, or analytics installed. Contact links
					open your email app; sending a message is your choice.
				</p>
				<p>
					Fonts are loaded from Google Fonts, and the background video streams through Mux. Your
					browser connects to those providers to request these assets, which may share standard
					request information such as your IP address.
				</p>
				<p>
					External websites and email providers have their own privacy policies. For a question
					about this portfolio, contact <a href={`mailto:${profile.email}`}>{profile.email}</a>.
				</p>
			</div>
		{:else if dialogKind === 'contact'}
			<p class="eyebrow">REACH OUT</p>
			<h2 id="portfolio-dialog-title" class="tight">Contact me.</h2>
			<p class="dialog-lede">Reach out through any of these channels.</p>
			<dl class="channel-list">
				{#each contactChannels as channel (channel.label)}
					<div class="channel">
						<dt>{channel.label}</dt>
						<dd>
							<a
								href={channel.href}
								target={channel.external ? '_blank' : null}
								rel="external noopener noreferrer">{channel.value}</a
							>
						</dd>
					</div>
				{/each}
			</dl>
		{:else}
			<p class="eyebrow">THE SMALL PRINT</p>
			<h2 id="portfolio-dialog-title">A few notes.</h2>
			<div class="policy-copy">
				<p>
					This website presents the portfolio of {profile.name}. Projects are shown as examples of
					work; project names, branding, and other third-party materials belong to their respective
					owners.
				</p>
				<p>
					Services, scope, pricing, and timelines are discussed and agreed separately for each
					project. This portfolio does not take payments or create a service agreement.
				</p>
				<p>
					External links take you to independently operated websites. To discuss a project or ask
					about work shown here, email <a href={`mailto:${profile.email}`}>{profile.email}</a>.
				</p>
			</div>
		{/if}
	</div>
</dialog>

<style>
	.cta-section {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		background: #000;
		padding-top: 240px;
		scroll-margin-top: 80px;
	}
	.cta-content {
		position: relative;
		z-index: 1;
	}
	.cta-copy {
		text-shadow: 0 2px 24px #10081b;
		text-align: center;
	}
	.cta-copy > .eyebrow {
		color: #c4c5c6;
		margin: 0 0 30px;
	}
	h2 {
		font-family: 'Instrument Serif', serif;
		font-style: italic;
		font-weight: 400;
	}
	.cta-copy h2 {
		max-width: 850px;
		margin: 0 auto 27px;
		color: #fff;
		font-size: clamp(3.75rem, 6.5vw, 6.5rem);
		letter-spacing: -0.045em;
		line-height: 0.95;
	}
	.cta-description {
		color: #e0d5e9;
		font-size: 15px;
		line-height: 1.7;
		font-weight: 300;
		max-width: 590px;
		margin: 0 auto 30px;
	}
	.cta-actions {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 14px;
		flex-wrap: wrap;
	}
	footer {
		margin-top: 220px;
		padding: 36px 0 48px;
		border-top: 1px solid #ffffff2b;
		display: flex;
		align-items: center;
		gap: 34px;
	}
	.footer-identity {
		display: flex;
		align-items: center;
		gap: 25px;
		flex: 1;
	}
	.wordmark {
		font-family: var(--font-heading);
		font-size: 38px;
		font-weight: 400;
		font-style: italic;
		letter-spacing: -2px;
		color: white;
		text-decoration: none;
		line-height: 1;
	}
	.wordmark span {
		color: #ffffff8a;
	}
	.footer-identity p,
	.footer-links {
		font-size: 12px;
		font-weight: 400;
	}
	.footer-identity p {
		margin: 0;
		color: #ffffffa8;
	}
	.footer-links {
		display: flex;
		align-items: center;
		gap: 23px;
		color: #ffffffd1;
	}
	.footer-links button {
		color: inherit;
		text-decoration: none;
		border: 0;
		background: transparent;
		padding: 6px 0;
		cursor: pointer;
		font: inherit;
		transition: color 0.2s ease;
	}
	.footer-links button:hover {
		color: #fff;
	}
	dialog {
		max-height: min(850px, 90svh);
		width: min(640px, calc(100% - 32px));
		margin: auto;
		padding: 0;
		color: #fff;
		background: #121416f5;
		border: 1px solid #ffffff26;
		border-radius: 24px;
		box-shadow:
			0 30px 120px #000b,
			inset 0 1px 0 #ffffff1a;
		backdrop-filter: blur(40px);
	}
	dialog::backdrop {
		background: #000b;
		backdrop-filter: blur(9px);
	}
	dialog[open] {
		animation: dialog-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
	dialog[open]::backdrop {
		animation: backdrop-enter 0.3s ease-out;
	}
	@keyframes dialog-enter {
		from {
			opacity: 0;
			transform: translateY(16px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	@keyframes backdrop-enter {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.dialog-content {
		position: relative;
		padding: 48px;
	}
	.close-dialog {
		position: absolute;
		right: 18px;
		top: 18px;
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 1px solid #ffffff26;
		border-radius: 50%;
		background: #ffffff08;
		color: white;
		cursor: pointer;
	}
	.close-dialog:hover {
		background: #ffffff18;
	}
	.dialog-content > .eyebrow {
		margin: 0 0 24px;
		font-size: 10px;
	}
	.dialog-content h2 {
		margin: 0 0 22px;
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		letter-spacing: -0.035em;
		line-height: 1;
	}
	.dialog-content h2.tight {
		margin-bottom: 14px;
	}
	.dialog-lede {
		margin: 0 0 36px;
		color: #ffffffa6;
		font-size: 15px;
		line-height: 1.7;
		font-weight: 300;
	}
	.channel-list {
		display: grid;
		gap: 26px;
		margin: 0;
	}
	.channel dt {
		margin-bottom: 7px;
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.16em;
		line-height: 1.5;
		text-transform: uppercase;
		color: #ffffff8a;
	}
	.channel dd {
		margin: 0;
	}
	.channel dd a {
		font-family: var(--font-heading);
		font-size: 23px;
		line-height: 1.2;
		color: #fff;
		overflow-wrap: anywhere;
		text-decoration-color: #ffffff4d;
		text-underline-offset: 4px;
		transition: text-decoration-color 0.2s;
	}
	.channel dd a:hover {
		text-decoration: underline;
		text-decoration-color: #fff;
	}
	.policy-copy {
		color: #ffffffa6;
		font-size: 15px;
		line-height: 1.7;
		font-weight: 300;
	}
	.policy-copy p {
		margin: 0 0 20px;
	}
	.policy-copy p:last-child {
		margin-bottom: 0;
	}
	.policy-copy a {
		color: white;
		text-underline-offset: 3px;
		overflow-wrap: anywhere;
	}
	@media (max-width: 900px) {
		footer {
			flex-wrap: wrap;
			gap: 20px;
		}
		.footer-identity {
			flex-basis: 100%;
			justify-content: space-between;
		}
		.footer-links {
			flex: 1;
		}
	}
	@media (max-width: 600px) {
		.cta-section {
			padding-top: 160px;
		}
		.cta-copy > .eyebrow {
			font-size: 9px;
			margin-bottom: 25px;
		}
		.cta-copy h2 {
			font-size: clamp(3.2rem, 12vw, 4.5rem);
			margin-bottom: 24px;
		}
		.cta-description {
			font-size: 14px;
			max-width: 320px;
			line-height: 1.65;
		}
		.desktop-break {
			display: none;
		}
		.cta-actions {
			gap: 10px;
		}
		footer {
			margin-top: 160px;
			padding-top: 25px;
			padding-bottom: 40px;
		}
		.footer-identity {
			gap: 18px;
		}
		.footer-identity p {
			text-align: right;
			font-size: 11px;
			max-width: 200px;
			line-height: 1.5;
		}
		.channel-list {
			gap: 22px;
		}
		.channel dd a {
			font-size: 21px;
		}
		.footer-links {
			gap: 20px;
		}
		.dialog-content {
			padding: 48px 25px 30px;
		}
	}
</style>
