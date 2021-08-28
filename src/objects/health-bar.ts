import { GameObject, Sprite } from 'kontra';
import Orangutan from './orangutan';

class HealthBar extends Sprite.class {
  constructor(public player: Orangutan, private camera: GameObject) {
    super({
      width: 400,
      height: 20,
      color: 'lightgreen',
    });
  }

  render(): void {
    if (this.color) {
      this.context.fillStyle = this.color;
      const width = Math.max(
        0,
        (this.player.health / this.player.maxHealth) * this.width
      );
      this.context.fillRect(
        this.context.canvas.width / 2 - this.width / 2,
        this.camera.y - this.context.canvas.height / 2 + this.height,
        width,
        this.height
      );
    }
    return;
  }
}

export default HealthBar;
