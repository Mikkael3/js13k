import {
  Animation,
  getCanvas,
  keyPressed,
  loadImage,
  Scene,
  SpriteSheet,
  TileEngine,
} from 'kontra';
import { createPolice } from '../helpers/enemy-factory';
import Building from '../objects/building';
import Factory from '../objects/factory';
import HealthBar from '../objects/health-bar';
import Orangutan from '../objects/orangutan';
import Screen from '../objects/screen';
import Zone from '../objects/zone';

class Play extends Scene.class {
  public player: Orangutan;
  public title = true;
  public end = false;
  public humansKilled = 0;
  public buildingPartsDestroyed = 0;
  public score = 0;

  constructor(public map: TileEngine, public spriteSheet: SpriteSheet) {
    super({
      id: 'play',
      cullObjects: false,
    });
    this.showTitle();
  }

  updateScore(): void {
    this.score = this.humansKilled + this.buildingPartsDestroyed * 100;
    console.log(this.score);
  }

  addBuildingScore(partCount: number): void {
    this.buildingPartsDestroyed += partCount;
    this.updateScore();
  }

  addHumanScore(): void {
    this.humansKilled += 1;
    this.updateScore();
  }

  start(): void {
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
    this.title = true;
    this.lookAt({ x: 400, y: 320 });

    const title = new Screen([
      'Living Space Wars\nOrangutan Strikes Back',
      '<Press ENTER to start>',
    ]);

    this.addChild(title);
  }

  showEnd(): void {
    this.end = true;
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
          this.buildingPartsDestroyed * 100
        } m2 of human living space.\nHuman population was reduced by ${
          this.humansKilled
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
    if (this.end && keyPressed('space')) {
      this.showTitle();
      this.end = false;
    } else if (this.title && keyPressed('enter')) {
      this.start();
      this.title = false;
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
      zone.buildings.forEach((building) => this.addChild(building));
      zone.enemies.forEach((enemy) => this.addChild(enemy));
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
