"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kontra_1 = require("kontra");
class Title extends kontra_1.Scene.class {
    constructor() {
        super({
            id: 'title',
            children: [],
            cullObjects: false,
        });
        this.addChild(new kontra_1.Sprite({
            x: 0,
            y: 0,
            width: 800,
            height: 640,
            color: 'black',
        }));
        this.addChild(new kontra_1.Text({
            x: 270,
            y: 24,
            text: 'Living Space Wars\nOrangutan strikes back',
            font: '24px fantasy',
            color: 'red',
            textAlign: 'center',
        }));
        this.addChild(new kontra_1.Text({
            x: 250,
            y: 200,
            text: '<Press ENTER to start>',
            font: '24px fantasy',
            color: 'red',
            textAlign: 'center',
        }));
    }
    update() {
        if (kontra_1.keyPressed('enter')) {
            console.log('change scene');
            this.hide();
        }
    }
}
exports.default = Title;
