export default function createAnnotation(scene, buildings) {
  const txt = 'Test';
  const hWorldTxt = 2;
  const hWorldAll = 2;
  const hPxTxt = 48;

  const texture = document.createElement('canvas');
  // const texture = createCanvas(0, 0);
  const ctx = texture.getContext('2d');

  const kPxToWorld = hWorldTxt / hPxTxt; // Px to World multplication factor
  const hPxAll = Math.ceil(hWorldAll / kPxToWorld); // hPxAll: height of the whole texture canvas
  const wPxTxt = ctx.measureText(txt).width; // wPxTxt: width of the text in the texture canvas
  const wWorldTxt = wPxTxt * kPxToWorld + 4; // wWorldTxt: world width of text in the plane
  const wWorldAll = wWorldTxt + (hWorldAll - hWorldTxt); // wWorldAll: world width of the whole plane
  const wPxAll = Math.ceil(wWorldAll / kPxToWorld); // wPxAll: width of the whole texture canvas
  ctx.setTransform(wPxAll / hPxAll, 0, 0, wPxAll / hPxAll, 0, 0);
  ctx.font = `${hPxTxt}px arial bold`;
  // ctx.shadowColor = '#000'
  // ctx.shadowBlur = 7
  // ctx.fillRect(0, 0, texture.width, texture.height)

  texture.width = wPxAll;
  texture.height = hPxAll;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, wPxAll, hPxAll);
  ctx.fillStyle = '#0000ff';
  ctx.fillText(txt, wPxAll / 2, hPxAll / 2);

  const ratio = wPxAll / hPxAll;

  const geometry = new THREE.BoxGeometry(1 * ratio, 0, 1);
  const material = new THREE.MeshLambertMaterial({
    map: new THREE.Texture(texture),
    transparent: true,
  });
  material.map.needsUpdate = true;

  const annotation = new THREE.Mesh(geometry, material);
  // annotation.position.set(0, 2, 0);
  annotation.position.set(0, 1.4, 0);
  annotation.rotation.x = Math.PI / 2;
  annotation.doubleSided = true;
  console.log(texture.width, texture.height);
  // annotation.scale.x = wPxAll / 2;
  // annotation.scale.z = hPxAll / 2;

  scene.add(annotation);
}

function createCanvas(width, height, set2dTransform = true) {
  const ratio = Math.ceil(window.devicePixelRatio);
  const canvas = document.createElement('canvas');
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  if (set2dTransform) {
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  return canvas;
}
