import "./style.css";
import ForceGraph3D from "3d-force-graph";
import Node from "./components/Node";
import * as THREE from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

const N: number = 2;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const Graph = ForceGraph3D({ controlType: "orbit" })(
  document.getElementById("graph")!
).graphData(gData);

Graph.showNavInfo(false).backgroundColor("#000000");

(Graph.controls() as any).enableDamping = true;

Graph.nodeThreeObject(
  (_) =>
    new Node({
      radius: 3,
      color: new THREE.Color("white"),
      position: [0, 0, 0],
    }).mesh
);

console.log(Graph.d3Force("link")!.distance(100));

Graph.d3Force("center")!.strength(0.05);

Graph.onNodeClick((node: any) => {
  // Aim at node from outside it
  const distance = 40;
  const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

  const newPos =
    node.x || node.y || node.z
      ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
      : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

  Graph.cameraPosition(
    newPos, // new position
    node, // lookAt ({ x, y, z })
    3000 // ms transition duration
  );
});

const bloomPass: UnrealBloomPass = new UnrealBloomPass(
  new THREE.Vector2(Graph.width(), Graph.height()),
  2,
  0,
  0
);

// const bloomPass = new UnrealBloomPass();
// bloomPass.strength = 3;
// bloomPass.radius = 1;
// bloomPass.threshold = 0.1;
Graph.postProcessingComposer().addPass(bloomPass);

Graph.postProcessingComposer();
