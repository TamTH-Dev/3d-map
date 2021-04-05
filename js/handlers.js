export default function handlers(
  camera,
  renderer,
  TWEEN,
  buildings,
  normalModeBtn,
  map
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(); // Create 2D vector
  let isNormalMode = true;

  // The coordinate of threejs is represented by 2 axises Ox, Oy
  // 0 is the point that's created by intersection of Ox, Oy and is at the middle of the screen
  // (both vertically and horizontally)
  // So Ox and Oy split screen into 4 equal parts
  // The coordinate of mouse that's created by 2D vector is (x, y) [ -1 <= x <= 1, -1 <= y <= 1 ]

  function onBuildingClicked(event) {
    event.preventDefault();

    // mouse.x = (event.clientX / mapWidth) * 2 - 1
    // mouse.y = -((event.clientY - 141) / mapHeight) * 2 + 1

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(buildings, true);

    if (intersects.length > 0) {
      // Get clicked object
      const clickedObj = intersects[0].object;
      // Get clicked object's position
      const {
        x: clickedObjCoordX,
        y: clickedObjCoordY,
        z: clickedObjCoordZ,
      } = clickedObj.position;
      // Get camera's current position
      const {
        x: cameraCoordX,
        y: cameraCoordY,
        z: cameraCoordZ,
      } = camera.position;
      // Get camera's current rotation
      const {
        x: cameraRotationX,
        y: cameraRotationY,
        z: cameraRotationZ,
      } = camera.rotation;
      // Assign camera's coords values to mutable object
      const cameraValues = {
        coordX: cameraCoordX,
        coordY: cameraCoordY,
        coordZ: cameraCoordZ,
        rotationX: cameraRotationX,
        rotationY: cameraRotationY,
        rotationZ: cameraRotationZ,
      };

      new TWEEN.Tween(cameraValues)
        .to(
          {
            coordX: clickedObjCoordX,
            coordY: clickedObjCoordY + 0.8,
            coordZ: clickedObjCoordZ + 2.4,
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
          );
          camera.rotation.set(
            cameraValues.rotationX,
            cameraValues.rotationY,
            cameraValues.rotationZ
          );
        })
        .start();

      normalModeBtn.style.opacity = 1;
      normalModeBtn.style.cursor = 'pointer';
      normalModeBtn.style.visibility = 'visible';
      isNormalMode = false;
    }
  }

  // Handle event when map back button clicked
  function onNormalModeBtnClicked(event) {
    event.preventDefault();

    if (!isNormalMode) {
      // Get camera's current position
      const {
        x: cameraCoordX,
        y: cameraCoordY,
        z: cameraCoordZ,
      } = camera.position;
      // Get camera's current rotation
      const {
        x: cameraRotationX,
        y: cameraRotationY,
        z: cameraRotationZ,
      } = camera.rotation;
      // Assign camera's coords values to mutable object
      const cameraValues = {
        coordX: cameraCoordX,
        coordY: cameraCoordY,
        coordZ: cameraCoordZ,
        rotationX: cameraRotationX,
        rotationY: cameraRotationY,
        rotationZ: cameraRotationZ,
      };

      new TWEEN.Tween(cameraValues)
        .to(
          {
            coordX: 0,
            coordY: 4.4,
            coordZ: 3.6,
            rotationX: -1,
          },
          800
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          camera.position.set(
            cameraValues.coordX,
            cameraValues.coordY,
            cameraValues.coordZ
          );
          camera.rotation.set(
            cameraValues.rotationX,
            cameraValues.rotationY,
            cameraValues.rotationZ
          );
        })
        .start();

      normalModeBtn.style.opacity = 0;
      normalModeBtn.style.cursor = 'default';
      normalModeBtn.style.visibility = 'hidden';
      isNormalMode = true;
    }
  }

  function onWindowResized() {
    const { width, height } = map.getBoundingClientRect();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // Handle mouse moving
  function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(buildings, true);

    if (intersects.length > 0) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      context.font = 'Bold 20px Arial';
      context.fillStyle = 'rgba(0,0,0,0.95)';
      context.fillText('Hello, world!', 0, 20);

      context.measureText('Hello world');
      console.log(`Hovered on building ${intersects[0].object.name}`);
    }
  }

  return {
    onBuildingClicked,
    onMouseMove,
    onNormalModeBtnClicked,
    onWindowResized,
  };
}
