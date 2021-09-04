"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
const collides_1 = __importDefault(require("../helpers/collides"));
const explode_pool_1 = require("./explode-pool");
class FactoryTank extends kontra_1.Sprite.class {
    constructor(x, y, color = 'gray', size = 128, height) {
        super({
            x: x,
            y: y,
            color,
            height: height ? height : size,
            width: size,
        });
        this.hitTime = 0;
        this.checkHit = () => {
            if (this.parent?.player && collides_1.default(this.parent.player, this)) {
                explode_pool_1.getExplosion(this);
                this.parent.removeChild(this);
            }
        };
        this.addChild(new kontra_1.Sprite({ x: 24, y: 24, height: 80, width: 80, color: 'white' }));
        this.addChild(new kontra_1.Text({
            x: 32,
            y: 24,
            text: 'PALM\nOIL\nTANK',
            font: '24px fantasy',
            color: 'red',
            textAlign: 'center',
        }));
    }
}
class FactoryCenter extends kontra_1.Sprite.class {
    constructor(x, y, color = 'gray', size = 256) {
        super({
            x: x,
            y: y,
            width: size,
            height: size,
            color,
        });
        this.hitTime = 0;
        this.checkHit = () => {
            if (this.parent?.player && collides_1.default(this.parent.player, this)) {
                explode_pool_1.getExplosion(this);
                this.parent.removeChild(this);
            }
        };
        this.addChild(new kontra_1.Sprite({ x: 64, y: 24, height: 80, width: 140, color: 'white' }));
        this.addChild(new kontra_1.Text({
            x: 76,
            y: 24,
            text: 'PALM\nOIL\nFACTORY',
            font: '24px fantasy',
            color: 'red',
            textAlign: 'center',
        }));
    }
}
class Factory extends kontra_1.GameObject.class {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 800,
            height: 640,
        });
        this.tanks = [];
        this.createParts = () => {
            //core
            this.core = new FactoryCenter(400 - 128, 8);
            this.addChild(this.core);
            const tank1 = new FactoryTank(416, 320);
            this.addChild(tank1);
            this.tanks.push(tank1);
            const tank2 = new FactoryTank(400 - 144, 320);
            this.addChild(tank2);
            this.tanks.push(tank2);
        };
        this.update = () => {
            if (this.parent?.player) {
                this.player = this.parent.player;
            }
            this.tanks.forEach((tank) => tank.checkHit());
            if (this.core)
                this.core.checkHit();
        };
        this.createParts();
    }
}
exports.default = Factory;
