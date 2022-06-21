import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import GlowEffectProps from "./types/GlowEffectProps";
import ThreeState from "../ThreeState";

class GlowEffect {
  private _renderPass: RenderPass;
  private _effectComposer: EffectComposer;
  constructor(props: GlowEffectProps) {
    this._renderPass = this.createRenderPass(
      ThreeState.scene,
      ThreeState.camera
    );
    const bloomPass = this.createBloomPass(ThreeState.canvas, props);
    this._effectComposer = this.createEffectComposer(
      ThreeState.canvas,
      ThreeState.renderer,
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

  protected get renderPass(): RenderPass {
    return this._renderPass;
  }

  protected get effectComposer(): EffectComposer {
    return this._effectComposer;
  }

  public onWindowResize(): void {
    const { width, height } = ThreeState.canvas;
    this._effectComposer.setSize(width, height);
  }

  public render() {
    this._effectComposer.render();
  }
}

export default GlowEffect;
