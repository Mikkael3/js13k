import { GameObject, getCanvas, Sprite, TileEngine } from 'kontra';
import collides from '../helpers/collides';
import Play from '../scenes/play';
import explodePool from './explode-pool';

class BuildingPart extends Sprite.class {
  constructor(x: number, y: number, public hp: number) {
    super({
      x: x,
      y: y,
      color: 'yellow',
      width: 64,
      height: 64,
    });
  }

  handleHit = (map: TileEngine): void => {
    if (this.hp === 0) return;
    this.hp -= 1;
    if (this.hp === 0) this.color = 'black';
    if (!this.parent) return;
    let i = 0;
    while (i < 50) {
      const y =
        map.sy >= getCanvas().height / 2
          ? this.parent.y + this.y + this.height / 2
          : this.parent.y +
            this.y +
            getCanvas().height / 2 -
            map.sy +
            this.height / 2;
      explodePool.get({
        x: this.parent.x + this.x + this.width / 2,
        y,
        width: 4,
        height: 4,
        anchor: { x: 0.5, y: 0.5 },
        dx: 2 - Math.random() * 4,
        dy: 2 - Math.random() * 4,
        color: i % 2 ? 'red' : 'gray',
        maxSize: 100,
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
    public hp: number
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
        this.addChild(new BuildingPart(i * 64, j * 64, this.hp));
      }
    }
  };

  update = (): void => {
    //void
    if (this.parent instanceof Play && this.parent.player) {
      if (this.children.every((child) => child.hp <= 0)) {
        this.parent.removeChild(this);
        return;
      }
      if (collides(this.parent.player, this)) {
        const parent = this.parent;
        if (!parent) return;
        this.children.forEach((child) => {
          if (collides(child, parent.player)) child.handleHit(parent.map);
        });
      }
    }
  };
}

export default Building;
