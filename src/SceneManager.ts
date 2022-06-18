import * as THREE from "three";
import AnimatedComponent from "./components/AnimatedComponent";
import Component from "./components/Component";
import Node from "./components/Node";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GlowEffect from "./postprocessing/GlowEffect";
import Selection from "./postprocessing/helpers/Selection";
import SelectiveGlowEffect from "./postprocessing/SelectiveGlowEffect";
import Edge from "./components/Edge";

class SceneManager {
  // private canvas: HTMLCanvasElement;
  // private scene: THREE.Scene;
  // private renderer: THREE.WebGLRenderer;
  // private camera: THREE.PerspectiveCamera;
  private components: Array<Component>;
  private animatedComponents: Array<AnimatedComponent>;
  // private orbitControls: OrbitControls;
  private glowEffect: GlowEffect;

  constructor(canvas: HTMLCanvasElement) {
    Graph.canvas = canvas;
    Graph.scene = this.initScene();
    Graph.renderer = this.initRenderer();
    Graph.camera = this.initCamera();
    Graph.orbitControls = this.initOrbitControls();
    this.components = this.initComponents();
    this.animatedComponents = this.initAnimatedComponents();
    this.glowEffect = this.initEffects();
  }

  private initScene(): THREE.Scene {
    const scene: THREE.Scene = new THREE.Scene();
    return scene;
  }

  private initRenderer(): THREE.WebGLRenderer {
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: Graph.canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(Graph.canvas.width, Graph.canvas.height);
    return renderer;
  }

  private initCamera(): THREE.PerspectiveCamera {
    const fieldOfView: number = 20;
    const aspectRatio: number = Graph.canvas.width / Graph.canvas.height;
    const near: number = 0.1;
    const far: number = 1000;
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      near,
      far
    );
    camera.position.setZ(30);
    return camera;
  }

  private initOrbitControls(): OrbitControls {
    const controls: OrbitControls = new OrbitControls(
      Graph.camera,
      Graph.renderer.domElement
    );
    controls.enableDamping = true;
    return controls;
  }

  private initComponents(): Array<Component> {
    const components: Array<Component> = [
      new Node({
        radius: 0.5,
        color: new THREE.Color("white"),
        position: [-3, 0, 0],
      }),
      new Node({
        radius: 0.5,
        color: new THREE.Color("white"),
        position: [3, 0, 0],
      }),
      new Edge({
        start: [-3, 0, 0],
        end: [3, 0, 0],
        color: new THREE.Color("orange"),
      }),
    ];
    return components;
  }

  private initAnimatedComponents(): Array<AnimatedComponent> {
    const animatedComponents: Array<AnimatedComponent> = [];
    return animatedComponents;
  }

  private initEffects() {
    const selection: Selection = new Selection();
    // for (let component of this.components) {
    //   selection.add(component.mesh);
    // }
    selection.add(this.components[0].mesh);
    selection.add(this.components[1].mesh);
    selection.add(this.components[2].mesh);
    const glowEffect: SelectiveGlowEffect = new SelectiveGlowEffect(selection, {
      threshold: 0,
      strength: 2,
      radius: 0,
    });
    return glowEffect;
  }

  public animate(): void {
    for (let i = 0; i < this.animatedComponents.length; i++)
      this.animatedComponents[i].animate();

    Graph.orbitControls.update();
    // this.renderer.render(this.scene, this.camera);
    this.glowEffect.render();
  }

  public onWindowResize(): void {
    const { width, height } = Graph.canvas;

    Graph.camera.aspect = width / height;
    Graph.camera.updateProjectionMatrix();

    Graph.renderer.setSize(width, height);

    this.glowEffect.onWindowResize();
  }
}

export default SceneManager;
