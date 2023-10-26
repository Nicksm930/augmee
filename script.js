import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.114/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.114/examples/jsm/loaders/GLTFLoader.js';

window.screen.orientation.lock('landscape');

let scene, camera, renderer;

console.log("in index.js");

scene = new THREE.Scene();
// scene.background = new THREE.Color(0xdddddd);

camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
camera.rotation.y = 45 / 180 * Math.PI;
camera.position.x = 2000;
camera.position.y = 1000;
camera.position.z = 800;


let light = new THREE.HemisphereLight(0xffffff, 0xffffff);
light.position.set(1, 1, 1);
scene.add(light);

let directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = false;
scene.add(directionalLight);

renderer = new THREE.WebGLRenderer({ alpha: true });
let controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
const video = document.getElementById('videoElement');

navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
    video.srcObject = stream;
    console.log(stream);
    video.playsInline = true;
    video.play();
});

if (window.matchMedia("(orientation: portrait)").matches) {
    // you're in PORTRAIT mode
    video.style.position = "absolute";
    console.log("PORTRAIT");
}

if (window.matchMedia("(orientation: landscape)").matches) {
    // you're in LANDSCAPE mode
    console.log("LANDSCAPE");
}

// video.style.width="100%";
// video.style.height="100%";
renderer.domElement.style.position = "absolute";
document.body.append(video);
document.body.appendChild(renderer.domElement);
//   controls.addEventListener('change', renderer);

let loader = new GLTFLoader();
let car;
const menuImg = ['./fast-food/scene.gltf', './fast-food2/scene.gltf', './fast-food3/scene.gltf'];
let menuNumber = 1;
loader.load(menuImg[menuNumber], function (gltf) {
    car = gltf.scene.children[0];
    car.scale.set(1.5, 1.5, 1.5);
    scene.add(gltf.scene);
});

changefile(menuImg[menuNumber])

function changefile(img) {
    console.log(img, 'imglink')
    loader.load(img, function (gltf) {
        car = gltf.scene.children[0];
        car.scale.set(1.5, 1.5, 1.5);
        scene.add(gltf.scene);
    });
}

const animate = () => {
    // // Update your camera and other components as needed

    // // Calculate the direction from the object to the camera
    // const direction = new THREE.Vector3();
    // camera.getWorldPosition(direction);
    // direction.sub(car.position);

    // // Set the rotation of the object to face the camera
    // car.lookAt(direction);
    requestAnimationFrame(animate);
    // Render your scene
    // car.rotation.x += 0.01;
    // car.rotation.z += 0.01;
    renderer.render(scene, camera);

    // Call the update function recursively for smooth animation

}

animate();



// function test(){
//     console.log('test called')
// }