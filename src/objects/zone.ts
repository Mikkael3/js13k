import { collides, getCanvas, randInt } from 'kontra';
import Building from './building';
import Enemy from './enemy';

class Zone {
  private buildingAmount = 33;
  public buildings: Building[] = [];
  public enemies: Enemy[] = [];
  constructor(
    private startY: number,
    private size: number,
    private hp: number,
    public ceiling: HTMLImageElement,
    public wall: HTMLImageElement,
    public explodeColors: { color1: string; color2: string }
  ) {
    this.genBuildings();
    this.genEnemies();
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
        this.wall,
        this.explodeColors
      );
      if (!this.buildings.some((b) => collides(b, building))) {
        this.buildings.push(building);
        amount -= width * height;
      }
    }
  };

  genEnemies(): void {
    let amount = 10;
    while (amount > 0) {
      const width = 15;
      const height = 30;
      const enemy = new Enemy(
        randInt(0, getCanvas().width),
        randInt(this.startY - this.size, this.startY),
        width,
        height,
        'brown'
      );
      this.enemies.push(enemy);
      amount--;
    }
  }
}

export default Zone;
