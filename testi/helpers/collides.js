"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
const collides = (rect1, rect2) => {
    const r1 = kontra_1.getWorldRect(rect1);
    const r2 = kontra_1.getWorldRect(rect2);
    return (r1.x < r2.x + r2.width &&
        r1.x + r1.width > r2.x &&
        r1.y < r2.y + r2.height &&
        r1.y + r1.height > r2.y);
};
exports.default = collides;
