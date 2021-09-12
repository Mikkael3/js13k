import { Sprite, Vector } from 'kontra';
import collides from '../helpers/collides';
import Play from '../scenes/play';
import Projectile from './projectile';
import explodePool from './explode-pool';
import calculateCanvasYPosition from '../helpers/calculate-canvas-y-position';
import Building from './building';

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
        let xOffset = 0;
        if (this.x + this.width / 2 < building.x + building.width / 2) {
          // On left side of the building
          xOffset = this.x + this.width - building.x;
        } else {
          // On right side of the building
          xOffset = this.x - building.x - building.width;
        }

        let yOffset = 0;
        if (this.y + this.height / 2 < building.y + building.height / 2) {
          // Above the building
          yOffset = this.y + this.height - building.y;
        } else {
          // Below the building
          yOffset = this.y - building.y - building.height;
        }

        if (Math.abs(xOffset) < Math.abs(yOffset)) {
          this.x -= xOffset;
        } else {
          this.y -= yOffset;
        }

        return;
      }
      return;
    });
  }
}

export default Enemy;
