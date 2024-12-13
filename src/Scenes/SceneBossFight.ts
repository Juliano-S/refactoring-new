import EnergyBall from '../CanvasItems/BossAttacks/EnergyBall.js';
import GameItem from '../CanvasItems/GameItem.js';
import TracerBall from '../CanvasItems/BossAttacks/TracerBall.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Scene from '../Scene.js';
import Endscreen from './Endscreen.js';
import Gameover from './Gameover.js';
import SpeedBall from '../CanvasItems/BossAttacks/SpeedBall.js';
import Stats from '../Stats.js';

export default class SceneBossFight extends Scene {
  private timeUntilNextItem: number = 0;

  private deadman: boolean = false;

  private timerForWinSeconds: number = 0;

  private goToNextRoom: boolean = false;

  private timeUntilWin: number;

  private playerHealth: number;

  public constructor(maxX: number, maxY: number, posX: number, posY: number) {
    super(maxX, maxY, posX, posY);

    this.maxX = maxX;
    this.maxY = maxY;

    this.posX = posX;
    this.posY = posY;

    this.timeUntilWin = 30 - Stats.totalQuestionsAnsweredCorrect;
    this.playerHealth = 8 - Stats.totalQuestionsAnsweredFalse;

    this.sceneName = 'FinalBoss';

    this.image.src = 'assets/backgrounds/HackermanBackground.png';
    this.gameItemMaker();
  }

  /**
   * Used to create GameItems per scene indivudially.
   */
  public gameItemMaker(): void {
    const randomX: number = Math.floor(Math.random() * window.innerWidth);


    const randomNumber: number = Math.floor(Math.random() * 100);

    if (randomNumber <= 10){
      this.gameItem.push(new TracerBall(randomX, -100));
    } else if (randomNumber <= 30 && randomNumber > 10) {
      this.gameItem.push(new SpeedBall(randomX, -100));
    } else {
      this.gameItem.push(new EnergyBall(randomX, -100));
    }
  }

  /**
   *@returns next or current scene
   */
  public override nextScene(): Scene {
    if (this.goToNextRoom == true) {
      return new Endscreen(this.maxX, this.maxY, 0, 0);
    }
    if (this.deadman == true) {
      return new Gameover(this.maxX, this.maxY, this.maxX / 2, this.maxY / 2);
    }
    return this;
  }

  /**
   * @param elapsed time elapsed
   * @param canvas game area
   */
  public override update(elapsed: number, canvas: HTMLCanvasElement): void {
    this.player.update(elapsed);
    this.gameItem = this.gameItem.filter((item: GameItem) => {
      if (this.player.isCollidingWithItem(item)) {
        this.playerHealth = this.playerHealth - 1;
        return false;
      }
      if (this.playerHealth <= 0) {
        this.deadman = true;
      }
      return (item.getPosY() < canvas.height);
    });

    this.timeUntilNextItem = this.timeUntilNextItem + elapsed;

    if (this.timeUntilNextItem >= 325) {
      this.gameItemMaker();
      this.timeUntilNextItem = 0;
    };
    this.gameItem.forEach((item: GameItem) => {
      item.update(elapsed);
      if(item instanceof TracerBall){
        item.tracePlayer(this.player, elapsed);
      }
    });

    this.timerForWinSeconds = this.timerForWinSeconds + elapsed;
    if (this.timerForWinSeconds >= 1000) {
      this.timeUntilWin -= 1;
      this.timerForWinSeconds = 0;
    }

    const playerWidth: number = this.player.getWidth();
    const playerHeight: number = this.player.getHeight();
    if (this.player.posX >= window.innerWidth - playerWidth) {
      this.player.posX = window.innerWidth - playerWidth;
    }
    if (this.player.posX < window.innerWidth - window.innerWidth) {
      this.player.posX = window.innerWidth - window.innerWidth;
    }
    if (this.player.posY > window.innerHeight - playerHeight) {
      this.player.posY = window.innerHeight - playerHeight;
    }
    if (this.player.posY < (this.maxY / 2 - (window.innerHeight / 2)) + 400) {
      this.player.posY = (this.maxY / 2 - (window.innerHeight / 2)) + 400;
    }

    if (this.timeUntilWin <= 0) {
      this.goToNextRoom = true;
    }
  }

  /**
   * Render text/images on the scene.
   * @param canvas The canvas to render on.
   */
  public override renderOnScene(canvas: HTMLCanvasElement): void {
    this.gameItem.forEach((item: GameItem) => item.render(canvas));
    CanvasRenderer.writeText(canvas, `🕒 ${this.timeUntilWin}`, 10, 100, 'left', 'Arial', 60, 'white');
    CanvasRenderer.writeText(canvas, `💟 ${this.playerHealth}`, 10, 200, 'left', 'Arial', 60, 'white');
  }
}
