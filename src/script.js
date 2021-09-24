import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

var container;
var camera, scene, renderer, clock;
var imageAspect;

container = document.getElementById( 'container' );

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth/innerHeight,
    0.001,
    1000
);
camera.position.set(0, 0, 2)

scene = new THREE.Scene();
clock = new THREE.Clock();

var geometry = new THREE.PlaneBufferGeometry( 1, 1, 10, 10 );

var material = new THREE.ShaderMaterial( {
    uniforms: {
        time: { type: "f", value: 1.0 },
        progress: { type: "f", value: 0.0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        mouse: { type: "v2", value: new THREE.Vector2(0, 0) }
    },
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader
} );

var plane = new THREE.Points( geometry, material );
scene.add( plane );  

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0xeeeeee, 1);

container.appendChild( renderer.domElement );

onWindowResize();
window.addEventListener( 'resize', onWindowResize, false );

const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (e) => {
    mouse.x = e.pageX / sizes.width - 0.5;
    mouse.y = - e.pageY / sizes.height + 0.5;
})  

var settings = {
    progress: 0,
};
const gui = new dat.GUI();

function onWindowResize( event ) {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    renderer.setSize( sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)

}

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
    

function render() {

    material.uniforms.time.value += clock.getDelta();

    material.uniforms.progress.value = settings.progress;
    material.uniforms.mouse.value = mouse;    

    renderer.render( scene, camera );

    window.requestAnimationFrame(render);
}

render();