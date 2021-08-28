import {
  Animation,
  getCanvas,
  loadImage,
  Quadtree,
  Scene,
  SpriteSheet,
  TileEngine,
} from 'kontra';
import Factory from '../objects/factory';
import HealthBar from '../objects/health-bar';
import Orangutan from '../objects/orangutan';
import Zone from '../objects/zone';

class Play extends Scene.class {
  public player: Orangutan;
  public quadtree = new Quadtree();
  constructor(public map: TileEngine, public spriteSheet: SpriteSheet) {
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
    const healthBar = new HealthBar(this.player, this.camera);
    this.addChild(healthBar);
  }

  async createZones(): Promise<void> {
    // const zone1ceiling = await loadImage('zone1ceiling.png');
    // const zone1wall = await loadImage('zone1wall.png');
    // const zone3ceiling = await loadImage('zone3ceiling.png');
    // const zone3wall = await loadImage('zone3wall.png');

    const ceiling1 = new Animation({
      spriteSheet: this.spriteSheet,
      frames: [3],
      frameRate: 1,
    });

    const wall1 = new Animation({
      spriteSheet: this.spriteSheet,
      frames: [2],
      frameRate: 1,
    });

    const ceiling2 = new Animation({
      spriteSheet: this.spriteSheet,
      frames: [1],
      frameRate: 1,
    });

    const wall2 = new Animation({
      spriteSheet: this.spriteSheet,
      frames: [0],
      frameRate: 1,
    });

    const ceiling3 = new Animation({
      spriteSheet: this.spriteSheet,
      frames: [5],
      frameRate: 1,
    });

    const wall3 = new Animation({
      spriteSheet: this.spriteSheet,
      frames: [4],
      frameRate: 1,
    });

    const zone1 = new Zone(200, 500, 1, ceiling1, wall1, {
      color1: 'yellow',
      color2: 'orange',
    });

    const zone2 = new Zone(-700, 500, 2, ceiling2, wall2, {
      color1: 'gray',
      color2: 'orange',
    });

    const zone3 = new Zone(-1600, 500, 3, ceiling3, wall3, {
      color1: 'yellow',
      color2: 'blue',
    });

    zone1.buildings.forEach((building) => this.addChild(building));
    zone1.enemies.forEach((enemy) => this.addChild(enemy));
    zone2.buildings.forEach((building) => this.addChild(building));
    zone2.enemies.forEach((enemy) => this.addChild(enemy));
    zone3.buildings.forEach((building) => this.addChild(building));
    zone3.enemies.forEach((enemy) => this.addChild(enemy));
    this.addChild(new Factory(0, -55 * 64 + 640));
  }
}

export default Play;
