import { GameObject, Sprite, Text } from 'kontra';

class Screen extends GameObject.class {
  public offsetY = 20;
  constructor(texts: string[], textSize = 60) {
    super({ x: 0, y: 0 });
    this.addChild(
      new Sprite({
        x: 0,
        y: 0,
        width: 800,
        height: 640,
        color: 'black',
      })
    );
    texts.forEach((text, i) => {
      this.text(120, text, textSize);
    });
  }
  text = (x: number, text: string, size: number): void => {
    const label = new Text({
      x,
      y: 0,
      text,
      font: `${size}px fantasy`,
      color: 'orange',
      textAlign: 'center',
    });
    label.y = this.offsetY;
    this.offsetY += label.height;
    label.x = (800 - label.width) / 2;
    this.addChild(label);
  };
}

export default Screen;
