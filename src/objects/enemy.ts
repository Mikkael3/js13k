import { Sprite, Vector } from 'kontra';
import collides from '../helpers/collides';
import Play from '../scenes/play';
import Projectile from './projectile';
import explodePool from './explode-pool';
import calculateCanvasYPosition from '../helpers/calculate-canvas-y-position';

class Enemy extends Sprite.class {
  public cooldownCounter = 0;
  public standstillCounter = 0;
  public attackWindupCounter = 0;
  public parent: Play;
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
    public attackWindup = 30, // Windup before attacking
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
    const player = this.parent.player;
    if (!player) return;
    if (collides(this.parent.player, this)) {
      this.handleBulldozerCollision();
      return;
    }
    const vectorToPlayer = new Vector(player.x - this.x, player.y - this.y);
    if (this.attackWindupCounter > 0) {
      if (this.attackWindupCounter >= this.attackWindup) {
        this.shoot(vectorToPlayer);
        this.attackWindupCounter = 0;
      } else {
        this.attackWindupCounter++;
      }
      return;
    }
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
    if (vectorToPlayer.length() < this.attackRange) {
      if (this.cooldownCounter <= 0) {
        this.cooldownCounter = this.attackCooldown;
        this.attackWindupCounter++;
        this.standstillCounter = this.attackStandStillTime;
      }
    }
    this.cooldownCounter = Math.max(this.cooldownCounter - 1, 0);
    this.standstillCounter = Math.max(this.standstillCounter - 1, 0);
  }

  private handleBulldozerCollision(): void {
    let i = 0;
    while (i < 20) {
      const objectY = this.parent.y + this.y + this.height / 2;
      const y = calculateCanvasYPosition(this.parent.map, objectY);
      explodePool.get({
        x: this.parent.x + this.x + this.width / 2,
        y,
        width: 4,
        height: 4,
        anchor: { x: 0.5, y: 0.5 },
        dx: (1 - Math.random() * 2) * 0.8,
        dy: (1 - Math.random() * 2) * 0.8,
        color: i % 2 ? 'red' : 'darkred',
        ttl: 25,
      });
      i++;
    }
    this.parent.removeChild(this);
  }

  shoot(direction: Vector): void {
    const projectileSpeed = 2;
    const projectile = new Projectile(
      this.x,
      this.y,
      direction,
      projectileSpeed,
      this.attackDamage
    );
    this.parent?.addChild(projectile);
  }
}

export default Enemy;
