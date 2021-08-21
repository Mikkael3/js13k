import { getCanvas, Quadtree, Scene, TileEngine } from 'kontra';
import Building from '../objects/building';
import Orangutan from '../objects/orangutan';

class Play extends Scene.class {
  public quadtree = new Quadtree();
  constructor(public map: TileEngine) {
    const orangutan = new Orangutan(getCanvas(), map);
    const building = new Building(350, 500, 2, 1, 1);
    super({
      id: 'play',
      children: [orangutan, building],
    });
    this.lookAt(orangutan);
  }

  update(dt?: number): void {
    super.update(dt);
    this.quadtree.clear();
    this.quadtree.add(this.children);
  }
}

export default Play;
