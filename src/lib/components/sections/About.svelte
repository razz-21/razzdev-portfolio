<script lang="ts">
	import { reveal } from '$lib/attachments/reveal';
	import { ArrowDown, ArrowUpRight, MapPin, Plus } from '@lucide/svelte';
	import { experience, profile } from '$lib/data/portfolio';
	import DotWaveBackground from '$lib/components/visuals/DotWaveBackground.svelte';

	let photoFailed = $state(false);
	let showAllExperience = $state(false);
	const visibleExperience = $derived(showAllExperience ? experience : experience.slice(0, 3));
</script>

<section id="about" class="about-section" aria-labelledby="about-heading">
	<div class="page-shell">
		<div class="about-grid">
			<DotWaveBackground />
			<div class="portrait-card" {@attach reveal({ distance: 30, scale: 0.96 })}>
				<div class="portrait-fallback" aria-hidden="true">er.</div>
				{#if !photoFailed}
					<img
						src={profile.portraitUrl}
						alt="Ernesto Razo Jr"
						width="1200"
						height="1600"
						loading="lazy"
						onerror={() => (photoFailed = true)}
					/>
				{/if}
				<div class="portrait-shade" aria-hidden="true"></div>
				<span class="portrait-coordinate eyebrow">A work in progress. Always.</span>
				<div class="portrait-caption">
					<div>
						<span class="caption-note">THE HUMAN SIDE</span>
						<p>{profile.name}</p>
					</div>
					<span class="location-icon liquid-glass-strong" aria-label={profile.location}>
						<MapPin size={17} strokeWidth={1.2} />
					</span>
				</div>
			</div>

			<div class="about-copy">
				<h2 id="about-heading" class="section-heading" {@attach reveal({ delay: 100 })}>
					An engineer’s mind.<br /><span>A maker’s curiosity.</span>
				</h2>
				<p class="intro-copy" {@attach reveal({ delay: 140 })}>
					Hello, I’m Ernesto. <span>You can call me Razz.</span>
				</p>
				<p {@attach reveal({ delay: 180 })}>{profile.bio}</p>
				<p {@attach reveal({ delay: 220 })}>
					I also teach and mentor the next generation of developers at Liceo de Cagayan University.
					Away from the screen, you’ll find me hiking, traveling, or finding a new rhythm on the
					dance floor.
				</p>
				<div class="personal-stats" {@attach reveal({ delay: 100 })}>
					<div><strong>{profile.yearsExperience}</strong><span>Years of building</span></div>
					<div>
						<strong>Code <em>&</em> craft</strong><span>Equal parts logic & curiosity</span>
					</div>
				</div>
				<a
					class="text-link"
					{@attach reveal({ delay: 160, distance: 16 })}
					href={profile.linkedin}
					target="_blank"
					rel="external noopener noreferrer"
				>
					A little more about me <ArrowUpRight size={15} strokeWidth={1.4} />
				</a>
			</div>
		</div>

		<div class="experience-grid" role="region" aria-label="Professional experience">
			<div class="experience-intro" {@attach reveal()}>
				<p class="eyebrow">The journey so far</p>
				<h3>Different teams.<br /><span>A shared care for the craft.</span></h3>
			</div>
			<div>
				<div id="experience-list" class="experience-list">
					{#each visibleExperience as job, index (job.company)}
						<details
							class="experience-row"
							{@attach reveal({ delay: (index % 3) * 80, distance: 20 })}
						>
							<summary>
								<div class="job-name">
									<span class="company">{job.company}</span><span class="role">{job.role}</span>
								</div>
								<span class="period">{job.period}</span>
								<span class="expand-icon" aria-hidden="true"
									><Plus size={16} strokeWidth={1.2} /></span
								>
							</summary>
							<p class="job-description">{job.description}</p>
						</details>
					{/each}
				</div>
				<button
					type="button"
					class="text-link experience-toggle"
					{@attach reveal({ distance: 16 })}
					aria-expanded={showAllExperience}
					aria-controls="experience-list"
					onclick={() => (showAllExperience = !showAllExperience)}
				>
					{showAllExperience ? 'Show less experience' : 'View full experience'}
					<span class:rotated={showAllExperience}><ArrowDown size={14} strokeWidth={1.4} /></span>
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	.about-section {
		overflow: clip;
		padding: 100px 0;
		background: #080b0d;
		border-block: 1px solid #ffffff0d;
	}
	.about-grid {
		position: relative;
		isolation: isolate;
		display: grid;
		grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.2fr);
		gap: clamp(50px, 7.3vw, 108px);
		align-items: center;
	}
	.portrait-card {
		position: relative;
		min-height: 490px;
		overflow: hidden;
		border: 1px solid #ffffff13;
		border-radius: 16px;
		background: radial-gradient(ellipse at 65% 28%, #52554e, #232623 58%, #101211);
	}
	.portrait-fallback {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		font: italic 155px var(--font-heading);
		letter-spacing: -0.07em;
		color: #c8cdc247;
	}
	.portrait-card img {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 62%;
		filter: grayscale(1);
		transition:
			transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
			filter 0.9s;
	}
	@media (hover: hover) {
		.portrait-card:hover img {
			transform: scale(1.04);
			filter: grayscale(0.35);
		}
	}
	.portrait-shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, #0b0d0c3b, transparent 35%, #0b0d0c1a 55%, #0b0d0ce6 100%);
		pointer-events: none;
	}
	.portrait-coordinate {
		position: absolute;
		top: 23px;
		left: 25px;
		color: #deded6ad;
		font-size: 8px;
		letter-spacing: 0.16em;
	}
	.portrait-caption {
		position: absolute;
		bottom: 25px;
		inset-inline: 25px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.caption-note {
		color: #b6b8b0;
		font-size: 8px;
		letter-spacing: 0.15em;
	}
	.portrait-caption p {
		font-family: var(--font-heading);
		font-size: 30px;
		font-style: italic;
		margin: 5px 0 0;
	}
	.location-icon {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		color: #d4d6cc;
	}
	.about-copy {
		position: relative;
		isolation: isolate;
		text-shadow: 0 1px 12px #080b0d;
	}
	.about-copy::before {
		content: '';
		position: absolute;
		inset: -35px -45px;
		z-index: -1;
		pointer-events: none;
		background: radial-gradient(ellipse, #080b0dbb 30%, #080b0d88 60%, transparent 75%);
	}
	.about-copy h2 {
		font-size: clamp(44px, 4.8vw, 68px);
		margin: 0 0 28px;
		line-height: 1.05;
	}
	.about-copy h2 span {
		color: #c0ced8;
	}
	.about-copy p {
		max-width: 470px;
		margin: 0 0 17px;
		color: #c6d0d7;
		font-size: 15px;
		line-height: 1.8;
		font-weight: 400;
	}
	.about-copy .intro-copy {
		margin-bottom: 16px;
		color: #e0e0d8;
		font-weight: 400;
	}
	.intro-copy span {
		color: #93988f;
	}
	.personal-stats {
		display: flex;
		align-items: center;
		gap: 42px;
		margin: 30px 0 28px;
		padding-top: 26px;
		border-top: 1px solid #ffffff0d;
	}
	.personal-stats div {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
	.personal-stats div + div {
		border-left: 1px solid #ffffff17;
		padding-left: 40px;
	}
	.personal-stats strong {
		color: #e1e3da;
		font-family: var(--font-heading);
		font-size: 36px;
		font-weight: 400;
		letter-spacing: -0.02em;
	}
	.personal-stats em {
		color: #a4aa9d;
	}
	.personal-stats span {
		font-size: 10px;
		color: #767d72;
	}
	.about-copy .text-link {
		font-size: 12px;
	}
	.experience-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 45px;
		margin-top: 100px;
		padding-top: 64px;
		border-top: 1px solid #ffffff18;
	}
	.experience-intro .eyebrow {
		color: #b8adc9;
		margin: 0 0 22px;
		font-size: 11px;
	}
	.experience-intro h3 {
		font: italic clamp(40px, 5vw, 64px)/1.08 var(--font-heading);
		letter-spacing: -0.025em;
		color: #f4f1f8;
		margin: 0;
	}
	.experience-intro h3 span {
		color: #bfb6cc;
	}
	.experience-list {
		border-top: 1px solid #ffffff24;
	}
	.experience-row {
		border-bottom: 1px solid #ffffff24;
		transition: background-color 0.3s;
	}
	.experience-row:is(:hover, :focus-within) {
		background-color: #c4a1ff06;
	}
	.experience-row[open] .job-description {
		animation: experience-open 0.35s ease-out;
	}
	@keyframes experience-open {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	.experience-row summary {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto 44px;
		align-items: center;
		gap: 28px;
		padding: 32px 0;
		list-style: none;
		cursor: pointer;
	}
	.experience-row summary::-webkit-details-marker {
		display: none;
	}
	.job-name {
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-width: 0;
	}
	.company {
		color: #f1edf5;
		font-size: clamp(22px, 2.5vw, 32px);
		line-height: 1.25;
	}
	.role {
		color: #bdb5c7;
		font-size: 16px;
	}
	.period {
		font-size: 14px;
		color: #b1a9bc;
		white-space: nowrap;
	}
	.expand-icon {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border: 1px solid #ffffff24;
		border-radius: 50%;
		background: #ffffff05;
		color: #eee7f7;
		transition:
			transform 0.2s,
			background 0.2s;
	}
	.experience-row summary:hover .expand-icon {
		background: #c4a1ff1a;
	}
	.experience-row[open] .expand-icon {
		transform: rotate(45deg);
	}
	.job-description {
		color: #c1bacb;
		font-size: 16px;
		line-height: 1.8;
		font-weight: 300;
		margin: -4px 0 32px;
		max-width: 760px;
	}
	.experience-toggle {
		padding: 10px 0;
		margin-top: 24px;
		background: transparent;
		border: none;
		font-size: 15px;
		color: #e0d9e9;
	}
	.experience-toggle > span {
		display: flex;
		transition: transform 0.2s;
	}
	.experience-toggle .rotated {
		transform: rotate(180deg);
	}
	@media (max-width: 1000px) {
		.about-grid {
			gap: 40px;
			grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr);
		}
		.portrait-card {
			min-height: 460px;
		}
		.about-copy h2 {
			font-size: 45px;
		}
		.personal-stats {
			gap: 25px;
		}
		.personal-stats div + div {
			padding-left: 25px;
		}
		.personal-stats strong {
			font-size: 32px;
		}
		.experience-row summary {
			gap: 10px;
		}
	}
	@media (max-width: 700px) {
		.about-section {
			padding: 70px 0;
		}
		.about-grid {
			grid-template-columns: 1fr;
			gap: 35px;
		}
		.portrait-card {
			min-height: 0;
			aspect-ratio: 1 / 1.04;
			max-width: 440px;
			width: 100%;
		}
		.portrait-card img {
			object-position: center 58%;
		}
		.about-copy h2 {
			font-size: clamp(42px, 7.8vw, 57px);
			margin-bottom: 25px;
		}
		.about-copy p {
			font-size: 14px;
			max-width: 100%;
		}
		.personal-stats {
			margin-block: 26px;
		}
		.personal-stats div + div {
			padding-left: 30px;
		}
		.experience-grid {
			margin-top: 65px;
			padding-top: 40px;
			gap: 32px;
		}
		.experience-intro h3 {
			font-size: clamp(36px, 8vw, 48px);
		}
		.experience-row summary {
			grid-template-columns: minmax(0, 1fr) 44px;
			gap: 12px 16px;
			padding: 26px 0;
		}
		.company {
			font-size: 23px;
		}
		.role {
			font-size: 15px;
		}
		.period {
			grid-column: 1;
			grid-row: 2;
			font-size: 13px;
		}
		.expand-icon {
			grid-column: 2;
			grid-row: 1 / 3;
		}
		.job-description {
			font-size: 15px;
		}
	}
	@media (max-width: 370px) {
		.personal-stats {
			gap: 20px;
		}
		.personal-stats div + div {
			padding-left: 20px;
		}
		.personal-stats strong {
			font-size: 29px;
		}
	}
</style>
