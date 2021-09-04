"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
const calculate_canvas_y_position_1 = __importDefault(require("../helpers/calculate-canvas-y-position"));
const explode_pool_1 = __importDefault(require("./explode-pool"));
class Orangutan extends kontra_1.Sprite.class {
    constructor(canvas, map, sprite) {
        super({
            x: 390,
            y: 600,
            anchor: { x: 0.5, y: 0.5 },
            image: sprite,
            rotation: 0,
        });
        this.canvas = canvas;
        this.map = map;
        this.maxHealth = 20;
        this.health = this.maxHealth;
        this.map.sy = this.map.mapheight - canvas.height;
    }
    syncCamera() {
        const startCameraFollow = this.canvas.height / 2;
        const y = this.y > startCameraFollow ? startCameraFollow : this.y;
        if (this.map.sy > 0)
            this.parent.lookAt({ y: y, x: this.canvas.width / 2 });
        this.map.sx = 16;
        const sy = this.y > startCameraFollow
            ? this.map.mapheight - this.canvas.height
            : this.map.mapheight -
                this.canvas.height -
                (startCameraFollow - this.y);
        this.map.sy = sy > 0 ? sy : 0;
    }
    update() {
        this.handleControls();
        this.syncCamera();
        this.children.forEach((child) => child.update());
    }
    handleControls() {
        const maxSpeed = 2.5;
        const acceleration = 0.13;
        const deceleration = 0.1;
        if (kontra_1.keyPressed('left') || kontra_1.keyPressed('j')) {
            this.ddx = -acceleration;
            this.ddy = 0;
            this.dx = -Math.abs(this.dx) - Math.abs(this.dy);
            this.dy = 0;
            this.rotation = kontra_1.degToRad(-90);
        }
        else if (kontra_1.keyPressed('right') || kontra_1.keyPressed('l')) {
            this.ddx = acceleration;
            this.ddy = 0;
            this.dx = Math.abs(this.dx) + Math.abs(this.dy);
            this.dy = 0;
            this.rotation = kontra_1.degToRad(90);
        }
        else if (kontra_1.keyPressed('up') || kontra_1.keyPressed('i')) {
            this.ddx = 0;
            this.ddy = -acceleration;
            this.dy = -Math.abs(this.dy) - Math.abs(this.dx);
            this.dx = 0;
            this.rotation = kontra_1.degToRad(0);
        }
        else if (kontra_1.keyPressed('down') || kontra_1.keyPressed('k')) {
            this.ddx = 0;
            this.ddy = acceleration;
            this.dy = Math.abs(this.dy) + Math.abs(this.dx);
            this.dx = 0;
            this.rotation = kontra_1.degToRad(180);
        }
        else {
            this.ddx = 0;
            this.ddy = 0;
        }
        // Deceleration
        this.dx =
            Math.sign(this.dx) * Math.max(Math.abs(this.dx) - deceleration, 0);
        this.dy =
            Math.sign(this.dy) * Math.max(Math.abs(this.dy) - deceleration, 0);
        // Side borders
        if (this.x > this.canvas.width - this.width) {
            this.dx = 0;
            this.x = this.canvas.width - this.width;
        }
        else if (this.x < 0) {
            this.dx = 0;
            this.x = 0;
        }
        // Bottom border
        if (this.y > 600) {
            this.dy = 0;
            this.y = 600;
        }
        this.advance();
        // Cap max speed
        this.dy =
            Math.sign(this.dy) * Math.min(Math.abs(this.dy), Math.abs(maxSpeed));
        this.dx =
            Math.sign(this.dx) * Math.min(Math.abs(this.dx), Math.abs(maxSpeed));
    }
    handleHitBuilding() {
        this.dx /= 4;
        this.dy /= 4;
    }
    handleHardHitBuilding() {
        this.dx = 0;
        this.dy = 0;
    }
    takeDamage(damage) {
        const objectY = this.parent.y + this.y;
        const y = calculate_canvas_y_position_1.default(this.parent.map, objectY);
        for (let i = 0; i < damage + 1; i++) {
            explode_pool_1.default.get({
                x: this.parent.x + this.x,
                y,
                width: 4,
                height: 4,
                dx: 1 - Math.random() * 2,
                dy: 1 - Math.random() * 2,
                color: i % 2 ? 'yellow' : 'gray',
                ttl: 120,
            });
        }
        this.health -= damage;
        const damageHue = new kontra_1.Sprite({
            x: 0,
            y: 0,
            anchor: this.anchor,
            width: this.width,
            height: this.height,
            color: 'red',
            ttl: 8,
            opacity: 0.3,
            update: () => {
                if (!damageHue.isAlive()) {
                    this.removeChild(damageHue);
                }
                damageHue.ttl--;
            },
        });
        this.addChild(damageHue);
    }
}
exports.default = Orangutan;
