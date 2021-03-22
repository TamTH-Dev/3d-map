// Added buildings in map
const buildings = []
const aspect = window.innerWidth / window.innerHeight

// Create scene
const scene = new THREE.Scene()

// Create and setup camera
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000)
camera.rotation.x = Math.PI / 2 + 3.6
camera.position.y = 4.4
camera.position.z = 3.6

// Create and setup renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  // powerPreference: 'high-performance',
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.domElement.addEventListener('click', onMouseClick, false)
renderer.domElement.addEventListener('mousemove', onMouseMove, false)
document.body.appendChild(renderer.domElement)

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

  // cube.lookAt(0, 2, 0)
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

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(buildings, true)

  if (intersects.length > 0) {
    console.log(`Clicked on building ${intersects[0].object.name}`)
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
;(function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
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

  renderer.setSize(window.innerWidth, window.innerHeight)
}
