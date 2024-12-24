// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Pohon Natal
function createChristmasTree() {
    const tree = new THREE.Group();

    // Bagian kerucut pohon
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.ConeGeometry(2.5 - i * 0.5, 3, 16);
        const material = new THREE.MeshStandardMaterial({ color: 0x0a8d00 });
        const cone = new THREE.Mesh(geometry, material);
        cone.position.y = i * 2.5;
        tree.add(cone);
    }

    // Batang pohon
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 16);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = -2;
    tree.add(trunk);

    // Lampu Natal
    for (let i = 0; i < 30; i++) {
        const lightGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const lightMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        const angle = (i / 30) * Math.PI * 2;
        light.position.set(
            Math.sin(angle) * 2,
            (Math.random() * 7) - 2,
            Math.cos(angle) * 2
        );
        tree.add(light);
    }

    return tree;
}

// Kado Natal
function createGifts() {
    const gifts = new THREE.Group();

    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
        const gift = new THREE.Mesh(geometry, material);
        gift.position.set(
            (Math.random() - 0.5) * 4,
            -3.5,
            (Math.random() - 0.5) * 4
        );
        gifts.add(gift);
    }

    return gifts;
}

// Kembang Api
function createFirework() {
    const fireworkGroup = new THREE.Group();

    for (let i = 0; i < 50; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 3;
        const height = Math.random() * 3;
        particle.position.set(
            radius * Math.cos(angle),
            height,
            radius * Math.sin(angle)
        );

        fireworkGroup.add(particle);
    }

    fireworkGroup.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 10 + 5,
        (Math.random() - 0.5) * 20
    );

    scene.add(fireworkGroup);

    // Hapus kembang api setelah 2 detik
    setTimeout(() => scene.remove(fireworkGroup), 2000);
}

// Tambahkan objek ke scene
const christmasTree = createChristmasTree();
scene.add(christmasTree);

const gifts = createGifts();
scene.add(gifts);

// Pencahayaan
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Kamera
camera.position.z = 20;

// Animasi
function animate() {
    requestAnimationFrame(animate);

    // Putar pohon
    christmasTree.rotation.y += 0.01;

    // Kembang api
    if (Math.random() > 0.98) {
        createFirework();
    }

    renderer.render(scene, camera);
}

// Sesuaikan ukuran layar
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
