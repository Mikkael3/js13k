import { Sprite, Vector } from 'kontra';
import collides, { handleObjectBuildingCollision } from '../helpers/collides';
import Play from '../scenes/play';
import Building from './building';
import { getExplosion } from './explode-pool';
import Projectile from './projectile';

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
    public moveSpeed = 1,
    public visionRange = 350,
    public attackRange = 100,
    public attackCooldown = 90, // frames
    public attackStandStillTime = 30, // After attacking, stand still for a moment
    public attackWindup = 30, // Windup before attacking
    public attackDamage = 1,
    public projectileSpeed = 2,
    public projectileColor = 'gray'
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
    const player = this.parent.player;
    if (!player) return;
    if (collides(this.parent.player, this)) {
      this.handleBulldozerCollision();
      return;
    }
    this.handleBuildingCollision();
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
      this.dx = vectorToPlayer.normalize().x * this.moveSpeed * direction;
      this.dy = vectorToPlayer.normalize().y * this.moveSpeed * direction;
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
      getExplosion(this, {
        color: i % 2 ? 'red' : 'darkred',
        ttl: 25,
      });
      i++;
    }
    this.parent.removeChild(this);
  }

  shoot(direction: Vector): void {
    const projectile = new Projectile(
      this.x,
      this.y,
      direction,
      this.projectileSpeed,
      this.attackDamage,
      this.projectileColor
    );
    this.parent?.addChild(projectile);
  }

  handleBuildingCollision(): void {
    this.parent.children.forEach((building) => {
      if (!(building instanceof Building)) return;
      if (collides(this, building)) {
        handleObjectBuildingCollision(this, building);
      }
    });
  }
}

export default Enemy;
