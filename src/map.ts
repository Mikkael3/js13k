import { TileEngine } from 'kontra';

const getLayer = (): number[] => {
  const jungleTiles = [...Array(4 * 13).keys()].map((key: number) =>
    key % 2 ? 19 : 20
  );

  const zone1Tiles = [...Array(14 * 13).keys()].map((key: number) =>
    key % 4 ? 17 : 18
  );

  const zone2Tiles = [...Array(14 * 13).keys()].map(
    (key: number) => 16 - (key % 4)
  );

  const zone3Tiles = [...Array(14 * 13).keys()].map(
    (key: number) => 12 - (key % 2)
  );

  const data = [...Array(10 * 13).keys()].map(() => 7);
  return [...data, ...zone3Tiles, ...zone2Tiles, ...zone1Tiles, ...jungleTiles];
};

const getTileMap = async (tileset: HTMLImageElement): Promise<TileEngine> => {
  const tileEngineConfig = {
    tilewidth: 64,
    tileheight: 64,
    width: 13,
    height: 55,
    tilesets: [
      {
        firstgid: 1,
        image: tileset,
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
