import { TileEngine } from 'kontra';

const img = new Image();
img.onload = (): void => {
  const tileEngine = TileEngine({
    tilewidth: 64,
    tileheight: 64,
    width: 14,
    height: 10,
    tilesets: [
      {
        firstgid: 1,
        image: img,
      },
    ],
    layers: [
      {
        name: 'ground',
        data: [],
      },
    ],
  });

  tileEngine.render();
};
