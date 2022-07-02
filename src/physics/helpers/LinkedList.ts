import Node from "./Node";

class LinkedList<T> {
  private current: Node<T> | null = null;
  private iterator: Node<T> | null = null;
  private prevIterator: Node<T> | null = null;

  public add(value: T): void {
    if (this.current == null) {
      this.current = new Node<T>(value);
      this.iterator = this.current;
    } else {
      this.current!.nextNode = new Node<T>(value);
      this.current = this.current!.nextNode;
    }
  }

  public insertBefore(value: T): void {
    const node: Node<T> = new Node<T>(value);
    if (this.prevIterator != null) this.prevIterator!.nextNode = node;
    node.nextNode = this.iterator;
    this.prevIterator = node;
  }

  public hasNext(): boolean {
    return (
      this.iterator != null &&
      (this.prevIterator == null || this.iterator.nextNode != null)
    );
  }

  public next(): T {
    if (this.prevIterator != null) {
      this.prevIterator = this.iterator;
      this.iterator = this.iterator!.nextNode;
      return this.iterator!.value;
    } else {
      this.prevIterator = this.iterator;
      return this.iterator!.value;
    }
  }

  public delete(): T {
    let deleted: Node<T> | null = null;
    if (this.prevIterator != null) {
      this.prevIterator!.nextNode = this.iterator!.nextNode;
      deleted = this.iterator;
      this.iterator = this.iterator!.nextNode;
    } else {
      deleted = this.iterator;
      this.iterator = this.iterator!.nextNode;
    }
    return deleted!.value;
  }
}

export default LinkedList;
