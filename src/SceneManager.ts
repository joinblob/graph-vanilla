import * as THREE from "three";
import AnimatedComponent from "./components/AnimatedComponent";
import Component from "./components/Component";
import Node from "./components/Node";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GlowEffect from "./postprocessing/GlowEffect";
import Selection from "./postprocessing/helpers/Selection";

class SceneManager {
  private canvas: HTMLCanvasElement;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private animatedComponents: Array<AnimatedComponent>;
  private orbitControls: OrbitControls;
  private glowEffect: GlowEffect;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = this.initScene();
    this.renderer = this.initRenderer();
    this.camera = this.initCamera();
    this.orbitControls = this.initOrbitControls();
    this.initComponents();
    this.animatedComponents = this.initAnimatedComponents();
    this.glowEffect = this.initEffects();
  }

  private initScene(): THREE.Scene {
    const scene: THREE.Scene = new THREE.Scene();
    return scene;
  }

  private initRenderer(): THREE.WebGLRenderer {
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.canvas.width, this.canvas.height);
    return renderer;
  }

  private initCamera(): THREE.PerspectiveCamera {
    const fieldOfView: number = 75;
    const aspectRatio: number = this.canvas.width / this.canvas.height;
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
      this.camera,
      this.renderer.domElement
    );
    return controls;
  }

  private initComponents(): Array<Component> {
    const components: Array<Component> = [
      new Node(this.scene, {
        radius: 2,
        color: new THREE.Color("white"),
        position: [0, 0, 0],
      }),
    ];
    return components;
  }

  private initAnimatedComponents(): Array<AnimatedComponent> {
    const animatedComponents: Array<AnimatedComponent> = [];
    return animatedComponents;
  }

  private initEffects() {
    const glowEffect: GlowEffect = new GlowEffect(
      this.canvas,
      this.scene,
      this.camera,
      this.renderer,
      {
        threshold: 0,
        strength: 2,
        radius: 0,
      }
    );
    return glowEffect;
  }

  public animate(): void {
    for (let i = 0; i < this.animatedComponents.length; i++)
      this.animatedComponents[i].animate();

    this.orbitControls.update();
    // this.renderer.render(this.scene, this.camera);
    this.glowEffect.render();
  }

  public onWindowResize(): void {
    const { width, height } = this.canvas;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}

export default SceneManager;
