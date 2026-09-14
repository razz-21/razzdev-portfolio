<script lang="ts">
	import { reveal } from '$lib/attachments/reveal';
	import { ArrowDown, ArrowUpRight } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import LiquidGlassBackground from '$lib/components/visuals/LiquidGlassBackground.svelte';
	import { profile } from '$lib/data/portfolio';
	import cvUrl from '$lib/attachments/Ernesto_Razo_CV.pdf?url';
</script>

<section id="home" class="hero" aria-labelledby="hero-heading">
	<LiquidGlassBackground />
	<div class="page-shell hero-inner">
		<div class="hero-copy">
			<div class="eyebrow intro" {@attach reveal({ delay: 80, distance: 16 })}>
				<span class="little-star">✳</span> SOFTWARE DEVELOPER & CREATIVE BUILDER
			</div>
			<h1 id="hero-heading" {@attach reveal({ delay: 160, distance: 36 })}>
				Thoughtful code.<br /><em>Meaningful experiences.</em>
			</h1>
			<p {@attach reveal({ delay: 260 })}>
				I’m Razz, a software developer turning complex ideas into intuitive digital experiences.
				Based in the Philippines, building for people everywhere.
			</p>
			<div class="button-row hero-buttons" {@attach reveal({ delay: 360, distance: 20 })}>
				<Button href="#work" variant="solid">Explore my work</Button>
				<Button href={cvUrl} download="Ernesto_Razo_CV.pdf">Get my CV</Button>
			</div>
			<div class="hero-note" {@attach reveal({ delay: 440, distance: 12 })}>
				A little curiosity. A lot of care.
			</div>
		</div>
		<div class="hero-bottom">
			<a href="#work" class="scroll-cue" {@attach reveal({ delay: 520, distance: 12 })}>
				<span class="scroll-circle"><ArrowDown size={15} strokeWidth={1.3} /></span>
				<span>SCROLL TO EXPLORE</span>
			</a>
			<div class="social-links" {@attach reveal({ delay: 520, distance: 12 })}>
				<a href={profile.github} target="_blank" rel="external noopener noreferrer">
					GitHub <ArrowUpRight size={13} />
				</a>
				<a href={profile.linkedin} target="_blank" rel="external noopener noreferrer">
					LinkedIn <ArrowUpRight size={13} />
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		background: #050505;
		border-bottom: 1px solid #ffffff10;
	}
	.hero-inner {
		position: relative;
		z-index: 1;
		min-height: max(820px, 100svh);
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: 155px 175px;
		pointer-events: none;
	}
	.hero-copy {
		width: 100%;
		max-width: 1030px;
		text-align: center;
		text-shadow: 0 2px 26px #000a;
	}
	.hero-copy :global(a),
	.hero-bottom a {
		pointer-events: auto;
	}
	.intro {
		color: #e1d7ed;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 11px;
		letter-spacing: 0.15em;
		font-size: 10px;
		margin-bottom: 30px;
	}
	.little-star {
		display: inline-block;
		font-size: 18px;
		color: #e8d8fa;
		line-height: 1;
	}
	h1 {
		font-size: clamp(66px, 7.9vw, 112px);
		line-height: 0.99;
		letter-spacing: -0.045em;
		margin: 0 0 31px;
		color: #fff;
	}
	h1 em {
		font-weight: 400;
		color: #f1eafa;
	}
	.hero-copy p {
		font-size: 16px;
		line-height: 1.75;
		font-weight: 300;
		color: #e0d9e8;
		max-width: 500px;
		margin: 0 auto 29px;
		text-wrap: pretty;
	}
	.hero-buttons {
		justify-content: center;
		text-shadow: none;
	}
	.hero-note {
		font-size: 11px;
		color: #c4b6d4;
		margin-top: 24px;
	}
	.hero-bottom {
		position: absolute;
		bottom: 29px;
		left: 0;
		right: 0;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}
	.scroll-cue {
		grid-column: 2;
		display: flex;
		align-items: center;
		gap: 12px;
		color: #96909d;
		font-size: 9px;
		letter-spacing: 0.15em;
	}
	.scroll-circle {
		width: 33px;
		height: 33px;
		display: grid;
		place-items: center;
		border: 1px solid #d8c2ef2a;
		border-radius: 50%;
		color: #d1c3de;
	}
	.social-links {
		justify-self: end;
		display: flex;
		gap: 24px;
	}
	.social-links a {
		display: flex;
		align-items: center;
		gap: 6px;
		color: #b4aabb;
		font-size: 11px;
	}
	.social-links a:hover {
		color: white;
	}
	.social-links a {
		transition: color 0.25s;
	}
	.social-links a :global(svg) {
		transition: transform 0.3s;
	}
	.social-links a:is(:hover, :focus-visible) :global(svg) {
		transform: translate(2px, -2px);
	}
	.scroll-circle {
		transition:
			background 0.3s,
			border-color 0.3s;
	}
	.scroll-cue:is(:hover, :focus-visible) .scroll-circle {
		background: #d8c2ef14;
		border-color: #d8c2ef70;
	}
	@media (prefers-reduced-motion: no-preference) {
		.little-star {
			animation: star-turn 3.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
		}
		.scroll-circle :global(svg) {
			animation: scroll-nudge 1.5s ease-in-out 1.2s 3;
		}
	}
	@keyframes star-turn {
		from {
			transform: rotate(-120deg);
		}
		to {
			transform: rotate(0);
		}
	}
	@keyframes scroll-nudge {
		0%,
		100% {
			transform: translateY(-2px);
		}
		50% {
			transform: translateY(3px);
		}
	}
	@media (max-width: 700px) {
		.hero-inner {
			min-height: max(760px, 100svh);
			padding-block: 140px 170px;
		}
		.hero-copy {
			max-width: 560px;
		}
		.intro {
			font-size: 8px;
			letter-spacing: 0.1em;
			margin-bottom: 28px;
			gap: 8px;
		}
		h1 {
			font-size: clamp(48px, 10.7vw, 73px);
			line-height: 1.02;
			margin-bottom: 26px;
		}
		.hero-copy p {
			max-width: 360px;
			font-size: 15px;
		}
		.hero-note {
			margin-top: 25px;
		}
		.scroll-cue {
			font-size: 8px;
			gap: 8px;
		}
		.hero-bottom {
			grid-template-columns: 1fr;
			justify-items: center;
			gap: 16px;
		}
		.scroll-cue {
			grid-column: 1;
		}
		.social-links {
			justify-self: center;
			gap: 15px;
		}
		.social-links a {
			font-size: 10px;
		}
	}
	@media (max-width: 360px) {
		.intro {
			font-size: 7px;
			letter-spacing: 0.07em;
		}
		h1 {
			font-size: 45px;
		}
		.hero-buttons {
			gap: 9px;
		}
		.hero-buttons :global(.button) {
			padding-inline: 17px;
			gap: 13px;
			font-size: 12px;
		}
	}
</style>
