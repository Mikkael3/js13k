import {
  Animation,
  keyPressed,
  loadImage,
  Scene,
  Sprite,
  SpriteSheet,
  TileEngine,
} from 'kontra';
import { createPolice } from '../helpers/enemy-factory';
import Building from '../objects/building';
import Factory from '../objects/factory';
import Orangutan from '../objects/orangutan';
import Screen from '../objects/screen';
import Zone from '../objects/zone';

class Play extends Scene.class {
  public p: Orangutan;
  public t = true;
  public e = false;
  public h: number;
  public s: number;

  constructor(public map: TileEngine, public spriteSheet: SpriteSheet) {
    super({
      id: 'play',
      cullObjects: false,
    });
    this.showTitle();
  }

  addBuildingScore(partCount: number): void {
    this.s += partCount;
  }

  addHumanScore(): void {
    this.h += 1;
  }

  start(): void {
    this.s = 0;
    this.h = 0;
    this.children.map((child) => {
      this.removeChild(child);
    });
    this.createPlayer();
    this.createZones();
  }

  showTitle(): void {
    this.children = [];
    this.map.sy = 0;
    this.map.sx = 0;
    this.x = 0;
    this.y = 0;
    this.t = true;
    this.lookAt({ x: 400, y: 320 });

    const title = new Screen([
      'Living Space Wars\nOrangutan Strikes Back',
      '<Press ENTER to start>',
    ]);

    this.addChild(title);
  }

  showEnd(): void {
    this.e = true;
    this.children = [];
    this.map.sy = 0;
    this.map.sx = 0;
    this.x = 0;
    this.y = 0;
    this.lookAt({ x: 400, y: 320 });

    const title = new Screen(
      [
        'The END',
        `You destroyed ${
          this.s * 100
        } m2 of human living space.\nHuman population was reduced by ${
          this.h
        }.\n`,
        '2000 to 3000 orangutans are killed every year.',
        'Orangutans could be extinct\nin the wild in less than 50 years.',
        'Main threat to the survival of orangutans\nis loss of living space.',
        "Please don't buy products that contains palm oil.",
        '<Press SPACE to restart>',
      ],
      30
    );
    this.addChild(title);
  }

  update(dt?: number): void {
    super.update(dt);
    if (this.e && keyPressed('space')) {
      this.showTitle();
      this.e = false;
    } else if (this.t && keyPressed('enter')) {
      this.start();
      this.t = false;
    }
  }

  async createPlayer(): Promise<void> {
    const bulldozerSprite = await loadImage('bulldozer.png');
    const orangutan = new Orangutan(this.map, bulldozerSprite);
    this.p = orangutan;
    this.lookAt(orangutan);
    this.addChild(orangutan);
    this.addChild(
      new Sprite({
        width: 400,
        height: 20,
        render(): void {
          this.context.fillStyle = 'lightgreen';
          const width = Math.max(0, (orangutan.m / orangutan.h) * 400);
          this.context.fillRect(
            800 / 2 - 400 / 2,
            this.parent.camera.y - 640 / 2 + 20,
            width,
            20
          );
        },
      })
    );
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

    const ceiling3 = getAnim(4);

    const zone1 = new Zone(200, 1, ceiling1, wall1, {
      color1: 'yellow',
      color2: 'orange',
    });

    const zone2 = new Zone(-700, 2, ceiling2, wall2, {
      color1: 'gray',
      color2: 'orange',
    });

    const zone3 = new Zone(-1600, 3, ceiling3, ceiling3, {
      color1: 'yellow',
      color2: 'blue',
    });

    const addZone = (zone: Zone): void => {
      zone.b.forEach((building) => this.addChild(building));
      zone.e.forEach((enemy) => this.addChild(enemy));
    };
    addZone(zone1);
    addZone(zone2);
    addZone(zone3);
    this.addChild(new Factory(0, -55 * 64 + 640));

    for (let i = 0; i < 10; i++) {
      const y = -2300;
      const x = 40 + 80 * i;
      const enemy = createPolice(x, y);
      this.addChild(enemy);
      const building = new Building(
        x,
        y,
        1,
        1,
        2,
        ceiling2,
        wall2,
        zone2.explodeColors
      );
      this.addChild(building);
    }
  }
}

export default Play;
