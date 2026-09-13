import * as THREE from 'three';

export interface DotWaveScene {
	setPaused: (paused: boolean) => void;
	destroy: () => void;
}

interface DotWaveOptions {
	onReady: (ready: boolean) => void;
	onPlaybackChange: (playing: boolean) => void;
}

/** A single GPU surface draws the entire illuminated grid without individual dot meshes. */
export function createDotWaveScene(
	container: HTMLElement,
	{ onReady, onPlaybackChange }: DotWaveOptions
): DotWaveScene {
	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: false,
		powerPreference: 'low-power'
	});
	renderer.setClearColor(0x000000, 0);
	renderer.domElement.setAttribute('aria-hidden', 'true');
	renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;';
	container.appendChild(renderer.domElement);

	const scene = new THREE.Scene();
	const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	const geometry = new THREE.PlaneGeometry(2, 2);
	const uniforms = {
		uTime: { value: 0 },
		uResolution: { value: new THREE.Vector2(1, 1) },
		uPixelRatio: { value: 1 },
		uSpacing: { value: 6 }
	};
	const material = new THREE.ShaderMaterial({
		transparent: true,
		depthTest: false,
		depthWrite: false,
		uniforms,
		vertexShader: `
			void main() {
				gl_Position = vec4(position.xy, 0.0, 1.0);
			}
		`,
		fragmentShader: `
			uniform float uTime;
			uniform vec2 uResolution;
			uniform float uPixelRatio;
			uniform float uSpacing;

			void main() {
				vec2 pixel = gl_FragCoord.xy / uPixelRatio;
				vec2 cell = floor(pixel / uSpacing) + 0.5;
				vec2 p = (cell * uSpacing - uResolution * 0.5) / min(uResolution.x, uResolution.y);
				float t = uTime * 0.22;

				// Warped diagonal ribbons move through a fixed, evenly spaced pixel lattice.
				float bend = sin(p.y * 3.4 + t * 0.7) * 0.9;
				float phase = p.x * 6.2 + p.y * 3.1 + bend + sin(p.x * 2.7 - t * 0.5) * 0.7 - t;
				float ribbon = pow(0.5 + 0.5 * sin(phase), 7.0);
				float blueEdge = pow(0.5 + 0.5 * sin(phase + 0.75), 11.0);
				float shimmer = 0.86 + 0.14 * sin(p.y * 5.0 - p.x * 2.0 + t);
				float light = clamp(ribbon * shimmer + blueEdge * 0.28, 0.0, 1.0);

				vec2 local = abs(fract(pixel / uSpacing) - 0.5);
				float edge = max(local.x, local.y);
				float size = mix(0.10, 0.36, sqrt(light));
				float aa = 0.65 / (uSpacing * uPixelRatio);
				float dot = 1.0 - smoothstep(size - aa, size + aa, edge);
				vec3 color = mix(vec3(0.22, 0.55, 0.73), vec3(1.0, 0.97, 0.92), smoothstep(0.15, 0.8, ribbon));
				gl_FragColor = vec4(color, dot * light);
			}
		`
	});
	scene.add(new THREE.Mesh(geometry, material));

	const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
	let paused = false;
	let explicitMotion = false;
	let inView = false;
	let destroyed = false;
	let contextLost = false;
	let frame = 0;
	let lastTime = 0;
	let lastDraw = 0;

	const draw = () => {
		if (!destroyed && !contextLost) renderer.render(scene, camera);
	};
	const canAnimate = () =>
		!destroyed &&
		!contextLost &&
		!paused &&
		inView &&
		!document.hidden &&
		(!motionPreference.matches || explicitMotion);
	const animate = (now: number) => {
		frame = 0;
		if (!canAnimate()) return;
		if (lastTime) uniforms.uTime.value += Math.min((now - lastTime) / 1000, 0.1);
		lastTime = now;
		if (now - lastDraw >= 1000 / 30) {
			draw();
			lastDraw = now;
		}
		frame = requestAnimationFrame(animate);
	};
	const syncPlayback = () => {
		cancelAnimationFrame(frame);
		frame = 0;
		lastTime = 0;
		const playing = canAnimate();
		onPlaybackChange(playing);
		if (playing) frame = requestAnimationFrame(animate);
	};
	const resize = () => {
		if (destroyed) return;
		const { width, height } = container.getBoundingClientRect();
		if (!width || !height) return;
		const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
		renderer.setPixelRatio(pixelRatio);
		renderer.setSize(width, height, false);
		uniforms.uResolution.value.set(width, height);
		uniforms.uPixelRatio.value = pixelRatio;
		uniforms.uSpacing.value = width < 700 ? 5 : 6;
		draw();
	};
	const handlePreference = () => {
		explicitMotion = false;
		syncPlayback();
	};
	const handleContextLost = (event: Event) => {
		event.preventDefault();
		contextLost = true;
		onReady(false);
		syncPlayback();
	};
	const handleContextRestored = () => {
		contextLost = false;
		resize();
		onReady(true);
		syncPlayback();
	};
	const resizeObserver = new ResizeObserver(resize);
	const intersectionObserver = new IntersectionObserver(([entry]) => {
		inView = entry.isIntersecting;
		syncPlayback();
	});
	resizeObserver.observe(container);
	intersectionObserver.observe(container);
	document.addEventListener('visibilitychange', syncPlayback);
	motionPreference.addEventListener('change', handlePreference);
	renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
	renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);
	resize();
	onReady(true);

	return {
		setPaused(value) {
			paused = value;
			if (!value) explicitMotion = true;
			syncPlayback();
		},
		destroy() {
			destroyed = true;
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			document.removeEventListener('visibilitychange', syncPlayback);
			motionPreference.removeEventListener('change', handlePreference);
			renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
			renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
			geometry.dispose();
			material.dispose();
			scene.clear();
			renderer.dispose();
			renderer.forceContextLoss();
			renderer.domElement.remove();
		}
	};
}
