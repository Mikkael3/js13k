import { keyPressed, Scene, Sprite, TileEngine } from 'kontra';

class Orangutan extends Sprite.class {
  constructor(private canvas: HTMLCanvasElement, private map: TileEngine) {
    super({
      x: 390, // starting x,y position of the sprite
      y: 600,
      color: 'orange', // fill color of the sprite rectangle
      width: 20, // width and height of the sprite rectangle
      height: 40,
    });
    this.map.sy = this.map.mapheight - canvas.height;
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
    if (this.x > this.canvas.width - this.width) {
      this.dx = 0;
      this.x = this.canvas.width - this.width;
    } else if (this.x < 0) {
      this.dx = 0;
      this.x = 0;
    }
    // Bottom border
    if (this.y > 600) {
      this.dy = 0;
      this.y = 600;
    }

    this.advance();

    if (this.parent instanceof Scene) {
      const startCameraFollow = this.canvas.height / 2;
      const y = this.y > startCameraFollow ? startCameraFollow : this.y;
      if (this.map.sy > 0)
        this.parent.lookAt({ y: y, x: this.canvas.width / 2 });
      this.map.sx = 16;
      const sy =
        this.y > startCameraFollow
          ? this.map.mapheight - this.canvas.height
          : this.map.mapheight -
            this.canvas.height -
            (startCameraFollow - this.y);
      this.map.sy = sy > 0 ? sy : 0;
    }
  };
}

export default Orangutan;
