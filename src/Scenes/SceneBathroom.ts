import CollisionItem from '../CanvasItems/CollisionItem.js';
import GameItem from '../CanvasItems/GameItem.js';
import Ontstopper from '../CanvasItems/Ontstopper.js';
import Scene from '../Scene.js';
import SceneHallwayA from './SceneHallwayA.js';
import Stats from '../Stats.js';
import SceneClickerGame from './SceneClickerGame.js';
import ExclamationMark from '../CanvasItems/ExclamationMark.js';

export default class SceneBathroom extends Scene {
  private goToNextRoom: boolean = false;

  private goToMinigame: boolean = false;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    this.player.posX = posX;
    this.player.posY = posY;

    // Set the name of the room your are currently in
    if (Stats.selectedLanguage == 'Dutch') {
      Stats.setCurrentRoom('Badkamer');
    } else {
      Stats.setCurrentRoom('Bathroom');
    }

    this.image.src = './assets/backgrounds/Badkamer.png';
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

    if (Stats.keyBathroom == false) {
      this.gameItem.push(new ExclamationMark((maxX / 2 - (896 / 2)) + 2,
        ((maxY + 672) / 2) - 450, 1));
    }
    //make plunger
    if (Stats.plunger == false) {
      this.gameItem.push(new Ontstopper((maxX / 2 - (896 / 2)) + 750, ((maxY + 672) / 2) - 450));
    }
  }

  /**
   * Renders the next scene if a certain condition has been met
   * @returns the new scene OR the current scene (So it stays on the same scene)
   */
  public override nextScene(): Scene | null {
    if (this.goToNextRoom == true) {
      return new SceneHallwayA(this.maxX, this.maxY,
        (this.maxX / 2 - (896 / 2) + 192), (this.maxY - 672) / 2 + 201);
    }
    if (this.goToMinigame == true) {
      return new SceneClickerGame(this.maxX, this.maxY, -1000, -1000);
    }
    return this;
  }

  /**
   * makes the player to the minigameScene
   *@returns the minigame scene
   */
  public minigameScene(): Scene | null {
    return new SceneClickerGame(this.maxX, this.maxY, 0, 0);
  }

  /**
   *
   * @param elapsed time elapsed
   * @param canvas game area
   */
  public override update(elapsed: number, canvas: HTMLCanvasElement): void {
    this.player.update(elapsed);
    this.collision.collision4Wall(this.image, this.player, canvas);
    this.collision.bathroomBorders(this.image, this.player, canvas);
    this.gameItem.forEach((item: GameItem) => {
      if (item instanceof CollisionItem) {
        if (this.player.isCollidingWithItem(item)) {
          this.goToNextRoom = true;
        }
      }
    });
    this.checkCollisionWithItem();
  }

  /**
   *
   */
  public override checkCollisionWithItem(): void {
    this.gameItem.forEach((item: GameItem) => {
      if (this.player.isCollidingWithItem(item)) {
        if (item instanceof ExclamationMark &&
           Stats.keyBathroom == false &&
           Stats.plunger == true) {
          Stats.setKeyCollected(1);
          Stats.collectedKeyBathroom();
          this.goToMinigame = true;
          this.gameItem.splice(1, 1);
        }
      }
    });
    this.gameItem.forEach((item: GameItem) => {
      if (this.player.isCollidingWithItem(item)) {
        if (item instanceof Ontstopper) {
          this.gameItem.splice(2, 1);
          Stats.collectedPlunger();
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
}
