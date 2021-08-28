import { GameObject, Sprite, Text } from 'kontra';
import collides from '../helpers/collides';
import Play from '../scenes/play';
import { getExplosion } from './explode-pool';
import Orangutan from './orangutan';

class FactoryTank extends Sprite.class {
  public parent: Factory;
  public hitTime = 0;
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
      getExplosion(this);
      this.parent.removeChild(this);
    }
  };
}

class FactoryCenter extends Sprite.class {
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
      getExplosion(this);
      this.parent.removeChild(this);
    }
  };
}

class Factory extends GameObject.class {
  public player: Orangutan;
  public core: FactoryCenter;
  public tanks: FactoryTank[] = [];

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
    this.core = new FactoryCenter(400 - 128, 8);
    this.addChild(this.core);

    const tank1 = new FactoryTank(416, 320);
    this.addChild(tank1);
    this.tanks.push(tank1);

    const tank2 = new FactoryTank(400 - 144, 320);
    this.addChild(tank2);
    this.tanks.push(tank2);
  };

  update = (): void => {
    if (!this.player && this.parent instanceof Play && this.parent.player) {
      this.player = this.parent.player;
    }
    this.tanks.forEach((tank) => tank.checkHit());
    if (this.core) this.core.checkHit();
  };
}

export default Factory;
