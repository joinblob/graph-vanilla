import Component from "./core/Component";
import * as THREE from "three";
import ThreeState from "../ThreeState";
import EffectHelper from "../postprocessing/helpers/EffectHelper";

type props = {
  start: [number, number, number];
  end: [number, number, number];
  color?: THREE.Color;
};

class Edge extends Component {
  private props: props;
  private edge: THREE.Mesh;

  constructor(props: props) {
    super();
    const defaults = {
      color: new THREE.Color("white"),
    };
    this.props = {
      ...defaults,
      ...props,
    };
    this.edge = this.build();
  }

  protected build(): THREE.Mesh {
    const start: THREE.Vector3 = new THREE.Vector3(...this.props.start);
    const end: THREE.Vector3 = new THREE.Vector3(...this.props.end);
    const edgeVector: THREE.Vector3 = new THREE.Vector3().subVectors(
      end,
      start
    );
    const height: number = edgeVector.length();

    const geometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(
      0.01,
      0.01,
      1,
      3
    );

    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: this.props.color,
    });

    const line: THREE.Mesh = new THREE.Mesh(geometry, material);

    line.scale.y = height;

    const initialAxis = new THREE.Vector3(0, 1, 0);
    line.quaternion.setFromUnitVectors(initialAxis, edgeVector.normalize());

    line.position.set(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2,
      (start.z + end.z) / 2
    );

    ThreeState.scene.add(line);
    EffectHelper.applyGlowEffect(line);

    return line;
  }

  public set start(position: [number, number, number]) {
    this.props.start = position;
    const start: THREE.Vector3 = new THREE.Vector3(...position);
    const end: THREE.Vector3 = new THREE.Vector3(...this.props.end);
    const edgeVector: THREE.Vector3 = new THREE.Vector3().subVectors(
      end,
      start
    );

    const height: number = edgeVector.length();
    this.edge.scale.y = height;

    const initialAxis = new THREE.Vector3(0, 1, 0);
    this.edge.quaternion.setFromUnitVectors(
      initialAxis,
      edgeVector.normalize()
    );

    this.edge.position.set(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2,
      (start.z + end.z) / 2
    );
  }

  public set end(position: [number, number, number]) {
    this.props.end = position;
    const start: THREE.Vector3 = new THREE.Vector3(...this.props.start);
    const end: THREE.Vector3 = new THREE.Vector3(...position);
    const edgeVector: THREE.Vector3 = new THREE.Vector3().subVectors(
      end,
      start
    );

    const height: number = edgeVector.length();
    this.edge.scale.y = height;

    const initialAxis = new THREE.Vector3(0, 1, 0);
    this.edge.quaternion.setFromUnitVectors(
      initialAxis,
      edgeVector.normalize()
    );

    this.edge.position.set(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2,
      (start.z + end.z) / 2
    );
  }

  public set color(color: string) {
    this.edge.material = new THREE.MeshBasicMaterial({
      color: color,
    });
  }

  public get mesh(): THREE.Mesh {
    return this.edge;
  }
}

export default Edge;
