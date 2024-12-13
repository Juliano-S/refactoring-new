import CanvasRenderer from '../CanvasRenderer.js';
import GameItem from './GameItem.js';

export default class Hackerman extends GameItem{
  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.image = CanvasRenderer.loadNewImage('assets/characters/Hackerman.png');
  }
}
