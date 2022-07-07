import "./style.css";
import SceneManager from "./SceneManager";

export default class Graph {
    canvas: HTMLCanvasElement
    sceneManager: SceneManager

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.sceneManager = new SceneManager(this.canvas);
        this.resizeCanvas();
    }

    resizeCanvas(): void {
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
    
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    
      this.sceneManager.onWindowResize();
    }
    
    animate(): void {
      requestAnimationFrame(() => this.animate(graph));
      this.sceneManager.animate();
    }
}
