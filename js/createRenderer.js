export default function createRenderer(width, height) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    // powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.outputEncoding = THREE.sRGBEncoding;

  return renderer;
}
