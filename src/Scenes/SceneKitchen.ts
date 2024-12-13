import CollisionItem from '../CanvasItems/CollisionItem.js';
import GameItem from '../CanvasItems/GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import Scene from '../Scene.js';
import SceneHallwayB from './SceneHallwayB.js';
import Key from '../CanvasItems/Key.js';
import Stats from '../Stats.js';
import ExclamationMark from '../CanvasItems/ExclamationMark.js';
import KeyObtained from './KeyObtained.js';

export default class SceneKitchen extends Scene {
  private goToNextRoom: boolean = false;

  private searchImage: HTMLImageElement;

  private foundKey: boolean = false;

  private showImage: boolean = false;

  private hitExclamationMark: number = 0;

  private loadPopUp: boolean = false;


  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    this.player.posX = posX;
    this.player.posY = posY;

    // Set the name of the room your are currently in
    if (Stats.selectedLanguage == 'Dutch') {
      Stats.setCurrentRoom('Keuken');
    } else {
      Stats.setCurrentRoom('Kitchen');
    }

    this.image.src = './assets/backgrounds/Kitchen.png';
    this.searchImage = CanvasRenderer.loadNewImage('./assets/SearchImages/SearchImage1.png');
    this.gameItemMaker(maxX, maxY);

    if (Stats.keyKitchen == true) {
      this.gameItem.push(new Key
      ((this.maxX / 3 - (this.image.width / 3)) - 25, ((this.maxY + this.image.height) / 3) - 400));
    }
  }

  /**
   * Used to create GameItems per scene indivudially.
   * @param maxX Maximum width of the canvas to render on.
   * @param maxY Maximum height of the canvas to render on.
   */
  public gameItemMaker(maxX: number, maxY: number): void {
    // make doorway
    this.gameItem.push(new CollisionItem((maxX / 2 - (896 / 2)) + 168, ((maxY + 672) / 2) - 56, 1));

    //make exclamation marks
    if (Stats.keyKitchen == false) {
      this.gameItem.push(new ExclamationMark((maxX / 2 - (896 / 2)) + 85,
        (maxY - 672) / 2 + 180, 1));
      this.gameItem.push(new ExclamationMark((maxX / 2 - (896 / 2)) + 592,
        (maxY - 672) / 2 + 180, 2));
      this.gameItem.push(new ExclamationMark((maxX / 2 - (896 / 2)) + 480,
        (maxY - 672) / 2 + 180, 3));
      this.gameItem.push(new ExclamationMark((maxX / 2 - (896 / 2)) + 535,
        (maxY - 672) / 2 + 400, 4));
      this.gameItem.push(new ExclamationMark((maxX / 2 - (896 / 2)) + 732,
        (maxY - 672) / 2 + 180, 5));
    }
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

    if (keyListener.keyPressed(KeyListener.KEY_SPACE) && this.foundKey == true) {
      this.gameItem.push(new Key((this.maxX / 3 - (this.image.width / 3)) - 25,
        ((this.maxY + this.image.height) / 3) - 400));
      Stats.setKeyCollected(1);
      Stats.collectedKeyKitchen();
      this.loadPopUp = true;
    }
  }

  /**
   * Renders the next scene if a certain condition has been met
   * @returns the new scene OR the current scene (So it stays on the same scene)
   */
  public override nextScene(): Scene | null {
    if (this.loadPopUp == true) {
      return new KeyObtained(this.maxX, this.maxY, 0, 0, 1);
    }
    if (this.goToNextRoom == true) {
      return new SceneHallwayB(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 192), (this.maxY - 672) / 2 + 201);
    }
    return this;
  }

  /**
   * @param elapsed time elapsed
   * @param canvas game area
   */
  public override update(elapsed: number, canvas: HTMLCanvasElement): void {
    this.player.update(elapsed);
    this.collision.collision3Wall(this.image, this.player, canvas);
    this.collision.kitchenBorders(this.image, this.player, canvas);
    this.gameItem.forEach((item: GameItem) => {
      if (item instanceof CollisionItem) {
        if (this.player.isCollidingWithItem(item)) {
          this.goToNextRoom = true;
        }
      }

      if (item instanceof ExclamationMark) {
        if (this.player.isCollidingWithItem(item)) {
          this.hitExclamationMark = this.hitExclamationMark + 1;
          if (item.positionNumber == 1) {
            if (Stats.selectedLanguage == 'Dutch') {
              this.searchImage.src = 'assets/SearchImages/K_NL_1.png';
            } else {
              this.searchImage.src = 'assets/SearchImages/K_EN_1.png';
            }
          } if (item.positionNumber == 2) {
            if (Stats.selectedLanguage == 'Dutch') {
              this.searchImage.src = 'assets/SearchImages/K_NL_2.png';
            } else {
              this.searchImage.src = 'assets/SearchImages/K_EN_2.png';
            }
          } if (item.positionNumber == 3) {
            if (Stats.selectedLanguage == 'Dutch') {
              this.searchImage.src = 'assets/SearchImages/K_NL_3.png';
            } else {
              this.searchImage.src = 'assets/SearchImages/K_EN_3.png';
            }
          } if (item.positionNumber == 4) {
            if (Stats.selectedLanguage == 'Dutch') {
              this.searchImage.src = 'assets/SearchImages/K_NL_4.png';
            } else {
              this.searchImage.src = 'assets/SearchImages/K_EN_4.png';
            }
          } if (item.positionNumber == 5) {
            if (Stats.selectedLanguage == 'Dutch') {
              this.searchImage.src = 'assets/SearchImages/K_NL_Key.png';
            } else {
              this.searchImage.src = 'assets/SearchImages/K_EN_Key.png';
            }
            this.foundKey = true;
          } else {
            this.foundKey = false;
          }
        }
      }
    });

    if (this.hitExclamationMark > 0) {
      this.showImage = true;
      this.hitExclamationMark = 0;
    } else {
      this.showImage = false;
    }
  }

  /**
   * Render text/images on the scene.
   * @param canvas The canvas to render on.
   */
  public renderOnScene(canvas: HTMLCanvasElement): void {
    this.gameItem.forEach((item: GameItem) => item.render(canvas));
    this.inventoryItem.forEach((item: GameItem) => item.render(canvas));
    if (this.showImage == true) {
      CanvasRenderer.drawImage(canvas, this.searchImage,
        (canvas.width / 2 - (this.image.width / 2)) + 175,
        (canvas.height - this.image.height) / 2 + 200);
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
