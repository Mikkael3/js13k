"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExplosion = void 0;
const kontra_1 = require("kontra");
const game_1 = require("../game");
const calculate_canvas_y_position_1 = __importDefault(require("../helpers/calculate-canvas-y-position"));
const explodePool = kontra_1.Pool({
    create: kontra_1.Sprite,
    maxSize: 400,
});
exports.default = explodePool;
const getExplosion = (object, explosionArgs = {
    color: 'red',
    ttl: 60,
}) => {
    if (!game_1.state.map)
        return;
    const pos = object.world;
    explodePool.get({
        x: pos.x + object.width / 2,
        y: calculate_canvas_y_position_1.default(game_1.state.map, pos.y) + object.height / 2,
        width: 4,
        height: 4,
        anchor: { x: 0.5, y: 0.5 },
        dx: 2 - Math.random() * 4,
        dy: 2 - Math.random() * 4,
        color: [explosionArgs.color],
        ttl: explosionArgs.ttl,
    });
};
exports.getExplosion = getExplosion;
