export default function loadBuildings(scene, buildings) {
  // Create loader for gltf format
  const gltfLoader = new THREE.GLTFLoader();
  // Load model from gltf file then add it to the scene
  gltfLoader.load('./models/forest_house/scene.gltf', (gltf) => {
    gltf.scene.scale.set(0.15, 0.15, 0.15);
    gltf.scene.rotation.set(0, 0, 0);

    scene.add(gltf.scene);

    buildings.push(gltf.scene);
  });
}
