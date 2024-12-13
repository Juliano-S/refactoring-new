import CanvasRenderer from '../CanvasRenderer.js';
import GameItem from './GameItem.js';

export default class Bubble extends GameItem {
  private randomMovement: number;

  private shouldMoveRight: boolean = false;

  private shouldMoveLeft: boolean = false;

  private randomMovementTimer: number = 0;

  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.image = CanvasRenderer.loadNewImage('assets/Items/Bubble.png');
  }

  /**
   * update method
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    this.moveToLeft(elapsed);
    this.moveToRight(elapsed);
    this.randomMovementTimer = this.randomMovementTimer - elapsed;

    if (this.randomMovementTimer <= 0) {
      this.randomMovementTimer = 1000;
      this.randomMovement = Math.random() * 100;
      if (this.randomMovement <= 50) {
        this.shouldMoveRight = true;
        this.shouldMoveLeft = false;
      } else if (this.randomMovement > 50) {
        this.shouldMoveLeft = true;
        this.shouldMoveRight = false;
      }
    }
  }

  /**
   * move image to the right
   * @param elapsed teim elapsed
   */
  public moveToRight(elapsed: number): void{
    if(this.shouldMoveRight == true){
      this.posX = this.posX + elapsed * 0.12;
      if(this.posX > window.innerWidth - this.image.width){
        this.posX = window.innerWidth - this.image.width;
      }
    }
  }

  /**
   * move image to the left
   * @param elapsed time elapsed
   */
  public moveToLeft(elapsed: number): void{
    if(this.shouldMoveLeft == true){
      this.posX = this.posX - elapsed * 0.12;
      if ( this.posX < window.innerWidth - window.innerWidth){
        this.posX = window.innerWidth - window.innerWidth;
      }
    }
  }
}
