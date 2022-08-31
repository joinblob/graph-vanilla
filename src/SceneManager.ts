import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ThreeState from "./ThreeState";

class SceneManager {
  constructor(canvas: HTMLCanvasElement) {
    ThreeState.canvas = canvas;
    ThreeState.scene = this.initScene();
    ThreeState.renderer = this.initRenderer();
    ThreeState.camera = this.initCamera();
    ThreeState.orbitControls = this.initOrbitControls();
  }

  private initScene(): THREE.Scene {
    const scene: THREE.Scene = new THREE.Scene();
    return scene;
  }

  private initRenderer(): THREE.WebGLRenderer {
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: ThreeState.canvas,
      antialias: true,
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
    // camera.position.setZ(30);
    camera.position.setZ(150);
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

  public animate(): void {
    // for (let i = 0; i < this.animatedComponents.length; i++)
    //   this.animatedComponents[i].animate();

    ThreeState.orbitControls.update();
  }

  public render(): void {
    ThreeState.renderer.render(ThreeState.scene, ThreeState.camera);
  }

  public onWindowResize(): void {
    const { width, height } = ThreeState.canvas;

    ThreeState.camera.aspect = width / height;
    ThreeState.camera.updateProjectionMatrix();

    ThreeState.renderer.setSize(width, height);
  }
}

export default SceneManager;
