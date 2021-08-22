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
    const zone1 = new Zone(200, 500, 1, zone1ceiling, zone1wall);
    zone1.buildings.forEach((b) => this.addChild(b));
  }
}

export default Play;
