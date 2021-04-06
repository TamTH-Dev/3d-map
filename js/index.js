import * as TWEEN from '../libraries/tween.esm.js'
import initializeApp from './initializeApp.js'
import createRenderer from './createRenderer.js'
import createCamera from './createCamera.js'
import createGround from './createGround.js'
import createLight from './createLight.js'
import loadBuildings from './loadBuildings.js'
import handlers from './handlers.js'
import createAnnotation from './createAnnotation.js'

const map = document.getElementById('map')
const normalModeBtn = document.querySelector('.normal__mode__btn')

// Get values of map and calculate aspect of map
const { width, height } = map.getBoundingClientRect()
// Added buildings in map
const buildings = []

const scene = new THREE.Scene()
const camera = createCamera(width, height)
const renderer = createRenderer(width, height)
map.appendChild(renderer.domElement)

createGround(scene, '../images/flash.jpg')
createLight(scene)
loadBuildings(scene, buildings)
createAnnotation(scene, buildings)

const {
  onBuildingClicked,
  onMouseMove,
  onNormalModeBtnClicked,
  onWindowResized,
} = handlers(camera, renderer, TWEEN, buildings, normalModeBtn, map)
renderer.domElement.addEventListener('click', onBuildingClicked, false)
renderer.domElement.addEventListener('mousemove', onMouseMove, false)
normalModeBtn.addEventListener('click', onNormalModeBtnClicked, false)
window.addEventListener('resize', onWindowResized, false)

initializeApp(scene, camera, renderer, TWEEN)

// Grid for coordinate
const gridHelper = new THREE.GridHelper(100, 20)
scene.add(gridHelper)
