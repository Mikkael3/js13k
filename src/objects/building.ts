import { Sprite } from 'kontra';
import Play from '../scenes/play';
import collides from '../helpers/collides';

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
        if (this.hp >= 0) this.parent.removeChild(this);
      }
    }
  };
}

export default Building;
