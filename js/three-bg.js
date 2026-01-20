// ===============================
// ZILA THREE.JS BACKGROUND
// ===============================

const canvas = document.getElementById("bg");
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 60;

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: false,
  powerPreference: "low-power"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

// PARTICLES
const particleCount = window.innerWidth < 768 ? 150 : 300;
const geometry = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particleCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 400,
    (Math.random() - 0.5) * 400,
    (Math.random() - 0.5) * 400
  );
}

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  color: 0x4f7cff,
  size: 1.2,
  transparent: true,
  opacity: 0.6
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// FLOATING SECURITY CUBES (BLOCKCHAIN)
const cubes = [];
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x1e40af,
  metalness: 0.7,
  roughness: 0.3
});

for (let i = 0; i < 8; i++) {
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(
    (Math.random() - 0.5) * 80,
    (Math.random() - 0.5) * 80,
    (Math.random() - 0.5) * 80
  );
  cubes.push(cube);
  scene.add(cube);
}

// LIGHTING (MILITARY / SPACE STYLE)
const ambientLight = new THREE.AmbientLight(0x1e3a8a, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x3b82f6, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  particles.rotation.y += 0.0005;
  particles.rotation.x += 0.0002;

  cubes.forEach((cube, i) => {
    cube.rotation.x += 0.002;
    cube.rotation.y += 0.003;
    cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
  });

  renderer.render(scene, camera);
}

animate();

// RESIZE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
