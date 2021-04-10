export default function createAnnotation(
  scene,
  loadedAnnotations,
  { companyName, coords: { x, y, z } }
) {
  const texture = document.createElement('canvas')
  const ctx = texture.getContext('2d')

  // const txt = companyName
  const txt = 'FPT Software'
  const hWorldTxt = 4
  const hWorldAll = 4
  const hPxTxt = 16

  const pxToWorldRatio = hWorldTxt / hPxTxt // Px to World ratio
  const hPxAll = Math.ceil(hWorldAll / pxToWorldRatio) // Height of the whole texture canvas
  const wPxTxt = ctx.measureText(txt).width // Width of the text in the texture canvas
  const wWorldTxt = wPxTxt * pxToWorldRatio // World width of text in the plane
  // const wWorldAll = wWorldTxt + (hWorldAll - hWorldTxt) // World width of the whole plane
  const wWorldAll = wWorldTxt // World width of the whole plane
  const wPxAll = Math.ceil(wWorldAll / pxToWorldRatio) // Width of the whole texture canvas
  // ctx.setTransform(wPxAll / hPxAll, 0, 0, wPxAll / hPxAll, 0, 0)

  const actualWidth = wPxAll * 2
  const actualHeight = hPxAll * 2

  texture.width = actualWidth
  texture.height = actualHeight

  // Fill background color of texture
  drawAnnotation(ctx, 0, 0, actualWidth, actualHeight, 10)

  // Center text in both vertical and horizontal dimentions of texture
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  //Draw text in texture
  ctx.font = `${hPxTxt}px Arial`
  ctx.fillStyle = '#fff'
  ctx.fillText(txt, actualWidth / 2, actualHeight / 2)

  const txtRatio = wPxTxt / hPxTxt
  const geometryWidth = wWorldAll / 10

  const geometry = new THREE.PlaneGeometry(
    geometryWidth,
    geometryWidth / txtRatio
  )
  const material = new THREE.MeshLambertMaterial({
    map: new THREE.Texture(texture),
    transparent: true,
  })
  material.map.needsUpdate = true

  const annotation = new THREE.Mesh(geometry, material)
  annotation.position.set(x, 1.8, z)
  // annotation.position.set(0, 1.4, 0)

  scene.add(annotation)

  loadedAnnotations.push(annotation)
}

function drawAnnotation(
  ctx,
  x,
  y,
  width,
  height,
  radius,
  bgColor = 'rgba(0, 0, 0, 0.8)'
) {
  bgColor = 'rgba(0, 0, 255, 1)'
  ctx.beginPath()
  ctx.moveTo(x, y + radius)
  ctx.lineTo(x, y + height - radius)
  ctx.arcTo(x, y + height, x + radius, y + height, radius)

  // Draw arrow below box
  ctx.lineTo((2 * x + width) / 2 - 10, y + height)
  ctx.lineTo((2 * x + width) / 2, y + height + 20)
  ctx.lineTo((2 * x + width) / 2 + 10, y + height)

  ctx.lineTo(x + width - radius, y + height)
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius)
  ctx.lineTo(x + width, y + radius)
  ctx.arcTo(x + width, y, x + width - radius, y, radius)
  ctx.lineTo(x + radius, y)
  ctx.arcTo(x, y, x, y + radius, radius)
  ctx.fillStyle = bgColor
  ctx.stroke()
  ctx.fill()
}
