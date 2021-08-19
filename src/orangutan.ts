import { Sprite } from 'kontra';

class Orangutan extends Sprite.class {
  constructor() {
    super({
      x: 100, // starting x,y position of the sprite
      y: 80,
      color: 'red', // fill color of the sprite rectangle
      width: 20, // width and height of the sprite rectangle
      height: 40,
      dx: 2, // move the sprite 2px to the right every frame
    });
  }
}

export default Orangutan;
