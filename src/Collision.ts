import Player from './CanvasItems/Player.js';

export default class Collision {
  /**
   *Calls for all the collision methods that every scene should use
   * @param background The Background
   * @param player The player
   * // param inventoryItem
   * @param canvas game area
   */
  public collision3Wall(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    this.wall3Border(background, player, canvas);
  }

  /**
   * @param background game background image
   * @param player player image
   * @param canvas game area
   */
  public collision4Wall(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    this.wall4Border(background, player, canvas);
  }

  /**
   * @param background game background image
   * @param player player image
   * @param canvas game area
   */
  public collisionHallWall(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    this.wallHallBorder(background, player, canvas);
  }

  /**
   * Makes a border that the player cant move past.
   * @param background The Background
   * @param player The player
   * @param canvas game area
   */
  public wall3Border(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    const imageWidth: number = player.getWidth();
    const imageHeight: number = player.getHeight();

    const rightBoundary: number = (canvas.width / 2 + (background.width / 2)) - imageWidth;
    const leftBoundary: number = (canvas.width / 2 - (background.width / 2));
    const topBoundary: number = ((canvas.height - background.height) / 2) + 110;
    const bottomBoundary: number = (canvas.height + background.height) / 2 - imageHeight;

    if (player.posX >= rightBoundary) {
      player.posX = rightBoundary;
    }

    if (player.posX <= leftBoundary) {
      player.posX = leftBoundary;
    }

    if (player.posY <= topBoundary) {
      player.posY = topBoundary;
    }

    if (player.posY >= bottomBoundary) {
      player.posY = bottomBoundary;
    }
  }

  /**
   * @param background bakcground image
   * @param player player image
   * @param canvas game area
   */
  public wall4Border(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    const imageWidth: number = player.getWidth();
    const imageHeight: number = player.getHeight();

    const rightBoundary: number = (canvas.width / 2 + (background.width / 2)) - imageWidth;
    const leftBoundary: number = (canvas.width / 2 - (background.width / 2));
    const topBoundary: number = ((canvas.height - background.height) / 2) + 166;
    const bottomBoundary: number = (canvas.height + background.height) / 2 - imageHeight;

    if (player.posX >= rightBoundary) {
      player.posX = rightBoundary;
    }

    if (player.posX <= leftBoundary) {
      player.posX = leftBoundary;
    }

    if (player.posY <= topBoundary) {
      player.posY = topBoundary;
    }

    if (player.posY >= bottomBoundary) {
      player.posY = bottomBoundary;
    }
  }

  /**
   * @param background bakcground image
   * @param player player image
   * @param canvas game area
   */
  public wallHallBorder(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    const imageWidth: number = player.getWidth();
    const imageHeight: number = player.getHeight();

    const rightBoundary: number = (canvas.width / 2 + (background.width / 2)) - imageWidth;
    const leftBoundary: number = (canvas.width / 2 - (background.width / 2));
    const topBoundary: number = ((canvas.height - background.height) / 2) + 166;
    const bottomBoundary: number = ((canvas.height + background.height) / 2 - imageHeight) - 110;

    if (player.posX >= rightBoundary) {
      player.posX = rightBoundary;
    }

    if (player.posX <= leftBoundary) {
      player.posX = leftBoundary;
    }

    if (player.posY <= topBoundary) {
      player.posY = topBoundary;
    }

    if (player.posY >= bottomBoundary) {
      player.posY = bottomBoundary;
    }
  }

