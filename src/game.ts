import { GameLoop, init, initKeys } from 'kontra';
import getTileMap from './map';
import explodePool from './objects/explode-pool';
import Play from './scenes/play';

const main = async (): Promise<void> => {
  init();
  initKeys();
  const map = await getTileMap();
  const play = new Play(map);
  //const orangutan = new Orangutan(getCanvas());
  map.addObject(play);
  const loop = GameLoop({
    // create the main game loop
    update: (dt: number) => {
      // update the game state
      play.update(dt);
      explodePool.update();
    },
    render: () => {
      // render the game state
      map.render();
      play.render();
      explodePool.render();
    },
  });

  loop.start(); // start the game
};

main();
