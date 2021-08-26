import { Sprite, Vector } from 'kontra';
import Play from '../scenes/play';
import collides from '../helpers/collides';
import Projectile from './projectile';

class Enemy extends Sprite.class {
  public cooldownCounter = 0;
  public standstillCounter = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    public visionRange = 350,
    public attackRange = 100,
    public attackCooldown = 90, // frames
    public attackStandStillTime = 30, // After attacking, stand still for a moment
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
    const moveSpeed = 1;
    if (this.parent instanceof Play && this.parent.player) {
      const player = this.parent.player;
      const vectorToPlayer = new Vector(player.x - this.x, player.y - this.y);
      if (
        vectorToPlayer.length() < this.visionRange &&
        this.standstillCounter <= 0
      ) {
        const direction = vectorToPlayer.length() < this.attackRange ? -1 : 1;
        this.dx = vectorToPlayer.normalize().x * moveSpeed * direction;
        this.dy = vectorToPlayer.normalize().y * moveSpeed * direction;
        this.advance();
      } else {
        this.dx = 0;
        this.dy = 0;
      }
      if (collides(this.parent.player, this)) {
        this.parent.removeChild(this);
      }
      if (vectorToPlayer.length() < this.attackRange) {
        if (this.cooldownCounter <= 0) {
          this.shoot(vectorToPlayer);
          this.cooldownCounter = this.attackCooldown;
          this.standstillCounter = this.attackStandStillTime;
        }
      }
      this.cooldownCounter = Math.max(this.cooldownCounter - 1, 0);
      this.standstillCounter = Math.max(this.standstillCounter - 1, 0);
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
