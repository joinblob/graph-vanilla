import Edge from "../../components/Edge";
import Node from "../../components/Node";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import ThreeState from "../../ThreeState";
import emitter from "../GraphEvents";

class System {
  private node: Node;
  private startEdges: Array<Edge> = [];
  private endEdges: Array<Edge> = [];

  constructor(node: Node) {
    this.node = node;
    this.setupControls();
  }

  private setupControls(): void {
    const controls: DragControls = new DragControls(
      [this.node.mesh],
      ThreeState.camera,
      ThreeState.renderer.domElement
    );

    controls.addEventListener("hoveron", this.hoveronHandler.bind(this));

    controls.addEventListener("hoveroff", this.hoveroffHandler.bind(this));

    controls.addEventListener("drag", this.dragHandler.bind(this));
  }

  private dragHandler(_: any): void {
    this.orientEdges(this.node.position);
    emitter.emit("drag", this.node);
  }

  private hoveronHandler(_: any): void {
    ThreeState.orbitControls.enabled = false;
    this.highlight();
    emitter.emit("hoveron", this.node);
  }

  private hoveroffHandler(_: any): void {
    ThreeState.orbitControls.enabled = true;
    this.unHighlight();
    emitter.emit("hoveronoff", this.node);
  }

  public addStartEdge(edge: Edge): void {
    this.startEdges.push(edge);
  }

  public addEndEdge(edge: Edge): void {
    this.endEdges.push(edge);
  }

  public set position(position: [number, number, number]) {
    this.node.position = position;
    this.orientEdges(position);
  }

  private orientEdges(position: [number, number, number]): void {
    for (let startEdge of this.startEdges) startEdge.start = position;
    for (let endEdge of this.endEdges) endEdge.end = position;
  }

  public highlight(): void {
    this.node.color = "orange";
    for (let startEdge of this.startEdges) startEdge.color = "orange";
    for (let endEdge of this.endEdges) endEdge.color = "orange";
  }

  public unHighlight(): void {
    this.node.color = "white";
    for (let startEdge of this.startEdges) startEdge.color = "white";
    for (let endEdge of this.endEdges) endEdge.color = "white";
  }

  public get position(): [number, number, number] {
    return this.node.position;
  }
}

export default System;
