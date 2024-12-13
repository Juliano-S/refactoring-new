import CanvasRenderer from '../../CanvasRenderer.js';
import GameItem from '../GameItem.js';
import Player from '../Player.js';

export default class TracerBall extends GameItem {
  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.image = CanvasRenderer.loadNewImage('assets/Items/TracerBall.png');
  }

  /**
   * Updates the position of the EnergyBall
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    this.posY = this.posY + elapsed * 0.2;
  }

  /**
   * Makes the ball Trace Player
   * @param player Player that Plays game
   * @param elapsed tickspeed
   */
  public tracePlayer(player: Player, elapsed: number): void{
    if (player.posX > this.posX){
      this.posX = this.posX + elapsed * 0.12 ;
    };

    if (player.posX < this.posX){
      this.posX = this.posX - elapsed * 0.12;
    }
  }
}
