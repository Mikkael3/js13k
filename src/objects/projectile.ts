import { Sprite, Vector } from 'kontra';
import collides from '../helpers/collides';
import Play from '../scenes/play';

class Projectile extends Sprite.class {
  constructor(
    x: number,
    y: number,
    d: Vector,
    s: number,
    public e: number,
    color = 'gray',
    public r = 4.5
  ) {
    super({
      x: x,
      y: y,
      width: r,
      height: r,
      color: color,
      ttl: 60,
      dx: d.normalize().x * s,
      dy: d.normalize().y * s,
    });
  }

  // Shape is circle but collision is still rectangle
  draw(): void {
    const borderWidth = 0.8;
    this.context.fillStyle = 'black';
    this.context.beginPath();
    this.context.arc(0, 0, this.r, 0, 2 * Math.PI);
    this.context.fill();

    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(0, 0, this.r - borderWidth, 0, 2 * Math.PI);
    this.context.fill();
  }

  update(): void {
    this.advance();
    if (!this.isAlive()) {
      this.parent?.removeChild(this);
    }
    if (this.parent instanceof Play && this.parent.p) {
      const player = this.parent.p;
      if (collides(this, this.parent.p)) {
        player.takeDamage(this.e);
        this.parent?.removeChild(this);
      }
    }
  }
}

export default Projectile;
