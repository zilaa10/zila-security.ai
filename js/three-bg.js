const canvas = document.getElementById("bg");

/* Scene */
const scene = new THREE.Scene();

/* Camera */
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 40;

/* Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

/* Lights */
const ambientLight = new THREE.AmbientLight(0x3b82f6, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x60a5fa, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

/* Blockchain Blocks */
const blocks = [];
const blockGeometry = new THREE.BoxGeometry(3, 3, 3);
const blockMaterial = new THREE.MeshStandardMaterial({
  color: 0x0b1d33,
  emissive: 0x2563eb,
  emissiveIntensity: 0.4,
  metalness: 0.6,
  roughness: 0.3
});

for (let i = 0; i < 20; i++) {
  const block = new THREE.Mesh(blockGeometry, blockMaterial);
  block.position.set(
    (Math.random() - 0.5) * 60,
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 40
  );
  scene.add(block);
  blocks.push(block);
}

/* Connection Lines (Security Links) */
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0x3b82f6,
  transparent: true,
  opacity: 0.3
});

for (let i = 0; i < blocks.length - 1; i++) {
  const points = [];
  points.push(blocks[i].position);
  points.push(blocks[i + 1].position);

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, lineMaterial);
  scene.add(line);
}

/* Animation */
function animate() {
  requestAnimationFrame(animate);

  blocks.forEach((block, index) => {
    block.rotation.x += 0.002;
    block.rotation.y += 0.003;

    block.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
  });

  renderer.render(scene, camera);
}

animate();

/* Resize */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
