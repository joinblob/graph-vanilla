import * as THREE from "three";
import Component from "./Component";

type props = {
  radius: number;
  color: THREE.Color;
  position: [number, number, number];
};

class Node extends Component {
  private props: props;
  private node: THREE.Mesh;

  constructor(props: props) {
    super();
    this.props = props;
    this.node = this.build();
  }

  protected build(): THREE.Mesh {
    const geometry: THREE.IcosahedronGeometry = new THREE.IcosahedronGeometry(
      this.props.radius,
      15
    );
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: this.props.color,
    });
    const node: THREE.Mesh = new THREE.Mesh(geometry, material);
    node.position.set(...this.props.position);
    return node;
  }

  public get mesh(): THREE.Mesh {
    return this.node;
  }

  public set position(position: [number, number, number]) {
    this.node.position.set(...position);
  }

  public set color(color: string) {
    this.node.material = new THREE.MeshBasicMaterial({
      color: color,
    });
  }
}

export default Node;
