"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
const factory_1 = __importDefault(require("../objects/factory"));
const health_bar_1 = __importDefault(require("../objects/health-bar"));
const orangutan_1 = __importDefault(require("../objects/orangutan"));
const zone_1 = __importDefault(require("../objects/zone"));
class Play extends kontra_1.Scene.class {
    constructor(map, spriteSheet) {
        super({
            id: 'play',
            children: [],
            cullObjects: false,
        });
        this.map = map;
        this.spriteSheet = spriteSheet;
        this.quadtree = new kontra_1.Quadtree();
        this.createPlayer();
        this.createZones();
    }
    update(dt) {
        super.update(dt);
        this.quadtree.clear();
        this.quadtree.add(this.children);
    }
    async createPlayer() {
        const bulldozerSprite = await kontra_1.loadImage('bulldozer.png');
        const orangutan = new orangutan_1.default(kontra_1.getCanvas(), this.map, bulldozerSprite);
        this.player = orangutan;
        this.lookAt(orangutan);
        this.addChild(orangutan);
        const healthBar = new health_bar_1.default(this.player, this.camera);
        this.addChild(healthBar);
    }
    async createZones() {
        // const zone1ceiling = await loadImage('zone1ceiling.png');
        // const zone1wall = await loadImage('zone1wall.png');
        // const zone3ceiling = await loadImage('zone3ceiling.png');
        // const zone3wall = await loadImage('zone3wall.png');
        const ceiling1 = new kontra_1.Animation({
            spriteSheet: this.spriteSheet,
            frames: [3],
            frameRate: 1,
        });
        const wall1 = new kontra_1.Animation({
            spriteSheet: this.spriteSheet,
            frames: [2],
            frameRate: 1,
        });
        const ceiling2 = new kontra_1.Animation({
            spriteSheet: this.spriteSheet,
            frames: [1],
            frameRate: 1,
        });
        const wall2 = new kontra_1.Animation({
            spriteSheet: this.spriteSheet,
            frames: [0],
            frameRate: 1,
        });
        const ceiling3 = new kontra_1.Animation({
            spriteSheet: this.spriteSheet,
            frames: [5],
            frameRate: 1,
        });
        const wall3 = new kontra_1.Animation({
            spriteSheet: this.spriteSheet,
            frames: [4],
            frameRate: 1,
        });
        const zone1 = new zone_1.default(200, 500, 1, ceiling1, wall1, {
            color1: 'yellow',
            color2: 'orange',
        });
        const zone2 = new zone_1.default(-700, 500, 2, ceiling2, wall2, {
            color1: 'gray',
            color2: 'orange',
        });
        const zone3 = new zone_1.default(-1600, 500, 3, ceiling3, wall3, {
            color1: 'yellow',
            color2: 'blue',
        });
        zone1.buildings.forEach((building) => this.addChild(building));
        zone1.enemies.forEach((enemy) => this.addChild(enemy));
        zone2.genPoliceEnemies();
        zone2.buildings.forEach((building) => this.addChild(building));
        zone2.enemies.forEach((enemy) => this.addChild(enemy));
        zone3.genPoliceEnemies();
        zone3.buildings.forEach((building) => this.addChild(building));
        zone3.enemies.forEach((enemy) => this.addChild(enemy));
        this.addChild(new factory_1.default(0, -55 * 64 + 640));
    }
}
exports.default = Play;
