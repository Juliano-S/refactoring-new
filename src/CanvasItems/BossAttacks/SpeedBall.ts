import CanvasRenderer from '../../CanvasRenderer.js';
import GameItem from '../GameItem.js';

export default class SpeedBall extends GameItem {
  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.image = CanvasRenderer.loadNewImage('assets/Items/SpeedBall.png');
  }

  /**
   * Updates the position of the EnergyBall
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    this.posY = this.posY + elapsed * 0.65;
  }
}
