import Edge from "../Edge";
import Node from "../Node";
import System from "../System";

class SystemHelper {
  private static systems: Map<String, System> = new Map();
  // only required without physics
  private static x: number = 0;

  public static createSystem(raw: Array<String>): void {
    let coreSystem: System;

    if (!this.systems.has(raw[0])) {
      const coreNode: Node = new Node({
        info: raw[0],
        position: [this.x, 0, 0],
      });
      this.x++;
      coreSystem = new System(coreNode);
      SystemHelper.systems.set(raw[0], coreSystem);
    } else coreSystem = SystemHelper.systems.get(raw[0])!;

    let system: System;
    let node: Node;
    let edge: Edge;

    for (let i = 1; i < raw.length; i++) {
      if (!SystemHelper.systems.has(raw[i])) {
        node = new Node({
          info: raw[i],
          position: [this.x, 0, 0],
        });
        this.x++;
        system = new System(node);
        SystemHelper.systems.set(raw[i], system);
      } else system = SystemHelper.systems.get(raw[i])!;
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