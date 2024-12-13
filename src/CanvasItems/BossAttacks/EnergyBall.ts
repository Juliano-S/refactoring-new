import CanvasRenderer from '../../CanvasRenderer.js';
import GameItem from '../GameItem.js';

export default class EnergyBall extends GameItem {
  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.image = CanvasRenderer.loadNewImage('assets/Items/EnergyBall.png');
  }

  /**
   * @param elapsed time elapsed
   * Updates the position of the EnergyBall
   */
  public override update(elapsed: number): void {
    this.posY = this.posY + elapsed * 0.3;
  }
}
