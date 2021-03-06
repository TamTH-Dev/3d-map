export default function handlers(
  camera,
  renderer,
  TWEEN,
  loadedBuildings,
  loadedAnnotations,
  normalModeBtn,
  map
) {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2() // Create 2D vector
  let isNormalMode = true

  // The coordinate of threejs is represented by 2 axises Ox, Oy
  // 0 is the point that's created by intersection of Ox, Oy and is at the middle of the screen
  // (both vertically and horizontally)
  // So Ox and Oy split screen into 4 equal parts
  // The coordinate of mouse that's created by 2D vector is (x, y) [ -1 <= x <= 1, -1 <= y <= 1 ]

  function onBuildingClicked(event) {
    event.preventDefault()

    // mouse.x = (event.clientX / mapWidth) * 2 - 1
    // mouse.y = -((event.clientY - 141) / mapHeight) * 2 + 1

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(loadedBuildings, true)

    if (intersects.length > 0) {
      // Get clicked object
      const clickedObj = intersects[0].object

      // Get clicked object's position
      const {
        x: clickedObjCoordX,
        y: clickedObjCoordY,
        z: clickedObjCoordZ,
      } = clickedObj.coords
      // const {
      //   x: clickedObjCoordX,
      //   y: clickedObjCoordY,
      //   z: clickedObjCoordZ,
      // } = clickedObj.position

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
            coordZ: clickedObjCoordZ + 2.0,
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

      normalModeBtn.style.opacity = 1
      normalModeBtn.style.cursor = 'pointer'
      normalModeBtn.style.visibility = 'visible'
      isNormalMode = false

      // loadedAnnotations.map((annotation) => {
      //   new TWEEN.Tween(annotation.material)
      //     .to(
      //       {
      //         opacity: 0,
      //       },
      //       600
      //     )
      //     .easing(TWEEN.Easing.Quadratic.InOut)
      //     .onComplete(() => {
      //       annotation.visible = false
      //     })
      //     .start()
      // })
    }
  }

  // Handle event when map back button clicked
  function onNormalModeBtnClicked(event) {
    event.preventDefault()

    if (!isNormalMode) {
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
            coordX: 0,
            coordY: 3.4,
            coordZ: 5.6,
            rotationX: -0.6,
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

      normalModeBtn.style.opacity = 0
      normalModeBtn.style.cursor = 'default'
      normalModeBtn.style.visibility = 'hidden'
      isNormalMode = true

      loadedAnnotations.map((annotation) => {
        annotation.visible = true

        new TWEEN.Tween(annotation.material)
          .to(
            {
              opacity: 1,
            },
            600
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onComplete(() => {
            // annotation.material.transparent = false
          })
          .start()
      })
    }
  }

  function onWindowResized() {
    const { width, height } = map.getBoundingClientRect()
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  // Handle mouse moving
  function onMouseMove(event) {
    event.preventDefault()

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(loadedBuildings, true)

    if (intersects.length > 0) {
      console.log(`Hovered on building ${intersects[0].object.name}`)
    }
  }

  return {
    onBuildingClicked,
    onMouseMove,
    onNormalModeBtnClicked,
    onWindowResized,
  }
}
