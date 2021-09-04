import { Sprite, Vector } from 'kontra';
import collides from '../helpers/collides';

class Projectile extends Sprite.class {
  constructor(
    x: number,
    y: number,
    direction: Vector,
    projectileSpeed: number,
    public damage: number,
    color = 'gray',
    public radius = 4.5
  ) {
    super({
      x: x,
      y: y,
      width: radius,
      height: radius,
      color: color,
      ttl: 60,
      dx: direction.normalize().x * projectileSpeed,
      dy: direction.normalize().y * projectileSpeed,
    });
  }

  // Shape is circle but collision is still rectangle
  draw(): void {
    const borderWidth = 0.8;
    this.context.fillStyle = 'black';
    this.context.beginPath();
    this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.context.fill();

    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(0, 0, this.radius - borderWidth, 0, 2 * Math.PI);
    this.context.fill();
  }

  update(): void {
    this.advance();
    if (!this.isAlive()) {
      this.parent?.removeChild(this);
    }
    if (this.parent?.player) {
      const player = this.parent.player;
      if (collides(this, this.parent.player)) {
        player.takeDamage(this.damage);
        this.parent?.removeChild(this);
      }
    }
  }
}

export default Projectile;
