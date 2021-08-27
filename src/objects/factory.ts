import { GameObject, Sprite } from 'kontra';

class FactoryCenter extends Sprite.class {
  public hitTime = 0;
  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 256,
      height: 256,
      color: 'gray',
    });
  }

  handleHit = (): void => {
    // if (this.hp && new Date().getTime() - this.hitTime < 1000) {
    //   player.handleHardHitBuilding();
    //   return;
    // }
    // if (this.hp === 0) return;
    // this.hp -= 1;
    // this.hitTime = new Date().getTime();
    // if (this.hp === 2) {
    //   this.opacity = 0.88;
    //   player.handleHardHitBuilding();
    // }
    // if (this.hp === 1) {
    //   this.opacity = 0.66;
    //   player.handleHardHitBuilding();
    // }
    // if (this.hp === 0) {
    //   this.opacity = 0.33;
    //   player.handleHitBuilding();
    // }
    // if (!this.parent) return;
    // let i = 0;
    // while (i < 50) {
    //   const objectY = this.parent.y + this.y + this.height / 2;
    //   const y = calculateCanvasYPosition(map, objectY);
    //   explodePool.get({
    //     x: this.parent.x + this.x + this.width / 2,
    //     y,
    //     width: 4,
    //     height: 4,
    //     anchor: { x: 0.5, y: 0.5 },
    //     dx: 2 - Math.random() * 4,
    //     dy: 2 - Math.random() * 4,
    //     color:
    //       i % 2
    //          ? this.parent.explodeColors.color1
    //         : this.parent.explodeColors.color2,
    //     maxSize: 100,
    //     ttl: 120,
    //   });
    //   i++;
    // }
  };
}

class Factory extends GameObject.class {
  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
    });
    this.createParts();
  }

  createParts = (): void => {};

  update = (dt: number): void => {};
}

export default Factory;
