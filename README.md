# Razz — Portfolio

A responsive portfolio for Ernesto Razo Jr, built with SvelteKit 5, TypeScript, Tailwind CSS 4, Three.js, and HLS.js. Uses Instrument Serif and Barlow, a shared liquid-glass visual system, and a purple glass video hero.

## Run locally

```sh
bun install
bun run dev
```

```sh
bun run check  # TypeScript and Svelte diagnostics
bun run lint   # Prettier and ESLint
bun run build  # Production build
bun run preview
```

## Structure

- `src/routes/+page.svelte` composes the landing page and its metadata.
- `src/routes/layout.css` contains the Tailwind 4 font theme, base styles, glass treatment, and shared layout primitives.
- `src/lib/components/ui/Button.svelte` provides glass, solid, and quiet button/link variants.
- `src/lib/components/layout/Navbar.svelte` contains responsive navigation and section tracking.
- `src/lib/components/sections/` contains the hero, project filters, about/experience, expertise, and CTA/footer.
- `src/lib/components/visuals/` contains the purple HLS background, animated dot-grid background, reusable glass sculpture, and illustrative project previews.
- `src/lib/three/createDotWaveScene.ts` renders the About section's flowing white and blue dot pattern with a single Three.js shader surface. It loads near the viewport, caps pixel density and frame rate, and pauses offscreen or in hidden tabs. Its Svelte wrapper includes a static fallback and playback control.
- `src/lib/three/createDiscRingScene.ts` renders the CTA's slowly rotating ring of beveled mirror discs with a procedural reflection environment. Its companion `DiscRingBackground.svelte` supplies purple lighting, readable overlays, a CSS fallback, and a playback control.
- `src/lib/three/createGlassScene.ts` contains the reusable glass sculpture renderer, including motion, observers, and resource disposal.
- `src/lib/attachments/hlsVideo.ts` lazily initializes the supplied Mux stream in the hero, prefers HLS.js where supported, falls back to native HLS, and releases resources on unmount.
- `src/lib/data/portfolio.ts` is the single place to edit profile, experience, projects, skills, and contact links. Source URLs are documented in the file.

## Content and interactions

The public GitHub data and existing portfolio supply the biography, experience, projects, and contact details. Project preview artwork is an original interface illustration, not a screenshot or measured project result. External project links lead to the actual apps or their distribution pages.

Contact buttons open the visitor's email application. The CTA's Email Me button prepares an email about a potential app project. This site has no form backend, accounts, payments, or analytics.

The site loads Google Fonts, the Mux video stream, and the portrait from `razz-dev.com`. Static visual fallbacks preserve the layout if the portrait, video, or WebGL is unavailable. The hero video, About animation, and CTA animation include playback controls and respect reduced-motion preferences.

## Hosting

The existing SvelteKit `adapter-auto` is retained. Select the deployment adapter for your chosen hosting platform before publishing. No deployment has been configured or performed.
# razzdev-portfolio
