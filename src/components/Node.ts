import * as THREE from "three";
import Component from "./core/Component";
import ThreeState from "../ThreeState";
import EffectHelper from "../postprocessing/helpers/EffectHelper";

type props = {
  info: String;
  radius?: number;
  color?: THREE.Color;
  position?: [number, number, number];
};

class Node extends Component {
  private props: props;
  private node: THREE.Mesh;

  constructor(props: props) {
    const defaultPosition: [number, number, number] = [0, 0, 0];
    const defaults = {
      radius: 0.5,
      color: new THREE.Color("white"),
      position: defaultPosition,
    };
    super();
    this.props = {
      ...defaults,
      ...props,
    };
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
    node.position.set(...this.props.position!);
    ThreeState.scene.add(node);
    EffectHelper.applyGlowEffect(node);
    return node;
  }

  public get mesh(): THREE.Mesh {
    return this.node;
  }

  public get position(): [number, number, number] {
    const position: [number, number, number] = [
      this.node.position.x,
      this.node.position.y,
      this.node.position.z,
    ];
    return position;
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
