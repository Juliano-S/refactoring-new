import CanvasRenderer from './CanvasRenderer.js';

export default class Stats {
  public static currentRoom: string = '';

  public static totalQuestionsAnsweredCorrect: number = 0;

  public static totalQuestionsAnsweredFalse: number = 0;

  public static stepsTaken: number = 0;

  public static playableCharacter: string = 'Male';

  public static collectedKeys: number = 0;

  public static selectedLanguage: string = 'English';

  public static showBlackBoxes: boolean = false;

  // Inventroy Base Values
  public static keyBathroom: boolean = false;

  public static keyPuzzle: boolean = false;

  public static keyAquarium: boolean = false;

  public static keyKitchen: boolean = false;

  public static plunger: boolean = false;

  public static fishnet: boolean = false;

  //Inventory Checks here

  /**
   * @returns TRUE once the bathroom key has been collected
   */
  public static collectedKeyBathroom(): boolean {
    return this.keyBathroom = true;
  }

  /**
   * @returns TRUE once the bathroom key has been collected
   */
  public static collectedKeyPuzzle(): boolean {
    return this.keyPuzzle = true;
  }

  /**
   * @returns TRUE once the bathroom key has been collected
   */
  public static collectedKeyAquarium(): boolean {
    return this.keyAquarium = true;
  }

  /**
   * @returns TRUE once the bathroom key has been collected
   */
  public static collectedKeyKitchen(): boolean {
    return this.keyKitchen = true;
  }

  /**
   * @returns TRUE once the bathroom key has been collected
   */
  public static collectedPlunger(): boolean {
    return this.plunger = true;
  }

  /**
   * @returns TRUE once the bathroom key has been collected
   */
  public static collectedFishnet(): boolean {
    return this.fishnet = true;
  }

  // All setters here
  public static setCurrentRoom(newRoom: string): string {
    return this.currentRoom = newRoom;
  }

  public static setPlayerCharacter(chosenCharacter: string): string {
    return this.playableCharacter = chosenCharacter;
  }

  public static setKeyCollected(addedKey: number): number {
    return this.collectedKeys += addedKey;
  }

  public static setCorrectAnswer(correctAnswer: number): number {
    return this.totalQuestionsAnsweredCorrect += correctAnswer;
  }

  public static setFalseAnswer(falseAnswer: number): number {
    return this.totalQuestionsAnsweredFalse += falseAnswer;
  }

  public static setStepsTaken(step: number): number {
    return this.stepsTaken += step;
  }

  // All getters here
  public static getCurrentRoom(): string {
    return this.currentRoom;
  }

  public static getPlayerCharacter(): string {
    return this.playableCharacter;
  }

  public static getKeyCollected(): number {
    return this.collectedKeys;
  }

  public static showStatsOnScreen(canvas: HTMLCanvasElement): void {
    const roomNamePosX: number = (canvas.width + 896) / 2 + 20;
    const roomNamePosY: number = canvas.height / 2 - 672 / 2 + 40;

    const keyListPosX: number = roomNamePosX;
    const keyListPosY: number = roomNamePosY + 40;

    CanvasRenderer.writeText(canvas, `${Stats.getCurrentRoom()}`, roomNamePosX, roomNamePosY, 'left', 'Arial', 20, 'white');


    if (this.selectedLanguage == 'Dutch') {
      CanvasRenderer.writeText(canvas, `Sleutels Gevonden: ${Stats.getKeyCollected()}`, keyListPosX, keyListPosY, 'left', 'Arial', 20, 'white');

      CanvasRenderer.writeText(canvas, `Vragen Goed: ${Stats.totalQuestionsAnsweredCorrect}`, keyListPosX, keyListPosY + 20, 'left', 'Arial', 20, 'white');
      CanvasRenderer.writeText(canvas, `Vragen Fout: ${Stats.totalQuestionsAnsweredFalse}`, keyListPosX, keyListPosY + 40, 'left', 'Arial', 20, 'white');
    } else {
      CanvasRenderer.writeText(canvas, `Keys found: ${Stats.getKeyCollected()}`, keyListPosX, keyListPosY, 'left', 'Arial', 20, 'white');

      CanvasRenderer.writeText(canvas, `Questions Correct: ${Stats.totalQuestionsAnsweredCorrect}`, keyListPosX, keyListPosY + 20, 'left', 'Arial', 20, 'white');
      CanvasRenderer.writeText(canvas, `Questions Wrong: ${Stats.totalQuestionsAnsweredFalse}`, keyListPosX, keyListPosY + 40, 'left', 'Arial', 20, 'white');
    }
  }
}
