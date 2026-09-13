import * as THREE from 'three';

export interface GrainFieldScene {
	setPaused: (paused: boolean) => void;
	destroy: () => void;
}

interface GrainFieldOptions {
	onReady: (ready: boolean) => void;
	onPlaybackChange: (playing: boolean) => void;
}

/** Soft analog color-field: drifting Gaussian blooms rendered as a single GPU surface. */
export function createGrainFieldScene(
	container: HTMLElement,
	{ onReady, onPlaybackChange }: GrainFieldOptions
): GrainFieldScene {
	const renderer = new THREE.WebGLRenderer({
		alpha: false,
		antialias: false,
		powerPreference: 'low-power'
	});
	renderer.setClearColor(0xdceaf4, 1);
	renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
	renderer.toneMapping = THREE.NoToneMapping;
	renderer.domElement.setAttribute('aria-hidden', 'true');
	renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;';
	container.appendChild(renderer.domElement);

	const scene = new THREE.Scene();
	const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	const geometry = new THREE.PlaneGeometry(2, 2);
	const pointer = new THREE.Vector2();
	const uniforms = {
		uTime: { value: 8.4 },
		uResolution: { value: new THREE.Vector2(1, 1) },
		uPointer: { value: new THREE.Vector2() },
		uGrain: { value: 1 }
	};
	const material = new THREE.ShaderMaterial({
		dithering: true,
		toneMapped: false,
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
			uniform vec2 uPointer;
			uniform float uGrain;

			float hash(vec2 p) {
				vec3 p3 = fract(vec3(p.xyx) * 0.1031);
				p3 += dot(p3, p3.yzx + 33.33);
				return fract((p3.x + p3.y) * p3.z);
			}

			float noise(vec2 p) {
				vec2 i = floor(p);
				vec2 f = fract(p);
				f = f * f * (3.0 - 2.0 * f);
				float a = hash(i);
				float b = hash(i + vec2(1.0, 0.0));
				float c = hash(i + vec2(0.0, 1.0));
				float d = hash(i + vec2(1.0, 1.0));
				return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
			}

			float fbm(vec2 p) {
				float value = 0.0;
				float amplitude = 0.5;
				for (int i = 0; i < 4; i++) {
					value += amplitude * noise(p);
					p = p * 2.07 + vec2(1.7, 9.2);
					amplitude *= 0.5;
				}
				return value;
			}

			vec2 rotate(vec2 p, float angle) {
				float s = sin(angle);
				float c = cos(angle);
				return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
			}

			float blob(vec2 uv, vec2 center, vec2 radius, float angle, float warp, float seed) {
				vec2 p = uv - center;
				p = rotate(p, angle);
				p += (vec2(
					fbm(uv * 1.8 + seed + uTime * 0.04),
					fbm(uv * 1.8 + seed + 5.1 - uTime * 0.03)
				) - 0.5) * warp;
				p /= radius;
				float r2 = dot(p, p);
				return mix(exp(-r2 * 0.28), exp(-r2), 0.55);
			}

			void main() {
				vec2 uv = gl_FragCoord.xy / uResolution;
				float aspect = uResolution.x / max(uResolution.y, 1.0);
				vec2 p = vec2((uv.x - 0.5) * min(aspect, 1.85), uv.y - 0.5);
				p -= uPointer * vec2(0.04, 0.028);

				float t = uTime;
				vec2 darkCenter = vec2(0.52, 0.16) + vec2(sin(t * 0.15) * 0.07, cos(t * 0.12) * 0.05);
				vec2 leftCenter = vec2(-0.42, -0.34) + vec2(cos(t * 0.1) * 0.05, sin(t * 0.14) * 0.06);
				vec2 warmCenter = vec2(-0.08, 0.04) + vec2(sin(t * 0.08 + 1.2) * 0.045, cos(t * 0.11) * 0.03);
				vec2 washCenter = vec2(-0.34, 0.26) + vec2(cos(t * 0.07) * 0.04, sin(t * 0.09) * 0.03);

				float dark = blob(p, darkCenter, vec2(0.62, 0.28), -0.7 + sin(t * 0.07) * 0.1, 0.14, 1.3);
				float left = blob(p, leftCenter, vec2(0.4, 0.48), 0.22 + cos(t * 0.06) * 0.08, 0.13, 4.8);
				float warm = blob(p, warmCenter, vec2(0.34, 0.3), 0.35, 0.1, 7.1);
				float wash = blob(p, washCenter, vec2(0.55, 0.42), 0.12, 0.16, 2.6);

				vec3 paper = vec3(0.86, 0.91, 0.955);
				vec3 mist = vec3(0.7, 0.84, 0.94);
				vec3 deep = vec3(0.28, 0.52, 0.84);
				vec3 mid = vec3(0.55, 0.74, 0.91);
				vec3 cream = vec3(0.93, 0.88, 0.76);

				vec3 color = mix(paper, mist, 0.28 + 0.35 * wash);
				color = mix(color, mid, clamp(left * 0.7, 0.0, 1.0));
				color = mix(color, deep, clamp(dark * 0.88, 0.0, 1.0));
				color = mix(color, cream, clamp(warm * 0.42, 0.0, 1.0));

				vec2 grainUv = gl_FragCoord.xy * 0.72;
				float fiber = (noise(uv * vec2(18.0, 110.0)) - 0.5) * 0.03;
				float speck = (hash(floor(grainUv) + floor(t * 12.0)) - 0.5);
				vec3 chroma = vec3(
					hash(grainUv + vec2(t * 19.0, 2.1)),
					hash(grainUv + vec2(4.7, t * 15.0)),
					hash(grainUv + 29.3 + t * 11.0)
				) - 0.5;
				color += fiber + (speck * 0.085 + chroma * 0.045) * uGrain;

				gl_FragColor = vec4(color, 1.0);
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
		const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.1) : 0;
		lastTime = now;
		uniforms.uTime.value += delta;
		uniforms.uPointer.value.lerp(pointer, 1 - Math.exp(-delta * 2.4));
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
		const pixelRatio = Math.min(window.devicePixelRatio, width < 480 ? 1.15 : 1.5);
		renderer.setPixelRatio(pixelRatio);
		renderer.setSize(width, height, false);
		uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
		uniforms.uGrain.value = width < 700 ? 0.82 : 1;
		draw();
	};
	const host = container.closest('section') ?? container;
	const handlePointer = (event: PointerEvent) => {
		if (!canAnimate() || event.pointerType === 'touch') return;
		const bounds = container.getBoundingClientRect();
		pointer.set(
			((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
			-((event.clientY - bounds.top) / bounds.height - 0.5) * 2
		);
	};
	const resetPointer = () => pointer.set(0, 0);
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
	host.addEventListener('pointermove', handlePointer, { passive: true });
	host.addEventListener('pointerleave', resetPointer);
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
			host.removeEventListener('pointermove', handlePointer);
			host.removeEventListener('pointerleave', resetPointer);
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
