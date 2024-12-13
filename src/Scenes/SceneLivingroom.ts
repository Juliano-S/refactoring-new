import CollisionItem from '../CanvasItems/CollisionItem.js';
import GameItem from '../CanvasItems/GameItem.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import SceneHallwayB from './SceneHallwayB.js';
import Stats from '../Stats.js';
import Aquarium from '../CanvasItems/Aquarium.js';
import FishMinigame from './FishMinigame.js';

export default class SceneLivingroom extends Scene {
  private goToNextRoom: boolean = false;

  private collidingWithAquarium: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    this.posX = posX;
    this.posY = posY;

    this.player.posX = posX;
    this.player.posY = posY;

    // Set the name of the room your are currently in
    if (Stats.selectedLanguage == 'Dutch') {
      Stats.setCurrentRoom('Woonkamer');
    } else {
      Stats.setCurrentRoom('Livingroom');
    }

    this.image.src = './assets/backgrounds/Woonkamer.png';
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
    // make aquarium
    this.gameItem.push(new Aquarium(((maxX - 896) / 2) + 672,
      (maxY / 2 - (672 / 2)) + 44));
  }

  /**
   * Renders the next scene if a certain condition has been met
   * @returns the new scene OR the current scene (So it stays on the same scene)
   */
  public override nextScene(): Scene | null {
    if (this.goToNextRoom == true) {
      return new SceneHallwayB(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 584), (this.maxY - 672) / 2 + 201);
    }

    if(this.collidingWithAquarium == true && Stats.fishnet == true && Stats.keyAquarium == false){
      return new FishMinigame(this.maxX, this.maxY, 0, 0);
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
    this.collision.livingroomBorders(this.image, this.player, canvas	);
    this.gameItem.forEach((item: GameItem) => {
      if (item instanceof CollisionItem) {
        if (this.player.isCollidingWithItem(item)) {
          this.goToNextRoom = true;
        }
      }

      if (this.player.isCollidingWithItem(item)) {
        if (item instanceof Aquarium) {
          this.collidingWithAquarium = true;
        } else {
          this.collidingWithAquarium = false;
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
