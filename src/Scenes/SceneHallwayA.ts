import CollisionItem from '../CanvasItems/CollisionItem.js';
import GameItem from '../CanvasItems/GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import SceneBathroom from './SceneBathroom.js';
import SceneBedroom from './SceneBedroom.js';
import SceneHobbyroom from './SceneHobbyroom.js';
import ScenePuzzle from './ScenePuzzle.js';
import Lock from '../CanvasItems/Lock.js';
import Stats from '../Stats.js';


export default class SceneHallwayA extends Scene {
  private goToBedroom: boolean = false;

  private goToPuzzle: boolean = false;

  private goToBathroom: boolean = false;

  private goToHobby: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    this.player.posX = posX;
    this.player.posY = posY;

    // Set the name of the room your are currently in
    if (Stats.selectedLanguage == 'Dutch') {
      Stats.setCurrentRoom('Gang A');
    } else {
      Stats.setCurrentRoom('Hallway A');
    }


    this.image.src = './assets/backgrounds/gang-A.png';
    this.gameItemMaker(maxX, maxY);
  }

  /**
   * Used to create GameItems per scene indivudially.
   * @param maxX Maximum width of the canvas to render on.
   * @param maxY Maximum height of the canvas to render on.
   */
  public gameItemMaker(maxX: number, maxY: number): void {
    // make doorways
    this.gameItem.push(new CollisionItem((maxX / 2 - (896 / 2)), (maxY - 672) / 2 + 168, 1));
    this.gameItem.push(new CollisionItem((maxX / 2 - (896 / 2)) + 168, (maxY - 672) / 2 + 112, 2));
    this.gameItem.push(new CollisionItem((maxX / 2 - (896 / 2)) + 560, (maxY - 672) / 2 + 112, 3));
    this.gameItem.push(new CollisionItem((maxX / 2 - (896 / 2)) + 672, (maxY - 672) / 2 + 560, 4));

    // make lock
    this.gameItem.push(new Lock((maxX / 2 - (896 / 2)) + 700, ((maxY + 672) / 2) - 112));
  }

  /**
   * Renders the next scene if a certain condition has been met
   * @returns the new scene OR the current scene (So it stays on the same scene)
   */
  public override nextScene(): Scene | null {
    if (this.goToBedroom === true) {
      return new SceneBedroom(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 192), (this.maxY - 672) / 2 + 500);
    }

    if (this.goToHobby === true) {
      return new SceneHobbyroom(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 304), (this.maxY - 672) / 2 + 160);
    }

    if (this.goToBathroom === true) {
      return new SceneBathroom(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 192), (this.maxY - 672) / 2 + 500);
    }

    if (this.goToPuzzle === true) {
      return new ScenePuzzle(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 192), (this.maxY - 672) / 2 + 500);
    }
    return this;
  }

  /**
   * @param elapsed time elapsed
   * @param canvas game area
   */
  public override update(elapsed: number, canvas: HTMLCanvasElement): void {
    this.player.update(elapsed);
    this.collision.wallHallBorder(this.image, this.player, canvas);
    this.collision.hallwayBorders(this.image, this.player, canvas);
    this.gameItem.forEach((item: GameItem) => {
      if (item instanceof CollisionItem) {
        if (this.player.isCollidingWithItem(item)) {
          if (item.doorNumber == 1) {
            this.goToBedroom = true;
          }
          if (item.doorNumber == 2) {
            this.goToBathroom = true;
          }
          if (item.doorNumber == 3) {
            this.goToPuzzle = true;
          }
          if (item.doorNumber == 4 && Stats.keyBathroom == true && Stats.keyPuzzle == true) {
            this.goToHobby = true;
          }
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
  }

  /**
   * @param canvas The location to render the text on.
   */
  public override textOnRightOfMap(canvas: HTMLCanvasElement): void {
    const roomNamePosX: number = (canvas.width + 896) / 2 + 20;
    const roomNamePosY: number = canvas.height / 2 - 672 / 2 + 40;

    const keyListPosX: number = roomNamePosX;
    const keyListPosY: number = roomNamePosY + 40;

    if (Stats.selectedLanguage == 'Dutch') {
      if (Stats.keyBathroom == true && Stats.keyPuzzle == true) {
        CanvasRenderer.writeText(canvas, 'Deur is OPEN', keyListPosX, keyListPosY + 200, 'left', 'Arial', 20, 'white');
      } else {
        CanvasRenderer.writeText(canvas, 'Deur is GESLOTEN', keyListPosX, keyListPosY + 200, 'left', 'Arial', 20, 'white');
      }
    } else {
      if (Stats.keyBathroom == true && Stats.keyPuzzle == true) {
        CanvasRenderer.writeText(canvas, 'Door is OPEN', keyListPosX, keyListPosY + 200, 'left', 'Arial', 20, 'white');
      } else {
        CanvasRenderer.writeText(canvas, 'Door is LOCKED', keyListPosX, keyListPosY + 200, 'left', 'Arial', 20, 'white');
      }
    }
  }
}
