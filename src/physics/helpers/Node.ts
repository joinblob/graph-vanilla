class Node<T> {
  public value: T;
  public nextNode: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export default Node;
