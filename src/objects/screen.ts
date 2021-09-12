import { GameObject, Sprite, Text } from 'kontra';

class Screen extends GameObject.class {
  constructor(texts: string[]) {
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
      this.text(120, 24 + i * 166, text);
    });
  }
  text = (x: number, y: number, text: string): void =>
    this.addChild(
      new Text({
        x,
        y,
        text,
        font: '60px fantasy',
        color: 'orange',
        textAlign: 'center',
      })
    );
}

export default Screen;
