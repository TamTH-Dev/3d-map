export default function createAnnotation(scene, buildings) {
  const txt = 'FPT Software'
  const hWorldTxt = 4
  const hWorldAll = 4
  const hPxTxt = 24

  const texture = document.createElement('canvas')
  // const texture = createCanvas(0, 0);
  const ctx = texture.getContext('2d')

  const kPxToWorld = hWorldTxt / hPxTxt // Px to World multplication factor
  const hPxAll = Math.ceil(hWorldAll / kPxToWorld) // hPxAll: height of the whole texture canvas
  const wPxTxt = ctx.measureText(txt).width // wPxTxt: width of the text in the texture canvas
  const wWorldTxt = wPxTxt * kPxToWorld + 8 // wWorldTxt: world width of text in the plane
  const wWorldAll = wWorldTxt + (hWorldAll - hWorldTxt) // wWorldAll: world width of the whole plane
  const wPxAll = Math.ceil(wWorldAll / kPxToWorld) // wPxAll: width of the whole texture canvas
  // ctx.setTransform(wPxAll / hPxAll, 0, 0, wPxAll / hPxAll, 0, 0)
  // ctx.shadowColor = '#000'
  // ctx.shadowBlur = 7
  // ctx.fillRect(0, 0, texture.width, texture.height)

  texture.width = wPxAll
  texture.height = hPxAll

  // Center text in both vertical and horizontal dimentions of texture
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Fill background color of texture
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, wPxAll, hPxAll)

  //Draw text in texture
  ctx.font = `${hPxTxt}px Arial`
  ctx.fillStyle = '#0000ff'
  ctx.fillText(txt, wPxAll / 2, hPxAll / 2)

  const ratio = wPxAll / hPxAll
  console.log(wPxTxt)

  const x = 0
  const y = 0
  const heartShape = new THREE.Shape()
  heartShape.moveTo(x, y)
  heartShape.bezierCurveTo(x + 4, y + 4, x + 4, y, 0, 0)

  const geometry = new THREE.ShapeGeometry(heartShape)
  // const geometry = new THREE.PlaneGeometry(2.4, 0.8)
  const material = new THREE.MeshLambertMaterial({
    map: new THREE.Texture(texture),
    transparent: true,
  })
  material.map.needsUpdate = true

  const annotation = new THREE.Mesh(geometry, material)
  // annotation.position.set(0, 2, 0);
  annotation.position.set(0, 1.4, 0)

  scene.add(annotation)
}

function createCanvas(width, height, set2dTransform = true) {
  const ratio = Math.ceil(window.devicePixelRatio)
  const canvas = document.createElement('canvas')
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  if (set2dTransform) {
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
  }
  return canvas
}