  /**
   * @param background background image
   * @param player player image
   * @param canvas game area
   */
  public bedroomBorders(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    const imageWidth: number = player.getWidth();
    const imageHeight: number = player.getHeight();
    const rightBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 86;
    const bottomBoundary1: number = (canvas.height - background.height) / 2 + 352;
    const rightBoundary2: number = (canvas.width / 2 - (background.width / 2)) + 669;
    const bottomBoundary2: number = (canvas.height - background.height) / 2 + 180;
    const leftBoundary3: number = ((canvas.width / 2 - (background.width / 2)) + 784) - imageWidth;
    const bottomBoundary3: number = (canvas.height - background.height) / 2 + 236;
    const leftBoundary4: number = ((canvas.width / 2 - (background.width / 2)) + 728) - imageWidth;
    const topBoundary4: number = (canvas.height - background.height) / 2 + 448 - imageHeight;

    //Couch and little table
    if (player.posX < rightBoundary1
      && player.posY < bottomBoundary1
      && player.posY > bottomBoundary1 - 40) {
      player.posY = bottomBoundary1;
    }

    if (player.posX < rightBoundary1
      && player.posY < bottomBoundary1) {
      player.posX = rightBoundary1;
    }

    //Closets and Clotheshanger
    if (player.posX < rightBoundary2
      && player.posY < bottomBoundary2
      && player.posY > bottomBoundary2 - 40) {
      player.posY = bottomBoundary2;
    }

    if (player.posX < rightBoundary2
      && player.posY < bottomBoundary2) {
      player.posX = rightBoundary2;
    }

    //Bed
    if (player.posX > leftBoundary3
      && player.posY < bottomBoundary3
      && player.posY > bottomBoundary3 - 40) {
      player.posY = bottomBoundary3;
    }

    if (player.posX > leftBoundary3
      && player.posY < bottomBoundary3) {
      player.posX = leftBoundary3;
    }

    //Desk and stool
    if (player.posX > leftBoundary4
      && player.posY > topBoundary4
      && player.posY < topBoundary4 + 40) {
      player.posY = topBoundary4;
    }

    if (player.posX > leftBoundary4
      && player.posY > topBoundary4) {
      player.posX = leftBoundary4;
    }
  }

  /**
   * @param background bakcground image
   * @param player player image
   * @param canvas game area
   */
  public hallwayBorders(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    const imageWidth: number = player.getWidth();
    const imageHeight: number = player.getHeight();
    const rightBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 439;
    const leftBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 352 - imageWidth;
    const bottomBoundary1: number = (canvas.height - background.height) / 2 + 110 + imageHeight;
    const rightBoundary2: number = (canvas.width / 2 - (background.width / 2)) + 600;
    const leftBoundary2: number = (canvas.width / 2 - (background.width / 2)) + 469;
    const topBoundary2: number = (canvas.height - background.height) / 2 + 420;
    const leftBoundary3: number = ((canvas.width / 2 - (background.width / 2)) + 810) - imageWidth;
    const bottomBoundary3: number = (canvas.height - background.height) / 2 + 236;
    const leftBoundary4: number = ((canvas.width / 2 - (background.width / 2)) + 890 - imageHeight);
    const topBoundary4: number = (canvas.height - background.height) / 2 + 420;

    //Lamp desk
    if (player.posX < rightBoundary1
      && player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posY > bottomBoundary1 - 10) {
      player.posY = bottomBoundary1;
    }

    if (player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posX < leftBoundary1 + 10) {
      player.posX = leftBoundary1;
    }

    if (player.posX < rightBoundary1
      && player.posY < bottomBoundary1
      && player.posX > rightBoundary1 - 10) {
      player.posX = rightBoundary1;
    }

    //Bottom cupboard
    if (player.posX < rightBoundary2
      && player.posX > leftBoundary2
      && player.posY > topBoundary2
      && player.posY < topBoundary2 + 10) {
      player.posY = topBoundary2;
    }

    if (player.posX > leftBoundary2
      && player.posY > topBoundary2
      && player.posX < leftBoundary2 + 10) {
      player.posX = leftBoundary2;
    }

    if (player.posX < rightBoundary2
      && player.posY > topBoundary2
      && player.posX > rightBoundary2 - 10) {
      player.posX = rightBoundary2;
    }

    // Clock
    if (player.posX > leftBoundary3
      && player.posY < bottomBoundary3
      && player.posY > bottomBoundary3 - 40) {
      player.posY = bottomBoundary3;
    }

    if (player.posX > leftBoundary3
      && player.posY < bottomBoundary3) {
      player.posX = leftBoundary3;
    }

    //Vase
    if (player.posX > leftBoundary4
      && player.posY > topBoundary4
      && player.posY < topBoundary4 + 40) {
      player.posY = topBoundary4;
    }

    if (player.posX > leftBoundary4
      && player.posY > topBoundary4) {
      player.posX = leftBoundary4;
    }
  }


