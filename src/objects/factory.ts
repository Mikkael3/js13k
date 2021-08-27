import { GameObject, Sprite } from 'kontra';

class FactoryTank extends Sprite.class {
  public hitTime = 0;
  constructor(x: number, y: number, color = 'gray', radius = 64) {
    super({
      x: x,
      y: y,
      color,
      radius,
    });
  }

  handleHit = (): void => {
    //pass
  };

  render(): void {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
  }
}

class FactoryCenter extends Sprite.class {
  public hitTime = 0;
  constructor(x: number, y: number, color = 'gray', size = 192) {
    super({
      x: x,
      y: y,
      width: size,
      height: size,
      color,
    });
  }

  handleHit = (): void => {
    //pass
  };
}

class Factory extends GameObject.class {
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
    this.addChild(new FactoryCenter((800 - 192) / 2, (640 - 192) / 2));

    this.addChild(new FactoryCenter((800 - 128) / 2, 322, 'yellow', 64));
    this.addChild(
      new FactoryCenter((800 - 128) / 2, (640 - 132) / 2, 'yellow', 64)
    );
    this.addChild(new FactoryTank(450, 270, 'black', 32));
    this.addChild(new FactoryTank(450, 270, 'red', 16));

    this.addChild(new FactoryTank(96, 96));
    this.addChild(new FactoryTank(96, 96, 'black', 32));
    this.addChild(new FactoryTank(96, 96, 'red', 16));

    this.addChild(new FactoryTank(800 - 96, 96));
    this.addChild(new FactoryTank(800 - 96, 96, 'black', 32));
    this.addChild(new FactoryTank(800 - 96, 96, 'red', 16));

    this.addChild(new FactoryTank(96, 640 - 96));
    this.addChild(new FactoryTank(96, 640 - 96, 'black', 32));
    this.addChild(new FactoryTank(96, 640 - 96, 'red', 16));

    this.addChild(new FactoryTank(800 - 96, 640 - 96));
    this.addChild(new FactoryTank(800 - 96, 640 - 96, 'black', 32));
    this.addChild(new FactoryTank(800 - 96, 640 - 96, 'red', 16));
  };

  update = (dt: number): void => {
    console.log(dt);
  };
}

export default Factory;
