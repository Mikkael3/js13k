import { GameLoop, init, initKeys, loadImage, SpriteSheet } from 'kontra';
import getTileMap from './map';
import explodePool from './objects/explode-pool';
import Play from './scenes/play';

const main = async (): Promise<void> => {
  init();
  initKeys();
  const tileset = await loadImage('tileset.png');

  const spriteSheet = SpriteSheet({
    image: tileset,
    frameWidth: 64,
    frameHeight: 64,
  });

  const map = await getTileMap(tileset);
  const play = new Play(map, spriteSheet);
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
