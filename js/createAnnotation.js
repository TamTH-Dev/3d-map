export default function createAnnotation(scene, buildings) {
  const txt = 'FPT Software'
  const hWorldTxt = 4
  const hWorldAll = 4
  const hPxTxt = 20

  const texture = document.createElement('canvas')
  const ctx = texture.getContext('2d')

  const kPxToWorld = hWorldTxt / hPxTxt // Px to World multplication factor
  const hPxAll = Math.ceil(hWorldAll / kPxToWorld) // hPxAll: height of the whole texture canvas
  const wPxTxt = ctx.measureText(txt).width // wPxTxt: width of the text in the texture canvas
  const wWorldTxt = wPxTxt * kPxToWorld + 4 // wWorldTxt: world width of text in the plane
  const wWorldAll = wWorldTxt + (hWorldAll - hWorldTxt) // wWorldAll: world width of the whole plane
  const wPxAll = Math.ceil(wWorldAll / kPxToWorld) // wPxAll: width of the whole texture canvas
  ctx.font = `${hPxTxt}px arial sans-serif`
  // ctx.shadowColor = '#000'
  // ctx.shadowBlur = 7
  // ctx.fillRect(0, 0, texture.width, texture.height)

  texture.width = wPxAll
  texture.height = hPxAll
  ctx.fillStyle = 'cyan'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(txt, wPxAll / 2, hPxAll / 2)

  const geometry = new THREE.BoxGeometry(wWorldAll / 8, 0, hWorldAll / 10)
  const material = new THREE.MeshLambertMaterial({
    map: new THREE.Texture(texture),
    color: 0xfff000,
    // transparent: true,
  })
  material.map.needsUpdate = true

  const annotation = new THREE.Mesh(geometry, material)
  annotation.position.set(0, 2, 0)
  annotation.rotation.x = Math.PI / 2
  annotation.doubleSided = true

  scene.add(annotation)
}
