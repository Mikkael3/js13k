"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
const building_1 = __importDefault(require("./building"));
const enemy_1 = __importDefault(require("./enemy"));
class Zone {
    constructor(startY, size, hp, ceiling, wall, explodeColors) {
        this.startY = startY;
        this.size = size;
        this.hp = hp;
        this.ceiling = ceiling;
        this.wall = wall;
        this.explodeColors = explodeColors;
        this.buildingAmount = 33;
        this.buildings = [];
        this.enemies = [];
        this.genBuildings = () => {
            let amount = this.buildingAmount;
            while (amount > 0) {
                const width = kontra_1.randInt(1, 4);
                const height = kontra_1.randInt(1, 3);
                const building = new building_1.default(kontra_1.randInt(0, kontra_1.getCanvas().width - width * 64), kontra_1.randInt(this.startY - this.size, this.startY), width, height, this.hp, this.ceiling, this.wall, this.explodeColors);
                if (!this.buildings.some((b) => kontra_1.collides(b, building))) {
                    this.buildings.push(building);
                    amount -= width * height;
                }
            }
        };
        this.genBuildings();
        this.genEnemies();
    }
    genEnemies() {
        let amount = 10;
        while (amount > 0) {
            const width = 15;
            const height = 30;
            const enemy = new enemy_1.default(kontra_1.randInt(0, kontra_1.getCanvas().width), kontra_1.randInt(this.startY - this.size, this.startY), width, height, 'brown');
            this.enemies.push(enemy);
            amount--;
        }
    }
    genPoliceEnemies() {
        let amount = 5;
        while (amount > 0) {
            const width = 18;
            const height = 30;
            const enemy = new enemy_1.default(kontra_1.randInt(0, kontra_1.getCanvas().width), kontra_1.randInt(this.startY - this.size, this.startY), width, height, 'blue', 0.5, 350, 200, 120, 60, 60, 2, 4, 'red');
            this.enemies.push(enemy);
            amount--;
        }
    }
}
exports.default = Zone;
