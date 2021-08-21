import { GameLoop, init, initKeys } from 'kontra';
import getTileMap from './map';
import Play from './scenes/play';

init();
initKeys();

const main = async (): Promise<void> => {
  const map = await getTileMap();
  const play = new Play(map);
  //const orangutan = new Orangutan(getCanvas());
  map.addObject(play);
  const loop = GameLoop({
    // create the main game loop
    update: () => {
      // update the game state
      play.update();
    },
    render: () => {
      // render the game state
      map.render();
      play.render();
    },
  });

  loop.start(); // start the game
};

main();
