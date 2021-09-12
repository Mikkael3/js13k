import { GameObject, Sprite, Text } from 'kontra';

class Screen extends GameObject.class {
  public o = 20;
  constructor(texts: string[], textSize = 60) {
    super({ x: 0, y: 0 });
    this.addChild(
      new Sprite({
        x: 0,
        y: 0,
        width: 800,
        height: 640,
      })
    );
    texts.forEach((text, i) => {
      this.text(120, text, textSize, i === 0 ? 'red' : 'orange');
    });
  }
  text = (x: number, text: string, size: number, color): void => {
    const label = new Text({
      x,
      y: 0,
      text,
      font: `${size}px fantasy`,
      color: color,
      textAlign: 'center',
    });
    label.y = this.o;
    this.o += label.height;
    label.x = (800 - label.width) / 2;
    this.addChild(label);
  };
}

export default Screen;
