import { Sprite, Vector } from 'kontra';
import Play from '../scenes/play';
import collides from '../helpers/collides';
import Projectile from './projectile';

class Enemy extends Sprite.class {
  public cooldownCounter = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    public visionRange = 350,
    public attackRange = 100,
    public attackCooldown = 60, // frames
    public attackDamage = 1
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
      const vectorToPlayer = new Vector(player.x - this.x, player.y - this.y);
      if (vectorToPlayer.length() < this.visionRange) {
        this.dx = vectorToPlayer.normalize().x * enemySpeed;
        this.dy = vectorToPlayer.normalize().y * enemySpeed;
        this.advance();
      }
      if (collides(this.parent.player, this)) {
        this.parent.removeChild(this);
      }
      if (vectorToPlayer.length() < this.attackRange) {
        if (this.cooldownCounter <= 0) {
          this.shoot(vectorToPlayer);
          this.cooldownCounter = this.attackCooldown;
        }
      }
      this.cooldownCounter = Math.max(this.cooldownCounter - 1, 0);
    }
  }
  shoot(direction: Vector): void {
    const projectileSpeed = 2;
    const projectile = new Projectile(
      this.x,
      this.y,
      direction,
      projectileSpeed
    );
    this.parent?.addChild(projectile);
  }
}

export default Enemy;
