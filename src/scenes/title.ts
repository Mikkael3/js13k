import { keyPressed, Scene, Sprite, Text } from 'kontra';

class Title extends Scene.class {
  constructor() {
    super({
      id: 'title',
      children: [],
      cullObjects: false,
    });

    this.addChild(
      new Sprite({
        x: 0,
        y: 0,
        width: 800,
        height: 640,
        color: 'black',
      })
    );

    this.addChild(
      new Text({
        x: 270,
        y: 24,
        text: 'Livint Space Wars\nOrangutan strikes back',
        font: '24px fantasy',
        color: 'red',
        textAlign: 'center',
      })
    );

    this.addChild(
      new Text({
        x: 250,
        y: 200,
        text: '<Press any button to start>',
        font: '24px fantasy',
        color: 'red',
        textAlign: 'center',
      })
    );
  }

  update(): void {
    if (keyPressed('enter')) {
      console.log('change scene');
      this.hide();
    }
  }
}

export default Title;
