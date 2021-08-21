import { keyPressed, Scene, Sprite } from 'kontra';

class Orangutan extends Sprite.class {
  constructor(private canvas: HTMLCanvasElement) {
    super({
      x: 390, // starting x,y position of the sprite
      y: 600,
      color: 'red', // fill color of the sprite rectangle
      width: 20, // width and height of the sprite rectangle
      height: 40,
    });
  }

  update(): void {
    if (keyPressed('left')) {
      this.dx = -2;
    } else if (keyPressed('right')) {
      this.dx = 2;
    } else {
      this.dx = 0;
    }
    if (keyPressed('up')) {
      this.dy = -2;
    } else if (keyPressed('down')) {
      this.dy = 2;
    } else {
      this.dy = 0;
    }
    if (this.x > this.canvas.width - this.width * 1.5) {
      this.dx = 0;
      this.x = this.canvas.width - this.width * 1.5;
    } else if (this.x < -10) {
      this.dx = 0;
      this.x = -10;
    }
    if (this.y > 600) {
      this.dy = 0;
      this.y = 600;
    }
    this.advance();
    if (this.parent instanceof Scene) {
      const y = this.y > 320 ? 320 : this.y;
      this.parent.lookAt({ y: y, x: 390 });
    }
  }
}

export default Orangutan;
