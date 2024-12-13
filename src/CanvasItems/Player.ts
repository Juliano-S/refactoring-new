import CanvasItem from './CanvasItem.js';
import CanvasRenderer from '../CanvasRenderer.js';

import Stats from '../Stats.js';

export default class Player extends CanvasItem {
  private playerSpeed: number;

  private character: string;

  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.character = Stats.playableCharacter;
    this.playerSpeed = 5;

    if (Stats.playableCharacter === 'Male') {
      this.image = CanvasRenderer.loadNewImage('./assets/characters/Player Front Male.png');
    } else if (Stats.playableCharacter === 'Female') {
      this.image = CanvasRenderer.loadNewImage('./assets/characters/Player Front Female.png');
    }
  }

  /**
   * Updates playerspeed
   * @param elapsed tickspeed
   */
  public override update(elapsed: number): void {
    this.playerSpeed = elapsed * 0.2;
  }

  /**
   * Makes the player move Up
   */
  public moveUp(): void {
    if (Stats.playableCharacter === 'Male') {
      this.image = CanvasRenderer.loadNewImage('./assets/characters/Player Back Male.png');
    } else if (Stats.playableCharacter === 'Female') {
      this.image = CanvasRenderer.loadNewImage('./assets/characters/Player Back Female.png');
    }
    this.posY = this.posY - this.playerSpeed;
  }

  /**
   * Makes the player move down
   */
  public moveDown(): void {
    if (Stats.playableCharacter === 'Male') {
      this.image = CanvasRenderer.loadNewImage('./assets/characters/Player Front Male.png');
    } else if (Stats.playableCharacter === 'Female') {
      this.image = CanvasRenderer.loadNewImage('./assets/characters/Player Front Female.png');
    }
    this.posY = this.posY + this.playerSpeed;
  }

  /**
   * Makes the player move to the right
   */
  public moveRight(): void {
    if (Stats.playableCharacter === 'Male') {
      this.image = CanvasRenderer.loadNewImage('./assets/characters/Player Right Male.png');
    } else if (Stats.playableCharacter === 'Female') {
      this.image = CanvasRenderer.loadNewImage('./assets/characters/Player Right Female.png');
    }
    this.posX = this.posX + this.playerSpeed;
  }

  /**
   * Makes the player move to the right
   */
  public moveLeft(): void {
    if (Stats.playableCharacter === 'Male') {
      this.image = CanvasRenderer.loadNewImage('./assets/characters/Player Left Male.png');
    } else if (Stats.playableCharacter === 'Female') {
      this.image = CanvasRenderer.loadNewImage('./assets/characters/Player Left Female.png');
    }
    this.posX = this.posX - this.playerSpeed;
  }
}
