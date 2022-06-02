abstract class AnimatedComponent {
  // todo: make this function accept scene and props as an argument
  protected abstract build(): void;
  abstract animate(): void;
}

export default AnimatedComponent;
