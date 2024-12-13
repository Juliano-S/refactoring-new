import CanvasRenderer from '../CanvasRenderer.js';
import GameItem from './GameItem.js';

export default abstract class CanvasItem {
  protected image: HTMLImageElement;

  public posX: number;

  public posY: number;

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }


  /**
   * @param item InventoryItem to check collision with
   * @returns whether this CanvasItem is colliding with the given ScoreItem
   */
  public isCollidingWithItem(item: GameItem): boolean {
    return (this.getPosX() < item.getPosX() + item.getWidth()
        && this.getPosX() + this.getWidth() > item.getPosX()
        && this.getPosY() + this.getHeight() > item.getPosY()
        && this.getPosY() < item.getPosY() + item.getHeight());
  }

  /**
   * Render the item to the canvas
   * @param canvas canvas to render to
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  /**
   * @param elapsed time elapsed
   */
  public update(elapsed: number): void{

  }
}
