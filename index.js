import * as TWEEN from './tween.esm.js'

const map = document.getElementById('map')
const mapWidth = map.offsetWidth
const mapHeight = map.offsetHeight

// Added buildings in map
const buildings = []
const aspect = mapWidth / mapHeight

// Create scene
const scene = new THREE.Scene()

// Create and setup camera
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000)
camera.rotation.x = -1
camera.position.y = 4.4
camera.position.z = 3.6

// Create and setup renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  // powerPreference: 'high-performance',
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(mapWidth, mapHeight)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.domElement.addEventListener('click', onMouseClick, false)
renderer.domElement.addEventListener('mousemove', onMouseMove, false)
map.appendChild(renderer.domElement)

// Create loader for gltf format
const loader = new THREE.GLTFLoader()
// Load model from gltf file then add it to the scene
loader.load('./3d_models/forest_house/scene.gltf', (gltf) => {
  gltf.scene.scale.set(0.15, 0.15, 0.15)
  gltf.scene.rotation.set(0, 0, 0)

  scene.add(gltf.scene)

  buildings.push(gltf.scene)
})

// const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
// hemisphereLight.color.setHSL(0.6, 1, 0.1)
// scene.add(hemisphereLight)

function addGround(imageUrl) {
  // Create geometry for ground
  const geometry = new THREE.BoxGeometry(15, 8, 0.1)

  // Create material for ground
  const texture = new THREE.TextureLoader().load(imageUrl)
  const material = new THREE.MeshLambertMaterial({
    map: texture,
  })

  // Create mesh base on geometry and material
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.x = Math.PI / 2

  scene.add(cube)
}

addGround('./flash.jpg')

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2() // Create 2D vector

// The coordinate of threejs is represented by 2 axises Ox, Oy
// 0 is the point that's created by intersection of Ox, Oy and is at the middle of the screen
// (both vertically and horizontally)
// So Ox and Oy split screen into 4 equal parts
// The coordinate of mouse that's created by 2D vector is (x, y) [ -1 <= x <= 1, -1 <= y <= 1 ]

// Handler mouse clicking
function onMouseClick(event) {
  event.preventDefault()

  // mouse.x = (event.clientX / mapWidth) * 2 - 1
  // mouse.y = -((event.clientY - 141) / mapHeight) * 2 + 1

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(buildings, true)

  if (intersects.length > 0) {
    // Get clicked object
    const clickedObj = intersects[0].object
    // Get clicked object's position
    const {
      x: clickedObjCoordX,
      y: clickedObjCoordY,
      z: clickedObjCoordZ,
    } = clickedObj.position
    // Get camera's current position
    const {
      x: cameraCoordX,
      y: cameraCoordY,
      z: cameraCoordZ,
    } = camera.position
    // Get camera's current rotation
    const {
      x: cameraRotationX,
      y: cameraRotationY,
      z: cameraRotationZ,
    } = camera.rotation
    // Assign camera's coords values to mutable object
    const cameraValues = {
      coordX: cameraCoordX,
      coordY: cameraCoordY,
      coordZ: cameraCoordZ,
      rotationX: cameraRotationX,
      rotationY: cameraRotationY,
      rotationZ: cameraRotationZ,
    }

    new TWEEN.Tween(cameraValues)
      .to(
        {
          coordX: clickedObjCoordX,
          coordY: clickedObjCoordY + 0.8,
          coordZ: clickedObjCoordZ + 2.4,
          rotationX: -0.2,
        },
        800
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        camera.position.set(
          cameraValues.coordX,
          cameraValues.coordY,
          cameraValues.coordZ
        )
        camera.rotation.set(
          cameraValues.rotationX,
          cameraValues.rotationY,
          cameraValues.rotationZ
        )
      })
      .start()

    console.log(`Clicked on building ${clickedObj.name}`)
  }
}

// Handle mouse moving
function onMouseMove(event) {
  event.preventDefault()

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(buildings, true)

  if (intersects.length > 0) {
    console.log(`Hovered on building ${intersects[0].object.name}`)
  }
}

// IIFE render
;(function render(time) {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
  TWEEN.update(time)
})()

// Add effects
// Grid for coordinate
const gridHelper = new THREE.GridHelper(100, 20)
scene.add(gridHelper)

const ambientLight = new THREE.AmbientLight(0xaaaaaa)
scene.add(ambientLight)

// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
  camera.aspect = aspect
  camera.updateProjectionMatrix()

  renderer.setSize(mapWidth, mapHeight)
}
