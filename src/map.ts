import { loadImage, TileEngine } from 'kontra';

const getLayer = (): number[] => {
  const data = [...Array(15 * 13).keys()].map((key: number) =>
    key % 5 ? 3 : 2
  );
  return data;
};
const getTileMap = async (): Promise<TileEngine> => {
  const asset = await loadImage('tileset.png');
  const tileEngineConfig = {
    tilewidth: 64,
    tileheight: 64,
    width: 13,
    height: 15,
    tilesets: [
      {
        firstgid: 1,
        image: asset,
      },
    ],
    layers: [
      {
        name: 'base',
        data: getLayer(),
      },
    ],
  };
  const tileEngine = TileEngine(tileEngineConfig);

  return tileEngine;
};

export default getTileMap;
