export default function createRenderer(mapWidth, mapHeight) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    // powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(mapWidth, mapHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  return renderer;
}
