import CollisionItem from '../CanvasItems/CollisionItem.js';
import GameItem from '../CanvasItems/GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import SceneHobbyroom from './SceneHobbyroom.js';
import SceneKitchen from './SceneKitchen.js';
import SceneLivingroom from './SceneLivingroom.js';
import SceneServerroom from './SceneServerroom.js';
import Lock from '../CanvasItems/Lock.js';
import Stats from '../Stats.js';

export default class SceneHallwayB extends Scene {
  private goToHobby: boolean = false;

  private goToKitchen: boolean = false;

  private goToLivingroom: boolean = false;

  private goToServerroom: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    // Set the name of the room your are currently in
    if (Stats.selectedLanguage == 'Dutch') {
      Stats.setCurrentRoom('Gang B');
    } else {
      Stats.setCurrentRoom('Hallway B');
    }

    this.image.src = './assets/backgrounds/gang-B.png';
    this.gameItemMaker(maxX, maxY);
  }

  /**
   * Used to create GameItems per scene indivudially.
   * @param maxX Maximum width of the canvas to render on.
   * @param maxY Maximum height of the canvas to render on.
   */
  public gameItemMaker(maxX: number, maxY:number): void {
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
    if (this.goToHobby == true) {
      return new SceneHobbyroom(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 192), (this.maxY - 672) / 2 + 500);
    }

    if (this.goToServerroom == true) {
      return new SceneServerroom(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 304), (this.maxY - 672) / 2 + 160);
    }

    if (this.goToKitchen == true) {
      return new SceneKitchen(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 192), (this.maxY - 672) / 2 + 500);
    }

    if (this.goToLivingroom) {
      return new SceneLivingroom(this.maxX, this.maxY,
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
            this.goToHobby = true;
          }
          if (item.doorNumber == 2) {
            this.goToKitchen = true;
          }
          if (item.doorNumber == 3) {
            this.goToLivingroom = true;
          }
          if (item.doorNumber == 4 && Stats.keyAquarium == true && Stats.keyKitchen == true) {
            this.goToServerroom = true;
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
      if (Stats.keyKitchen == true && Stats.keyAquarium == true) {
        CanvasRenderer.writeText(canvas, 'Deur is OPEN', keyListPosX, keyListPosY + 200, 'left', 'Arial', 20, 'white');
      } else {
        CanvasRenderer.writeText(canvas, 'Deur is GESLOTEN', keyListPosX, keyListPosY + 200, 'left', 'Arial', 20, 'white');
      }
    } else {
      if (Stats.keyKitchen == true && Stats.keyAquarium == true) {
        CanvasRenderer.writeText(canvas, 'Door is OPEN', keyListPosX, keyListPosY + 200, 'left', 'Arial', 20, 'white');
      } else {
        CanvasRenderer.writeText(canvas, 'Door is LOCKED', keyListPosX, keyListPosY + 200, 'left', 'Arial', 20, 'white');
      }
    }
  }
}
