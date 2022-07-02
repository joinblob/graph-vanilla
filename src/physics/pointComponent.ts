import * as THREE from "three";
import World from "./World";

type props = {
  mesh: THREE.Mesh;
  mass: number;
};

class PointObject {
  private velocity: THREE.Vector3;
  private props: props;
  constructor(props: props) {
    this.props = props;
    this.velocity = new THREE.Vector3(0, 0, 0);
  }

  public applyVelocity() {
    this.applyFriction();
    this.props.mesh.position.add(this.velocity);
  }

  private applyAcceleration(acceleration: THREE.Vector3) {
    this.velocity.add(acceleration);
  }

  public applyForce(force: THREE.Vector3): void {
    const acceleration: THREE.Vector3 = force.divideScalar(this.props.mass);
    this.applyAcceleration(acceleration);
  }

  private applyFriction(): void {
    if (this.velocity.length() <= World.friction) this.velocity.set(0, 0, 0);
    else {
      const frictionVector: THREE.Vector3 = this.velocity
        .normalize()
        .multiplyScalar(-World.friction);
      this.applyForce(frictionVector);
    }
  }
}

export default PointObject;
