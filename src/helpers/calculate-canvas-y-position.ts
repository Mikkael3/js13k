import { getCanvas, TileEngine } from 'kontra';

const calculateCanvasYPosition = (map: TileEngine, objectY: number): number => {
  const canvasHeight = getCanvas().height;
  const mapStartSy = map.mapheight - canvasHeight;
  const deltaSy = mapStartSy - map.sy;
  const y = objectY + deltaSy;
  return y;
};

export default calculateCanvasYPosition;
