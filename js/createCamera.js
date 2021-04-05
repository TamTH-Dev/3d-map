export default function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000);
  camera.rotation.x = -1;
  camera.position.set(0, 4.4, 3.6);

  return camera;
}
