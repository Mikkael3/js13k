import { keyPressed, Scene, Sprite } from 'kontra';

class Orangutan extends Sprite.class {
  constructor(private canvas: HTMLCanvasElement) {
    super({
      x: 390, // starting x,y position of the sprite
      y: 600,
      color: 'orange', // fill color of the sprite rectangle
      width: 20, // width and height of the sprite rectangle
      height: 40,
    });
  }

  draw(): void {
    this.context.fillStyle = this.color;
    this.context.fillRect(0, 0, this.width, this.height);
  }

  update = (): void => {
    const speed = 2;
    if (keyPressed('left') || keyPressed('j')) {
      this.dx = -speed;
    } else if (keyPressed('right') || keyPressed('l')) {
      this.dx = speed;
    } else {
      this.dx = 0;
    }
    if (keyPressed('up') || keyPressed('i')) {
      this.dy = -speed;
      this.dx = 0;
    } else if (keyPressed('down') || keyPressed('k')) {
      this.dy = speed;
      this.dx = 0;
    } else {
      this.dy = 0;
    }
    // Side borders
    if (this.x > this.canvas.width - this.width * 1.5) {
      this.dx = 0;
      this.x = this.canvas.width - this.width * 1.5;
    } else if (this.x < -10) {
      this.dx = 0;
      this.x = -10;
    }
    // Bottom border
    if (this.y > 600) {
      this.dy = 0;
      this.y = 600;
    }

    this.advance();
    if (this.parent instanceof Scene) {
      const y = this.y > 320 ? 320 : this.y;
      this.parent.lookAt({ y: y, x: 390 });
    }
  };
}

export default Orangutan;
