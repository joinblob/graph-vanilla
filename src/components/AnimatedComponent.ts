import * as THREE from "three";

abstract class AnimatedComponent {
  // todo: make this function accept scene and props as an argument
  protected abstract build(): void;
  public abstract get mesh(): THREE.Mesh;
  abstract animate(): void;
}

export default AnimatedComponent;
