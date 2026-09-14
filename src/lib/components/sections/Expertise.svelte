<script lang="ts">
	import { reveal } from '$lib/attachments/reveal';
	import { ArrowUpRight, CodeXml, Smartphone, Sparkles } from '@lucide/svelte';
	import GrainFieldBackground from '$lib/components/visuals/GrainFieldBackground.svelte';
	import { capabilities, profile } from '$lib/data/portfolio';

	const icons = [CodeXml, Smartphone, Sparkles];
</script>

<section id="expertise" class="expertise-section" aria-labelledby="expertise-heading">
	<GrainFieldBackground />
	<div class="page-shell expertise-content">
		<div class="section-intro">
			<h2 id="expertise-heading" class="section-heading" {@attach reveal()}>
				From the first idea.<br /><span>To the final detail.</span>
			</h2>
			<p {@attach reveal({ delay: 100 })}>
				A thoughtful interface is only the beginning. I bring the engineering behind it together, so
				your idea works as well as it feels.
			</p>
		</div>
		<div class="capabilities-grid">
			{#each capabilities as capability, index (capability.title)}
				{@const Icon = icons[index]}
				<article
					class="capability-card liquid-glass-strong"
					{@attach reveal({ delay: index * 120, distance: 32 })}
				>
					<div class="card-top">
						<div class="capability-icon liquid-glass-strong">
							<Icon size={25} strokeWidth={1.2} />
						</div>
						<span class="card-number">0{index + 1}</span>
					</div>
					<h3>{capability.title}</h3>
					<p class="capability-description">{capability.description}</p>
					<a
						href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let’s talk about ${capability.title.toLowerCase()}`)}`}
						class="text-link"
					>
						Let’s discuss your idea <ArrowUpRight size={14} strokeWidth={1.3} />
					</a>
				</article>
			{/each}
		</div>
		<div class="craft-note" {@attach reveal({ distance: 20 })}>
			<span class="quote-mark" aria-hidden="true">“</span>
			<p>Good software should feel simple.<br /><span>Even when what’s behind it isn’t.</span></p>
			<span class="quote-line" aria-hidden="true"></span>
		</div>
	</div>
</section>

<style>
	.expertise-section {
		position: relative;
		isolation: isolate;
		padding: 100px 0;
		overflow: clip;
		background: #dceaf4;
		color: #19171f;
		color-scheme: light;
	}
	.expertise-content {
		position: relative;
		z-index: 1;
	}
	.section-intro {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 45px;
		margin-bottom: 45px;
	}
	.section-intro h2 {
		color: #19171f;
		margin: 0;
		font-size: clamp(45px, 5.1vw, 72px);
		line-height: 1.05;
	}
	.section-intro h2 span {
		color: #716b7b;
	}
	.section-intro > p {
		max-width: 300px;
		color: #615d68;
		font-size: 14px;
		line-height: 1.8;
		font-weight: 400;
		margin: 0 0 5px;
	}
	.capabilities-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 18px;
	}
	.capability-card {
		display: flex;
		flex-direction: column;
		border-radius: 17px;
		padding: 29px;
		background-color: #ffffff78;
		min-width: 0;
		box-shadow:
			0 12px 32px #21132e06,
			inset 0 1px 1px #fff;
		transition:
			background-color 0.25s,
			transform 0.25s;
	}
	.capability-card:is(:hover, :focus-within) {
		background-color: #fffffff0;
		transform: translateY(-4px);
	}
	.capability-card::before,
	.capability-icon::before {
		background: linear-gradient(180deg, #3d4d6326, #3d4d630d 35%, #3d4d6308 65%, #3d4d6321);
	}
	.capability-card .text-link:focus-visible {
		outline: 2px solid #6f5389;
		outline-offset: 5px;
	}
	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 35px;
	}
	.capability-icon {
		transition:
			transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.45s;
		width: 53px;
		height: 53px;
		display: grid;
		place-items: center;
		border-radius: 15px;
		color: #514461;
		background: linear-gradient(145deg, #fff, #e4eaf0);
		transform: rotate(-6deg);
	}
	.capability-icon :global(svg) {
		transform: rotate(6deg);
		transition: transform 0.45s;
	}
	.capability-card:is(:hover, :focus-within) .capability-icon {
		transform: rotate(0) translateY(-3px);
		box-shadow: 0 8px 18px #51446118;
	}
	.capability-card:is(:hover, :focus-within) .capability-icon :global(svg) {
		transform: rotate(0);
	}
	.card-number {
		color: #78717f;
		font-size: 10px;
		letter-spacing: 0.12em;
	}
	.capability-card h3 {
		margin: 0 0 14px;
		font-size: clamp(27px, 2.65vw, 36px);
		font-style: italic;
		line-height: 1.1;
		letter-spacing: -0.025em;
		color: #211d28;
	}
	.capability-description {
		color: #615d68;
		font-size: 13px;
		line-height: 1.8;
		margin: 0 0 24px;
		font-weight: 400;
	}
	.capability-card .text-link {
		margin-top: auto;
		width: 100%;
		justify-content: space-between;
		border-top: 1px solid #2720311a;
		padding-top: 20px;
		font-size: 11px;
		color: #494151;
	}
	.capability-card .text-link:hover {
		color: #100d16;
	}
	.craft-note {
		text-align: center;
		margin-top: 78px;
	}
	.quote-mark {
		display: block;
		color: #8b7a9d;
		font: italic 43px/0.5 var(--font-heading);
		margin-bottom: 16px;
	}
	.craft-note p {
		font: italic clamp(28px, 3vw, 40px)/1.12 var(--font-heading);
		color: #312a3b;
		letter-spacing: -0.025em;
		margin: 0;
	}
	.craft-note p span {
		color: #716b7b;
	}
	.quote-line {
		display: inline-block;
		height: 1px;
		width: 28px;
		background: #30233e33;
		margin-top: 27px;
	}
	@media (max-width: 1050px) {
		.capability-card {
			padding: 24px;
		}
		.capabilities-grid {
			gap: 13px;
		}
		.section-intro {
			gap: 30px;
		}
		.section-intro > p {
			max-width: 250px;
			font-size: 13px;
		}
	}
	@media (max-width: 800px) {
		.capability-card {
			padding: 22px 18px;
		}
		.capability-description {
			font-size: 12px;
		}
	}
	@media (max-width: 700px) {
		.expertise-section {
			padding: 70px 0;
		}
		.section-intro {
			flex-direction: column;
			align-items: flex-start;
			gap: 23px;
			margin-bottom: 30px;
		}
		.section-intro h2 {
			font-size: clamp(43px, 8.6vw, 58px);
		}
		.section-intro > p {
			max-width: 360px;
			font-size: 14px;
			margin: 0;
		}
		.capabilities-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}
		.capability-card {
			padding: 28px;
		}
		.card-top {
			margin-bottom: 30px;
		}
		.capability-card h3 {
			font-size: 34px;
		}
		.capability-description {
			font-size: 14px;
			max-width: 450px;
		}
		.capability-card .text-link {
			font-size: 12px;
		}
		.craft-note {
			margin-top: 60px;
		}
		.craft-note p {
			font-size: clamp(26px, 5.8vw, 34px);
		}
	}
</style>
