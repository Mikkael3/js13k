import { GameObject, getWorldRect } from 'kontra';
import Building from '../objects/building';

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

/**
 * Makes sure dynamic object won't enter static building
 */
export const handleObjectBuildingCollision = (
  object: GameObject,
  building: GameObject
): void => {
  const objectRect = getWorldRect(object);
  const buildingRect = getWorldRect(building);
  let xOffset = 0;
  if (
    objectRect.x + objectRect.width / 2 <
    buildingRect.x + buildingRect.width / 2
  ) {
    // On left side of the building
    xOffset = objectRect.x + objectRect.width - buildingRect.x;
  } else {
    // On right side of the building
    xOffset = objectRect.x - buildingRect.x - buildingRect.width;
  }

  let yOffset = 0;
  if (
    objectRect.y + objectRect.height / 2 <
    buildingRect.y + buildingRect.height / 2
  ) {
    // Above the building
    yOffset = objectRect.y + objectRect.height - buildingRect.y;
  } else {
    // Below the building
    yOffset = objectRect.y - buildingRect.y - buildingRect.height;
  }

  if (Math.abs(xOffset) < Math.abs(yOffset)) {
    object.x -= xOffset;
  } else {
    object.y -= yOffset;
  }
};

export default collides;
