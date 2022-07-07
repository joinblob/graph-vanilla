import Edge from "../../components/Edge";
import Node from "../../components/Node";
import System from "./System";

class SystemHelper {
  private static systems: Array<System>;
  // only required without physics
  private static x: number = 0;

  public static init(nodes: Array<any>): void {
    this.systems = new Array<System>(nodes.length);
  }

  public static createSystem(nodes: Array<any>, raw: Array<number>): void {
    let coreSystem: System;

    if (!this.systems[raw[0]]) {
      const coreNode: Node = new Node({
        info: nodes[raw[0]],
        position: [this.x, 0, 0],
      });
      this.x++;
      coreSystem = new System(coreNode);
      SystemHelper.systems[raw[0]] = coreSystem;
    } else coreSystem = SystemHelper.systems[raw[0]];

    let system: System;
    let node: Node;
    let edge: Edge;

    for (let i = 1; i < raw.length; i++) {
      if (!this.systems[raw[i]]) {
        node = new Node({
          info: nodes[raw[i]],
          position: [this.x, 0, 0],
        });
        this.x++;
        system = new System(node);
        SystemHelper.systems[raw[i]] = system;
      } else system = SystemHelper.systems[raw[i]];
      edge = new Edge({
        start: coreSystem.position,
        end: system.position,
      });
      coreSystem.addStartEdge(edge);
      system.addEndEdge(edge);
    }
  }
}

export default SystemHelper;
