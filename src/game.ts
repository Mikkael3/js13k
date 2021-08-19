import { GameLoop, init, initKeys } from 'kontra';
import Orangutan from './orangutan';

const { canvas } = init();
initKeys();

const orangutan = new Orangutan(canvas);
const loop = GameLoop({
  // create the main game loop
  update: () => {
    // update the game state
    orangutan.update();
  },
  render: () => {
    // render the game state
    orangutan.render();
  },
});

loop.start(); // start the game
