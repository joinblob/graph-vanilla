import GlowEffect from "./GlowEffect";
import GlowEffectProps from "./types/GlowEffectProps";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import Selection from "./helpers/Selection";
import SelectiveRenderHelpers from "./helpers/SelectiveRenderHelpers";

class SelectiveGlowEffect extends GlowEffect {
  private finalComposer: EffectComposer;
  private selectiveRenderHelpers: SelectiveRenderHelpers;
  constructor(
    canvas: HTMLCanvasElement,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    selection: Selection,
    props: GlowEffectProps
  ) {
    super(canvas, scene, camera, renderer, props);
    this.selectiveRenderHelpers = new SelectiveRenderHelpers(selection);
    this.configEffectComposer();
    const shaderPass = this.createShaderPass();
    this.finalComposer = this.createFinalComposer(shaderPass);
  }

  private configEffectComposer(): void {
    const effectComposer: EffectComposer = super.effectComposer;
    effectComposer.renderToScreen = false;
  }

  private createShaderPass(): ShaderPass {
    const shaderPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: {
            value: super.effectComposer.renderTarget2.texture,
          },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,
        fragmentShader: `
          uniform sampler2D baseTexture;
    			uniform sampler2D bloomTexture;
    			varying vec2 vUv;
    			void main() {
    				gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
    			}
          `,
        defines: {},
      }),
      "baseTexture"
    );
    shaderPass.needsSwap = true;
    return shaderPass;
  }

  private createFinalComposer(shaderPass: ShaderPass): EffectComposer {
    const finalComposer = new EffectComposer(super.renderer);
    finalComposer.addPass(super.renderPass);
    finalComposer.addPass(shaderPass);
    return finalComposer;
  }

  public onWindowResize(): void {
    super.onWindowResize();
    const { width, height } = super.canvas;
    this.finalComposer.setSize(width, height);
  }

  public render() {
    super.scene.traverse(
      this.selectiveRenderHelpers.darkenNonBloomed.bind(
        this.selectiveRenderHelpers
      )
    );
    super.render();
    super.scene.traverse(
      this.selectiveRenderHelpers.restoreMaterial.bind(
        this.selectiveRenderHelpers
      )
    );
    this.finalComposer.render();
  }
}

export default SelectiveGlowEffect;
