import {
  GameLoop,
  init,
  initKeys,
  loadImage,
  SpriteSheet,
  TileEngine,
} from 'kontra';
import getTileMap from './map';
import explodePool from './objects/explode-pool';
import Play from './scenes/play';

export const state: { map?: TileEngine } = {};

const main = async (): Promise<void> => {
  init();
  initKeys();

  const tileset = await loadImage('tileset.webp');

  const spriteSheet = SpriteSheet({
    image: tileset,
    frameWidth: 64,
    frameHeight: 64,
  });

  const map = await getTileMap(tileset);

  state['map'] = map;

  const play = new Play(map, spriteSheet);

  map.addObject(play);

  const loop = GameLoop({
    update: (dt: number) => {
      play.update(dt);
      explodePool.update();
    },
    render: () => {
      map.render();
      play.render();
      explodePool.render();
    },
  });

  loop.start();
};

main();
