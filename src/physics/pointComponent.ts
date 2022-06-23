import * as THREE from "three";
import Component from "../components/core/Component";

abstract class PointComponent extends Component {
  protected abstract set velocity(velocity: THREE.Vector3);
  protected abstract set acceleration(acceleration: THREE.Vector3);
  protected abstract applyForce(force: THREE.Vector3): void;
}

export default PointComponent;
