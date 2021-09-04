"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
const collides_1 = __importDefault(require("../helpers/collides"));
class Projectile extends kontra_1.Sprite.class {
    constructor(x, y, direction, projectileSpeed, damage, color = 'gray', radius = 4.5) {
        super({
            x: x,
            y: y,
            width: radius,
            height: radius,
            color: color,
            ttl: 60,
            dx: direction.normalize().x * projectileSpeed,
            dy: direction.normalize().y * projectileSpeed,
        });
        this.damage = damage;
        this.radius = radius;
    }
    // Shape is circle but collision is still rectangle
    draw() {
        const borderWidth = 0.8;
        this.context.fillStyle = 'black';
        this.context.beginPath();
        this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(0, 0, this.radius - borderWidth, 0, 2 * Math.PI);
        this.context.fill();
    }
    update() {
        this.advance();
        if (!this.isAlive()) {
            this.parent?.removeChild(this);
        }
        if (this.parent?.player) {
            const player = this.parent.player;
            if (collides_1.default(this, this.parent.player)) {
                player.takeDamage(this.damage);
                this.parent?.removeChild(this);
            }
        }
    }
}
exports.default = Projectile;
