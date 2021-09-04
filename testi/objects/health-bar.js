"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
class HealthBar extends kontra_1.Sprite.class {
    constructor(player, camera) {
        super({
            width: 400,
            height: 20,
            color: 'lightgreen',
        });
        this.player = player;
        this.camera = camera;
    }
    render() {
        if (this.color) {
            this.context.fillStyle = this.color;
            const width = Math.max(0, (this.player.health / this.player.maxHealth) * this.width);
            this.context.fillRect(this.context.canvas.width / 2 - this.width / 2, this.camera.y - this.context.canvas.height / 2 + this.height, width, this.height);
        }
        return;
    }
}
exports.default = HealthBar;
