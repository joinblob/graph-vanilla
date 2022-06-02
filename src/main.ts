import "./style.css";
import SceneManager from "./SceneManager";

const canvas: HTMLCanvasElement = document.querySelector("#bg")!;
const sceneManager: SceneManager = new SceneManager(canvas);

function bindEventListeners(): void {
  window.onresize = resizeCanvas;
  resizeCanvas();
}

function resizeCanvas(): void {
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  sceneManager.onWindowResize();
}

function animate(): void {
  requestAnimationFrame(animate);
  sceneManager.animate();
}

bindEventListeners();
animate();
