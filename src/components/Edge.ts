import Component from "./Component";
import * as THREE from "three";

type props = {
  start: [number, number, number];
  end: [number, number, number];
  color: THREE.Color;
};

class Edge extends Component {
  private props: props;
  private edge: THREE.Mesh;

  constructor(props: props) {
    super();
    this.props = props;
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
      0.05,
      0.05,
      height,
      3
    );

    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: this.props.color,
    });

    const line: THREE.Mesh = new THREE.Mesh(geometry, material);
    const initialAxis = new THREE.Vector3(0, 1, 0);
    line.quaternion.setFromUnitVectors(initialAxis, edgeVector.normalize());

    line.position.set(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2,
      (start.z + end.z) / 2
    );

    Graph.scene.add(line);

    return line;
  }

  public get mesh(): THREE.Mesh {
    return this.edge;
  }
}

export default Edge;
