import { degToRad, keyPressed, Scene, Sprite, TileEngine } from 'kontra';

class Orangutan extends Sprite.class {
  constructor(
    private canvas: HTMLCanvasElement,
    private map: TileEngine,
    sprite: HTMLImageElement
  ) {
    super({
      x: 390, // starting x,y position of the sprite
      y: 600,
      anchor: { x: 0.5, y: 0.5 },
      image: sprite,
      rotation: 0,
    });
    this.map.sy = this.map.mapheight - canvas.height;
    this.syncCamera();
  }

  syncCamera(): void {
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
  }

  update = (): void => {
    const speed = 2;
    if (keyPressed('left') || keyPressed('j')) {
      this.dx = -speed;
      this.rotation = degToRad(-90);
    } else if (keyPressed('right') || keyPressed('l')) {
      this.rotation = degToRad(90);
      this.dx = speed;
    } else {
      this.dx = 0;
    }
    if (keyPressed('up') || keyPressed('i')) {
      this.dy = -speed;
      this.dx = 0;
      this.rotation = degToRad(0);
    } else if (keyPressed('down') || keyPressed('k')) {
      this.dy = speed;
      this.dx = 0;
      this.rotation = degToRad(180);
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
    this.syncCamera();
  };
}

export default Orangutan;
