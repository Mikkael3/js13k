import { getCanvas, Scene, Sprite } from 'kontra';
import Orangutan from '../objects/orangutan';

class Play extends Scene.class {
  constructor() {
    const orangutan = new Orangutan(getCanvas());
    const first = Sprite({
      x: 300,
      y: 500,
      anchor: { x: 0.5, y: 0.5 },
      width: 20,
      height: 40,
      color: 'red',
    });

    const second = Sprite({
      x: 300,
      y: 400,
      anchor: { x: 0.5, y: 0.5 },
      width: 20,
      height: 40,
      color: 'red',
    });

    const third = Sprite({
      x: 0,
      y: 400,
      anchor: { x: 0.5, y: 0.5 },
      width: 20,
      height: 40,
      color: 'red',
    });

    super({
      id: 'play',
      children: [orangutan, first, second, third],
    });
    this.lookAt(orangutan);
  }
}

export default Play;
