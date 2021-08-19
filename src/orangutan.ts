import { keyPressed, Sprite } from 'kontra';

class Orangutan extends Sprite.class {
  constructor(private canvas: HTMLCanvasElement) {
    super({
      x: 390, // starting x,y position of the sprite
      y: 590,
      color: 'red', // fill color of the sprite rectangle
      width: 20, // width and height of the sprite rectangle
      height: 40,
    });
  }

  update(): void {
    if (keyPressed('left')) {
      this.dx = -2;
      // left arrow pressed
    } else if (keyPressed('right')) {
      // right arrow pressed
      this.dx = 2;
    } else {
      this.dx = 0;
    }

    console.log(this.dx);

    if (keyPressed('up')) {
      this.dy = -2;
      // up arrow pressed
    } else if (keyPressed('down')) {
      this.dy = 2;
      // down arrow pressed
    } else {
      this.dy = 0;
    }
    if (this.x > this.canvas.width - 20) {
      this.dx = 0;
      this.x = 780;
    }
    if (this.x < 0) {
      this.dx = 0;
      this.x = 0;
    }
    if (this.y > 600) {
      this.dy = 0;
      this.y = 600;
    }
    this.advance();
  }
}

export default Orangutan;
