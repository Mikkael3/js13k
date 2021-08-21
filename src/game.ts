import { GameLoop, init, initKeys } from 'kontra';
import Play from './scenes/play';

init();
initKeys();

const play = new Play();
const loop = GameLoop({
  // create the main game loop
  update: () => {
    // update the game state
    play.update();
  },
  render: () => {
    // render the game state
    play.render();
  },
});

loop.start(); // start the game
