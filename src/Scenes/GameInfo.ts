import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import Scene from '../Scene.js';
import SceneBedroom from './SceneBedroom.js';
import Stats from '../Stats.js';

export default class GameInfo extends Scene {
  private goToBedroom: boolean = false;

  private hackerLoading: boolean = false;

  private hackerImage: HTMLImageElement;

  private spaceBarCounter: number = 0;

  private textImage: HTMLImageElement;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    this.posX = posX;
    this.posY = posY;

    if (Stats.selectedLanguage == 'Dutch') {
      this.image.src = 'assets/ChatPopUps/Q_NL_Tigo.jpg';
    } else {
      this.image.src = 'assets/ChatPopUps/Q_EN_Tigo.jpg';
    }
    this.hackerImage = CanvasRenderer.loadNewImage('assets/ChatPopUps/HackerImage6.png');
    this.textImage;
  }

  /**
   * @param keyListener listens to keyboard input and calls function
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.handleButtonClick();
    }
  }

  /**
   *
   */
  public handleButtonClick(): void {
    this.spaceBarCounter = this.spaceBarCounter + 1;
    if (this.spaceBarCounter === 1) {
      this.hackerLoading = true;
    } else if (this.spaceBarCounter === 2) {
      this.goToBedroom = true;
    }
  }

  /**
   *@returns next scene if true
   */
  public override nextScene(): Scene {
    if (this.goToBedroom == true) {
      return new SceneBedroom(this.maxX, this.maxY, 710, this.maxY / 2);
    }
    return this;
  }

  /**
   * @param canvas game area
   */
  public override renderOnScene(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, '#2398a7');
    CanvasRenderer.drawImage(canvas, this.image,
      (canvas.width / 2) - this.image.width / 2, (canvas.height - 672));
    if (Stats.selectedLanguage == 'Dutch') {
      CanvasRenderer.writeText(canvas, 'Spatiebalk om verder te gaan', canvas.width / 2, canvas.height / 1.05, 'center', 'impact', 40, 'white');
    } else {
      CanvasRenderer.writeText(canvas, 'Press [SPACE] to continue', canvas.width / 2, canvas.height / 1.05, 'center', 'impact', 40, 'white');
    }
    if (this.hackerLoading == true) {
      CanvasRenderer.fillCanvas(canvas, '#0B0F18');
      CanvasRenderer.drawImage(canvas, this.hackerImage,
        (canvas.width / 2) - this.hackerImage.width / 2, (canvas.height - 672));

      if (Stats.selectedLanguage == 'Dutch') {
        CanvasRenderer.writeText(canvas, 'Spatiebalk om verder te gaan', canvas.width / 2, canvas.height / 1.1, 'center', 'impact', 40, 'white');
        this.textImage = CanvasRenderer.loadNewImage('assets/SpeakClouds/TextBallonNLRev1.png');
        CanvasRenderer.drawImage(canvas, this.textImage, canvas.width / 1.8, canvas.height / 12345);
      } else {
        CanvasRenderer.writeText(canvas, 'Press [SPACE] to continue', canvas.width / 2, canvas.height / 1.1, 'center', 'impact', 40, 'white');
        this.textImage = CanvasRenderer.loadNewImage('assets/SpeakClouds/TextBallonENRev1.png');
        CanvasRenderer.drawImage(canvas, this.textImage, canvas.width / 1.8, canvas.height / 12345);
      }
    }
  }
}
