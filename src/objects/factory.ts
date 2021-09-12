import { GameObject, Sprite, Text } from 'kontra';
import collides from '../helpers/collides';
import Play from '../scenes/play';
import { getExplosion } from './explode-pool';
import o from './orangutan';

class t extends Sprite.class {
  public parent: Factory;
  public h = 0;
  constructor(
    x: number,
    y: number,
    color = 'gray',
    size = 128,
    height?: number
  ) {
    super({
      x: x,
      y: y,
      color,
      height: height ? height : size,
      width: size,
    });
    this.addChild(
      new Sprite({ x: 24, y: 24, height: 80, width: 80, color: 'white' })
    );
    this.addChild(
      new Text({
        x: 32,
        y: 24,
        text: 'PALM\nOIL\nTANK',
        font: '24px fantasy',
        color: 'red',
        textAlign: 'center',
      })
    );
  }

  checkHit = (): void => {
    if (this.parent?.player && collides(this.parent.player, this)) {
      for (let i = 0; i < 30; i++) {
        getExplosion(this);
      }
      this.parent.removeChild(this);
    }
  };
}

class f extends Sprite.class {
  public hitTime = 0;
  constructor(x: number, y: number, color = 'gray', size = 256) {
    super({
      x: x,
      y: y,
      width: size,
      height: size,
      color,
    });
    this.addChild(
      new Sprite({ x: 64, y: 24, height: 80, width: 140, color: 'white' })
    );
    this.addChild(
      new Text({
        x: 76,
        y: 24,
        text: 'PALM\nOIL\nFACTORY',
        font: '24px fantasy',
        color: 'red',
        textAlign: 'center',
      })
    );
  }

  checkHit = (): void => {
    if (this.parent?.player && collides(this.parent.player, this)) {
      for (let i = 0; i < 60; i++) {
        getExplosion(this);
      }
      this.parent.showEnd();
      this.parent.removeChild(this);
    }
  };
}

class Factory extends GameObject.class {
  public player: o;
  public core: f;
  public tanks: t[] = [];

  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 800,
      height: 640,
    });
    this.createParts();
  }

  createParts = (): void => {
    //core
    this.core = new f(400 - 128, 8);
    this.addChild(this.core);

    const tank1 = new t(416, 320);
    this.addChild(tank1);
    this.tanks.push(tank1);

    const tank2 = new t(400 - 144, 320);
    this.addChild(tank2);
    this.tanks.push(tank2);
  };

  update = (): void => {
    if (!this.player && this.parent instanceof Play && this.parent.p) {
      this.player = this.parent.p;
    }
    this.tanks.forEach((tank) => tank.checkHit());
    if (this.core) this.core.checkHit();
  };

  showEnd = (): void => {
    this.parent?.showEnd();
  };
}

export default Factory;
