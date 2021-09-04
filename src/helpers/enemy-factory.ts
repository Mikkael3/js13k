import Enemy from '../objects/enemy';

const createBasicEnemy = (x: number, y: number): Enemy => {
  return new Enemy(x, y, 15, 30, 'brown');
};

const createPolice = (x: number, y: number): Enemy => {
  return new Enemy(
    x,
    y,
    18,
    30,
    'blue',
    0.5,
    350,
    200,
    120,
    60,
    60,
    2,
    4,
    'red'
  );
};

export { createPolice, createBasicEnemy };
