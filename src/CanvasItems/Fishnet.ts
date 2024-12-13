import GameItem from './GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class Fishnet extends GameItem {
  public constructor(posX: number, posY: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/Items/FishnetV2.png');
    this.posX = posX;
    this.posY = posY;
  }
}
