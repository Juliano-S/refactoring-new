import GameItem from './GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class ClickpadClicked extends GameItem {
  public constructor(posX: number, posY: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/Items/Plunger-DownRev1.png');
    this.posX = posX;
    this.posY = posY;
  }
}
