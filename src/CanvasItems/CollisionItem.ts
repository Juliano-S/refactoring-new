
import CanvasRenderer from '../CanvasRenderer.js';
import GameItem from './GameItem.js';
import Stats from '../Stats.js';

export default class CollisionItem extends GameItem {
  public doorNumber: number;

  public constructor(posX: number, posY: number, doorNumber: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.doorNumber = doorNumber;
    if (Stats.showBlackBoxes == true) {
      this.image = CanvasRenderer.loadNewImage('assets/Items/BlackBox.png');
    } else {
      this.image = CanvasRenderer.loadNewImage('assets/Items/TransparentBox.png');
    }
  }
}
