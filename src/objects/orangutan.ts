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
    const acceleration = 0.14;
    if (keyPressed('left') || keyPressed('j')) {
      this.ddx = -acceleration;
      this.ddy = 0;
      this.dx = -Math.abs(this.dx) - Math.abs(this.dy);
      this.dy = 0;
      this.rotation = degToRad(-90);
    } else if (keyPressed('right') || keyPressed('l')) {
      this.ddx = acceleration;
      this.ddy = 0;
      this.dx = Math.abs(this.dx) + Math.abs(this.dy);
      this.dy = 0;
      this.rotation = degToRad(90);
    } else if (keyPressed('up') || keyPressed('i')) {
      this.ddx = 0;
      this.ddy = -acceleration;
      this.dy = -Math.abs(this.dy) - Math.abs(this.dx);
      this.dx = 0;
      this.rotation = degToRad(0);
    } else if (keyPressed('down') || keyPressed('k')) {
      this.ddx = 0;
      this.ddy = acceleration;
      this.dy = Math.abs(this.dy) + Math.abs(this.dx);
      this.dx = 0;
      this.rotation = degToRad(180);
    } else {
      this.ddx = 0;
      this.ddy = 0;
    }

    // Deceleration
    this.dx = Math.sign(this.dx) * Math.max(Math.abs(this.dx) - 0.1, 0);
    this.dy = Math.sign(this.dy) * Math.max(Math.abs(this.dy) - 0.1, 0);

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
    // Cap max speed
    const maxSpeed = 2.5;
    this.dy =
      Math.sign(this.dy) * Math.min(Math.abs(this.dy), Math.abs(maxSpeed));
    this.dx =
      Math.sign(this.dx) * Math.min(Math.abs(this.dx), Math.abs(maxSpeed));

    this.syncCamera();
  };
}

export default Orangutan;
