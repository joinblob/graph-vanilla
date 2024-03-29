import "./style.css";
import SceneManager from "./SceneManager";
import GraphDataType from "../testData/GraphDataType";
import GraphFactory from "./factories/GraphFactory";
import EffectHelper from "./postprocessing/helpers/EffectHelper";
import emitter from "./factories/GraphEvents";
import Node from "./components/Node";
import System from "./factories/helpers/System";
import PhysicsEngine from "./physics/PhysicsEngine";

class Graph {
  canvas: HTMLCanvasElement;
  sceneManager: SceneManager;

  constructor(canvas: HTMLCanvasElement, graph: GraphDataType) {
    this.canvas = canvas;
    this.sceneManager = new SceneManager(this.canvas);
    const systems: Array<System> = GraphFactory.buildGraph(graph);
    PhysicsEngine.init(systems, graph.graph);
    EffectHelper.buildGlowEffect();
    this.bindEventListeners();
    this.animate();
  }

  public on(event: string | symbol, callback: Function): void {
    emitter.on(event, (node: Node) => callback(node));
  }

  private bindEventListeners(): void {
    window.onresize = this.resizeCanvas.bind(this);
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.sceneManager.onWindowResize();
    EffectHelper.onWindowResize();
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.sceneManager.animate();
    PhysicsEngine.step();
    EffectHelper.render();
  }
}

export default Graph;
