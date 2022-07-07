import SystemHelper from "./helpers/SystemHelper";
import Graph from "../../testData/GraphDataType";

class GraphFactory {
  public static buildGraph(rawGraph: Graph): void {
    const nodes = rawGraph.nodes;
    const graph = rawGraph.graph;

    SystemHelper.init(nodes);

    for (let rawSystem of graph) {
      SystemHelper.createSystem(nodes, rawSystem);
    }
  }
}

export default GraphFactory;
