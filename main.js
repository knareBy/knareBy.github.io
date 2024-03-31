import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x000000);

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const camera = new THREE.PerspectiveCamera(25, canvasWidth/canvasHeight, 0.1, 1000); // Adjusted aspect ratio
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0x000000, 0);
renderer.setSize(canvasWidth, canvasHeight);

// Position the renderer's DOM element on the right side of the screen
// renderer.domElement.style.position = 'absolute';
renderer.domElement.style.float = 'right'
let rendererParent = document.getElementById('hero-section');
rendererParent.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

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
    cartoon.position.x -= 1.25;
    scene.add(cartoon);
    cartoon.scale.setScalar(0.04);
    apply_color(cartoon, 0xff0000, 0);
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
    surface.position.x += 1.25;
    scene.add(surface);
    surface.scale.setScalar(0.04);
    apply_color(surface, 0x008cff, 0, true);
  },
  (xhr) => {},
  (error) => {
    console.log(error);
  }
);


function animate() {
  requestAnimationFrame(animate);

  if (cartoon && surface) {
    cartoon.rotation.x += 0.00075;
    cartoon.rotation.y += 0.00075;
    surface.rotation.copy(cartoon.rotation);
  }

  renderer.render(scene, camera);
  
}
animate();


function apply_color(object, color, roughness, emissive = false) {
  if (emissive) {
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
  } else {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = new THREE.MeshStandardMaterial({
          color: color,
          roughness: roughness,
        });
        child.material = material;
      }
    });
  }
  
  
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


