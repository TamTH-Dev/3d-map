export default function createLight(scene) {
  const ambientLight = new THREE.AmbientLight(0xeeeeee);
  scene.add(ambientLight);

  // const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
  // hemisphereLight.color.setHSL(0.6, 1, 0.1)
  // scene.add(hemisphereLight)
}
