<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { profile, projects } from '$lib/data/portfolio';
	import ProjectPreview from '$lib/components/visuals/ProjectPreview.svelte';
	let filter = $state('All work');
	const filters = ['All work', 'Web', 'Mobile'];
	const filtered = $derived(
		projects.filter(
			(project) =>
				filter === 'All work' ||
				(filter === 'Mobile' ? project.kind === 'attendance' : project.kind !== 'attendance')
		)
	);
</script>

<section id="work" class="work-section page-shell" aria-labelledby="work-heading">
	<div class="work-heading-row">
		<h2 id="work-heading" class="section-heading">Built with purpose.</h2>
		<p>A few things I’ve brought to life.<br />Each one a different challenge. The same care.</p>
	</div>
	<div class="work-toolbar">
		<div class="work-filters" role="group" aria-label="Filter projects">
			{#each filters as item (item)}<button
					type="button"
					class={['filter', filter === item && 'selected liquid-glass-strong']}
					aria-pressed={filter === item}
					onclick={() => (filter = item)}
					>{item}{#if item === 'All work'}<span>03</span>{/if}</button
				>{/each}
		</div>
		<span class="work-count" aria-live="polite"
			>{String(filtered.length).padStart(2, '0')} SELECTED PROJECTS</span
		>
	</div>
	<div class="project-grid">
		{#each filtered as project, index (project.id)}
			<article class:wide={project.kind === 'attendance' && filter === 'All work'}>
				<a
					class="project-visual-link"
					href={project.href}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label={'Explore ' + project.title + ' (opens in new tab)'}
					><ProjectPreview kind={project.kind} /><span class="project-open liquid-glass-strong"
						><ArrowUpRight size={18} /></span
					></a
				>
				<div class="project-info">
					<div>
						<span class="project-category eyebrow">{project.eyebrow}</span>
						<h3>
							<a href={project.href} target="_blank" rel="external noopener noreferrer"
								>{project.title}<ArrowUpRight size={21} strokeWidth={1.2} /></a
							>
						</h3>
						<p>{project.description}</p>
						<div class="tags">
							{#each project.tags as tag (tag)}<span>{tag}</span>{/each}
						</div>
					</div>
					<span class="project-number">/ 0{index + 1}</span>
				</div>
			</article>
		{/each}
	</div>
	<div class="work-bottom">
		<a class="text-link" href={profile.github} target="_blank" rel="external noopener noreferrer"
			>More on GitHub<ArrowUpRight size={16} /></a
		>
	</div>
</section>

<style>
	.work-section {
		padding-block: 116px 95px;
	}
	.work-heading-row {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin-top: 22px;
		gap: 28px;
	}
	.work-heading-row p {
		font-size: 14px;
		line-height: 1.7;
		color: #8f8f89;
		font-weight: 300;
		padding-bottom: 5px;
	}
	.work-toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 44px;
		margin-bottom: 26px;
	}
	.work-filters {
		display: flex;
		align-items: center;
		gap: 5px;
	}
	.filter {
		border: 0;
		padding: 10px 17px;
		color: #808079;
		border-radius: 30px;
		font-size: 11px;
		display: flex;
		align-items: center;
		gap: 10px;
		min-height: 40px;
	}
	.filter.selected {
		color: #e2e2dc;
	}
	.filter:hover {
		color: white;
	}
	.filter span {
		font-size: 8px;
		color: #a8a8a0;
	}
	.work-count {
		font-size: 8px;
		letter-spacing: 0.14em;
		color: #6a6a64;
	}
	.project-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 45px 25px;
	}
	article {
		min-width: 0;
	}
	.wide {
		grid-column: 1/-1;
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		align-items: center;
		gap: 58px;
		padding-top: 7px;
	}
	.project-visual-link {
		position: relative;
		display: block;
		transition: transform 0.35s;
	}
	.project-visual-link:hover {
		transform: translateY(-4px);
	}
	.project-open {
		position: absolute;
		top: 17px;
		right: 17px;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background-color: #2c2c2c50;
		color: #ddd;
		opacity: 0;
		transform: translate(-3px, 3px);
		transition:
			opacity 0.25s,
			transform 0.25s;
	}
	.project-visual-link:hover .project-open,
	.project-visual-link:focus-visible .project-open {
		opacity: 1;
		transform: none;
	}
	.project-info {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 25px 1px 0;
		gap: 20px;
	}
	.project-category {
		font-size: 8px;
		color: #81817a;
		letter-spacing: 0.11em;
	}
	h3 {
		font-size: 36px;
		letter-spacing: -0.03em;
		margin-top: 9px;
	}
	h3 a {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	h3 a :global(svg) {
		color: #7b7b74;
	}
	h3 a:hover :global(svg) {
		color: white;
	}
	.project-info p {
		color: #8d8d86;
		font-size: 13px;
		line-height: 1.65;
		font-weight: 300;
		max-width: 420px;
		margin-top: 10px;
	}
	.project-number {
		font-size: 9px;
		color: #595951;
		margin-top: 3px;
		white-space: nowrap;
	}
	.tags {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		margin-top: 18px;
	}
	.tags span {
		border: 1px solid #ffffff13;
		border-radius: 30px;
		padding: 5px 10px;
		font-size: 8px;
		color: #91918a;
	}
	.wide .project-info {
		padding: 0;
	}
	.wide h3 {
		font-size: 44px;
	}
	.wide .project-info p {
		max-width: 325px;
	}
	.wide .project-number {
		display: none;
	}
	.work-bottom {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-top: 42px;
		margin-top: 52px;
		border-top: 1px solid #ffffff12;
	}
	.work-bottom .text-link {
		font-size: 12px;
	}
	@media (max-width: 900px) {
		.work-section {
			padding-top: 90px;
		}
		.wide {
			grid-template-columns: 1.15fr 1fr;
			gap: 28px;
		}
		.work-heading-row p {
			font-size: 12px;
		}
	}
	@media (max-width: 700px) {
		.work-section {
			padding-block: 75px;
		}
		.work-heading-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}
		.work-toolbar {
			margin-top: 30px;
		}
		.work-count {
			font-size: 6px;
		}
		.filter {
			font-size: 10px;
			padding: 9px 13px;
		}
		.project-grid {
			grid-template-columns: 1fr;
			gap: 38px;
		}
		.wide {
			display: block;
		}
		.wide .project-info {
			padding-top: 24px;
		}
		.wide h3 {
			font-size: 36px;
		}
		.project-info p {
			font-size: 13px;
		}
		.work-bottom {
			margin-top: 35px;
			padding-top: 28px;
		}
		.work-bottom .text-link {
			font-size: 11px;
		}
	}
</style>
