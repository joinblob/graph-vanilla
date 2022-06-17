import AnimatedComponent from "./components/AnimatedComponent";
import Component from "./components/Component";

declare global {
  export namespace Graph {
    let canvas: HTMLCanvasElement;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let camera: THREE.PerspectiveCamera;
    let components: Array<Component>;
    let animatedComponents: Array<AnimatedComponent>;
  }
}
