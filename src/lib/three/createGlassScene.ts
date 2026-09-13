import * as THREE from 'three';

export interface GlassScene {
	setPaused: (paused: boolean) => void;
	destroy: () => void;
}

interface GlassSceneOptions {
	paused?: boolean;
	onReady?: () => void;
	onError?: () => void;
}

/** A small, self-contained scene. Loaded only when its Svelte attachment mounts. */
export function createGlassScene(
	container: HTMLElement,
	{ paused = false, onReady, onError }: GlassSceneOptions = {}
): GlassScene {
	const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setClearColor(0x000000, 0);
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 0.95;
	renderer.domElement.setAttribute('aria-hidden', 'true');
	renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;';
	container.appendChild(renderer.domElement);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 30);
	camera.position.set(0, 0, 6.8);

	// An entirely procedural studio: its softboxes become the luminous reflections.
	const studio = new THREE.Scene();
	const studioGeometry = new THREE.SphereGeometry(10, 24, 16);
	const studioMaterial = new THREE.MeshBasicMaterial({
		color: new THREE.Color(0.003, 0.003, 0.003),
		side: THREE.BackSide
	});
	studio.add(new THREE.Mesh(studioGeometry, studioMaterial));
	const panelGeometry = new THREE.PlaneGeometry(1, 1);
	const panelMaterials: THREE.MeshBasicMaterial[] = [];
	const addSoftbox = (
		position: [number, number, number],
		size: [number, number],
		intensity: number
	) => {
		const material = new THREE.MeshBasicMaterial({
			color: new THREE.Color(intensity, intensity, intensity),
			side: THREE.DoubleSide
		});
		panelMaterials.push(material);
		const panel = new THREE.Mesh(panelGeometry, material);
		panel.position.set(...position);
		panel.scale.set(size[0], size[1], 1);
		panel.lookAt(0, 0, 0);
		studio.add(panel);
	};
	addSoftbox([-4, 2, 3], [0.8, 7], 6);
	addSoftbox([4, 0, 1], [0.4, 6], 4);
	addSoftbox([0, 5, -1], [5, 0.7], 5);
	addSoftbox([1, -3, 3], [3, 0.3], 2);
	addSoftbox([-1, 0, -5], [0.8, 5], 3);
	const environmentGenerator = new THREE.PMREMGenerator(renderer);
	const environment = environmentGenerator.fromScene(studio, 0.035, 0.1, 30);
	scene.environment = environment.texture;
	environmentGenerator.dispose();
	studioGeometry.dispose();
	studioMaterial.dispose();
	panelGeometry.dispose();
	panelMaterials.forEach((material) => material.dispose());
	studio.clear();

	const geometry = new THREE.TorusKnotGeometry(1.13, 0.36, 220, 36, 2, 3);
	const material = new THREE.MeshPhysicalMaterial({
		color: 0xcbd0d3,
		metalness: 0.12,
		roughness: 0.065,
		transmission: 0.92,
		thickness: 1.6,
		ior: 1.65,
		clearcoat: 1,
		clearcoatRoughness: 0.06,
		envMapIntensity: 1.1,
		attenuationColor: new THREE.Color(0xb7bdc2),
		attenuationDistance: 2.5
	});
	const sculpture = new THREE.Mesh(geometry, material);
	sculpture.scale.set(1, 1.08, 1);
	sculpture.rotation.set(0.22, -0.58, -0.32);
	scene.add(sculpture);

	const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
	let reducedMotion = motionPreference.matches;
	let isPaused = paused;
	let isVisible = true;
	let destroyed = false;
	let contextLost = false;
	let animationFrame = 0;
	let previousTime = 0;
	let elapsed = 0;
	const pointer = new THREE.Vector2();
	const smoothedPointer = new THREE.Vector2();

	const draw = () => {
		if (destroyed || contextLost) return;
		renderer.render(scene, camera);
	};
	const canAnimate = () =>
		!destroyed && !contextLost && !isPaused && !reducedMotion && isVisible && !document.hidden;

	const animate = (time: number) => {
		animationFrame = 0;
		if (!canAnimate()) return;
		const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
		previousTime = time;
		elapsed += delta;
		smoothedPointer.lerp(pointer, 1 - Math.exp(-delta * 3));
		sculpture.rotation.x = 0.22 + Math.sin(elapsed * 0.21) * 0.14 + smoothedPointer.y * 0.12;
		sculpture.rotation.y = -0.58 + Math.sin(elapsed * 0.17) * 0.28 + smoothedPointer.x * 0.19;
		sculpture.rotation.z = -0.32 + Math.sin(elapsed * 0.13) * 0.07;
		sculpture.position.y = Math.sin(elapsed * 0.6) * 0.075;
		draw();
		animationFrame = requestAnimationFrame(animate);
	};
	const syncAnimation = () => {
		if (animationFrame) cancelAnimationFrame(animationFrame);
		animationFrame = 0;
		previousTime = 0;
		if (canAnimate()) animationFrame = requestAnimationFrame(animate);
	};
	const resize = () => {
		const { width, height } = container.getBoundingClientRect();
		if (!width || !height || destroyed) return;
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 480 ? 1.25 : 1.5));
		renderer.setSize(width, height, false);
		camera.aspect = width / height;
		camera.position.z = camera.aspect < 0.9 ? 9 : 8;
		camera.updateProjectionMatrix();
		draw();
	};
	const handlePointer = (event: PointerEvent) => {
		if (!canAnimate() || event.pointerType === 'touch') return;
		const bounds = container.getBoundingClientRect();
		pointer.set(
			((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
			((event.clientY - bounds.top) / bounds.height - 0.5) * 2
		);
	};
	const resetPointer = () => pointer.set(0, 0);
	const handleMotionPreference = (event: MediaQueryListEvent) => {
		reducedMotion = event.matches;
		syncAnimation();
	};
	const handleContextLost = (event: Event) => {
		event.preventDefault();
		contextLost = true;
		syncAnimation();
		onError?.();
	};
	const handleContextRestored = () => {
		contextLost = false;
		draw();
		onReady?.();
		syncAnimation();
	};
	const resizeObserver = new ResizeObserver(resize);
	resizeObserver.observe(container);
	const intersectionObserver = new IntersectionObserver(
		([entry]) => {
			isVisible = entry.isIntersecting;
			syncAnimation();
		},
		{ threshold: 0.05 }
	);
	intersectionObserver.observe(container);
	container.addEventListener('pointermove', handlePointer, { passive: true });
	container.addEventListener('pointerleave', resetPointer);
	document.addEventListener('visibilitychange', syncAnimation);
	motionPreference.addEventListener('change', handleMotionPreference);
	renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
	renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);
	resize();
	onReady?.();
	syncAnimation();

	return {
		setPaused(value) {
			isPaused = value;
			syncAnimation();
		},
		destroy() {
			if (destroyed) return;
			destroyed = true;
			if (animationFrame) cancelAnimationFrame(animationFrame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			container.removeEventListener('pointermove', handlePointer);
			container.removeEventListener('pointerleave', resetPointer);
			document.removeEventListener('visibilitychange', syncAnimation);
			motionPreference.removeEventListener('change', handleMotionPreference);
			renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
			renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
			geometry.dispose();
			material.dispose();
			scene.environment = null;
			environment.dispose();
			scene.clear();
			renderer.dispose();
			renderer.forceContextLoss();
			renderer.domElement.remove();
		}
	};
}
