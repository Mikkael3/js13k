import { Sprite, Vector } from 'kontra';

class Projectile extends Sprite.class {
  constructor(
    x: number,
    y: number,
    direction: Vector,
    projectileSpeed: number,
    width = 6,
    height = 6,
    color = 'gray'
  ) {
    super({
      x: x,
      y: y,
      width: width,
      height: height,
      color: color,
      ttl: 120,
      dx: direction.normalize().x * projectileSpeed,
      dy: direction.normalize().y * projectileSpeed,
    });
  }

  update(): void {
    this.advance();
    if (!this.isAlive()) {
      this.parent?.removeChild(this);
    }
  }
}

export default Projectile;
