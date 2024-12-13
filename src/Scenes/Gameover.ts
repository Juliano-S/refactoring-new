import Scene from '../Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import SceneBossFight from './SceneBossFight.js';
import Stats from '../Stats.js';

export default class Gameover extends Scene {
  private startGame: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;
    this.image.src = './assets/backgrounds/Losescreen.webp';
  }

  /**
   *@returns next scene
   */
  public override nextScene(): Scene {
    if (this.startGame == true) {
      return new SceneBossFight(this.maxX, this.maxY, this.maxX / 2, this.maxY / 2);
    }
    return this;
  }


  /**
   * Render text/images on the scene.
   * @param canvas The canvas to render on.
   */
  public override renderOnScene(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, '#2d2358');
    CanvasRenderer.drawImage(canvas, this.image,
      (this.maxX / 2 - (this.image.width / 2)), (this.maxY / 2 - (this.image.height / 2)));
    if (Stats.selectedLanguage == 'Dutch') {
      CanvasRenderer.writeText(canvas, 'PROBEER OPNIEUW', canvas.width / 2, canvas.height / 1.2, 'center', 'impact', 50, 'white');
      CanvasRenderer.writeText(canvas, '[ Enter ] / [ Spatiebalk ]', canvas.width / 2, canvas.height / 1.2 + 50, 'center', 'impact', 50, 'white');
    } else {
      CanvasRenderer.writeText(canvas, 'TRY AGAIN', canvas.width / 2, canvas.height / 1.2, 'center', 'impact', 50, 'white');
      CanvasRenderer.writeText(canvas, '[ Enter ] / [ Space ]', canvas.width / 2, canvas.height / 1.2 + 50, 'center', 'impact', 50, 'white');
    }
  }

  /**
   * @param keyListener listens to keyboard input and calls function
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
