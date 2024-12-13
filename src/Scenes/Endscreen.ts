import Scene from '../Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import Startscherm from './Startscherm.js';
import Stats from '../Stats.js';

export default class Endscreen extends Scene {
  private startGame: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    this.posX = posX;
    this.posY = posY;

    this.image.src = './assets/backgrounds/Endscreen-win.jpg';
  }

  /**
   * @returns The upcoming scene, in this case it restarts the game
   */
  public override nextScene(): Scene {
    if (this.startGame == true) {
      return new Startscherm(this.maxX, this.maxY, 0, 0);
    }
    return this;
  }

  /**
   * Render text/images on the scene.
   * @param canvas The canvas to render on.
   */
  public override renderOnScene(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, '#000000');
    const canvasPosX: number = (this.maxX / 2 - (this.image.width / 2));
    const canvasPosY: number = (this.maxY / 2 - (this.image.height / 2));
    CanvasRenderer.drawImage(canvas, this.image, canvasPosX, canvasPosY);
    if (Stats.selectedLanguage == 'Dutch') {
      CanvasRenderer.writeText(canvas, 'Opnieuw Spelen', canvas.width / 2, canvas.height / 1.2, 'center', 'impact', 50, 'white');
      CanvasRenderer.writeText(canvas, '[ Enter ] / [ Spatiebalk ]', canvas.width / 2, canvas.height / 1.2 + 50, 'center', 'impact', 50, 'white');
    } else {
      CanvasRenderer.writeText(canvas, 'Play Again', canvas.width / 2, canvas.height / 1.2, 'center', 'impact', 50, 'white');
      CanvasRenderer.writeText(canvas, '[ Enter ] / [ Space ]', canvas.width / 2, canvas.height / 1.2 + 50, 'center', 'impact', 50, 'white');

      const roomNamePosX: number = (canvas.width + 896) / 2 + 20;
      const roomNamePosY: number = canvas.height / 2 - 672 / 2 + 40;

      const keyListPosX: number = roomNamePosX;
      const keyListPosY: number = roomNamePosY + 40;

      CanvasRenderer.writeText(canvas, `Steps Taken: ${Stats.stepsTaken}`, keyListPosX, keyListPosY + 20, 'left', 'Arial', 20, 'white');
    }
  }

  /**
   * @param keyListener Checks if a certain key has been pressed
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed('Enter') || keyListener.keyPressed('Space')) {
      this.handleStartButtonClick();
    }
  }

  /**
   *
   */
  public handleStartButtonClick(): void {
    this.startGame = true;
  }
}
