import GameItem from './GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class Lock extends GameItem {
  public constructor(posX: number, posY: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/Items/Lock-Silver.png');
    this.posX = posX;
    this.posY = posY;
  }
}
