import Edge from "./Edge";
import Node from "./Node";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import ThreeState from "../ThreeState";

class System {
  private node: Node;
  private startEdges: Array<Edge> = [];
  private endEdges: Array<Edge> = [];
  // used for judging highlighting when dragging
  private isHighlighted: boolean = false;
  private isDragging: boolean = false;

  constructor(node: Node) {
    this.node = node;
    this.setupControls;
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

    controls.addEventListener("dragend", this.dragendHandler.bind(this));
  }

  private dragHandler(_: any): void {
    this.isDragging = true;
    this.orientEdges(this.node.position);
  }

  private hoveronHandler(_: any): void {
    ThreeState.orbitControls.enabled = false;
    if (!this.isDragging) this.highlight();
  }

  private hoveroffHandler(_: any): void {
    ThreeState.orbitControls.enabled = true;
    if (!this.isDragging) this.unHighlight();
  }

  private dragendHandler(_: any): void {
    this.isDragging = false;
    if (this.isHighlighted) this.unHighlight();
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
    this.node.color = "yellow";
    for (let startEdge of this.startEdges) startEdge.color = "yellow";
    for (let endEdge of this.endEdges) endEdge.color = "yellow";
    this.isHighlighted = true;
  }

  public unHighlight(): void {
    this.node.color = "white";
    for (let startEdge of this.startEdges) startEdge.color = "white";
    for (let endEdge of this.endEdges) endEdge.color = "white";
    this.isHighlighted = false;
  }

  public get position(): [number, number, number] {
    return this.node.position;
  }
}

export default System;
