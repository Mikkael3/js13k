import { Sprite, Vector } from 'kontra';
import collides, { handleObjectBuildingCollision } from '../helpers/collides';
import Play from '../scenes/play';
import Building from './building';
import { getExplosion } from './explode-pool';
import Projectile from './projectile';

class Enemy extends Sprite.class {
  public cd = 0; // Cooldown
  public w = 0;
  public q = 0;
  public parent: Play;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    public s = 1,
    public v = 350,
    public a = 100,
    public t = 90, // Cooldown in frames
    public W = 30, // After attacking, stand still for a moment
    public u = 30, // Windup before attacking
    public p = 1,
    public k = 2, // projectile speed
    public m = 'gray'
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
    const player = this.parent.p;
    if (!player) return;
    if (collides(this.parent.p, this)) {
      this.handleBulldozerCollision();
      return;
    }
    this.handleBuildingCollision();
    const vectorToPlayer = new Vector(player.x - this.x, player.y - this.y);
    if (this.q > 0) {
      if (this.q >= this.u) {
        this.shoot(vectorToPlayer);
        this.q = 0;
      } else {
        this.q++;
      }
      return;
    }
    if (vectorToPlayer.length() < this.v && this.w <= 0) {
      const direction = vectorToPlayer.length() < this.a ? -1 : 1;
      this.dx = vectorToPlayer.normalize().x * this.s * direction;
      this.dy = vectorToPlayer.normalize().y * this.s * direction;
      this.advance();
    } else {
      this.dx = 0;
      this.dy = 0;
    }
    if (vectorToPlayer.length() < this.a) {
      if (this.cd <= 0) {
        this.cd = this.t;
        this.q++;
        this.w = this.W;
      }
    }
    this.cd = Math.max(this.cd - 1, 0);
    this.w = Math.max(this.w - 1, 0);
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
    const projectile = new Projectile(
      this.x,
      this.y,
      direction,
      this.k,
      this.p,
      this.m
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
