import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';

import Player from './CanvasItems/Player.js';
import Collision from './Collision.js';

import Stats from './Stats.js';
import Key from './CanvasItems/Key.js';
import GameItem from './CanvasItems/GameItem.js';
import Fishnet from './CanvasItems/Fishnet.js';
import Ontstopper from './CanvasItems/Ontstopper.js';

export default abstract class Scene {
  public collision: Collision;

  public player: Player;

  protected maxX: number;

  protected maxY: number;

  protected gameItem: GameItem[] = [];

  protected inventoryItem: GameItem[] = [];

  public sceneName: string;

  public image: HTMLImageElement;

  public answerGiven: string;

  public count: boolean;

  public clickCount: number;

  protected posX: number;

  protected posY: number;

  protected X: number;

  protected Y: number;
  // public clicker: SceneClickerGame;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.player = new Player(posX, posY);
    this.collision = new Collision();

    this.posX = this.player.posX;
    this.posY = this.player.posY;

    // this.clicker = new SceneClickerGame(maxX / 2, maxY / 2);

    this.sceneName = '';

    this.answerGiven = '';

    this.count = false;

    // Base background for the game, in case a image is not loaded in the level itself
    this.image = CanvasRenderer.loadNewImage('./assets/backgrounds/Bedroom.png');
  }


  protected startScene(): void { }

  public abstract nextScene(): Scene | null;

  /**
   * Checks if the player should move in a direction and calls the aporpriate function
   * @param keyListener listens to keyboard input and calls functions
   */
  public processInput(keyListener: KeyListener): void {
    if (keyListener.isKeyDown(KeyListener.KEY_W) || keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player.moveUp();
      Stats.setStepsTaken(1);
    }

    if (keyListener.isKeyDown(KeyListener.KEY_S) || keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player.moveDown();
      Stats.setStepsTaken(1);
    }
    if (keyListener.isKeyDown(KeyListener.KEY_A) || keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
      Stats.setStepsTaken(1);
    }
    if (keyListener.isKeyDown(KeyListener.KEY_D) || keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
      Stats.setStepsTaken(1);
    }

    if (keyListener.keyPressed(KeyListener.KEY_P)) {
      if (Stats.showBlackBoxes == true) {
        Stats.showBlackBoxes = false;
      } else if (Stats.showBlackBoxes == false) {
        Stats.showBlackBoxes = true;
      }
    }

    if (keyListener.keyPressed(KeyListener.KEY_Y)) {
      this.setInputAnswerYes();
    }
    if (keyListener.keyPressed(KeyListener.KEY_N)) {
      this.setInputAnswerNo();
    }

    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.count = true;
    }
  }

  /**
   *
   */
  public checkCollisionWithItem(): void {

  }

  /**
   * @param elapsed time elapsed
   * @param canvas game area
   */
  public update(elapsed: number, canvas: HTMLCanvasElement): void {
    this.collision.collision3Wall(this.image, this.player, canvas);
  }

  public abstract renderOnScene(canvas: HTMLCanvasElement): void;

  /**
   *
   * @param canvas this canvas
   */
  public textOnRightOfMap(canvas: HTMLCanvasElement): void{

  }

  /**
   * @param canvas game area
   */
  public render(canvas: HTMLCanvasElement): void {
    Stats.showStatsOnScreen(canvas);
    const canvasPosX: number = (this.maxX / 2 - (this.image.width / 2));
    const canvasPosY: number = (this.maxY / 2 - (this.image.height / 2));
    CanvasRenderer.drawImage(canvas, this.image, canvasPosX, canvasPosY);

    this.player.render(canvas);
  }

  public setInputAnswerYes(): void {
    if (this.answerGiven === '') {
      this.answerGiven = 'Yes';
    }
  }

  public setInputAnswerNo(): void {
    if (this.answerGiven === '') {
      this.answerGiven = 'No';
    }
  }

  /**
   *
   */
  public trueCount(): void {
    if (this.count = true) {
      this.clickCount += 1;
    }
  }

  /**
   * spawn stuff in inventory
   */
  public inventorySpawner(): void {
    this.inventoryItem = [];
    if (Stats.keyBathroom == true) {
      this.inventoryItem.push(new Key((this.maxX / 3 - (896 / 3)) - 130,
        ((this.maxY + 672) / 3) - 400));
    }
    if (Stats.keyKitchen == true) {
      this.inventoryItem.push(new Key((this.maxX / 3 - (896 / 3)) - 130,
        ((this.maxY + 672) / 3) - 200));
    }
    if (Stats.keyPuzzle == true) {
      this.inventoryItem.push(new Key((this.maxX / 3 - (896 / 3)) - 130,
        ((this.maxY + 672) / 3) - 300));
    }
    if (Stats.keyAquarium == true) {
      this.inventoryItem.push(new Key((this.maxX / 3 - (896 / 3)) - 130,
        ((this.maxY + 672) / 3) - 100));
    }
    if (Stats.fishnet == true) {
      this.inventoryItem.push(new Fishnet((this.maxX / 3 - (896 / 3)) - 25,
        ((this.maxY + 672) / 3) - 400));
    }

    if (Stats.plunger == true) {
      this.inventoryItem.push(new Ontstopper((this.maxX / 3 - (896 / 3)) - 25,
        ((this.maxY + 672) / 3) - 300));
    }
  };
}