  /**
   * @param background background image
   * @param player player image
   * @param canvas game area
   */
  public hobbyroomBorders(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    const rightBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 551;
    const leftBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 409;
    const bottomBoundary1: number = (canvas.height - background.height) / 2 + 150;
    const rightBoundary2: number = (canvas.width / 2 - (background.width / 2)) + 826;
    const leftBoundary2: number = (canvas.width / 2 - (background.width / 2)) + 570;
    const topBoundary2: number = (canvas.height - background.height) / 2 + 115;
    const bottomBoundary2: number = (canvas.height - background.height) / 2 + 330;
    const leftBoundary3: number = (canvas.width / 2 - (background.width / 2)) + 760;
    const bottomBoundary3: number = (canvas.height - background.height) / 2 + 160;
    const leftBoundary4: number = ((canvas.width / 2 - (background.width / 2)) + 170);
    const rightBoundary4: number = ((canvas.width / 2 - (background.width / 2)) + 442);
    const topBoundary4: number = (canvas.height - background.height) / 2 + 345;
    const leftBoundary5: number = ((canvas.width / 2 - (background.width / 2)) + 56);
    const rightBoundary5: number = ((canvas.width / 2 - (background.width / 2)) + 224);
    const topBoundary5: number = (canvas.height - background.height) / 2 + 235;
    const leftBoundary6: number = ((canvas.width / 2 - (background.width / 2)) + 745);
    const rightBoundary6: number = ((canvas.width / 2 - (background.width / 2)) + 825);
    const topBoundary6: number = (canvas.height - background.height) / 2 + + 520;
    const leftBoundary7: number = ((canvas.width / 2 - (background.width / 2)) + 565);
    const rightBoundary7: number = ((canvas.width / 2 - (background.width / 2)) + 655);
    const topBoundary7: number = (canvas.height - background.height) / 2 + 520;

    // Bookshelf
    if (player.posX < rightBoundary1
      && player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posY > bottomBoundary1 - 10) {
      player.posY = bottomBoundary1;
    }

    if (player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posX < leftBoundary1 + 10) {
      player.posX = leftBoundary1;
    }

    if (player.posX < rightBoundary1
      && player.posY < bottomBoundary1
      && player.posX > rightBoundary1 - 10) {
      player.posX = rightBoundary1;
    }

    //Right table and couch
    if (player.posX < rightBoundary2
      && player.posX > leftBoundary2
      && player.posY > topBoundary2
      && player.posY < topBoundary2 + 10) {
      player.posY = topBoundary2;
    }

    if (player.posX < rightBoundary2
      && player.posX > leftBoundary2
      && player.posY < bottomBoundary2
      && player.posY > bottomBoundary2 - 10) {
      player.posY = bottomBoundary2;
    }

    if (player.posX > leftBoundary2
      && player.posY > topBoundary2
      && player.posY < bottomBoundary2
      && player.posX < leftBoundary2 + 10) {
      player.posX = leftBoundary2;
    }

    if (player.posX < rightBoundary2
      && player.posY > topBoundary2
      && player.posY < bottomBoundary2
      && player.posX > rightBoundary2 - 10) {
      player.posX = rightBoundary2;
    }

    //Top right plant
    if (player.posX > leftBoundary3
      && player.posY < bottomBoundary3
      && player.posY > bottomBoundary3 - 40) {
      player.posY = bottomBoundary3;
    }

    if (player.posX > leftBoundary3
      && player.posY < bottomBoundary3) {
      player.posX = leftBoundary3;
    }

    // Left couch stool and table
    if (player.posX > leftBoundary4
      && player.posX < rightBoundary4
      && player.posY > topBoundary4
      && player.posY < topBoundary4 + 10) {
      player.posY = topBoundary4;
    }

    if (player.posX > leftBoundary4
      && player.posY > topBoundary4
      && player.posX < leftBoundary4 + 10) {
      player.posX = leftBoundary4;
    }

    if (player.posX < rightBoundary4
      && player.posY > topBoundary4
      && player.posX > rightBoundary4 - 10) {
      player.posX = rightBoundary4;
    }

    // Block next to stairs
    if (player.posX > leftBoundary5
      && player.posX < rightBoundary5
      && player.posY > topBoundary5
      && player.posY < topBoundary5 + 10) {
      player.posY = topBoundary5;
    }

    if (player.posX > leftBoundary5
      && player.posY > topBoundary5
      && player.posX < leftBoundary5 + 10) {
      player.posX = leftBoundary5;
    }

    if (player.posX < rightBoundary5
      && player.posY > topBoundary5
      && player.posX > rightBoundary5 - 10) {
      player.posX = rightBoundary5;
    }

    // Plant left of chest
    if (player.posX > leftBoundary6
      && player.posX < rightBoundary6
      && player.posY > topBoundary6
      && player.posY < topBoundary6 + 10) {
      player.posY = topBoundary6;
    }

    if (player.posX > leftBoundary6
      && player.posY > topBoundary6
      && player.posX < leftBoundary6 + 10) {
      player.posX = leftBoundary6;
    }

    if (player.posX < rightBoundary6
      && player.posY > topBoundary6
      && player.posX > rightBoundary6 - 10) {
      player.posX = rightBoundary6;
    }

    // Plant right of chest
    if (player.posX > leftBoundary7
      && player.posX < rightBoundary7
      && player.posY > topBoundary7
      && player.posY < topBoundary7 + 10) {
      player.posY = topBoundary7;
    }

    if (player.posX > leftBoundary7
      && player.posY > topBoundary7
      && player.posX < leftBoundary7 + 10) {
      player.posX = leftBoundary7;
    }

    if (player.posX < rightBoundary7
      && player.posY > topBoundary7
      && player.posX > rightBoundary7 - 10) {
      player.posX = rightBoundary7;
    }
  }

