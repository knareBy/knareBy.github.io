import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f1f1f);

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10); // Adjust the camera position as needed

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Add ambient light with intensity 0.5
// scene.add(ambientLight);

for (var i = 0; i < 3; i++) {
  let directionalLight = new THREE.PointLight(0xffffff, 50); // Add a directional light with intensity 1
  directionalLight.position.set((i * 6) - 6, 0, 5); // Set the position of the light
  scene.add(directionalLight);
}



const loader = new OBJLoader();
let cartoon, surface;

loader.load(
  'RasK_cartoon.obj',
  (object) => {
    cartoon = object;
    cartoon.position.x -= 3;
    scene.add(cartoon);
    cartoon.scale.setScalar(0.05);
    apply_color(cartoon, 0xfc0808, 0);
  },
  (xhr) => {},
  (error) => {
    console.log(error);
  }
);

loader.load(
  'RasK_surface.obj',
  (object) => {
    surface = object;
    surface.position.x += 3;
    scene.add(surface);
    surface.scale.setScalar(0.05);
    apply_color(surface, 0x0384fd, 0);
  },
  (xhr) => {},
  (error) => {
    console.log(error);
  }
);

function animate() {
  


  requestAnimationFrame(animate);

  if (cartoon && surface) {
    cartoon.rotation.x += 0.001;
    cartoon.rotation.y += 0.001;
    surface.rotation.copy(cartoon.rotation);
  }

  renderer.render(scene, camera);
  
}
animate();


function apply_color(object, color, roughness) {

  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: roughness,
        emissive: color, // White emissive color
        emissiveIntensity: 0.5,
      });
      child.material = material;
    }
  });
}

var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};

// Add event listeners for mouse down, move, and up events
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseMove(event) {
    if (isDragging) {
        var deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        // Rotate the object based on mouse movement
        cartoon.rotation.y += deltaMove.x * 0.01;
        cartoon.rotation.x += deltaMove.y * 0.01;

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
}

function onMouseUp(event) {
    isDragging = false;
}
