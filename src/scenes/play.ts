import { getCanvas, loadImage, Quadtree, Scene, TileEngine } from 'kontra';
import Orangutan from '../objects/orangutan';
import Zone from '../objects/zone';

class Play extends Scene.class {
  public player: Orangutan;
  public quadtree = new Quadtree();
  constructor(public map: TileEngine) {
    super({
      id: 'play',
      children: [],
      cullObjects: false,
    });
    this.createPlayer();
    this.createZones();
  }

  update(dt?: number): void {
    super.update(dt);
    this.quadtree.clear();
    this.quadtree.add(this.children);
  }

  async createPlayer(): Promise<void> {
    const bulldozerSprite = await loadImage('bulldozer.png');
    const orangutan = new Orangutan(getCanvas(), this.map, bulldozerSprite);
    this.player = orangutan;
    this.lookAt(orangutan);
    this.addChild(orangutan);
  }

  async createZones(): Promise<void> {
    const zone1ceiling = await loadImage('zone1ceiling.png');
    const zone1wall = await loadImage('zone1wall.png');
    const zone2ceiling = await loadImage('zone2ceiling.png');
    const zone2wall = await loadImage('zone2wall.png');
    const zone3ceiling = await loadImage('zone3ceiling.png');
    const zone3wall = await loadImage('zone3wall.png');
    const zone1 = new Zone(200, 500, 1, zone1ceiling, zone1wall);
    const zone2 = new Zone(-700, 500, 2, zone2ceiling, zone2wall);
    const zone3 = new Zone(-1600, 500, 3, zone3ceiling, zone3wall);
    zone1.buildings.forEach((building) => this.addChild(building));
    zone2.buildings.forEach((building) => this.addChild(building));
    zone3.buildings.forEach((building) => this.addChild(building));
    zone1.enemies.forEach((enemy) => this.addChild(enemy));
  }
}

export default Play;
