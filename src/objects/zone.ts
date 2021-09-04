import { Animation, collides, getCanvas, randInt } from 'kontra';
import Building from './building';
import Enemy from './enemy';
import { createBasicEnemy, createPolice } from '../helpers/enemy-factory';

class Zone {
  private buildingAmount = 33;
  public buildings: Building[] = [];
  public enemies: Enemy[] = [];
  constructor(
    private startY: number,
    private size: number,
    private hp: number,
    public ceiling: Animation,
    public wall: Animation,
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
      const x = randInt(0, getCanvas().width);
      const y = randInt(this.startY - this.size, this.startY);
      const enemy = createBasicEnemy(x, y);
      this.enemies.push(enemy);
      amount--;
    }
  }

  genPoliceEnemies(): void {
    let amount = 5;
    while (amount > 0) {
      const x = randInt(0, getCanvas().width);
      const y = randInt(this.startY - this.size, this.startY);
      const enemy = createPolice(x, y);
      this.enemies.push(enemy);
      amount--;
    }
  }
}

export default Zone;
