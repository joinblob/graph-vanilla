import SystemHelper from "./helpers/SystemHelper";
import Graph from "../../testData/GraphDataType";

class GraphFactory {
  //   private graph: Array<Array<String>>;

  //   constructor(graph: Array<Array<String>>) {
  //     this.graph = graph;
  //   }

  public static buildGraph(rawGraph: Graph): void {
    const nodes = rawGraph.nodes;
    const graph = rawGraph.graph;

    SystemHelper.init(nodes);

    for (let rawSystem of graph) {
      SystemHelper.createSystem(nodes, rawSystem);
    }
  }

  //   protected build(): void {
  //     // create node systems for every graph node
  //     // pick a node and create a graph system for it
  //     // store the created nodes in a hashmap to check if they exist and fetch them
  //     // node system
  //     // a node has a changePosition function which simply changes the position of the node
  //     // node system also has a changePosition function which call this functiona and then
  //     // re-orients the edges in the system
  //     // node system also applies dragcontrols on the node
  //     // dragcontrol events that will be used
  //     // hoveron - to change color of the node and aligning edges and hoveroff to revert that
  //     // drag - to node changes in the position of the node and re-orients the edges in the
  //     // system
  //     // dragstart - to disable orbitcontrols and dragend to enable it
  //     // physics engine
  //     // when you start designing the physics engine implement force and velocity
  //     // for the nodes first and test it by simply adding the nodes - use coding train tutorials
  //     // after that its just the linked force maintainence and basic physics on it to apply
  //     // forces and velocities
  //     // Two parts
  //     // Non-linked engine
  //     // Keeps the buffer of the distance between each pair of nodes and updates it through the
  //     // node position change events
  //     // if the buffer has imbalances(produced by the distance being less than a threshold)
  //     // forces are applied
  //     // forces are used to calculate the change in position per frame to update it and apply it.
  //     // every node will have force and velocity as a property which when non zero effects are
  //     // produced in the animation loop
  //     // Linked engine
  //     // keeps the buffer of distances between the linked nodes and if there are
  //     // imbalances(produced by distance being greater than or less than a threshold) forces
  //     // are applied
  //   }
}

export default GraphFactory;
