import { GameObject, getWorldRect } from 'kontra';

const collides = (rect1: GameObject, rect2: GameObject): boolean => {
  const r1 = getWorldRect(rect1);
  const r2 = getWorldRect(rect2);
  return (
    r1.x < r2.x + r2.width &&
    r1.x + r1.width > r2.x &&
    r1.y < r2.y + r2.height &&
    r1.y + r1.height > r2.y
  );
};

export default collides;