  /**
   * @param background background image
   * @param player player image
   * @param canvas game area
   */
  public kitchenBorders(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    const leftBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 757;
    const bottomBoundary1: number = (canvas.height - background.height) / 2 + 309;
    const leftBoundary2: number = (canvas.width / 2 - (background.width / 2)) + 389;
    const bottomBoundary2: number = (canvas.height - background.height) / 2 + 200;
    const leftBoundary3: number = (canvas.width / 2 - (background.width / 2)) + 15;
    const rightBoundary3: number = (canvas.width / 2 - (background.width / 2)) + 155;
    const bottomBoundary3: number = (canvas.height - background.height) / 2 + 200;
    const leftBoundary4: number = ((canvas.width / 2 - (background.width / 2)) + 389);
    const rightBoundary4: number = ((canvas.width / 2 - (background.width / 2)) + 669);
    const topBoundary4: number = (canvas.height - background.height) / 2 + 359;
    const bottomBoundary4: number = (canvas.height - background.height) / 2 + 459;
    const leftBoundary5: number = ((canvas.width / 2 - (background.width / 2)) + 445);
    const rightBoundary5: number = ((canvas.width / 2 - (background.width / 2)) + 613);
    const topBoundary5: number = (canvas.height - background.height) / 2 + 415;
    const bottomBoundary5: number = (canvas.height - background.height) / 2 + 515;
    const leftBoundary6: number = ((canvas.width / 2 - (background.width / 2)) + 389);
    const rightBoundary6: number = ((canvas.width / 2 - (background.width / 2)) + 669);
    const topBoundary6: number = (canvas.height - background.height) / 2 + + 471;
    const bottomBoundary6: number = (canvas.height - background.height) / 2 + + 571;

    //Top right Cooking counters
    if (player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posY > bottomBoundary1 - 40) {
      player.posY = bottomBoundary1;
    }

    if (player.posX > leftBoundary1
      && player.posY < bottomBoundary1) {
      player.posX = leftBoundary1;
    }

    //Top right Counter and Lamp
    if (player.posX > leftBoundary2
      && player.posY < bottomBoundary2
      && player.posY > bottomBoundary2 - 40) {
      player.posY = bottomBoundary2;
    }

    if (player.posX > leftBoundary2
      && player.posY < bottomBoundary2) {
      player.posX = leftBoundary2;
    }

    // Fridge
    if (player.posX < rightBoundary3
      && player.posX > leftBoundary3
      && player.posY < bottomBoundary3
      && player.posY > bottomBoundary3 - 10) {
      player.posY = bottomBoundary3;
    }

    if (player.posX > leftBoundary3
      && player.posY < bottomBoundary3
      && player.posX < leftBoundary3 + 10) {
      player.posX = leftBoundary3;
    }

    if (player.posX < rightBoundary3
      && player.posY < bottomBoundary3
      && player.posX > rightBoundary3 - 10) {
      player.posX = rightBoundary3;
    }

    //Top of table
    if (player.posX < rightBoundary4
      && player.posX > leftBoundary2
      && player.posY > topBoundary4
      && player.posY < topBoundary4 + 10) {
      player.posY = topBoundary4;
    }

    if (player.posX < rightBoundary4
      && player.posX > leftBoundary4
      && player.posY < bottomBoundary4
      && player.posY > bottomBoundary4 - 10) {
      player.posY = bottomBoundary4;
    }

    if (player.posX > leftBoundary4
      && player.posY > topBoundary4
      && player.posY < bottomBoundary4
      && player.posX < leftBoundary4 + 10) {
      player.posX = leftBoundary4;
    }

    if (player.posX < rightBoundary4
      && player.posY > topBoundary4
      && player.posY < bottomBoundary4
      && player.posX > rightBoundary4 - 10) {
      player.posX = rightBoundary4;
    }

    //Middle of table
    if (player.posX < rightBoundary5
      && player.posX > leftBoundary5
      && player.posY > topBoundary5
      && player.posY < topBoundary5 + 10) {
      player.posY = topBoundary5;
    }

    if (player.posX < rightBoundary5
      && player.posX > leftBoundary5
      && player.posY < bottomBoundary5
      && player.posY > bottomBoundary5 - 10) {
      player.posY = bottomBoundary5;
    }

    if (player.posX > leftBoundary5
      && player.posY > topBoundary5
      && player.posY < bottomBoundary5
      && player.posX < leftBoundary5 + 10) {
      player.posX = leftBoundary5;
    }

    if (player.posX < rightBoundary5
      && player.posY > topBoundary5
      && player.posY < bottomBoundary5
      && player.posX > rightBoundary5 - 10) {
      player.posX = rightBoundary5;
    }

    //Bottom of table
    if (player.posX < rightBoundary6
      && player.posX > leftBoundary6
      && player.posY > topBoundary6
      && player.posY < topBoundary6 + 10) {
      player.posY = topBoundary6;
    }

    if (player.posX < rightBoundary6
      && player.posX > leftBoundary6
      && player.posY < bottomBoundary6
      && player.posY > bottomBoundary6 - 10) {
      player.posY = bottomBoundary6;
    }

    if (player.posX > leftBoundary6
      && player.posY > topBoundary6
      && player.posY < bottomBoundary6
      && player.posX < leftBoundary6 + 10) {
      player.posX = leftBoundary6;
    }

    if (player.posX < rightBoundary6
      && player.posY > topBoundary6
      && player.posY < bottomBoundary6
      && player.posX > rightBoundary6 - 10) {
      player.posX = rightBoundary6;
    }
  }


