import './style.css'
import * as THREE from 'three'

import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {EffectComposer} from 'three/examples/js/postprocessing/EffectComposer';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import t from '../static/textures/1.jpg'
import * as dat from 'dat.gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:
    {
        time: { type: "f", value: 0 },
        distorsion: { type: "f", value: 0 },
        t: { type: "t", value: new THREE.TextureLoader().load(t) },
        progress: { type: "f", value: 0.0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        mouse: { type: "v2", value: new THREE.Vector2(0, 0) }
    }
})

// Geometry
const geometry = new THREE.PlaneBufferGeometry(480*1.5, 820*1.5 , 480, 820)

// Mesh
const plane = new THREE.Points(geometry, material)
scene.add(plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.001, 5000)
camera.position.set(0, 0, 1500)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000, 1)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const settings = {
    distorsion: 0,
    bloomThreshold: 0,
    bloomStrength: 0,
    bloomRadius: 0
}
// Debug
const gui = new dat.GUI({ width: 340 })
gui.add(settings, "distorsion", 0, 3, 0.01)
gui.add(settings, "bloomStrength", 0, 10, 0.01)

const renderScene = new RenderPass( scene, camera)
const bloomPass = new UnrealBloomPass( 
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
) 
bloomPass.threshold = settings.bloomThreshold
bloomPass.strength = settings.bloomStrength
bloomPass.radius = settings.bloomRadius
// composer = new THREE.EffectComposer(renderer)
// composer.addPass(renderScene)
// composer.addPass(bloomPass)


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update material
    material.uniforms.time.value = elapsedTime
    material.uniforms.distorsion.value = settings.distorsion
    bloomPass.strength = settings.bloomStrength

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()