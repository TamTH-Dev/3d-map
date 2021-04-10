import * as TWEEN from '../libraries/tween.esm.js'
import initializeApp from './initializeApp.js'
import createRenderer from './createRenderer.js'
import createCamera from './createCamera.js'
import createGround from './createGround.js'
import createLight from './createLight.js'
import loadBuildings from './loadBuildings.js'
import handlers from './handlers.js'

const map = document.getElementById('map')
const normalModeBtn = document.querySelector('.normal__mode__btn')

// Get values of map and calculate aspect of map
const { width, height } = map.getBoundingClientRect()

// Added buildings in map
const loadedBuildings = []
// Added annotations in map
const loadedAnnotations = []

const scene = new THREE.Scene()
const camera = createCamera(width, height)
const renderer = createRenderer(width, height)
map.appendChild(renderer.domElement)

createGround(scene, '../images/flash.jpg')
createLight(scene)

const buildingsData = []
for (let i = 0; i < 5; i++) {
  buildingsData.push({
    companyName: 'FPT Software',
    modelPath: './models/forest_house/scene.gltf',
    coords: {
      x: generateRandomNumber(-3, 3),
      y: 0,
      z: generateRandomNumber(-3, 3),
    },
  })
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

// buildingsData.map((building) => {
//   loadBuildings(scene, loadedBuildings, loadedAnnotations, {
//     coords: building.coords,
//     companyName: building.companyName,
//     modelPath: building.modelPath,
//   })
// })
loadBuildings(scene, loadedBuildings, loadedAnnotations, {
  coords: { x: 0, y: 0, z: 0 },
  companyName: 'FPT Software',
  modelPath: './models/forest_house/scene.gltf',
})

const {
  onBuildingClicked,
  onMouseMove,
  onNormalModeBtnClicked,
  onWindowResized,
} = handlers(
  camera,
  renderer,
  TWEEN,
  loadedBuildings,
  loadedAnnotations,
  normalModeBtn,
  map
)
renderer.domElement.addEventListener('click', onBuildingClicked, false)
renderer.domElement.addEventListener('mousemove', onMouseMove, false)
normalModeBtn.addEventListener('click', onNormalModeBtnClicked, false)
window.addEventListener('resize', onWindowResized, false)

initializeApp(scene, camera, renderer, TWEEN)

// Grid for coordinate
const gridHelper = new THREE.GridHelper(100, 20)
scene.add(gridHelper)
