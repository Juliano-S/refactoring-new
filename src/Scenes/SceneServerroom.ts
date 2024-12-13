import CollisionItem from '../CanvasItems/CollisionItem.js';
import GameItem from '../CanvasItems/GameItem.js';
import Hackerman from '../CanvasItems/Hackerman.js';
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import Scene from '../Scene.js';
import Stats from '../Stats.js';
import SceneBossFight from './SceneBossFight.js';
import SceneHallwayB from './SceneHallwayB.js';

export default class SceneServerroom extends Scene {
  private hackermanBigImage: HTMLImageElement;

  private speachCloud: HTMLImageElement;

  private goToNextRoom: boolean = false;

  private bossInteraction: boolean = false;

  private goToBoss: boolean = false;

  private spaceBarActive: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    this.player.posX = posX;
    this.player.posY = posY;

    // Set the name of the room your are currently in
    if (Stats.selectedLanguage == 'Dutch') {
      Stats.setCurrentRoom('Server Ruimte');
    } else {
      Stats.setCurrentRoom('Serverroom');
    }

    this.hackermanBigImage = CanvasRenderer.loadNewImage('assets/characters/HackermanBig.png');
    if (Stats.selectedLanguage == 'Dutch') {
      this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/HackermanCloudDutch.png');
    } else {
      this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/HackermanCloud.png');
    }
    this.image.src = './assets/backgrounds/Serverroom.png';
    this.gameItemMaker(maxX, maxY);
  }

  /**
   * @param keyListener listens to keyboard input and calls functions
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.isKeyDown(KeyListener.KEY_W) || keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player.moveUp();
    }

    if (keyListener.isKeyDown(KeyListener.KEY_S) || keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player.moveDown();
    }
    if (keyListener.isKeyDown(KeyListener.KEY_A) || keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
    }
    if (keyListener.isKeyDown(KeyListener.KEY_D) || keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
    }
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.spaceBarActive = true;
    }
  }

  /**
   * Used to create GameItems per scene indivudially.
   * @param maxX Maximum width of the canvas to render on.
   * @param maxY Maximum height of the canvas to render on.
   */
  public gameItemMaker(maxX: number, maxY: number): void {
    // make doorway
    this.gameItem.push(new CollisionItem((maxX / 2 - (896 / 2)), (maxY - 672) / 2 + 224, 1));

    // make hackerman
    this.gameItem.push(new Hackerman((maxX / 2 + (896 / 2) - 240), (maxY - 672) / 2 + 176));
  }

  /**
   * Renders the next scene if a certain condition has been met
   * @returns the new scene OR the current scene (So it stays on the same scene)
   */
  public override nextScene(): Scene | null {
    if (this.goToNextRoom == true) {
      return new SceneHallwayB(this.maxX, this.maxY,
        this.X = (this.maxX / 2 - (this.image.width / 2)) + 700,
        this.Y = (this.maxY - this.image.height) / 2 + 450);
    }
    if (this.goToBoss === true && this.spaceBarActive === true) {
      return new SceneBossFight(this.maxX, this.maxY, this.maxX / 2, this.maxY / 2);
    }
    return this;
  }

  /**
   * @param elapsed time elapsed
   * @param canvas game area
   */
  public override update(elapsed: number, canvas: HTMLCanvasElement): void {
    this.player.update(elapsed);
    this.collision.collision3Wall(this.image, this.player, canvas	);
    this.gameItem.forEach((item: GameItem) => {
      if (item instanceof CollisionItem) {
        if (this.player.isCollidingWithItem(item)) {
          this.goToNextRoom = true;
        }
      }

      if (item instanceof Hackerman) {
        if (this.player.isCollidingWithItem(item)) {
          this.goToBoss = true;
          this.bossInteraction = true;
        } else{
          this.bossInteraction = false;
          this.goToBoss = false;
          this.spaceBarActive = false;
        }
      }
    });
  }

  /**
   * Render text/images on the scene.
   * @param canvas The canvas to render on.
   */
  public renderOnScene(canvas: HTMLCanvasElement): void {
    this.gameItem.forEach((item: GameItem) => item.render(canvas));
    this.inventoryItem.forEach((item: GameItem) => item.render(canvas));
    if (this.bossInteraction == true) {
      CanvasRenderer.drawImage(canvas, this.hackermanBigImage,
        (this.maxX / 2 + (896 / 2) - 228), (this.maxY - 672) / 2 + 300);
      CanvasRenderer.drawImage(canvas, this.speachCloud,
        (this.maxX / 2 + (896 / 2) - 728), (this.maxY - 672) / 2 + 50);
    }
  }

  /**
   * @param canvas The location to render the text on.
   */
  public override textOnRightOfMap(canvas: HTMLCanvasElement): void {
    const roomNamePosX: number = (canvas.width + this.image.width) / 2 + 20;
    const roomNamePosY: number = canvas.height / 2 - 672 / 2 + 40;

    CanvasRenderer.writeText(canvas, `${Stats.getCurrentRoom()}`, roomNamePosX, roomNamePosY, 'left', 'Arial', 20, 'white');
  }
}
