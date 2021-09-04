"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
const getLayer = () => {
    const jungleTiles = [...Array(4 * 13).keys()].map(() => 10);
    const zone1Tiles = [...Array(14 * 13).keys()].map((key) => key % 4 ? 7 : 14);
    const zone2Tiles = [...Array(14 * 13).keys()].map((key) => 13 - (key % 2));
    const zone3Tiles = [...Array(14 * 13).keys()].map((key) => 9 - (key % 2));
    const data = [...Array(10 * 13).keys()].map(() => 11);
    return [...data, ...zone3Tiles, ...zone2Tiles, ...zone1Tiles, ...jungleTiles];
};
const getTileMap = async (tileset) => {
    const tileEngineConfig = {
        tilewidth: 64,
        tileheight: 64,
        width: 13,
        height: 55,
        tilesets: [
            {
                firstgid: 1,
                image: tileset,
            },
        ],
        layers: [
            {
                name: 'base',
                data: getLayer(),
            },
        ],
    };
    const tileEngine = kontra_1.TileEngine(tileEngineConfig);
    return tileEngine;
};
exports.default = getTileMap;
