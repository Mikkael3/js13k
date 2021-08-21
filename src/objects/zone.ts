import { GameObject } from 'kontra';

class Zone extends GameObject {
  private buildingAmount = 33;
  constructor(private startY: number, private size: number) {
    super();
    this.genBuildings();
  }
  genBuildings = (): void => {
    //pass
  };
}

export default Zone;
