import { Sprite, Vector } from 'kontra';
import Play from '../scenes/play';
import collides from '../helpers/collides';

class Enemy extends Sprite.class {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    public visionRange = 350
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
      const vectorToPlayer = Vector(player.x - this.x, player.y - this.y);
      if (vectorToPlayer.length() < this.visionRange) {
        this.dx = vectorToPlayer.normalize().x * enemySpeed;
        this.dy = vectorToPlayer.normalize().y * enemySpeed;
        this.advance();
      }
      if (collides(this.parent.player, this)) {
        this.parent.removeChild(this);
      }
    }
  }
}

export default Enemy;
