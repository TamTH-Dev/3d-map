export default function initializeApp(scene, camera, renderer, TWEEN) {
  (function render(time) {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    TWEEN.update(time);
  })();
}
