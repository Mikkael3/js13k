import { Sprite, Vector } from 'kontra';
import Play from '../scenes/play';

class Enemy extends Sprite.class {
  constructor() {
    super({
      x: 0,
      y: 0,
      width: 20,
      height: 20,
      color: 'red',
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
    }
    this.advance();
  }
}

export default Enemy;
