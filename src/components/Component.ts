import * as THREE from "three";

abstract class Component {
  // todo: make this function accept scene and props as an argument
  protected abstract build(): THREE.Mesh;
  public abstract get mesh(): THREE.Mesh;
}

export default Component;
