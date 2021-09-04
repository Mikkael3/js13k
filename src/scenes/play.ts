import {
  Animation,
  GameObject,
  getCanvas,
  keyPressed,
  loadImage,
  Quadtree,
  Scene,
  Sprite,
  SpriteSheet,
  Text,
  TileEngine,
} from 'kontra';
import Factory from '../objects/factory';
import HealthBar from '../objects/health-bar';
import Orangutan from '../objects/orangutan';
import Zone from '../objects/zone';

class Play extends Scene.class {
  public player: Orangutan;
  public quadtree = new Quadtree();
  public t = true;
  constructor(public map: TileEngine, public spriteSheet: SpriteSheet) {
    const title = new GameObject({ x: 0, y: 0 });
    title.addChild(
      new Sprite({
        x: 0,
        y: 0,
        width: 800,
        height: 640,
        color: 'black',
      })
    );

    const textopts = {
      font: '24px fantasy',
      color: 'red',
      textAlign: 'center',
    };

    const text = (x: number, y: number, text: string): void =>
      title.addChild(
        new Text({
          x,
          y,
          text,
          ...textopts,
        })
      );

    text(270, 24, 'Living Space Wars\nOrangutan strikes back');
    text(250, 200, '<Press ENTER to start>');

    super({
      id: 'play',
      children: [title],
      cullObjects: false,
    });
  }

  start(): void {
    console.log('change scene');
    this.removeChild(this.children[0]);
    this.createPlayer();
    this.createZones();
  }

  update(dt?: number): void {
    super.update(dt);

    if (this.t && keyPressed('enter')) {
      this.t = false;
      this.start();
    }
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
    const getAnim = (f: number): Animation => {
      return new Animation({
        spriteSheet: this.spriteSheet,
        frames: [f],
        frameRate: 1,
      });
    };
    const ceiling1 = getAnim(3);

    const wall1 = getAnim(2);

    const ceiling2 = getAnim(1);

    const wall2 = getAnim(0);

    const ceiling3 = getAnim(5);

    const wall3 = getAnim(4);

    const zone1 = new Zone(200, 1, ceiling1, wall1, {
      color1: 'yellow',
      color2: 'orange',
    });

    const zone2 = new Zone(-700, 2, ceiling2, wall2, {
      color1: 'gray',
      color2: 'orange',
    });

    const zone3 = new Zone(-1600, 3, ceiling3, wall3, {
      color1: 'yellow',
      color2: 'blue',
    });

    const addZone = (zone: Zone): void => {
      zone.buildings.forEach((building) => this.addChild(building));
      zone.enemies.forEach((enemy) => this.addChild(enemy));
    };
    addZone(zone1);
    addZone(zone2);
    addZone(zone3);
    this.addChild(new Factory(0, -55 * 64 + 640));
  }
}

export default Play;
