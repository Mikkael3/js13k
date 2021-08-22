import { GameObject, getCanvas, Sprite } from 'kontra';
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

  handleHit = (): void => {
    this.hp -= 1;
    if (this.hp === 0) this.color = 'black';
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
        const part = this.children.find((child) =>
          collides(child, parent.player)
        );
        //this.hp -= 1;
        if (part && part.hp >= 0) {
          part.handleHit();
          let i = 0;
          while (i < 50) {
            const y =
              this.parent.map.sy >= getCanvas().height / 2
                ? this.y + this.height / 2
                : this.y +
                  getCanvas().height / 2 -
                  this.parent.map.sy +
                  this.height / 2;
            explodePool.get({
              x: this.x + this.width / 2,
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
        }
      }
    }
  };
}

export default Building;
