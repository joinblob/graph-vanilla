import Selection from "./Selection";
import SelectiveGlowEffect from "../SelectiveGlowEffect";

class EffectHelper {
  // A key based or props based Effects should be created. If keys are same same effect should
  // be used, if props are same, same effect should be used.
  // Selections can be encapsulated inside the effects itself
  private static glowEffectSelection: Selection = new Selection();
  // Instead there should be an array of effects below
  private static glowEffect: SelectiveGlowEffect;

  public static applyGlowEffect(mesh: THREE.Mesh) {
    EffectHelper.glowEffectSelection.add(mesh);
  }

  public static buildGlowEffect(): void {
    EffectHelper.glowEffect = new SelectiveGlowEffect(
      EffectHelper.glowEffectSelection,
      {
        threshold: 0,
        strength: 2,
        radius: 0,
      }
    );
  }

  public static render(): void {
    // the render method needs to render all the effects created stored in an array
    EffectHelper.glowEffect.render();
  }

  public static onWindowResize(): void {
    // the render method needs to render all the effects created stored in an array
    EffectHelper.glowEffect.onWindowResize();
  }
}

export default EffectHelper;
