import { Sprite, Vector } from 'kontra';
import collides from '../helpers/collides';
import Play from '../scenes/play';

class Projectile extends Sprite.class {
  constructor(
    x: number,
    y: number,
    direction: Vector,
    projectileSpeed: number,
    public damage: number,
    color = 'gray',
    width = 6,
    height = 6
  ) {
    super({
      x: x,
      y: y,
      width: width,
      height: height,
      color: color,
      ttl: 60,
      dx: direction.normalize().x * projectileSpeed,
      dy: direction.normalize().y * projectileSpeed,
    });
  }

  update(): void {
    this.advance();
    if (!this.isAlive()) {
      this.parent?.removeChild(this);
    }
    if (this.parent instanceof Play && this.parent.player) {
      const player = this.parent.player;
      if (collides(this, this.parent.player)) {
        player.takeDamage(this.damage);
        this.parent?.removeChild(this);
      }
    }
  }
}

export default Projectile;
