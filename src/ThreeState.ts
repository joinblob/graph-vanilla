import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class ThreeState {
  public static canvas: HTMLCanvasElement;
  public static scene: THREE.Scene;
  public static renderer: THREE.WebGLRenderer;
  public static camera: THREE.PerspectiveCamera;
  public static orbitControls: OrbitControls;
}

export default ThreeState;
