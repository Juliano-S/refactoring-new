import GameItem from './GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class DirtMound extends GameItem {
  public constructor(posX: number, posY: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/Items/DirtMound.png');
    this.posX = posX;
    this.posY = posY;
  }
}
