import createAnnotation from './createAnnotation.js'

export default function loadBuildings(
  scene,
  loadedBuildings,
  loadedAnnotations,
  { modelPath, companyName, coords: { x, y, z } },
  scaleFactor = 0.12
) {
  // Create loader for gltf format
  const gltfLoader = new THREE.GLTFLoader()
  // Load model from gltf file then add it to the scene
  gltfLoader.load(modelPath, (gltf) => {
    // gltf.scene.scale.set(0.15, 0.15, 0.15)
    // gltf.scene.rotation.set(0, 0, 0)

    // gltf.scene.position.set(2, 0, 2)
    const building = gltf.scene.children[0]
    building.scale.set(scaleFactor, scaleFactor, scaleFactor)
    building.position.set(x, y, z)

    // Assign coords of main building to all its child components
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.coords = {
          x,
          y,
          z,
        }
      }
    })

    // scene.add(gltf.scene)
    scene.add(building)

    // loadedBuildings.push(gltf.scene)
    loadedBuildings.push(building)

    createAnnotation(scene, loadedAnnotations, {
      coords: { x, y, z },
      companyName,
    })
  })
}
