import { Pool, Sprite } from 'kontra';

const explodePool = Pool({
  create: Sprite,
  maxSize: 200,
});

export default explodePool;
