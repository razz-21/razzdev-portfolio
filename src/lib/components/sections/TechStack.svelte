<script lang="ts">
	import { reveal } from '$lib/attachments/reveal';
	// Imported per icon rather than from the package root, which barrels in every Simple Icon.
	import SiAndroid from '@icons-pack/svelte-simple-icons/icons/SiAndroid';
	import SiAngular from '@icons-pack/svelte-simple-icons/icons/SiAngular';
	import SiBootstrap from '@icons-pack/svelte-simple-icons/icons/SiBootstrap';
	import SiCss from '@icons-pack/svelte-simple-icons/icons/SiCss';
	import SiCypress from '@icons-pack/svelte-simple-icons/icons/SiCypress';
	import SiGithub from '@icons-pack/svelte-simple-icons/icons/SiGithub';
	import SiHono from '@icons-pack/svelte-simple-icons/icons/SiHono';
	import SiHtml5 from '@icons-pack/svelte-simple-icons/icons/SiHtml5';
	import SiJavascript from '@icons-pack/svelte-simple-icons/icons/SiJavascript';
	import SiKotlin from '@icons-pack/svelte-simple-icons/icons/SiKotlin';
	import SiMongodb from '@icons-pack/svelte-simple-icons/icons/SiMongodb';
	import SiMui from '@icons-pack/svelte-simple-icons/icons/SiMui';
	import SiNodedotjs from '@icons-pack/svelte-simple-icons/icons/SiNodedotjs';
	import SiNuxt from '@icons-pack/svelte-simple-icons/icons/SiNuxt';
	import SiSass from '@icons-pack/svelte-simple-icons/icons/SiSass';
	import SiSvelte from '@icons-pack/svelte-simple-icons/icons/SiSvelte';
	import SiTailwindcss from '@icons-pack/svelte-simple-icons/icons/SiTailwindcss';
	import SiTypescript from '@icons-pack/svelte-simple-icons/icons/SiTypescript';
	import SiVuedotjs from '@icons-pack/svelte-simple-icons/icons/SiVuedotjs';

	// angle/radius place each mark on a gently jittered ellipse around the heading,
	// so the centre of the stage always stays clear of logos.
	const tools = [
		{ name: 'HTML5', icon: SiHtml5, color: '#E34F26', angle: -90, radius: 0.94, size: 56 },
		{ name: 'Sass', icon: SiSass, color: '#CC6699', angle: -71, radius: 1, size: 44 },
		{ name: 'CSS', icon: SiCss, color: '#663399', angle: -52, radius: 0.9, size: 48 },
		{ name: 'JavaScript', icon: SiJavascript, color: '#D9B800', angle: -34, radius: 1, size: 52 },
		{
			name: 'TypeScript',
			icon: SiTypescript,
			color: '#3178C6',
			angle: -14,
			radius: 0.92,
			size: 58
		},
		{ name: 'Svelte', icon: SiSvelte, color: '#FF3E00', angle: 6, radius: 1, size: 60 },
		{ name: 'Angular', icon: SiAngular, color: '#1A1A1F', angle: 26, radius: 0.9, size: 54 },
		{ name: 'Vue.js', icon: SiVuedotjs, color: '#35A87A', angle: 45, radius: 1, size: 50 },
		{ name: 'Nuxt', icon: SiNuxt, color: '#00A862', angle: 64, radius: 0.9, size: 44 },
		{ name: 'Tailwind CSS', icon: SiTailwindcss, color: '#0B93AB', angle: 84, radius: 1, size: 58 },
		{ name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3', angle: 103, radius: 0.9, size: 48 },
		{ name: 'Material UI', icon: SiMui, color: '#007FFF', angle: 122, radius: 1, size: 44 },
		{ name: 'Node.js', icon: SiNodedotjs, color: '#4C8B3D', angle: 142, radius: 0.9, size: 52 },
		{ name: 'Hono', icon: SiHono, color: '#E36002', angle: 161, radius: 1, size: 44 },
		{ name: 'MongoDB', icon: SiMongodb, color: '#38853A', angle: 180, radius: 0.92, size: 54 },
		{ name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', angle: 199, radius: 1, size: 48 },
		{ name: 'Android', icon: SiAndroid, color: '#2E8B47', angle: 219, radius: 0.9, size: 50 },
		{ name: 'Cypress', icon: SiCypress, color: '#3F9E7A', angle: 240, radius: 1, size: 42 },
		{ name: 'GitHub', icon: SiGithub, color: '#181717', angle: 262, radius: 0.92, size: 48 }
	].map((tool, index) => ({
		...tool,
		x: 50 + Math.cos((tool.angle * Math.PI) / 180) * 43 * tool.radius,
		y: 50 + Math.sin((tool.angle * Math.PI) / 180) * 44 * tool.radius,
		delay: (index % 7) * 0.55,
		duration: 5.5 + (index % 5) * 0.7
	}));
</script>

<section id="tools" class="tools-section" aria-labelledby="tools-heading">
	<div class="page-shell tools-stage">
		<span class="tools-orbit" aria-hidden="true"></span>
		<div class="tools-intro">
			<p class="eyebrow tools-eyebrow" {@attach reveal({ distance: 16 })}>
				<span aria-hidden="true">[</span> Technologies &amp; tools <span aria-hidden="true">]</span>
			</p>
			<h2 id="tools-heading" class="section-heading" {@attach reveal({ delay: 80 })}>
				The tools behind.<br /><span>The thoughtful work.</span>
			</h2>
			<p class="tools-note" {@attach reveal({ delay: 160 })}>
				Not everything I have ever touched. Just the ones I keep coming back to.
			</p>
		</div>
		<ul class="tools-field">
			{#each tools as tool, index (tool.name)}
				<li
					class="tool"
					{@attach reveal({ delay: (index % 5) * 65, distance: 16, scale: 0.85 })}
					style:--brand={tool.color}
					style:--x="{tool.x}%"
					style:--y="{tool.y}%"
					style:--delay="{tool.delay}s"
					style:--duration="{tool.duration}s"
				>
					<span class="tool-mark">
						<tool.icon size={tool.size} title={tool.name} aria-hidden="true" />
					</span>
					<span class="tool-name">{tool.name}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.tools-section {
		position: relative;
		padding: 110px 0 120px;
		background: linear-gradient(180deg, #f4f3f0, #eceae5);
		color: #19171f;
		color-scheme: light;
		overflow: clip;
	}
	.tools-stage {
		position: relative;
		min-height: clamp(620px, 54vw, 780px);
		display: grid;
		place-items: center;
	}
	.tools-orbit {
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		width: 82%;
		height: 84%;
		border: 1px solid #2720310f;
		border-radius: 50%;
	}
	.tools-intro {
		position: relative;
		z-index: 1;
		max-width: 460px;
		text-align: center;
	}
	.tools-eyebrow {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		color: #6d6678;
		margin: 0 0 20px;
	}
	.tools-eyebrow span {
		color: #b0653a;
		font-size: 15px;
	}
	.tools-intro h2 {
		margin: 0;
		font-size: clamp(40px, 4.6vw, 64px);
		line-height: 1.05;
		color: #19171f;
	}
	.tools-intro h2 span {
		color: #716b7b;
	}
	.tools-note {
		margin: 22px auto 0;
		max-width: 340px;
		color: #615d68;
		font-size: 14px;
		line-height: 1.8;
		font-weight: 400;
	}
	.tools-field {
		position: absolute;
		inset: 0;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.tool {
		position: absolute;
		left: var(--x);
		top: var(--y);
		translate: -50% -50%;
		display: grid;
		justify-items: center;
	}
	.tool-mark {
		display: grid;
		place-items: center;
		color: var(--brand);
		opacity: 0.9;
		animation: tool-drift var(--duration) ease-in-out var(--delay) infinite alternate;
		transition:
			opacity 0.3s,
			scale 0.3s;
	}
	.tool-name {
		position: absolute;
		top: calc(100% + 9px);
		white-space: nowrap;
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #615d68;
		opacity: 0;
		transition: opacity 0.3s;
	}
	.tool:hover .tool-mark {
		opacity: 1;
		scale: 1.12;
	}
	.tool:hover .tool-name {
		opacity: 1;
	}
	@keyframes tool-drift {
		to {
			translate: 0 -13px;
		}
	}
	@media (max-width: 1150px) {
		.tools-section {
			padding: 90px 0 100px;
		}
		.tools-stage {
			min-height: 0;
			display: block;
			text-align: center;
		}
		.tools-orbit {
			display: none;
		}
		.tools-intro {
			max-width: 100%;
			margin-bottom: 56px;
		}
		.tools-field {
			position: static;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 36px 44px;
		}
		.tool {
			position: static;
			translate: none;
		}
		.tool-mark :global(svg) {
			width: 42px;
			height: 42px;
		}
		.tool-name {
			position: static;
			opacity: 1;
			margin-top: 12px;
		}
		.tool-mark {
			animation: none;
		}
	}
	@media (max-width: 700px) {
		.tools-section {
			padding: 70px 0 80px;
		}
		.tools-intro {
			margin-bottom: 40px;
		}
		.tools-intro h2 {
			font-size: clamp(38px, 8.6vw, 52px);
		}
		.tools-field {
			gap: 30px 26px;
		}
		.tool {
			flex-basis: calc(33.333% - 18px);
		}
		.tool-mark :global(svg) {
			width: 36px;
			height: 36px;
		}
		.tool-name {
			font-size: 9px;
		}
	}
</style>
