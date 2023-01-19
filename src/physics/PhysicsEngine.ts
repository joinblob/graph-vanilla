import PointObject from "./PointObject";
import * as d3 from "d3-force-3d";
import emitter from "../factories/GraphEvents";

class PhysicsEngine {
  private static simulation: any;
  private static pointObjects: Array<PointObject>;

  public static init(
    nodes: Array<PointObject>,
    graph: Array<Array<number>>
  ): void {
    this.pointObjects = nodes;
    this.initSimulation(nodes);
    this.initLinks(nodes, graph);
    this.initRepulsion();
    this.initCentering();
    this.initDragging();
  }

  public static step(): void {
    this.simulation.tick();
    this.updateNodes();
  }

  private static updateNodes(): void {
    const nodes: Array<any> = this.simulation.nodes();
    for (let i = 0; i < nodes.length; i++)
      this.pointObjects[i].updatePosition(nodes[i].x, nodes[i].y, nodes[i].z);
  }

  private static initRepulsion(): void {
    this.simulation.force("charge", d3.forceManyBody().strength(-1));
  }

  private static initCentering(): void {
    this.simulation.force("center", d3.forceCenter().strength(0.52));
  }

  private static initDragging(): void {
    emitter.on("drag", (_) => {
      console.log("dragging");
      // this.simulation.alphaTarget(0.3);
    });

    emitter.on("dragEnd", (_) => {
      // this.simulation.alphaTarget(0);
    });
  }

  private static initSimulation(nodes: Array<PointObject>): void {
    this.simulation = d3.forceSimulation(nodes, 3);
    this.simulation.stop();
  }

  private static initLinks(
    nodes: Array<PointObject>,
    graph: Array<Array<number>>
  ): void {
    const links: Array<any> = [];
    for (let i = 1; i < graph.length; i++) {
      links.concat(this.createLinksFromRaw(nodes, graph[i]));
    }
    this.simulation.force(
      "link",
      d3.forceLink(links).distance(1).strength(0.1)
    );
  }

  private static createLinksFromRaw(
    nodes: Array<PointObject>,
    rawLinks: Array<number>
  ) {
    const core: PointObject = nodes[rawLinks[0]];
    const links: Array<any> = [];
    for (let i = 1; i < rawLinks.length; i++) {
      links.push({
        source: core,
        target: nodes[rawLinks[i]],
      });
    }
    return links;
  }
}

export default PhysicsEngine;
