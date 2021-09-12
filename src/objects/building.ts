import { Animation, GameObject, Sprite } from 'kontra';
import collides from '../helpers/collides';
import { createBasicEnemy } from '../helpers/enemy-factory';
import Play from '../scenes/play';
import { getExplosion } from './explode-pool';
import Orangutan from './orangutan';

class BuildingPart extends Sprite.class {
  public hitTime = 0;

  constructor(x: number, y: number, public hp: number, material: Animation) {
    super({
      x: x,
      y: y,
      width: 64,
      height: 64,
      animations: { idle: material },
    });
  }

  handleHit = (player: Orangutan): void => {
    if (this.hp && new Date().getTime() - this.hitTime < 1000) {
      player.handleHardHitBuilding();
      return;
    }
    if (this.hp === 0) return;
    this.hp -= 1;
    this.hitTime = new Date().getTime();
    if (this.hp === 0) {
      this.opacity = 0.33;
      player.handleHitBuilding();
    } else {
      this.opacity = 1 - 1 / (2 + this.hp);
      player.handleHardHitBuilding();
    }
    if (!this.parent) return;
    let i = 0;
    while (i < 50) {
      getExplosion(this, {
        color:
          i % 2
            ? this.parent.explodeColors.color1
            : this.parent.explodeColors.color2,
        ttl: 120,
      });
      i++;
    }
  };
}

class Building extends GameObject.class {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    public hp: number,
    public ceiling: Animation,
    public wall: Animation,
    public explodeColors: { color1: string; color2: string }
  ) {
    super({
      x: x,
      y: y,
      width: 64 * width,
      height: 64 * height,
    });
    this.createParts(width, height);
  }

  createParts = (width: number, height: number): void => {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const material = j === 0 ? this.ceiling : this.wall;
        this.addChild(new BuildingPart(i * 64, j * 64, this.hp, material));
      }
    }
  };

  update = (): void => {
    if (this.parent instanceof Play && this.parent.player) {
      if (this.children.every((child) => child.hp <= 0)) {
        const enemy = createBasicEnemy(this.x + this.width / 2, this.y);
        // Stop enemy for a second after spawning
        enemy.cooldownCounter = 60;
        enemy.standstillCounter = 60;
        this.parent.addChild(enemy);
        this.parent.removeChild(this);
        return;
      }
      if (collides(this.parent.player, this)) {
        const parent = this.parent;
        if (!parent) return;
        this.children.forEach((child) => {
          if (child instanceof BuildingPart) {
            if (collides(child, parent.player)) {
              child.handleHit(parent.player);
            }
          }
        });
      }
    }
  };
}

export default Building;
