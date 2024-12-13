import CanvasRenderer from '../../CanvasRenderer.js';
import KeyListener from '../../KeyListener.js';
import Scene from '../../Scene.js';
import ScenePuzzle from '../ScenePuzzle.js';

import Stats from '../../Stats.js';

export default class TychoPopUpScene extends Scene {
  private chooseYes: boolean = false;

  private chooseNo: boolean = false;

  private answerChosen: boolean = false;

  private goToNextScene: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY, 0, 0);

    if (Stats.selectedLanguage == 'Dutch') {
      this.image.src = 'assets/ChatPopUps/Q_NL_Tycho.jpg';
    } else {
      this.image.src = 'assets/ChatPopUps/Q_EN_Tycho.jpg';
    }
  }

  /**
   *
   * @param keyListener The keylistener class
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed('KeyY') && this.chooseNo == false) {
      this.chooseYes = true;
      this.answerChosen = true;
      Stats.setFalseAnswer(1);
    }
    if (keyListener.keyPressed('KeyN') && this.chooseYes == false) {
      this.chooseNo = true;
      this.answerChosen = true;
      Stats.setCorrectAnswer(1);
    }

    if (keyListener.keyPressed('Space') && this.answerChosen == true) {
      this.goToNextScene = true;
    };
  }


  /**
   *
   * @returns The Scene that should be loaded
   */
  public override nextScene(): Scene {
    if(this.goToNextScene == true){
      return new ScenePuzzle(this.maxX, this.maxY, 0, 0);
    }
    return this;
  }

  /**
   * Checks what image should be rendered
   */
  public override update(): void {
    if (this.chooseYes == true) {
      if (Stats.selectedLanguage == 'Dutch') {
        this.image.src = 'assets/ChatPopUps/Answers/Y_NL_Tycho.png';
      } else {
        this.image.src = 'assets/ChatPopUps/Answers/Y_EN_Tycho.png';
      }
    }
    if (this.chooseNo == true) {
      if (Stats.selectedLanguage == 'Dutch') {
        this.image.src = 'assets/ChatPopUps/Answers/N_NL_Tycho.png';
      } else {
        this.image.src = 'assets/ChatPopUps/Answers/N_EN_Tycho.png';
      }
    }
  }

  /**
   *
   * @param canvas game area
   */
  public override renderOnScene(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, '#2398a7');
    CanvasRenderer.drawImage(canvas, this.image,
      (canvas.width / 2 - (this.image.width / 2)), (canvas.height - 672));
  }
}