  /**
   * @param background background image
   * @param player player image
   * @param canvas game area
   */
  public livingroomBorders(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    const leftBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 355;
    const rightBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 475;
    const bottomBoundary1: number = (canvas.height - background.height) / 2 + 130;
    const leftBoundary2: number = (canvas.width / 2 - (background.width / 2)) + 480;
    const rightBoundary2: number = (canvas.width / 2 - (background.width / 2)) + 590;
    const bottomBoundary2: number = (canvas.height - background.height) / 2 + 145;
    const leftBoundary3: number = (canvas.width / 2 - (background.width / 2)) + 1;
    const rightBoundary3: number = (canvas.width / 2 - (background.width / 2)) + 130;
    const bottomBoundary3: number = (canvas.height - background.height) / 2 + 256;
    const leftBoundary4: number = ((canvas.width / 2 - (background.width / 2)) + 88);
    const rightBoundary4: number = ((canvas.width / 2 - (background.width / 2)) + 320);
    const topBoundary4: number = (canvas.height - background.height) / 2 + 220;
    const bottomBoundary4: number = (canvas.height - background.height) / 2 + 312;
    const leftBoundary5: number = ((canvas.width / 2 - (background.width / 2)) + 140);
    const rightBoundary5: number = ((canvas.width / 2 - (background.width / 2)) + 252);
    const topBoundary5: number = (canvas.height - background.height) / 2 + 120;
    const bottomBoundary5: number = (canvas.height - background.height) / 2 + 212;
    const rightBoundary6: number = ((canvas.width / 2 - (background.width / 2)) + 112);
    const topBoundary6: number = (canvas.height - background.height) / 2 + + 321;
    const bottomBoundary6: number = (canvas.height - background.height) / 2 + + 421;
    const leftBoundary7: number = ((canvas.width / 2 - (background.width / 2)) + 775);
    const topBoundary7: number = (canvas.height - background.height) / 2 + + 358;
    const leftBoundary8: number = ((canvas.width / 2 - (background.width / 2)) + 615);
    const topBoundary8: number = (canvas.height - background.height) / 2 + + 480;

    // Fire place
    if (player.posX < rightBoundary1
      && player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posY > bottomBoundary1 - 10) {
      player.posY = bottomBoundary1;
    }

    if (player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posX < leftBoundary1 + 10) {
      player.posX = leftBoundary1;
    }

    if (player.posX < rightBoundary1
      && player.posY < bottomBoundary1
      && player.posX > rightBoundary1 - 10) {
      player.posX = rightBoundary1;
    }

    // Clock
    if (player.posX < rightBoundary2
      && player.posX > leftBoundary2
      && player.posY < bottomBoundary2
      && player.posY > bottomBoundary2 - 10) {
      player.posY = bottomBoundary2;
    }

    if (player.posX > leftBoundary2
      && player.posY < bottomBoundary2
      && player.posX < leftBoundary2 + 10) {
      player.posX = leftBoundary2;
    }

    if (player.posX < rightBoundary2
      && player.posY < bottomBoundary2
      && player.posX > rightBoundary2 - 10) {
      player.posX = rightBoundary2;
    }

    // Left couch
    if (player.posX < rightBoundary3
      && player.posX > leftBoundary3
      && player.posY < bottomBoundary3
      && player.posY > bottomBoundary3 - 10) {
      player.posY = bottomBoundary3;
    }

    if (player.posX > leftBoundary3
      && player.posY < bottomBoundary3
      && player.posX < leftBoundary3 + 10) {
      player.posX = leftBoundary3;
    }

    if (player.posX < rightBoundary3
      && player.posY < bottomBoundary3
      && player.posX > rightBoundary3 - 10) {
      player.posX = rightBoundary3;
    }

    //Bottom couch
    if (player.posX < rightBoundary4
      && player.posX > leftBoundary4
      && player.posY > topBoundary4
      && player.posY < topBoundary4 + 10) {
      player.posY = topBoundary4;
    }

    if (player.posX < rightBoundary4
      && player.posX > leftBoundary4
      && player.posY < bottomBoundary4
      && player.posY > bottomBoundary4 - 10) {
      player.posY = bottomBoundary4;
    }

    if (player.posX > leftBoundary4
      && player.posY > topBoundary4
      && player.posY < bottomBoundary4
      && player.posX < leftBoundary4 + 10) {
      player.posX = leftBoundary4;
    }

    if (player.posX < rightBoundary4
      && player.posY > topBoundary4
      && player.posY < bottomBoundary4
      && player.posX > rightBoundary4 - 10) {
      player.posX = rightBoundary4;
    }

    //Table
    if (player.posX < rightBoundary5
      && player.posX > leftBoundary5
      && player.posY > topBoundary5
      && player.posY < topBoundary5 + 10) {
      player.posY = topBoundary5;
    }

    if (player.posX < rightBoundary5
      && player.posX > leftBoundary5
      && player.posY < bottomBoundary5
      && player.posY > bottomBoundary5 - 10) {
      player.posY = bottomBoundary5;
    }

    if (player.posX > leftBoundary5
      && player.posY > topBoundary5
      && player.posY < bottomBoundary5
      && player.posX < leftBoundary5 + 10) {
      player.posX = leftBoundary5;
    }

    if (player.posX < rightBoundary5
      && player.posY > topBoundary5
      && player.posY < bottomBoundary5
      && player.posX > rightBoundary5 - 10) {
      player.posX = rightBoundary5;
    }

    //Music player
    if (player.posX < rightBoundary6
      && player.posY > topBoundary6
      && player.posY < topBoundary6 + 10) {
      player.posY = topBoundary6;
    }

    if (player.posX < rightBoundary6
      && player.posY < bottomBoundary6
      && player.posY > bottomBoundary6 - 10) {
      player.posY = bottomBoundary6;
    }

    if (player.posX < rightBoundary6
      && player.posY > topBoundary6
      && player.posY < bottomBoundary6
      && player.posX > rightBoundary6 - 10) {
      player.posX = rightBoundary6;
    }

    // bottom right closet and lamp
    if (player.posX > leftBoundary7
      && player.posY > topBoundary7
      && player.posY < topBoundary7 + 40) {
      player.posY = topBoundary7;
    }

    if (player.posX > leftBoundary7
      && player.posY > topBoundary7) {
      player.posX = leftBoundary7;
    }

    //bottom right chair
    if (player.posX > leftBoundary8
      && player.posY > topBoundary8
      && player.posY < topBoundary8 + 40) {
      player.posY = topBoundary8;
    }

    if (player.posX > leftBoundary8
      && player.posY > topBoundary8) {
      player.posX = leftBoundary8;
    }
  };


