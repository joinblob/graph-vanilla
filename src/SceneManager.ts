import * as THREE from "three";
import AnimatedComponent from "./components/AnimatedComponent";
import Component from "./components/Component";
import Node from "./components/Node";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Edge from "./components/Edge";
import ThreeState from "./ThreeState";
import Graph from "./components/Graph";
import graph from "./testData/graph";
import EffectHelper from "./postprocessing/helpers/EffectHelper";
import GlowEffect from "./postprocessing/GlowEffect";
import Selections from "./postprocessing/helpers/Selection";
import Selection from "./postprocessing/helpers/Selection";
import SelectiveGlowEffect from "./postprocessing/SelectiveGlowEffect";

class SceneManager {
  // private components: Array<Component>;
  // private animatedComponents: Array<AnimatedComponent>;
  // private glowEffect: GlowEffect;

  constructor(canvas: HTMLCanvasElement) {
    ThreeState.canvas = canvas;
    ThreeState.scene = this.initScene();
    ThreeState.renderer = this.initRenderer();
    ThreeState.camera = this.initCamera();
    ThreeState.orbitControls = this.initOrbitControls();
    // this.components = this.initComponents();
    // this.animatedComponents = this.initAnimatedComponents();
    // this.glowEffect = this.initEffects();
    Graph.build(graph);
    EffectHelper.buildGlowEffect();
  }

  private initScene(): THREE.Scene {
    const scene: THREE.Scene = new THREE.Scene();
    return scene;
  }

  private initRenderer(): THREE.WebGLRenderer {
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: ThreeState.canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(ThreeState.canvas.width, ThreeState.canvas.height);
    return renderer;
  }

  private initCamera(): THREE.PerspectiveCamera {
    const fieldOfView: number = 20;
    const aspectRatio: number =
      ThreeState.canvas.width / ThreeState.canvas.height;
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
      ThreeState.camera,
      ThreeState.renderer.domElement
    );
    controls.enableDamping = true;
    return controls;
  }

  // private initComponents(): Array<Component> {
  //   const components: Array<Component> = [
  //     new Node({
  //       info: "",
  //       radius: 0.5,
  //       color: new THREE.Color("white"),
  //       position: [-3, 0, 0],
  //     }),
  //     new Node({
  //       info: "",
  //       radius: 0.5,
  //       color: new THREE.Color("white"),
  //       position: [3, 0, 0],
  //     }),
  //     new Edge({
  //       start: [-3, 0, 0],
  //       end: [3, 0, 0],
  //       color: new THREE.Color("orange"),
  //     }),
  //   ];
  //   return components;
  // }

  // private initEffects() {
  //   const selection: Selection = new Selection();
  //   // for (let component of this.components) {
  //   //   selection.add(component.mesh);
  //   // }
  //   selection.add(this.components[0].mesh);
  //   selection.add(this.components[1].mesh);
  //   selection.add(this.components[2].mesh);
  //   const glowEffect: SelectiveGlowEffect = new SelectiveGlowEffect(selection, {
  //     threshold: 0,
  //     strength: 2,
  //     radius: 0,
  //   });
  //   return glowEffect;
  // }

  public animate(): void {
    // for (let i = 0; i < this.animatedComponents.length; i++)
    //   this.animatedComponents[i].animate();

    ThreeState.orbitControls.update();
    // ThreeState.renderer.render(ThreeState.scene, ThreeState.camera);
    // this.glowEffect.render();
    EffectHelper.render();
  }

  public onWindowResize(): void {
    const { width, height } = ThreeState.canvas;

    ThreeState.camera.aspect = width / height;
    ThreeState.camera.updateProjectionMatrix();

    ThreeState.renderer.setSize(width, height);

    // this.glowEffect.onWindowResize();
    EffectHelper.onWindowResize();
  }
}

export default SceneManager;
