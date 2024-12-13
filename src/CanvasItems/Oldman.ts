import CanvasRenderer from '../CanvasRenderer.js';
import GameItem from './GameItem.js';

export default class Oldman extends GameItem{
  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.image = CanvasRenderer.loadNewImage('assets/characters/Beer1.png');
  }
}
