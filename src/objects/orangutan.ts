import { degToRad, keyPressed, Sprite, TileEngine } from 'kontra';
import Play from '../scenes/play';
import { getExplosion } from './explode-pool';

class Orangutan extends Sprite.class {
  public maxHealth = 20;
  public health = this.maxHealth;
  public parent: Play;

  constructor(
    private canvas: HTMLCanvasElement,
    private map: TileEngine,
    sprite: HTMLImageElement
  ) {
    super({
      x: 390,
      y: 600,
      anchor: { x: 0.5, y: 0.5 },
      image: sprite,
      rotation: 0,
    });
    this.map.sy = this.map.mapheight - canvas.height;
  }

  syncCamera(): void {
    const startCameraFollow = this.canvas.height / 2;
    const y = this.y > startCameraFollow ? startCameraFollow : this.y;
    if (this.y - this.canvas.height / 2 > this.parent.sy) return;
    if (this.map.sy > 0) this.parent.lookAt({ y: y, x: this.canvas.width / 2 });
    this.map.sx = 16;
    const sy =
      this.y > startCameraFollow
        ? this.map.mapheight - this.canvas.height
        : this.map.mapheight -
          this.canvas.height -
          (startCameraFollow - this.y);
    this.map.sy = sy > 0 ? sy : 0;
  }

  update(): void {
    this.handleControls();
    this.syncCamera();
    this.children.forEach((child) => child.update());
  }

  private handleControls(): void {
    const maxSpeed = 2.5;
    const acceleration = 0.13;
    const deceleration = 0.1;

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
    this.dx =
      Math.sign(this.dx) * Math.max(Math.abs(this.dx) - deceleration, 0);
    this.dy =
      Math.sign(this.dy) * Math.max(Math.abs(this.dy) - deceleration, 0);

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

    if (this.parent.sy + this.canvas.height - 20 < this.y) {
      this.y = this.parent.sy + this.canvas.height - 20;
      this.dy = 0;
    }
    this.advance();
    // Cap max speed
    this.dy =
      Math.sign(this.dy) * Math.min(Math.abs(this.dy), Math.abs(maxSpeed));
    this.dx =
      Math.sign(this.dx) * Math.min(Math.abs(this.dx), Math.abs(maxSpeed));
  }

  public handleHitBuilding(): void {
    this.dx /= 4;
    this.dy /= 4;
  }
  public handleHardHitBuilding(): void {
    this.dx = 0;
    this.dy = 0;
  }

  public takeDamage(damage: number): void {
    for (let i = 0; i < damage + 1; i++) {
      getExplosion(this, {
        color: i % 2 ? 'yellow' : 'gray',
        ttl: 25,
        offsetY: -this.height / 2,
        offsetX: -this.height / 2,
      });
    }
    this.health -= damage;
    if (this.health <= 0) this.parent.showTitle();

    const damageHue = new Sprite({
      x: 0,
      y: 0,
      anchor: this.anchor,
      width: this.width,
      height: this.height,
      color: 'red',
      ttl: 8,
      opacity: 0.3,
      update: (): void => {
        if (!damageHue.isAlive()) {
          this.removeChild(damageHue);
        }
        damageHue.ttl--;
      },
    });
    this.addChild(damageHue);
  }
}

export default Orangutan;
