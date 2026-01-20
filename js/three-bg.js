const canvas = document.getElementById("bg");

/* ================= SCENE ================= */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02040a);

/* ================= CAMERA ================= */
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 45;

/* ================= RENDERER ================= */
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* ================= LIGHTING ================= */
scene.add(new THREE.AmbientLight(0x1e40af, 0.6));

const mainLight = new THREE.PointLight(0x3b82f6, 1.2);
mainLight.position.set(30, 30, 30);
scene.add(mainLight);

/* ======================================================
   🔗 FLOATING BLOCKCHAIN BLOCKS
====================================================== */
const blocks = [];
const blockGeo = new THREE.BoxGeometry(3, 3, 3);
const blockMat = new THREE.MeshStandardMaterial({
  color: 0x0b1d33,
  metalness: 0.7,
  roughness: 0.25,
  emissive: 0x2563eb,
  emissiveIntensity: 0.35
});

for (let i = 0; i < 18; i++) {
  const block = new THREE.Mesh(blockGeo, blockMat);
  block.position.set(
    (Math.random() - 0.5) * 60,
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 30
  );
  scene.add(block);
  blocks.push(block);
}

/* ======================================================
   🔗 SECURE CONNECTION LINES (BLOCK → BLOCK)
====================================================== */
blocks.forEach((b, i) => {
  if (i < blocks.length - 1) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      b.position,
      blocks[i + 1].position
    ]);
    const line = new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.35
      })
    );
    scene.add(line);
  }
});

/* ======================================================
   🔒 3D SHIELD / LOCK (CENTER CORE)
====================================================== */
const shieldGeo = new THREE.TorusGeometry(6, 1.4, 16, 100);
const shieldMat = new THREE.MeshStandardMaterial({
  color: 0x1e3a8a,
  metalness: 0.9,
  roughness: 0.15,
  emissive: 0x3b82f6,
  emissiveIntensity: 0.6
});
const shield = new THREE.Mesh(shieldGeo, shieldMat);
scene.add(shield);

/* Lock core */
const lockGeo = new THREE.CylinderGeometry(1.3, 1.3, 2.5, 32);
const lockMat = new THREE.MeshStandardMaterial({
  color: 0x020617,
  emissive: 0x60a5fa,
  emissiveIntensity: 0.8
});
const lock = new THREE.Mesh(lockGeo, lockMat);
scene.add(lock);

/* ======================================================
   🌌 PARTICLE NETWORK (SECURITY LAYER)
====================================================== */
const particlesGeo = new THREE.BufferGeometry();
const count = 900;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 200;
}
particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const particles = new THREE.Points(
  particlesGeo,
  new THREE.PointsMaterial({
    color: 0x93c5fd,
    size: 0.7,
    transparent: true,
    opacity: 0.35
  })
);
scene.add(particles);

/* ======================================================
   🧠 AI-SECURITY LAYER (PULSE RINGS)
====================================================== */
const aiRings = [];
for (let i = 0; i < 3; i++) {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(8 + i * 3, 8.2 + i * 3, 64),
    new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    })
  );
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);
  aiRings.push(ring);
}

/* ================= ANIMATION ================= */
function animate() {
  requestAnimationFrame(animate);

  const t = Date.now() * 0.001;

  blocks.forEach((b, i) => {
    b.rotation.x += 0.002;
    b.rotation.y += 0.003;
    b.position.y += Math.sin(t + i) * 0.002;
  });

  shield.rotation.z += 0.002;
  lock.rotation.y -= 0.003;

  aiRings.forEach((r, i) => {
    r.material.opacity = 0.15 + Math.sin(t * 2 + i) * 0.15;
  });

  particles.rotation.y += 0.0006;

  renderer.render(scene, camera);
}
animate();

/* ================= RESIZE ================= */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
