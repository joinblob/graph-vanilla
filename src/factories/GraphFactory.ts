import SystemHelper from "./helpers/SystemHelper";
import Graph from "../../testData/GraphDataType";
import System from "./helpers/System";

class GraphFactory {
  public static buildGraph(rawGraph: Graph): Array<System> {
    const nodes = rawGraph.nodes;
    const graph = rawGraph.graph;

    SystemHelper.init(nodes);

    for (let rawSystem of graph) {
      SystemHelper.createSystem(nodes, rawSystem);
    }

    return SystemHelper.systems;
  }
}

export default GraphFactory;