  /**
   * @param background background image
   * @param player player image
   * @param canvas game area
   */
  public bathroomBorders(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    const rightBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 440;
    const leftBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 60;
    const bottomBoundary1: number = (canvas.height - background.height) / 2 + 180;

    //Counter
    if (player.posX < rightBoundary1
      && player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posY > bottomBoundary1 - 10) {
      player.posY = bottomBoundary1;
    }

    if (player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posX < leftBoundary1 + 10) {
      player.posX = leftBoundary1;
    }

    if (player.posX < rightBoundary1
      && player.posY < bottomBoundary1
      && player.posX > rightBoundary1 - 10) {
      player.posX = rightBoundary1;
    }
  }

  /**
   * @param background background image
   * @param player player image
   * @param canvas game area
   */
  public puzzleroomBorders(background: HTMLImageElement,
    player: Player, canvas: HTMLCanvasElement): void {
    const leftBoundary1: number = (canvas.width / 2 - (background.width / 2)) + 470;
    const bottomBoundary1: number = (canvas.height - background.height) / 2 + 140;
    const leftBoundary2: number = (canvas.width / 2 - (background.width / 2)) + 530;
    const bottomBoundary2: number = (canvas.height - background.height) / 2 + 230;
    const leftBoundary3: number = (canvas.width / 2 - (background.width / 2)) + 8;
    const rightBoundary3: number = (canvas.width / 2 - (background.width / 2)) + 100;
    const bottomBoundary3: number = (canvas.height - background.height) / 2 + 256;
    const leftBoundary4: number = ((canvas.width / 2 - (background.width / 2)) + 8);
    const rightBoundary4: number = ((canvas.width / 2 - (background.width / 2)) + 270);
    const topBoundary4: number = (canvas.height - background.height) / 2 + 1;
    const bottomBoundary4: number = (canvas.height - background.height) / 2 + 200;
    const leftBoundary5: number = ((canvas.width / 2 - (background.width / 2)) + 112);
    const rightBoundary5: number = ((canvas.width / 2 - (background.width / 2)) + 224);
    const bottomBoundary5: number = (canvas.height - background.height) / 2 + 230;
    const leftBoundary6: number = ((canvas.width / 2 - (background.width / 2)) + 680);
    const bottomBoundary6: number = (canvas.height - background.height) / 2 + + 262;
    const rightBoundary7: number = ((canvas.width / 2 - (background.width / 2)) + 830);
    const leftBoundary7: number = ((canvas.width / 2 - (background.width / 2)) + 620);
    const topBoundary7: number = (canvas.height - background.height) / 2 + + 440;
    const rightBoundary8: number = ((canvas.width / 2 - (background.width / 2)) + 608);
    const leftBoundary8: number = ((canvas.width / 2 - (background.width / 2)) + 452);
    const topBoundary8: number = (canvas.height - background.height) / 2 + + 512;
    const leftBoundary9: number = (canvas.width / 2 - (background.width / 2)) + 755;
    const bottomBoundary9: number = (canvas.height - background.height) / 2 + 370;

    // Top right 1
    if (player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posY > bottomBoundary1 - 10) {
      player.posY = bottomBoundary1;
    }

    if (player.posX > leftBoundary1
      && player.posY < bottomBoundary1
      && player.posX < leftBoundary1 + 10) {
      player.posX = leftBoundary1;
    }

    // Top right 2
    if (player.posX > leftBoundary2
      && player.posY < bottomBoundary2
      && player.posY > bottomBoundary2 - 10) {
      player.posY = bottomBoundary2;
    }

    if (player.posX > leftBoundary2
      && player.posY < bottomBoundary2
      && player.posX < leftBoundary2 + 10) {
      player.posX = leftBoundary2;
    }

    // Coat hanger
    if (player.posX < rightBoundary3
      && player.posX > leftBoundary3
      && player.posY < bottomBoundary3
      && player.posY > bottomBoundary3 - 10) {
      player.posY = bottomBoundary3;
    }

    if (player.posX > leftBoundary3
      && player.posY < bottomBoundary3
      && player.posX < leftBoundary3 + 10) {
      player.posX = leftBoundary3;
    }

    if (player.posX < rightBoundary3
      && player.posY < bottomBoundary3
      && player.posX > rightBoundary3 - 10) {
      player.posX = rightBoundary3;
    }

    //Left closets
    if (player.posX < rightBoundary4
      && player.posX > leftBoundary4
      && player.posY > topBoundary4
      && player.posY < topBoundary4 + 10) {
      player.posY = topBoundary4;
    }

    if (player.posX < rightBoundary4
      && player.posX > leftBoundary4
      && player.posY < bottomBoundary4
      && player.posY > bottomBoundary4 - 10) {
      player.posY = bottomBoundary4;
    }

    if (player.posX > leftBoundary4
      && player.posY > topBoundary4
      && player.posY < bottomBoundary4
      && player.posX < leftBoundary4 + 10) {
      player.posX = leftBoundary4;
    }

    if (player.posX < rightBoundary4
      && player.posY > topBoundary4
      && player.posY < bottomBoundary4
      && player.posX > rightBoundary4 - 10) {
      player.posX = rightBoundary4;
    }

    // Lamp left
    if (player.posX < rightBoundary5
      && player.posX > leftBoundary5
      && player.posY < bottomBoundary5
      && player.posY > bottomBoundary5 - 10) {
      player.posY = bottomBoundary5;
    }

    if (player.posX > leftBoundary5
      && player.posY < bottomBoundary5
      && player.posX < leftBoundary5 + 10) {
      player.posX = leftBoundary5;
    }

    if (player.posX < rightBoundary5
      && player.posY < bottomBoundary5
      && player.posX > rightBoundary5 - 10) {
      player.posX = rightBoundary5;
    }

    // Top right 3
    if (player.posX > leftBoundary6
      && player.posY < bottomBoundary6
      && player.posY > bottomBoundary6 - 10) {
      player.posY = bottomBoundary6;
    }

    if (player.posX > leftBoundary6
      && player.posY < bottomBoundary6
      && player.posX < leftBoundary6 + 10) {
      player.posX = leftBoundary6;
    }

    // Desk and Lamp bottom
    if (player.posX > leftBoundary7
      && player.posX < rightBoundary7
      && player.posY > topBoundary7
      && player.posY < topBoundary7 + 10) {
      player.posY = topBoundary7;
    }

    if (player.posX > leftBoundary7
      && player.posY > topBoundary7
      && player.posX < leftBoundary7 + 10) {
      player.posX = leftBoundary7;
    }

    if (player.posX < rightBoundary7
      && player.posY > topBoundary7
      && player.posX > rightBoundary7 - 10) {
      player.posX = rightBoundary7;
    }

    // Boxes
    if (player.posX > leftBoundary8
      && player.posX < rightBoundary8
      && player.posY > topBoundary8
      && player.posY < topBoundary8 + 10) {
      player.posY = topBoundary8;
    }

    if (player.posX > leftBoundary8
      && player.posY > topBoundary8
      && player.posX < leftBoundary8 + 10) {
      player.posX = leftBoundary8;
    }

    if (player.posX < rightBoundary8
      && player.posY > topBoundary8
      && player.posX > rightBoundary8 - 10) {
      player.posX = rightBoundary8;
    }

    // Jumping thing
    if (player.posX > leftBoundary9
      && player.posY < bottomBoundary9
      && player.posY > bottomBoundary9 - 10) {
      player.posY = bottomBoundary9;
    }

    if (player.posX > leftBoundary9
      && player.posY < bottomBoundary9
      && player.posX < leftBoundary9 + 10) {
      player.posX = leftBoundary9;
    }
  };
}
