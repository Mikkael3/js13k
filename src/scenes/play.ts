import {
  GameObject,
  getCanvas,
  loadImage,
  Quadtree,
  Scene,
  TileEngine,
} from 'kontra';
import Orangutan from '../objects/orangutan';
import Zone from '../objects/zone';

class Play extends Scene.class {
  public player: GameObject;
  public quadtree = new Quadtree();
  constructor(public map: TileEngine) {
    const zone1 = new Zone(200, 500, 1);
    super({
      id: 'play',
      children: [...zone1.buildings],
      cullObjects: false,
    });
    this.createPlayer();
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
}

export default Play;
