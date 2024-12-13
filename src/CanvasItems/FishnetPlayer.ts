import CanvasRenderer from '../CanvasRenderer.js';
import GameItem from './GameItem.js';

export default class FishnetPlayer extends GameItem {
  private hitBubble: boolean = false;

  private speed: number;


  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.image = CanvasRenderer.loadNewImage('assets/Items/FishnetV2.png');
  }

  /**
   *
   */
  public moveLeft(): void {
    this.posX = this.posX - 3;
  }

  /**
   *
   */
  public moveRight(): void {
    this.posX = this.posX + 3;
  }

  /**
   *
   */
  public moveDown(): void {
    if (this.hitBubble == false) {
      this.posY = this.posY + 4;
    }
  }

  /**
   *
   * @param elapsed time elapsed
   */
  public upAndDownMovement(elapsed: number): void {
    this.speed = this.speed + elapsed * 0.2;
    if (this.hitBubble == false) {
      this.posY = this.posY + elapsed * 0.1;
    } else if (this.hitBubble == true) {
      this.posY = this.posY - elapsed * 0.4;
    }

    if (this.posY <= 0) {
      this.hitBubble = false;
    }
  }

  /**
   *
   */
  public bubbleColidesWithPlayer(): void {
    this.hitBubble = true;
  }
}
