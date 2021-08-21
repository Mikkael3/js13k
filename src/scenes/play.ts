import { Scene } from 'kontra';
import { canvas } from '../game';
import Orangutan from '../orangutan';

class Play extends Scene.class {
  constructor() {
    const orangutan = new Orangutan(canvas);
    super({
      id: 'play',
      children: [orangutan],
    });
  }
}

export default Play;
