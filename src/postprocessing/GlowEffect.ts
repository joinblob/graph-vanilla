import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import GlowEffectProps from "./types/GlowEffectProps";

class GlowEffect {
  private _renderPass: RenderPass;
  private _effectComposer: EffectComposer;
  private _scene: THREE.Scene;
  private _canvas: HTMLCanvasElement;
  private _renderer: THREE.WebGLRenderer;
  constructor(
    canvas: HTMLCanvasElement,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    props: GlowEffectProps
  ) {
    this._scene = scene;
    this._canvas = canvas;
    this._renderer = renderer;
    this._renderPass = this.createRenderPass(scene, camera);
    const bloomPass = this.createBloomPass(canvas, props);
    this._effectComposer = this.createEffectComposer(
      canvas,
      renderer,
      bloomPass
    );
  }

  private createRenderPass(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ): RenderPass {
    const renderPass: RenderPass = new RenderPass(scene, camera);
    return renderPass;
  }

  private createBloomPass(
    canvas: HTMLCanvasElement,
    props: GlowEffectProps
  ): UnrealBloomPass {
    const bloomPass: UnrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(canvas.width, canvas.height),
      props.strength,
      props.radius,
      props.threshold
    );
    return bloomPass;
  }

  private createEffectComposer(
    canvas: HTMLCanvasElement,
    renderer: THREE.WebGLRenderer,
    bloomPass: UnrealBloomPass
  ): EffectComposer {
    const effectComposer = new EffectComposer(renderer);
    effectComposer.setSize(canvas.width, canvas.height);
    effectComposer.renderToScreen = true;
    effectComposer.addPass(this.renderPass);
    effectComposer.addPass(bloomPass);
    return effectComposer;
  }

  protected get scene(): THREE.Scene {
    return this._scene;
  }

  protected get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  protected get renderer(): THREE.WebGLRenderer {
    return this._renderer;
  }

  protected get renderPass(): RenderPass {
    return this._renderPass;
  }

  protected get effectComposer(): EffectComposer {
    return this._effectComposer;
  }

  public onWindowResize(): void {
    const { width, height } = this.canvas;
    this._effectComposer.setSize(width, height);
  }

  public render() {
    this.effectComposer.render();
  }
}

export default GlowEffect;