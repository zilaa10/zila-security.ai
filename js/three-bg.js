const canvas = document.getElementById("bg");

/* SCENE */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02040a);

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 45;

/* RENDERER */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* LIGHT */
scene.add(new THREE.AmbientLight(0x1e40af, 0.6));
const light = new THREE.PointLight(0x3b82f6, 1.2);
light.position.set(30, 30, 30);
scene.add(light);

/* BLOCKCHAIN BLOCKS */
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
  const b = new THREE.Mesh(blockGeo, blockMat);
  b.position.set(
    (Math.random() - 0.5) * 60,
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 30
  );
  scene.add(b);
  blocks.push(b);
}

/* CONNECTION LINES */
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

/* SHIELD & LOCK */
const shield = new THREE.Mesh(
  new THREE.TorusGeometry(6, 1.4, 16, 100),
  new THREE.MeshStandardMaterial({
    color: 0x1e3a8a,
    metalness: 0.9,
    roughness: 0.15,
    emissive: 0x3b82f6,
    emissiveIntensity: 0.6
  })
);
scene.add(shield);

const lock = new THREE.Mesh(
  new THREE.CylinderGeometry(1.3, 1.3, 2.5, 32),
  new THREE.MeshStandardMaterial({
    color: 0x020617,
    emissive: 0x60a5fa,
    emissiveIntensity: 0.8
  })
);
scene.add(lock);

/* PARTICLES */
const pGeo = new THREE.BufferGeometry();
const pCount = 900;
const pos = new Float32Array(pCount * 3);
for (let i = 0; i < pos.length; i++) {
  pos[i] = (Math.random() - 0.5) * 200;
}
pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

const particles = new THREE.Points(
  pGeo,
  new THREE.PointsMaterial({
    color: 0x93c5fd,
    size: 0.7,
    transparent: true,
    opacity: 0.35
  })
);
scene.add(particles);

/* AI RINGS */
const rings = [];
for (let i = 0; i < 3; i++) {
  const r = new THREE.Mesh(
    new THREE.RingGeometry(8 + i * 3, 8.3 + i * 3, 64),
    new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    })
  );
  r.rotation.x = Math.PI / 2;
  scene.add(r);
  rings.push(r);
}

/* ANIMATE */
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

  rings.forEach((r, i) => {
    r.material.opacity = 0.15 + Math.sin(t * 2 + i) * 0.15;
  });

  particles.rotation.y += 0.0006;

  renderer.render(scene, camera);
}
animate();

/* RESIZE */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
