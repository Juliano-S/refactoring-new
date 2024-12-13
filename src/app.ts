import MainGame from './MainGame.js';

const game: MainGame = new MainGame(document.getElementById('game') as HTMLCanvasElement);
window.addEventListener('load', () => {
  game.start();
});
