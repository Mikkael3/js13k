"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
const calculateCanvasYPosition = (map, objectY) => {
    const canvasHeight = kontra_1.getCanvas().height;
    const mapStartSy = map.mapheight - canvasHeight;
    const deltaSy = mapStartSy - map.sy;
    const y = objectY + deltaSy;
    return y;
};
exports.default = calculateCanvasYPosition;
