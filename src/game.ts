import { GameLoop, init } from 'kontra';
import Orangutan from './orangutan';

const { canvas } = init();

const orangutan = new Orangutan();
const loop = GameLoop({
  // create the main game loop
  update: () => {
    // update the game state
    orangutan.update();

    // wrap the sprites position when it reaches
    // the edge of the screen
    if (orangutan.x > canvas.width) {
      orangutan.x = -orangutan.width;
    }
  },
  render: () => {
    // render the game state
    orangutan.render();
  },
});

loop.start(); // start the game
