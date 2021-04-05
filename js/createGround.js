export default function createGround(scene, imageUrl) {
  // Create geometry for ground
  const geometry = new THREE.BoxGeometry(15, 8, 0.1);

  // Create material for ground
  const texture = new THREE.TextureLoader().load(imageUrl);
  const material = new THREE.MeshLambertMaterial({
    map: texture,
  });

  // Create mesh base on geometry and material
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.x = Math.PI / 2;

  scene.add(cube);
}
