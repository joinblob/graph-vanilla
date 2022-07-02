import LinkedList from "./helpers/LinkedList";
import PointObject from "./pointComponent";

class PhysicsEngine {
  private static stable: LinkedList<PointObject> =
    new LinkedList<PointObject>();
  private static unstable: LinkedList<PointObject> =
    new LinkedList<PointObject>();

  public static declareCurrentUnstable(): void {
    const deleted: PointObject = PhysicsEngine.stable.delete();
    PhysicsEngine.unstable.insertBefore(deleted);
  }

  public static declareCurrentStable(): void {
    const deleted: PointObject = PhysicsEngine.unstable.delete();
    PhysicsEngine.stable.add(deleted);
  }
}

export default PhysicsEngine;
