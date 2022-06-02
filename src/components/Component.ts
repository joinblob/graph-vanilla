import * as THREE from "three";

abstract class Component {
  // todo: make this function accept scene and props as an argument
  protected abstract build(): THREE.Mesh;
}

export default Component;
