import CanvasRenderer from '../../CanvasRenderer.js';
import KeyListener from '../../KeyListener.js';
import Scene from '../../Scene.js';
import SceneKitchen from '../SceneKitchen.js';
import Stats from '../../Stats.js';

export default class KpnPopUpScene extends Scene {
  private chooseYes: boolean = false;

  private chooseNo: boolean = false;

  private answerChosen: boolean = false;

  private goToNextScene: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY, 0, 0);

    if (Stats.selectedLanguage == 'Dutch') {
      this.image.src = 'assets/ChatPopUps/Q_NL_KPN.jpg';
    } else {
      this.image.src = 'assets/ChatPopUps/Q_EN_KPN.jpg';
    }
  }

  /**
   *
   * @param keyListener listens to keyboard input and calls methods
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed('KeyY') && this.chooseNo == false) {
      this.chooseYes = true;
      this.answerChosen = true;
      Stats.setCorrectAnswer(1);
    }
    if (keyListener.keyPressed('KeyN') && this.chooseYes == false) {
      this.chooseNo = true;
      this.answerChosen = true;
      Stats.setFalseAnswer(1);
    }

    if (keyListener.keyPressed('Space') && this.answerChosen == true) {
      this.goToNextScene = true;
    };
  }

  /**
   *@returns next or current scene
   */
  public override nextScene(): Scene {
    if(this.goToNextScene == true){
      return new SceneKitchen(this.maxX, this.maxY, 0, 0);
    }
    return this;
  }


  /**
   * Checks what image should be rendered
   */
  public override update(): void {
    if (this.chooseYes == true) {
      if (Stats.selectedLanguage == 'Dutch') {
        this.image.src = 'assets/ChatPopUps/Answers/Y_NL_KPN.png';
      } else {
        this.image.src = 'assets/ChatPopUps/Answers/Y_EN_KPN.png';
      }
    }
    if (this.chooseNo == true) {
      if (Stats.selectedLanguage == 'Dutch') {
        this.image.src = 'assets/ChatPopUps/Answers/N_NL_KPN.png';
      } else {
        this.image.src = 'assets/ChatPopUps/Answers/N_EN_KPN.png';
      }
    }
  }

  /**
   *
   * @param canvas game area
   */
  public renderOnScene(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, '#2398a7');
    CanvasRenderer.drawImage(canvas, this.image,
      (canvas.width / 2 - (this.image.width / 2)),
      (canvas.height - 672));
  }
}
