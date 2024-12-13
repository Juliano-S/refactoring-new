import Scene from '../Scene.js';
import KeyListener from '../KeyListener.js';
import CanvasRenderer from '../CanvasRenderer.js';
import GameItem from '../CanvasItems/GameItem.js';
import Clickpad from '../CanvasItems/Clickpad.js';
import ClickpadClicked from '../CanvasItems/ClickpadClicked.js';
import KeyObtained from './KeyObtained.js';
import Stats from '../Stats.js';

export default class SceneClickerGame extends Scene {
  private clicksUntilWin: number;

  private goToNextRoom: boolean;

  private clickPad: GameItem[] = [];

  private isClicked: boolean;

  private storedPad: GameItem;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);
    this.clickCount = 0;
    this.clicksUntilWin = 30;
    this.goToNextRoom = false;
    this.isClicked = false;

    this.storedPad = new Clickpad(maxX / 2.39, maxY / 4.15);

    this.clickPad = [];

    this.sceneName = 'ClickerGame';
    this.image.src = 'assets/backgrounds/ToiletBg.png';
    this.gameItemMaker();

    this.player.posX = posX;
    this.player.posY = posY;
  }


  /**
   * Creates a clickpad
   */
  public gameItemMaker(): void {
    this.clickPad.push(this.storedPad);
  }

  /**
   * @returns this
   */
  public override nextScene(): Scene {
    if (this.goToNextRoom == true) {
      return new KeyObtained(this.maxX, this.maxY, 0, 0, 3);
    }
    return this;
  }

  /**
   * clicker minigame keyListener
   * @param keyListener lsitens to user input for clicker
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.clickCountUp();
      this.clicksUntilPlayerWin();
      this.isClicked = true;
    }

    if (keyListener.keyPressed(KeyListener.KEY_0)) {
      this.goToNextRoom = true;
    }
  }

  /**
   * adds 1 to the clickcount if the spacebar is pressed
   * @returns clickCount plus one
   */
  public clickCountUp(): number {
    return this.clickCount += 1;
  }

  /**
   *@returns the amount of times the player still needs to click to win
   */
  public clicksUntilPlayerWin(): number {
    return this.clicksUntilWin -= 1;
  }

  /**
   * update
   *
   */
  public override update(): void {
    if (this.clicksUntilWin == 0) {
      this.goToNextRoom = true;
    }

    if (this.isClicked == true && this.clickCount %2==0) {
      this.clickPad.shift();
      this.storedPad = new ClickpadClicked(this.maxX / 2.3, this.maxY / 3.6);
      this.gameItemMaker();
      this.clickPad.push();
    } else {
      this.clickPad.shift();
      this.storedPad = new Clickpad(this.maxX / 2.39, this.maxY / 4.15);
      this.gameItemMaker();
      this.clickPad.push();
    }
  }

  /**
   * renderer
   * @param canvas canvas
   */
  public override renderOnScene(canvas: HTMLCanvasElement): void {
    this.clickPad.forEach((item: GameItem) => item.render(canvas));

    CanvasRenderer.writeText(canvas, `${this.clickCount}`, 765, 300, 'center', 'Arial', 30, 'white');
    if (Stats.selectedLanguage == 'Dutch') {
      CanvasRenderer.writeText(canvas, 'druk op [SPACE] om te winnen', 770, 600, 'center', 'Arial', 30, 'white');
    } else {
      CanvasRenderer.writeText(canvas, 'press [SPACE] to win', 770, 600, 'center', 'Arial', 30, 'white');
    }
  }
}
