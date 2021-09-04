"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
const kontra_1 = require("kontra");
const map_1 = __importDefault(require("./map"));
const explode_pool_1 = __importDefault(require("./objects/explode-pool"));
const play_1 = __importDefault(require("./scenes/play"));
const title_1 = __importDefault(require("./scenes/title"));
exports.state = {};
const main = async () => {
    kontra_1.init();
    kontra_1.initKeys();
    const tileset = await kontra_1.loadImage('tileset.webp');
    const spriteSheet = kontra_1.SpriteSheet({
        image: tileset,
        frameWidth: 64,
        frameHeight: 64,
    });
    const map = await map_1.default(tileset);
    exports.state['map'] = map;
    const play = new play_1.default(map, spriteSheet);
    const title = new title_1.default();
    map.addObject(play);
    const loop = kontra_1.GameLoop({
        update: (dt) => {
            if (!title.hidden)
                title.update();
            if (title.hidden)
                play.update(dt);
            explode_pool_1.default.update();
        },
        render: () => {
            map.render();
            play.render();
            title.render();
            explode_pool_1.default.render();
        },
    });
    loop.start();
};
main();
