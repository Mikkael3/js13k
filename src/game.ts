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
import Title from './scenes/title';

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
  const title = new Title();

  map.addObject(play);

  const loop = GameLoop({
    update: (dt: number) => {
      if (!title.hidden) title.update();
      if (title.hidden) play.update(dt);
      explodePool.update();
    },
    render: () => {
      map.render();
      play.render();
      title.render();
      explodePool.render();
    },
  });

  loop.start();
};

main();
