import { Sprite } from 'kontra';
import Play from '../scenes/play';

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
    if (this.parent instanceof Play) {
      const hits = this.parent.quadtree.get(this);
      if (hits && hits.length) console.log(hits);
    }
  };
}

export default Building;
