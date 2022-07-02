import Edge from "../../components/Edge";
import Node from "../../components/Node";
import System from "./System";

class SystemHelper {
  private static systems: Map<String, System> = new Map();
  // only required without physics
  private static x: number = 0;

  public static createSystem(nodes: Array<any>, raw: Array<number>): void {
    let coreSystem: System;

    if (!this.systems.has(nodes[raw[0]])) {
      const coreNode: Node = new Node({
        info: nodes[raw[0]],
        position: [this.x, 0, 0],
      });
      this.x++;
      coreSystem = new System(coreNode);
      SystemHelper.systems.set(nodes[raw[0]], coreSystem);
    } else coreSystem = SystemHelper.systems.get(nodes[raw[0]])!;

    let system: System;
    let node: Node;
    let edge: Edge;

    for (let i = 1; i < raw.length; i++) {
      if (!SystemHelper.systems.has(nodes[raw[i]])) {
        node = new Node({
          info: nodes[raw[i]],
          position: [this.x, 0, 0],
        });
        this.x++;
        system = new System(node);
        SystemHelper.systems.set(nodes[raw[i]], system);
      } else system = SystemHelper.systems.get(nodes[raw[i]])!;
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
