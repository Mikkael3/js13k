import { Sprite, Vector } from 'kontra';
import collides, { handleObjectBuildingCollision } from '../helpers/collides';
import Play from '../scenes/play';
import Building from './building';
import { getExplosion } from './explode-pool';
import projectile from './projectile';

class Enemy extends Sprite.class {
  public cdCounter = 0; // Cooldown
  public waitCounter = 0;
  public windupCounter = 0;
  public parent: Play;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    public speed = 1,
    public visionRange = 350,
    public atkRange = 100,
    public attackCd = 90, // Cooldown in frames
    public atkWait = 30, // After attacking, stand still for a moment
    public atkWindup = 30, // Windup before attacking
    public atkDamage = 1,
    public projSpeed = 2, // projectile speed
    public projColor = 'gray'
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
    if (this.windupCounter > 0) {
      if (this.windupCounter >= this.atkWindup) {
        this.shoot(vectorToPlayer);
        this.windupCounter = 0;
      } else {
        this.windupCounter++;
      }
      return;
    }
    if (vectorToPlayer.length() < this.visionRange && this.waitCounter <= 0) {
      const direction = vectorToPlayer.length() < this.atkRange ? -1 : 1;
      this.dx = vectorToPlayer.normalize().x * this.speed * direction;
      this.dy = vectorToPlayer.normalize().y * this.speed * direction;
      this.advance();
    } else {
      this.dx = 0;
      this.dy = 0;
    }
    if (vectorToPlayer.length() < this.atkRange) {
      if (this.cdCounter <= 0) {
        this.cdCounter = this.attackCd;
        this.windupCounter++;
        this.waitCounter = this.atkWait;
      }
    }
    this.cdCounter = Math.max(this.cdCounter - 1, 0);
    this.waitCounter = Math.max(this.waitCounter - 1, 0);
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
    this.parent.addHumanScore();
    this.parent.removeChild(this);
  }

  shoot(direction: Vector): void {
    this.parent?.addChild(
      projectile(this.x, this.y, direction, this.projSpeed, this.atkDamage)
    );
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
