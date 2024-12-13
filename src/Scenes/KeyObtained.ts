import Scene from '../Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import Stats from '../Stats.js';
import KpnPopUpScene from './PopUpScenes/KpnPopUpScene.js';
import TychoPopUpScene from './PopUpScenes/TychoPopUpScene.js';
import MrbeastPopUpScene from './PopUpScenes/MrbeastPopUpScene.js';
import RabobankPopUpScene from './PopUpScenes/RabobankPopUpScene.js';

export default class KeyObtained extends Scene {
  private startGame: boolean = false;

  private kpnPopUp: boolean = false;

  private tychoPopUp: boolean = false;

  private dinandPopUp: boolean = false;

  private mrBeastPopUp: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number, popUp: number) {
    super(maxX, maxY, posX, posY);

    if (popUp == 1) {
      this.kpnPopUp = true;
    } else if (popUp == 2){
      this.tychoPopUp = true;
    } else if (popUp == 3){
      this.dinandPopUp = true;
    } else if (popUp == 4){
      this.mrBeastPopUp = true;
    }


    this.maxX = maxX;
    this.maxY = maxY;
    this.image.src = './assets/backgrounds/ReceivingKeyRev8-1.png';
  }

  /**
   *@returns next scene
   */
  public override nextScene(): Scene {
    if (this.startGame == true) {
      if(this.kpnPopUp == true){
        return new KpnPopUpScene (this.maxX, this.maxY);;
      } else if (this.tychoPopUp == true){
        return new TychoPopUpScene (this.maxX, this.maxY);;
      } else if (this.dinandPopUp == true){
        return new RabobankPopUpScene (this.maxX, this.maxY);;
      } else if (this.mrBeastPopUp == true){
        return new MrbeastPopUpScene (this.maxX, this.maxY);;
      }
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
      CanvasRenderer.writeText(canvas, 'Je hebt een sleutel gevonden!', canvas.width / 2, canvas.height / 1.2, 'center', 'impact', 50, 'white');
      CanvasRenderer.writeText(canvas, '[ Enter ]', canvas.width / 2, canvas.height / 1.2 + 50, 'center', 'impact', 50, 'white');
    } else {
      CanvasRenderer.writeText(canvas, 'You have found a key!', canvas.width / 2, canvas.height / 1.2, 'center', 'impact', 50, 'white');
      CanvasRenderer.writeText(canvas, '[ Enter ]', canvas.width / 2, canvas.height / 1.2 + 50, 'center', 'impact', 50, 'white');
    }
  }

  /**
   * @param keyListener listens to keyboard input and calls function
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_ENTER)) {
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
