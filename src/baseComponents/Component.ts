import * as THREE from "three";

abstract class Component {
  protected abstract build(): Component;
}

export default Component;
