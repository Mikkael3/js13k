import { collides, getCanvas, randInt } from 'kontra';
import Building from './building';

class Zone {
  private buildingAmount = 33;
  public buildings: Building[] = [];
  constructor(
    private startY: number,
    private size: number,
    private hp: number,
    public ceiling: HTMLImageElement,
    public wall: HTMLImageElement
  ) {
    this.genBuildings();
  }

  genBuildings = (): void => {
    let amount = this.buildingAmount;
    while (amount > 0) {
      const width = randInt(1, 4);
      const height = randInt(1, 3);
      const building = new Building(
        randInt(0, getCanvas().width - width * 64),
        randInt(this.startY - this.size, this.startY),
        width,
        height,
        this.hp,
        this.ceiling,
        this.wall
      );
      if (!this.buildings.some((b) => collides(b, building))) {
        this.buildings.push(building);
        amount -= width * height;
      }
    }
  };
}

export default Zone;
