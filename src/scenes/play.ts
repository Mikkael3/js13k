import { getCanvas, Scene, Sprite, TileEngine } from 'kontra';
import Orangutan from '../objects/orangutan';

class Play extends Scene.class {
  constructor(public map: TileEngine) {
    const orangutan = new Orangutan(getCanvas(), map);
    const sprite = Sprite({
      x: 100, // starting x,y position of the sprite
      y: 80,
      color: 'red', // fill color of the sprite rectangle
      width: 20, // width and height of the sprite rectangle
      height: 40,
    });
    super({
      id: 'play',
      children: [orangutan, sprite],
    });
    this.lookAt(orangutan);
  }
}

export default Play;
