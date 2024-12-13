import CollisionItem from '../CanvasItems/CollisionItem.js';
import Fishnet from '../CanvasItems/Fishnet.js';
import GameItem from '../CanvasItems/GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import SceneHallwayA from './SceneHallwayA.js';
import SceneHallwayB from './SceneHallwayB.js';
import Stats from '../Stats.js';

export default class SceneHobbyroom extends Scene {
  private goToHallwayA: boolean = false;

  private goToHallwayB: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    this.player.posX = posX;
    this.player.posY = posY;

    // Set the name of the room your are currently in
    if (Stats.selectedLanguage == 'Dutch') {
      Stats.setCurrentRoom('Hobby kamer');
    } else {
      Stats.setCurrentRoom('Hobbyroom');
    }

    this.image.src = './assets/backgrounds/Hobby.png';
    this.gameItemMaker(maxX, maxY);
  }

  /**
   * Used to create GameItems per scene indivudially.
   * @param maxX Maximum width of the canvas to render on.
   * @param maxY Maximum height of the canvas to render on.
   */
  public gameItemMaker(maxX: number, maxY: number): void {
    this.gameItem.push(new CollisionItem((maxX / 2 - (896 / 2)), (maxY - 672) / 2 + 336, 1));

    this.gameItem.push(new CollisionItem((maxX / 2 - (896 / 2)) + 280, (maxY - 672) / 2 + 56, 2));

    // make fishnet

    this.gameItem.push(new Fishnet((maxX / 2 - (896 / 2)) + 705, ((maxY + 672) / 2) - 112));
  }

  /**
   *@returns a next or the current scene
   */
  public override nextScene(): Scene | null {
    if (this.goToHallwayA == true) {
      return new SceneHallwayA(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 696), (this.maxY - 672) / 2 + 446);
    }

    if (this.goToHallwayB) {
      return new SceneHallwayB(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 20), (this.maxY - 672) / 2 + 250);
    }
    return this;
  }

  /**
   * Renders the next scene if a certain condition has been met
   * @param elapsed time elapsed
   * @param canvas game area
   *
   */
  public override update(elapsed: number, canvas: HTMLCanvasElement): void {
    this.player.update(elapsed);
    this.collision.collision3Wall(this.image, this.player, canvas	);
    this.collision.hobbyroomBorders(this.image, this.player, canvas	);
    this.gameItem.forEach((item: GameItem) => {
      if (item instanceof CollisionItem) {
        if (this.player.isCollidingWithItem(item)) {
          if (item.doorNumber == 1) {
            this.goToHallwayB = true;
          }
          if (item.doorNumber == 2) {
            this.goToHallwayA = true;
          }
        }
      }
    });
    this.checkCollisionWithItem();
  }

  /**
   *
   */
  public override checkCollisionWithItem(): void{
    this.gameItem.forEach((item: GameItem) => {
      if (this.player.isCollidingWithItem(item)) {
        if (item instanceof Fishnet) {
          Stats.fishnet = true;
          this.gameItem.splice(2, 1);
          this.gameItem.push(new Fishnet((this.maxX / 3 - (this.image.width / 3)) - 25,
            ((this.maxY + this.image.height) / 3) - 400));
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
    const roomNamePosX: number = (canvas.width + this.image.width) / 2 + 20;
    const roomNamePosY: number = canvas.height / 2 - 672 / 2 + 40;

    CanvasRenderer.writeText(canvas, `${Stats.getCurrentRoom()}`, roomNamePosX, roomNamePosY, 'left', 'Arial', 20, 'white');
  }
}
