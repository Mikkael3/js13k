import { Sprite, Vector } from 'kontra';
import collides from '../helpers/collides';

export default (
  x: number,
  y: number,
  dir: Vector,
  shotSpeed: number,
  damage: number
): Sprite => {
  return new Sprite({
    x: x,
    y: y,
    width: 4.5,
    height: 4.5,
    ttl: 60,
    color: 'gray',
    dx: dir.normalize().x * shotSpeed,
    dy: dir.normalize().y * shotSpeed,
    draw(): void {
      const borderWidth = 0.8;
      this.context.fillStyle = 'black';
      this.context.beginPath();
      this.context.arc(0, 0, 4.5, 0, 2 * Math.PI);
      this.context.fill();

      this.context.fillStyle = 'gray';
      this.context.beginPath();
      this.context.arc(0, 0, 4.5 - borderWidth, 0, 2 * Math.PI);
      this.context.fill();
    },
    render(): void {
      this.draw();
    },
    update(): void {
      this.advance();
      if (!this.isAlive()) {
        this.parent?.removeChild(this);
      }
      if (this.parent?.player) {
        if (collides(this, this.parent.player)) {
          this.parent.player.takeDamage(damage);
          this.parent?.removeChild(this);
        }
      }
    },
  });
};
