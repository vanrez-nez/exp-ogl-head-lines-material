import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';
import headModel from '../assets/simple_head.gltf'
import { Renderer, Camera, Transform, Orbit, Program, GLTFLoader, Vec3 } from 'ogl';

const renderer = new Renderer({ dpr: 1 });
const gl = renderer.gl;
document.body.appendChild(gl.canvas);
gl.clearColor(0, 0, 0, 1);

const camera = new Camera(gl, { near: 0.1, far: 1000 });
camera.position.set(1, 1, 1);

const controls = new Orbit(camera);

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.perspective({aspect: gl.canvas.width / gl.canvas.height});
}
window.addEventListener('resize', resize, false);
resize();

const scene = new Transform();

const uniforms = {
  time: { value: 0 },
};

const program = new Program(gl, {
  vertex,
  fragment,
  cullFace: false,
  transparent: true,
  uniforms,
});

let head;

(async function() {
  console.log(headModel);
  const gltf = await GLTFLoader.load(gl, headModel);
  head = gltf.scene[0].children[0];
  head.program = program;
  head.setParent(scene);
  console.log(head);
})();


requestAnimationFrame(update);
let lastTime = 0;
function update() {
  requestAnimationFrame(update);
  const now = performance.now();
  const dt = (now - lastTime) / 1000;
  lastTime = now;
  controls.update();
  uniforms.time.value += dt * 0.01;
  renderer.render({ scene, camera, sort: false, frustumCull: false  });
}