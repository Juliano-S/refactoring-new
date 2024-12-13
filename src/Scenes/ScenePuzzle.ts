import CollisionItem from '../CanvasItems/CollisionItem.js';
import GameItem from '../CanvasItems/GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Key from '../CanvasItems/Key.js';
import Scene from '../Scene.js';
import SceneHallwayA from './SceneHallwayA.js';
import Stats from '../Stats.js';
import Oldman from '../CanvasItems/Oldman.js';
import DirtMound from '../CanvasItems/DirtMound.js';
import KeyListener from '../KeyListener.js';
import KeyObtained from './KeyObtained.js';

export default class ScenePuzzle extends Scene {
  private goToNextRoom: boolean = false;

  private activatePopUp: boolean = false;

  private bigOldMan: HTMLImageElement;

  private spacePressed: number = 0;

  private cleanCounter: number = 0;

  private speachCloud: HTMLImageElement;

  private keyAccesible: boolean;

  private manInteraction: boolean = false;

  private makeMinigame: boolean = false;

  private spaceBarActive: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);


    this.maxX = maxX;
    this.maxY = maxY;

    this.player.posX = posX;
    this.player.posY = posY;

    // Set the name of the room your are currently in
    if (Stats.selectedLanguage == 'Dutch') {
      Stats.setCurrentRoom('Puzzel Kamer');
      this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud.png');
    } else {
      Stats.setCurrentRoom('Puzzle Room');
      this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloudENRev1.png');
    }

    this.bigOldMan = CanvasRenderer.loadNewImage('assets/characters/Beer.png');
    this.image.src = './assets/backgrounds/Storage.png';
    this.keyAccesible = false;
    this.gameItemMaker(maxX, maxY);
  }

  /**
   * @param keyListener listens to keyboard input and calls methods
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
    this.gameItem.push(new CollisionItem((maxX / 2 - (896 / 2)) + 168, ((maxY + 672) / 2) - 56, 1));

    //make key
    if(Stats.keyPuzzle == false){
      this.gameItem.push(new Key((maxX / 2 + (896 / 2) - 350), (maxY - 672) / 2 + 500));
    }
    this.gameItem.push(new Oldman((maxX / 2 + (896 / 2) - 290), (maxY - 672) / 2 + 400));
  }


  /**
   * Renders the next scene if a certain condition has been met
   * @returns the new scene OR the current scene (So it stays on the same scene)
   */
  public override nextScene(): Scene | null {
    if (this.activatePopUp == true){
      return new KeyObtained(this.maxX, this.maxY, 0, 0, 2);
    }
    if (this.goToNextRoom == true) {
      return new SceneHallwayA(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 584), (this.maxY - 672) / 2 + 201);
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
    this.collision.puzzleroomBorders(this.image, this.player, canvas);
    this.gameItem.forEach((item: GameItem) => {
      if (item instanceof CollisionItem) {
        if (this.player.isCollidingWithItem(item)) {
          this.goToNextRoom = true;
        }
      }
    });

    this.checkCollisionWithItem();

    if (this.spacePressed == 0
      && this.spaceBarActive === true
      && this.makeMinigame === true
      && Stats.keyPuzzle == false) {
      this.spacePressed += 1;
      this.gameItem.push(new DirtMound
      ((this.maxX / 2 + (896 / 2) - 410), (this.maxY - 672) / 2 + 500));
      this.gameItem.push(new DirtMound
      ((this.maxX / 2 + (896 / 2) - 616), (this.maxY - 672) / 2 + 150));
      this.gameItem.push(new DirtMound
      ((this.maxX / 2 + (896 / 2) - 728), (this.maxY - 672) / 2 + 300));
      this.gameItem.push(new DirtMound
      ((this.maxX / 2 + (896 / 2) - 820), (this.maxY - 672) / 2 + 550));
      this.gameItem.push(new DirtMound
      ((this.maxX / 2 + (896 / 2) - 200), (this.maxY - 672) / 2 + 350));
    }

    this.gameItem = this.gameItem.filter((item: GameItem) => {
      if (this.player.isCollidingWithItem(item) && item instanceof DirtMound) {
        this.cleanCounter += 1;
        return false;
      } else {
        return true;
      }
    });

    if (this.cleanCounter == 5) {
      this.keyAccesible = true;
      if (Stats.selectedLanguage == 'Dutch') {
        this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud4.png');
      } else {
        this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud4ENRev1.png');
      }
    } else if (this.cleanCounter < 5 && this.cleanCounter > 0) {
      if (Stats.selectedLanguage == 'Dutch') {
        this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud3.png');
      } else {
        this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud3ENRev1.png');
      }
    }
  }

  /**
   *
   */
  public override checkCollisionWithItem(): void {
    this.gameItem.forEach((item: GameItem) => {
      if (this.player.isCollidingWithItem(item)) {
        if (item instanceof Key && this.keyAccesible == true) {
          Stats.setKeyCollected(1);
          Stats.collectedKeyPuzzle();
          this.gameItem.splice(1, 1);
          this.gameItem.push(new Key((this.maxX / 3 - (this.image.width / 3)) - 25,
            ((this.maxY + this.image.height) / 3) - 400));
          if (Stats.selectedLanguage == 'Dutch') {
            this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud2.png');
          } else {
            this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud2ENRev1.png');
          }
          this.activatePopUp = true;
        }
      }
    });
    this.gameItem.forEach((item: GameItem) => {
      if (item instanceof Oldman) {
        if (this.player.isCollidingWithItem(item)) {
          this.makeMinigame = true;
          this.manInteraction = true;
        }else {
          this.manInteraction = false;
          this.makeMinigame = false;
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
    if (this.manInteraction == true) {
      CanvasRenderer.drawImage(canvas, this.bigOldMan,
        (this.maxX / 2 + (896 / 2) - 228), (this.maxY - 672) / 2 + 300);
      CanvasRenderer.drawImage(canvas, this.speachCloud,
        (this.maxX / 2 + (896 / 2) - 728), (this.maxY - 672) / 2 + 50);
    }
    if (this.cleanCounter == 5) {
      this.keyAccesible = true;
      if (Stats.selectedLanguage == 'Dutch') {
        this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud4.png');
      } else {
        this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud4ENRev1.png');
      }
    } else if (this.cleanCounter < 5 && this.cleanCounter > 0) {
      if (Stats.selectedLanguage == 'Dutch') {
        this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud3.png');
      } else {
        this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud3ENRev1.png');
      }
    }

    if (Stats.keyPuzzle == true){
      if (Stats.selectedLanguage == 'Dutch') {
        this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud2.png');
      } else {
        this.speachCloud = CanvasRenderer.loadNewImage('assets/SpeakClouds/OldManCloud2ENRev1.png');
      }
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

