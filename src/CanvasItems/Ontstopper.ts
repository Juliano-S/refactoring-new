import GameItem from './GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class Ontstopper extends GameItem {
  public constructor(posX: number, posY: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/Items/Ontstopper.png');
    this.posX = posX;
    this.posY = posY;
  }
}
