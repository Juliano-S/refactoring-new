import CanvasRenderer from './CanvasRenderer.js';

export default class Inventory {
  protected maxX: number;

  protected maxY: number;

  /**
   * @param background the background image of the main game where we can walk on
   * @param canvas The canvas on where we can render the phone screen
   */
  public renderInventoryOutlines(background: HTMLImageElement, canvas: HTMLCanvasElement): void {
    // Phone Outlines + Background
    CanvasRenderer.drawRectangle(canvas, (canvas.width + background.width) / 2 - 1163, canvas.height / 2 - background.height / 2, background.width / 3.5, background.height, 'black');
    CanvasRenderer.fillRectangle(canvas, (canvas.width + background.width) / 2 - 1158, canvas.height / 2 - background.height / 2 + 5, background.width / 3.5 - 10, background.height - 10, 'grey');
  }
}
