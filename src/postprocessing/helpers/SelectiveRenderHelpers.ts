import Selection from "./Selection";
import * as THREE from "three";

class SelectiveRenderHelpers {
  private materials: Map<String, THREE.Material | THREE.Material[]> = new Map();
  private glowLayer: THREE.Layers;

  constructor(selection: Selection) {
    this.glowLayer = selection.layer;
  }

  public darkenNonBloomed(obj: THREE.Object3D<THREE.Event>): void {
    if ((<THREE.Mesh>obj).isMesh && this.glowLayer.test(obj.layers) === false) {
      this.materials.set(obj.uuid, (<THREE.Mesh>obj).material);
      (<THREE.Mesh>obj).material = new THREE.MeshBasicMaterial({
        color: "black",
      });
    }
  }

  public restoreMaterial(obj: THREE.Object3D<THREE.Event>): void {
    if (this.materials.has(obj.uuid)) {
      (<THREE.Mesh>obj).material = this.materials.get(obj.uuid)!;
      this.materials.delete(obj.uuid);
    }
  }
}

export default SelectiveRenderHelpers;
