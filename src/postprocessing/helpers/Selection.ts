import * as THREE from "three";

class Selection {
  private _layer: number;

  constructor(layer: number = 10) {
    this._layer = layer;
  }

  public add(selection: THREE.Object3D): void {
    selection.layers.enable(this._layer);
  }

  public get layer(): THREE.Layers {
    const layer = new THREE.Layers();
    layer.set(this._layer);
    return layer;
  }
}

export default Selection;
