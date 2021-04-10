export default function createCamera(width, height) {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000)
  camera.rotation.x = -0.6
  camera.position.set(0, 3.4, 5.6)

  return camera
}
