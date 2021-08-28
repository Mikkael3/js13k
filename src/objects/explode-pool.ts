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
  } = {
    color: 'red',
    ttl: 60,
  }
): void => {
  if (!state.map) return;
  const pos = object.world;
  explodePool.get({
    x: pos.x + object.width / 2,
    y: calculateCanvasYPosition(state.map, pos.y) + object.height / 2,
    width: 4,
    height: 4,
    anchor: { x: 0.5, y: 0.5 },
    dx: 2 - Math.random() * 4,
    dy: 2 - Math.random() * 4,
    color: [explosionArgs.color],
    ttl: explosionArgs.ttl,
  });
};
