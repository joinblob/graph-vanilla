import * as THREE from "three";

abstract class Component {
  // todo: make this function accept scene and props as an argument
  protected abstract build(): THREE.Object3D;
  public abstract get mesh(): THREE.Object3D;
}

export default Component;
