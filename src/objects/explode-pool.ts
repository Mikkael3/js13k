import { GameObject, Pool, Sprite } from 'kontra';
import { state } from '../game';
import calculateCanvasYPosition from '../helpers/calculate-canvas-y-position';

const explodePool = Pool({
  create: Sprite,
  maxSize: 400,
});

export default explodePool;

export const getExplosion = (
  object: GameObject,
  explosionArgs: {
    color?: string;
    ttl?: number;
    offsetX?: number;
    offsetY?: number;
    anchor?: { x: number; y: number };
  } = {
    color: 'red',
    ttl: 60,
    anchor: { x: 0.5, y: 0.5 },
    offsetY: 0,
    offsetX: 0,
  }
): void => {
  if (!state.map) return;
  console.log(explosionArgs);
  const pos = object.world;
  const { offsetY = 0, offsetX = 0 } = explosionArgs;
  explodePool.get({
    x: pos.x + object.width / 2 + offsetX,
    y: calculateCanvasYPosition(state.map, pos.y) + object.height / 2 + offsetY,
    width: 4,
    height: 4,
    anchor: explosionArgs.anchor,
    dx: 2 - Math.random() * 4,
    dy: 2 - Math.random() * 4,
    color: [explosionArgs.color],
    ttl: explosionArgs.ttl,
  });
};
