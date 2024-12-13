import GameItem from './GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class Aquarium extends GameItem {
  public constructor(posX: number, posY: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/Items/Aquarium.png');
    this.posX = posX;
    this.posY = posY;
  }
}
