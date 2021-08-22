import { getCanvas, Sprite } from 'kontra';
import collides from '../helpers/collides';
import Play from '../scenes/play';
import explodePool from './explode-pool';

class Building extends Sprite.class {
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
      color: 'cyan',
      width: 64 * width,
      height: 64 * height,
    });
  }

  update = (): void => {
    //void
    if (this.parent instanceof Play && this.parent.player) {
      if (collides(this.parent.player, this)) {
        this.hp -= 1;
        if (this.hp >= 0) {
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
          this.parent.removeChild(this);
        }
      }
    }
  };
}

export default Building;
