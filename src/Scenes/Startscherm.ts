import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import Scene from '../Scene.js';
import Stats from '../Stats.js';
import GameInfo from './GameInfo.js';


export default class Startscherm extends Scene {
  private startGame: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.sceneName = 'startScherm';

    this.maxX = maxX;
    this.maxY = maxY;

    this.posX = posX;
    this.posY = posY;

    this.image.src = './assets/backgrounds/Startscherm.png';

    // Reseting all the stats to their default state in case a player restarts the game from the end
    // Inventory
    Stats.keyBathroom = false;
    Stats.keyPuzzle = false;
    Stats.keyAquarium = false;
    Stats.keyKitchen = false;
    Stats.plunger = false;
    Stats.fishnet = false;

    Stats.collectedKeys = 0;
    Stats.totalQuestionsAnsweredCorrect = 0;
    Stats.totalQuestionsAnsweredFalse = 0;
    // Possible to add more resets below this line
  }

  /**
   * @param keyListener Checks what key is pressed
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_SPACE)) {
      this.handleStartButtonClick();
    }
    if (keyListener.keyPressed('KeyZ')) {
      Stats.selectedLanguage = 'English';
    }
    if (keyListener.keyPressed('KeyX')) {
      Stats.selectedLanguage = 'Dutch';
    }

    if (keyListener.keyPressed('KeyB')) {
      Stats.playableCharacter = 'Male';
    }
    if (keyListener.keyPressed('KeyG')) {
      Stats.playableCharacter = 'Female';
    }
  }

  /**
   *
   */
  public handleStartButtonClick(): void {
    this.startGame = true;
  }


  /**
   * @returns the new scene or the current scene
   */
  public nextScene(): Scene | null {
    if (this.startGame == true) {
      return new GameInfo(this.maxX, this.maxY, 0, 0);
    }
    return this;
  }

  /**
   * @param canvas The canvas to render the text on
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, '#2398a7');


    const playerImagePosX: number = (canvas.width / 2) - (this.image.width) - 100;
    const playerImagePosY: number = canvas.height / 2 - 40;

    if (Stats.playableCharacter == 'Female') {
      CanvasRenderer.drawImage(canvas, CanvasRenderer.loadNewImage('./assets/characters/Player Front Female.png'), playerImagePosX, playerImagePosY);
    } else {
      CanvasRenderer.drawImage(canvas, CanvasRenderer.loadNewImage('./assets/characters/Player Front Male.png'), playerImagePosX, playerImagePosY);
    }

    if (Stats.selectedLanguage == 'Dutch') {
      CanvasRenderer.writeText(canvas, 'Jongen [B]', (canvas.width / 2) - (this.image.width), canvas.height / 2, 'left', 'impact', 50, 'black');
      CanvasRenderer.writeText(canvas, 'Meisje [G]', (canvas.width / 2) - (this.image.width), canvas.height / 2 + 50, 'left', 'impact', 50, 'black');
    } else {
      CanvasRenderer.writeText(canvas, 'Boy [B]', (canvas.width / 2) - (this.image.width), canvas.height / 2, 'left', 'impact', 50, 'black');
      CanvasRenderer.writeText(canvas, 'Girl [G]', (canvas.width / 2) - (this.image.width), canvas.height / 2 + 50, 'left', 'impact', 50, 'black');
    }

    CanvasRenderer.drawImage(canvas, this.image,
      (canvas.width / 2) - (this.image.width / 2),
      (canvas.height - 672));

    if (Stats.selectedLanguage == 'Dutch') {
      CanvasRenderer.writeText(canvas, '[Z] English', (canvas.width / 2) + (this.image.width) - 100, canvas.height / 2, 'left', 'impact', 50, 'black');
      CanvasRenderer.writeText(canvas, '[X] Nederlands', (canvas.width / 2) + (this.image.width) - 100, canvas.height / 2 + 50, 'left', 'impact', 50, 'black');
    } else {
      CanvasRenderer.writeText(canvas, '[Z] English', (canvas.width / 2) + (this.image.width) - 100, canvas.height / 2, 'left', 'impact', 50, 'black');
      CanvasRenderer.writeText(canvas, '[X] Nederlands', (canvas.width / 2) + (this.image.width) - 100, canvas.height / 2 + 50, 'left', 'impact', 50, 'black');
    }
    if (Stats.selectedLanguage == 'Dutch') {
      CanvasRenderer.writeText(canvas, 'Druk op de Spatiebalk om te beginnen', canvas.width / 2, canvas.height / 1.2, 'center', 'impact', 50, 'black');
    } else {
      CanvasRenderer.writeText(canvas, 'Press [Space] to start', canvas.width / 2, canvas.height / 1.2, 'center', 'impact', 50, 'black');
    }
    CanvasRenderer.writeText(canvas, 'Hack Attack', canvas.width / 2, canvas.height / 9, 'center', 'impact', 70, 'black');
  }

  /**
   * @param canvas The canvas to render the text on
   */
  public override renderOnScene(canvas: HTMLCanvasElement): void {
  }

  /**
   *
   * @param canvas The location to render the text on.
   */
  public override textOnRightOfMap(canvas: HTMLCanvasElement): void {
    const roomNamePosX: number = (canvas.width + this.image.width) / 2 + 20;
    const roomNamePosY: number = canvas.height / 2 - 672 / 2 + 40;

    CanvasRenderer.writeText(canvas, `${Stats.getCurrentRoom()}`, roomNamePosX, roomNamePosY, 'left', 'Arial', 20, 'white');
  }
}
