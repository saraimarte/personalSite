import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// Raycaster and mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Canvas
const canvas = document.querySelector('canvas.webgl');
if (!canvas) {
    console.error("Canvas element not found!");
}

// Scene
const scene = new THREE.Scene();

// Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Textures
const hoverColor = new THREE.Color(0xE3DAC9);
const bakedTexture = textureLoader.load('bakedNew.jpg', 
    () => console.log("Texture loaded successfully"),
    undefined,
    (error) => console.error("Error loading texture:", error)
);
bakedTexture.flipY = false;
bakedTexture.colorSpace = THREE.SRGBColorSpace;
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

// Variables
let model;

// Load Model
gltfLoader.load(
    '072624.glb',
    (gltf) => {
        console.log("Model loaded successfully");
        model = gltf.scene;
        scene.add(model);

        model.traverse((child) => {
            console.log(child.name)
            if (child.isMesh) {
                child.material = bakedMaterial.clone(); // Clone the material for each mesh
                child.userData.originalMaterial = child.material; // Store original material
            }
        });

        // Camera and controls setup
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const cameraDistance = size.z * 4;
        camera.position.set(center.x, center.y + size.y * 0.2, center.z + cameraDistance);
        camera.lookAt(center.x, center.y, center.z);

        controls.target.set(center.x, center.y, center.z);
        
        // Set camera limitations
        const minDistance = size.z * 2; // Minimum zoom distance
        const maxDistance = size.z * 6; // Maximum zoom distance
        controls.minDistance = minDistance;
        controls.maxDistance = maxDistance;
        
        // Limit vertical rotation (to prevent going too far down)
        controls.maxPolarAngle = Math.PI / 2; // Limit to 90 degrees (horizontal)
        controls.minPolarAngle = Math.PI / 2.2; // Limit to 90 degrees (horizontal)

        controls.update();

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onMouseClick);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('An error occurred while loading the model:', error);
    }
);

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(model, true);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        console.log(`${clickedObject.name} was clicked on`);
        switch(clickedObject.name) {
            case 'gameboy':
                window.location.href = '../games';
                break;
            case 'camera':
                window.location.href = '../camera';
                break;
            case 'pen':
                window.location.href = '../posts';
                break;
            case 'wrench':
                window.location.href = '../workshop';
                break;
            case 'bible':
                window.location.href = '../biblePosts';
                break;
            case 'toolbox':
                window.location.href = '../toolbox';
                break;
            case 'bowl':
                window.location.href = '../kitchen';
                break;
            case 'telephone':
                window.location.href = '../interbook';
                break;
            case 'lightbulb':
                window.location.href = 'https://saraistudies.netlify.app/';
                break;
            default:
                console.log('No navigation defined for this object');
        }
    }
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
scene.add(camera);

// OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0xF2F3F4, 1);

// Handle window resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

// Animate
const tick = () => {
    controls.update();

    if (model) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(model, true);

        model.traverse((child) => {
            if (child.isMesh) {
                child.material = child.userData.originalMaterial;
            }
        });

        if (intersects.length > 0) {
            const hoveredObject = intersects[0].object;
            if (hoveredObject.isMesh && hoveredObject.name != 'model001') {
                hoveredObject.material = hoveredObject.material.clone();
                hoveredObject.material.color.set(hoverColor);
            }
        }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};

tick();
