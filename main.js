import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(2,2,2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
let currentModel = null;

// load model function
function loadModel(path) {
    if (currentModel) {
        scene.remove(currentModel);
    }

    loader.load(path, function(gltf) {
        currentModel = gltf.scene;
        scene.add(currentModel);
    });
}

// load default
loadModel('models/model1.glb');

// dropdown change
document.getElementById('modelSelect').addEventListener('change', function(e) {
    loadModel(e.target.value);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
