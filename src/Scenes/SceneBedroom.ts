import CollisionItem from '../CanvasItems/CollisionItem.js';
import GameItem from '../CanvasItems/GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import SceneHallwayA from './SceneHallwayA.js';
import Stats from '../Stats.js';

export default class SceneBedroom extends Scene {
  private goToNextRoom: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    this.player.posX = posX;
    this.player.posY = posY;

    // Set the name of the room your are currently in
    if (Stats.selectedLanguage == 'Dutch') {
      Stats.setCurrentRoom('Slaapkamer');
    } else {
      Stats.setCurrentRoom('Bedroom');
    }

    this.image.src = './assets/backgrounds/Bedroom.png';
    this.gameItemMaker(maxX, maxY);
  }

  /**
   * Used to create GameItems per scene indivudially.
   * @param maxX Maximum width of the canvas to render on.
   * @param maxY Maximum height of the canvas to render on.
   */
  public gameItemMaker(maxX: number, maxY: number): void {
    // make doorway
    this.gameItem.push(new CollisionItem((maxX / 2 - (896 / 2)) + 168, ((maxY + 672) / 2) - 56, 1));
  }

  /**
   * Renders the next scene if a certain condition has been met
   * @returns the new scene OR the current scene (So it stays on the same scene)
   */
  public override nextScene(): Scene | null {
    if (this.goToNextRoom == true) {
      return new SceneHallwayA(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 20), (this.maxY - 672) / 2 + 250);
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
    this.collision.bedroomBorders(this.image, this.player, canvas);
    this.gameItem.forEach((item: GameItem) => {
      if (item instanceof CollisionItem) {
        if (this.player.isCollidingWithItem(item)) {
          this.goToNextRoom = true;
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
