import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

declare global {
  export namespace Graph {
    let canvas: HTMLCanvasElement;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let camera: THREE.PerspectiveCamera;
    let orbitControls: OrbitControls;
  }
}

// declare namespace Graph {
//   let canvas: HTMLCanvasElement;
//   let scene: THREE.Scene;
//   let renderer: THREE.WebGLRenderer;
//   let camera: THREE.PerspectiveCamera;
//   let orbitControls: OrbitControls;
// }
