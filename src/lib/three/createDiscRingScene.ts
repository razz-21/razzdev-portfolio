import * as THREE from 'three';

export interface DiscRingScene {
	setPaused: (paused: boolean) => void;
	destroy: () => void;
}

interface DiscRingOptions {
	onReady: (ready: boolean) => void;
	onPlaybackChange: (playing: boolean) => void;
}

/** Beveled mirror discs orbit in a procedural pink-and-blue reflection studio. */
export function createDiscRingScene(
	container: HTMLElement,
	{ onReady, onPlaybackChange }: DiscRingOptions
): DiscRingScene {
	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
		powerPreference: 'low-power'
	});
	renderer.setClearColor(0x000000, 0);
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.1;
	renderer.domElement.setAttribute('aria-hidden', 'true');
	renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;';
	container.appendChild(renderer.domElement);

	const scene = new THREE.Scene();
	const camera = new THREE.OrthographicCamera(-6, 6, 4.25, -4.25, 0.1, 30);
	camera.position.set(0, 0, 12);

	// Broad colored softboxes produce reflections without remote environment textures.
	const studio = new THREE.Scene();
	studio.background = new THREE.Color(0x120719);
	const panelGeometry = new THREE.PlaneGeometry(1, 1);
	const panelMaterials: THREE.MeshBasicMaterial[] = [];
	const addPanel = (
		position: [number, number, number],
		size: [number, number],
		color: number,
		intensity: number
	) => {
		const panelMaterial = new THREE.MeshBasicMaterial({
			color: new THREE.Color(color).multiplyScalar(intensity),
			side: THREE.DoubleSide
		});
		panelMaterials.push(panelMaterial);
		const panel = new THREE.Mesh(panelGeometry, panelMaterial);
		panel.position.set(...position);
		panel.scale.set(size[0], size[1], 1);
		panel.lookAt(0, 0, 0);
		studio.add(panel);
	};
	addPanel([-3, 5, 4], [8, 3], 0xffd6f4, 4);
	addPanel([4, 1, 4], [2, 8], 0xac78ff, 3);
	addPanel([-5, -1, 2], [2, 7], 0x4ccfff, 3);
	addPanel([0, -4, 4], [7, 1.4], 0xce46ee, 3);
	addPanel([0, 3, -5], [6, 2], 0xf6eeff, 4);
	addPanel([2, 1, 6], [4, 3], 0xffb5df, 3);
	addPanel([-2, -2, 5], [3, 4], 0x7ed9ff, 2);
	const generator = new THREE.PMREMGenerator(renderer);
	const environment = generator.fromScene(studio, 0.12, 0.1, 30);
	scene.environment = environment.texture;
	generator.dispose();
	panelGeometry.dispose();
	panelMaterials.forEach((panelMaterial) => panelMaterial.dispose());
	studio.clear();

	// The lathed profile gives each coin a flat face and a rounded reflective rim.
	const profile = [
		new THREE.Vector2(0, -0.065),
		new THREE.Vector2(0.61, -0.065),
		new THREE.Vector2(0.64, -0.055),
		new THREE.Vector2(0.655, -0.03),
		new THREE.Vector2(0.655, 0.03),
		new THREE.Vector2(0.64, 0.055),
		new THREE.Vector2(0.61, 0.065),
		new THREE.Vector2(0, 0.065)
	];
	const geometry = new THREE.LatheGeometry(profile, 64);
	geometry.rotateX(Math.PI / 2);
	const material = new THREE.MeshPhysicalMaterial({
		color: 0xcfc4e3,
		metalness: 1,
		roughness: 0.18,
		clearcoat: 1,
		clearcoatRoughness: 0.12,
		iridescence: 0.7,
		iridescenceIOR: 1.3,
		iridescenceThicknessRange: [100, 400],
		envMapIntensity: 1.3
	});
	const composition = new THREE.Group();
	const ring = new THREE.Group();
	for (let index = 0; index < 16; index++) {
		const angle = (index / 16) * Math.PI * 2;
		const disc = new THREE.Mesh(geometry, material);
		disc.position.set(Math.cos(angle) * 3.2, Math.sin(angle) * 3.2, Math.sin(angle) * 0.4);
		disc.rotation.set(Math.sin(angle + 0.4) * 0.9, angle + 0.35, angle * 0.3);
		ring.add(disc);
	}
	ring.rotation.x = 0.2;
	composition.position.y = 0.22;
	composition.add(ring);
	scene.add(composition);

	const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
	let paused = false;
	let explicitMotion = false;
	let inView = false;
	let destroyed = false;
	let contextLost = false;
	let frame = 0;
	let lastTime = 0;
	let lastDraw = 0;
	let elapsed = 0;

	const draw = () => {
		if (destroyed || contextLost) return;
		ring.rotation.z = -0.18 + elapsed * 0.04;
		ring.rotation.y = Math.sin(elapsed * 0.09) * 0.12;
		renderer.render(scene, camera);
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
		if (lastTime) elapsed += Math.min((now - lastTime) / 1000, 0.1);
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
		const aspect = width / height;
		const halfHeight = width < 700 ? 4.6 : 4.25;
		camera.left = -halfHeight * aspect;
		camera.right = halfHeight * aspect;
		camera.top = halfHeight;
		camera.bottom = -halfHeight;
		camera.updateProjectionMatrix();
		composition.scale.x = width < 700 ? 0.86 : Math.min(aspect * 0.86, 1.6);
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
			scene.environment = null;
			environment.dispose();
			scene.clear();
			renderer.dispose();
			renderer.forceContextLoss();
			renderer.domElement.remove();
		}
	};
}
