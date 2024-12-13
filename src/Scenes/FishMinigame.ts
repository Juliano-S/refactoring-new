import Bubble from '../CanvasItems/Bubble.js';
import FishnetPlayer from '../CanvasItems/FishnetPlayer.js';
import GameItem from '../CanvasItems/GameItem.js';
import Key from '../CanvasItems/Key.js';
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import Scene from '../Scene.js';
import Stats from '../Stats.js';
import KeyObtained from './KeyObtained.js';


export default class FishMinigame extends Scene {
  private keyAchieved: boolean = false;

  private fishnetPlayer: FishnetPlayer;


  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);
    this.image.src = 'assets/backgrounds/AquariumBackground.png';
    this.fishnetPlayer = new FishnetPlayer(maxX / 2, 0);

    this.gameItemMaker(maxX, maxY);
  }

  /**
   * @param keyListener listens to keyboard input and calls functions
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.isKeyDown('ArrowLeft') || keyListener.isKeyDown('KeyA')) {
      this.fishnetPlayer.moveLeft();
    }

    if (keyListener.isKeyDown('ArrowRight') || keyListener.isKeyDown('KeyD')) {
      this.fishnetPlayer.moveRight();
    }

    if (keyListener.isKeyDown('ArrowDown') || keyListener.isKeyDown('KeyS')) {
      this.fishnetPlayer.moveDown();
    }
  }

  /**
   * @param maxX Screen Width
   * @param maxY Screen Height
   */
  public gameItemMaker(maxX: number, maxY: number,): void {
    for (let i: number = 0; i < 12; i++) {
      const randomX: number = Math.random() * window.innerWidth;

      const randomY: number = Math.random() * (500 - 100) + 100;
      this.gameItem.push(new Bubble(randomX, randomY));
    }

    const keyPosition: number = Math.random() * (maxX / 1.2 - maxX / 8) + maxX / 8;

    this.gameItem.push(new Key(keyPosition, maxY - 100));
  }

  /**
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    this.fishnetPlayer.upAndDownMovement(elapsed);
    this.gameItem.forEach((item: GameItem) => (item.update(elapsed)));

    this.gameItem.forEach((item: GameItem) => {
      if (item instanceof Bubble) {
        if (this.fishnetPlayer.isCollidingWithItem(item)) {
          this.fishnetPlayer.bubbleColidesWithPlayer();
        }
      }

      if (item instanceof Key) {
        if (this.fishnetPlayer.isCollidingWithItem(item)) {
          Stats.setKeyCollected(1);
          Stats.keyAquarium = true;
          this.keyAchieved = true;
        }
      }
    });

    const playerWidth: number = this.fishnetPlayer.getWidth();
    const playerHeight: number = this.fishnetPlayer.getHeight();
    if (this.fishnetPlayer.posX >= window.innerWidth - playerWidth) {
      this.fishnetPlayer.posX = window.innerWidth - playerWidth;
    }
    if (this.fishnetPlayer.posX < window.innerWidth - window.innerWidth) {
      this.fishnetPlayer.posX = window.innerWidth - window.innerWidth;
    }
    if (this.fishnetPlayer.posY > window.innerHeight - playerHeight) {
      this.fishnetPlayer.posY = window.innerHeight - playerHeight;
    }
  }

  /**
   *@returns if player should go to next scene and returns new scene
   */
  public override nextScene(): Scene {
    if (this.keyAchieved == true) {
      return new KeyObtained(this.maxX, this.maxY, 0, 0, 4);
    }
    return this;
  }

  /**
   * @param canvas The canvas
   */
  public override renderOnScene(canvas: HTMLCanvasElement): void {
    this.gameItem.forEach((item: GameItem) => item.render(canvas));
  }

  /**
   * @param canvas the canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, (this.maxX / 2 - (this.image.width / 2)),
      (this.maxY / 2 - (this.image.height / 2)));
    this.fishnetPlayer.render(canvas);
  }
}
