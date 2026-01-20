const canvas = document.getElementById("bg");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02040a);

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  800
);
camera.position.z = 42;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: window.devicePixelRatio < 2
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);

/* LIGHT */
scene.add(new THREE.AmbientLight(0x1e3a8a, 0.6));
const light = new THREE.PointLight(0x3b82f6, 1);
light.position.set(25, 25, 25);
scene.add(light);

/* LOGO ZILA SHIELD */
const textureLoader = new THREE.TextureLoader();
const logoTexture = textureLoader.load("assets/zila-logo.png");

const shield = new THREE.Mesh(
  new THREE.CircleGeometry(6, 64),
  new THREE.MeshStandardMaterial({
    map: logoTexture,
    transparent: true,
    emissive: 0x2563eb,
    emissiveIntensity: 0.4
  })
);
scene.add(shield);

/* BLOCKCHAIN CUBES */
const blocks = [];
const geo = new THREE.BoxGeometry(2.6, 2.6, 2.6);
const mat = new THREE.MeshStandardMaterial({
  color: 0x0b1d33,
  metalness: 0.6,
  roughness: 0.35
});

for (let i = 0; i < 12; i++) {
  const b = new THREE.Mesh(geo, mat);
  b.position.set(
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 20
  );
  scene.add(b);
  blocks.push(b);
}

/* PARTICLES */
const pGeo = new THREE.BufferGeometry();
const pCount = 500;
const pos = new Float32Array(pCount * 3);
for (let i = 0; i < pos.length; i++) {
  pos[i] = (Math.random() - 0.5) * 150;
}
pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

const particles = new THREE.Points(
  pGeo,
  new THREE.PointsMaterial({
    size: 0.6,
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.3
  })
);
scene.add(particles);

/* AI RINGS */
const rings = [];
for (let i = 0; i < 2; i++) {
  const r = new THREE.Mesh(
    new THREE.RingGeometry(9 + i * 4, 9.4 + i * 4, 64),
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
  shield.rotation.z += 0.0018;
  particles.rotation.y += 0.0004;
  rings.forEach((r, i) => {
    r.material.opacity = 0.15 + Math.sin(Date.now() * 0.002 + i) * 0.1;
  });
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
