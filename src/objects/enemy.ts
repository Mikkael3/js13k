import { Sprite, Vector } from 'kontra';
import Play from '../scenes/play';
import collides from '../helpers/collides';

class Enemy extends Sprite.class {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    super({
      x: x,
      y: y,
      width: width,
      height: height,
      color: color,
    });
  }
  update(): void {
    const enemySpeed = 1;
    if (this.parent instanceof Play && this.parent.player) {
      const player = this.parent.player;
      const direction = Vector(
        player.x - this.x,
        player.y - this.y
      ).normalize();
      this.dx = direction.x * enemySpeed;
      this.dy = direction.y * enemySpeed;

      if (collides(this.parent.player, this)) {
        this.parent.removeChild(this);
      }

      this.advance();
    }
  }
}

export default Enemy;
