"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
const calculate_canvas_y_position_1 = __importDefault(require("../helpers/calculate-canvas-y-position"));
const collides_1 = __importDefault(require("../helpers/collides"));
const explode_pool_1 = __importDefault(require("./explode-pool"));
const projectile_1 = __importDefault(require("./projectile"));
class Enemy extends kontra_1.Sprite.class {
    constructor(x, y, width, height, color, moveSpeed = 1, visionRange = 350, attackRange = 100, attackCooldown = 90, // frames
    attackStandStillTime = 30, // After attacking, stand still for a moment
    attackWindup = 30, // Windup before attacking
    attackDamage = 1, projectileSpeed = 2, projectileColor = 'gray') {
        super({
            x: x,
            y: y,
            width: width,
            height: height,
            color: color,
        });
        this.moveSpeed = moveSpeed;
        this.visionRange = visionRange;
        this.attackRange = attackRange;
        this.attackCooldown = attackCooldown;
        this.attackStandStillTime = attackStandStillTime;
        this.attackWindup = attackWindup;
        this.attackDamage = attackDamage;
        this.projectileSpeed = projectileSpeed;
        this.projectileColor = projectileColor;
        this.cooldownCounter = 0;
        this.standstillCounter = 0;
        this.attackWindupCounter = 0;
    }
    update() {
        const player = this.parent.player;
        if (!player)
            return;
        if (collides_1.default(this.parent.player, this)) {
            this.handleBulldozerCollision();
            return;
        }
        this.handleBuildingCollision();
        const vectorToPlayer = new kontra_1.Vector(player.x - this.x, player.y - this.y);
        if (this.attackWindupCounter > 0) {
            if (this.attackWindupCounter >= this.attackWindup) {
                this.shoot(vectorToPlayer);
                this.attackWindupCounter = 0;
            }
            else {
                this.attackWindupCounter++;
            }
            return;
        }
        if (vectorToPlayer.length() < this.visionRange &&
            this.standstillCounter <= 0) {
            const direction = vectorToPlayer.length() < this.attackRange ? -1 : 1;
            this.dx = vectorToPlayer.normalize().x * this.moveSpeed * direction;
            this.dy = vectorToPlayer.normalize().y * this.moveSpeed * direction;
            this.advance();
        }
        else {
            this.dx = 0;
            this.dy = 0;
        }
        if (vectorToPlayer.length() < this.attackRange) {
            if (this.cooldownCounter <= 0) {
                this.cooldownCounter = this.attackCooldown;
                this.attackWindupCounter++;
                this.standstillCounter = this.attackStandStillTime;
            }
        }
        this.cooldownCounter = Math.max(this.cooldownCounter - 1, 0);
        this.standstillCounter = Math.max(this.standstillCounter - 1, 0);
    }
    handleBulldozerCollision() {
        let i = 0;
        while (i < 20) {
            const objectY = this.parent.y + this.y + this.height / 2;
            const y = calculate_canvas_y_position_1.default(this.parent.map, objectY);
            explode_pool_1.default.get({
                x: this.parent.x + this.x + this.width / 2,
                y,
                width: 4,
                height: 4,
                anchor: { x: 0.5, y: 0.5 },
                dx: (1 - Math.random() * 2) * 0.8,
                dy: (1 - Math.random() * 2) * 0.8,
                color: i % 2 ? 'red' : 'darkred',
                ttl: 25,
            });
            i++;
        }
        this.parent.removeChild(this);
    }
    shoot(direction) {
        const projectile = new projectile_1.default(this.x, this.y, direction, this.projectileSpeed, this.attackDamage, this.projectileColor);
        this.parent?.addChild(projectile);
    }
    handleBuildingCollision() {
        const nearbyObjects = this.parent.quadtree.get(this);
        nearbyObjects.forEach((building) => {
            if (!building)
                return;
            if (collides_1.default(this, building)) {
                let xOffset = 0;
                if (this.x + this.width / 2 < building.x + building.width / 2) {
                    // On left side of the building
                    xOffset = this.x + this.width - building.x;
                }
                else {
                    // On right side of the building
                    xOffset = this.x - building.x - building.width;
                }
                let yOffset = 0;
                if (this.y + this.height / 2 < building.y + building.height / 2) {
                    // Above the building
                    yOffset = this.y + this.height - building.y;
                }
                else {
                    // Below the building
                    yOffset = this.y - building.y - building.height;
                }
                if (Math.abs(xOffset) < Math.abs(yOffset)) {
                    this.x -= xOffset;
                }
                else {
                    this.y -= yOffset;
                }
                return;
            }
            return;
        });
    }
}
exports.default = Enemy;
