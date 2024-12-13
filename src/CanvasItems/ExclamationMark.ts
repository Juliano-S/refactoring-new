import GameItem from './GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class ExclamationMark extends GameItem {
  public positionNumber: number;

  public constructor(posX: number, posY: number, positionNumber: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('assets/Items/Exclamation_Mark.png');
    this.posX = posX;
    this.posY = posY;
    this.positionNumber = positionNumber;
  }
}
