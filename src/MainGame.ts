import Game from './Game.js';

import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';

import Scene from './Scene.js';
import Startscherm from './Scenes/Startscherm.js';
import PhoneScreen from './PhoneScreen.js';
import Inventory from './Inventory.js';

export default class MainGame extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  public currentScene: Scene;

  public phoneOnScreen: PhoneScreen;

  public inventory: Inventory;

  public posX: number;

  public posY: number;

  /**
   * Create a new instance of the game.
   * @param canvas HTML canvas where the game should be rendered
   */
  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.phoneOnScreen = new PhoneScreen();
    this.inventory = new Inventory();

    // Start level 1
    this.currentScene = new Startscherm(this.canvas.width, this.canvas.height, 0, 0);
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    this.currentScene.processInput(this.keyListener);
  }

  /**
   * Update game state. Called from the GameLoop
   * @param elapsed time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    this.currentScene = this.currentScene.nextScene();
    this.currentScene.processInput(this.keyListener);
    this.currentScene.update(elapsed, this.canvas);
    this.currentScene.inventorySpawner();

    return true;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    this.phoneOnScreen.renderPhoneOutlines(this.currentScene.image, this.canvas);
    this.inventory.renderInventoryOutlines(this.currentScene.image, this.canvas);
    this.currentScene.textOnRightOfMap(this.canvas);
    this.currentScene.render(this.canvas);
    this.currentScene.renderOnScene(this.canvas);
  }
}
