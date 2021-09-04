"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
const calculate_canvas_y_position_1 = __importDefault(require("../helpers/calculate-canvas-y-position"));
const collides_1 = __importDefault(require("../helpers/collides"));
const explode_pool_1 = __importDefault(require("./explode-pool"));
class BuildingPart extends kontra_1.Sprite.class {
    constructor(x, y, hp, material) {
        super({
            x: x,
            y: y,
            width: 64,
            height: 64,
            animations: { idle: material },
        });
        this.hp = hp;
        this.hitTime = 0;
        this.handleHit = (map, dt, player) => {
            if (this.hp && new Date().getTime() - this.hitTime < 1000) {
                player.handleHardHitBuilding();
                return;
            }
            if (this.hp === 0)
                return;
            this.hp -= 1;
            this.hitTime = new Date().getTime();
            if (this.hp === 2) {
                this.opacity = 0.88;
                player.handleHardHitBuilding();
            }
            if (this.hp === 1) {
                this.opacity = 0.66;
                player.handleHardHitBuilding();
            }
            if (this.hp === 0) {
                this.opacity = 0.33;
                player.handleHitBuilding();
            }
            if (!this.parent)
                return;
            let i = 0;
            while (i < 50) {
                const objectY = this.parent.y + this.y + this.height / 2;
                const y = calculate_canvas_y_position_1.default(map, objectY);
                explode_pool_1.default.get({
                    x: this.parent.x + this.x + this.width / 2,
                    y,
                    width: 4,
                    height: 4,
                    anchor: { x: 0.5, y: 0.5 },
                    dx: 2 - Math.random() * 4,
                    dy: 2 - Math.random() * 4,
                    color: i % 2
                        ? this.parent.explodeColors.color1
                        : this.parent.explodeColors.color2,
                    ttl: 120,
                });
                i++;
            }
        };
    }
}
class Building extends kontra_1.GameObject.class {
    constructor(x, y, width, height, hp, ceiling, wall, explodeColors) {
        super({
            x: x,
            y: y,
            width: 64 * width,
            height: 64 * height,
        });
        this.hp = hp;
        this.ceiling = ceiling;
        this.wall = wall;
        this.explodeColors = explodeColors;
        this.createParts = (width, height) => {
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    const material = j === 0 ? this.ceiling : this.wall;
                    this.addChild(new BuildingPart(i * 64, j * 64, this.hp, material));
                }
            }
        };
        this.update = (dt) => {
            if (this.parent?.removeChild) {
                if (this.children.every((child) => child.hp <= 0)) {
                    this.parent.removeChild(this);
                    return;
                }
                if (collides_1.default(this.parent.player, this)) {
                    const parent = this.parent;
                    if (!parent)
                        return;
                    this.children.forEach((child) => {
                        if (child.handleHit) {
                            if (collides_1.default(child, parent.player)) {
                                child.handleHit(parent.map, dt, parent.player);
                            }
                        }
                    });
                }
            }
        };
        this.createParts(width, height);
    }
}
exports.default = Building;
