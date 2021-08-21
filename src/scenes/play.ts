import { GameObject, getCanvas, Quadtree, Scene, TileEngine } from 'kontra';
import Orangutan from '../objects/orangutan';
import Zone from '../objects/zone';

class Play extends Scene.class {
  public player: GameObject;
  public quadtree = new Quadtree();
  constructor(public map: TileEngine) {
    const orangutan = new Orangutan(getCanvas(), map);
    const zone1 = new Zone(600, 1600);
    super({
      id: 'play',
      children: [orangutan, zone1],
    });
    this.player = orangutan;
    this.lookAt(orangutan);
  }

  update(dt?: number): void {
    super.update(dt);
    this.quadtree.clear();
    this.quadtree.add(this.children);
  }
}

export default Play;
