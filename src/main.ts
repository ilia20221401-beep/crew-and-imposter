import { gameState } from './core/state';
import { playSound, initAudio } from './core/audio';
import { InputManager } from './core/input';
import { COLORS, GAME_CONFIG } from './utils/constants';

// Initialize
const inputManager = new InputManager();
let myPosition = { x: 600, y: 150 };
let isHost = false;
let myRole: 'crew' | 'imp' = 'crew';

// UI Elements
const $(id: string) = document.getElementById(id);
const canvas = $('cv') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Game Loop
function update(dt: number): void {
  // Update game state
  if (gameState.getState().ph === 'play') {
    handleMovement(dt);
  }
}

function handleMovement(dt: number): void {
  const speed = GAME_CONFIG.PLAYER_SPEED * dt;
  const state = gameState.getState();
  
  if (inputManager.isKeyPressed('w') || inputManager.isKeyPressed('arrowup')) {
    myPosition.y -= speed;
  }
  if (inputManager.isKeyPressed('s') || inputManager.isKeyPressed('arrowdown')) {
    myPosition.y += speed;
  }
  if (inputManager.isKeyPressed('a') || inputManager.isKeyPressed('arrowleft')) {
    myPosition.x -= speed;
  }
  if (inputManager.isKeyPressed('d') || inputManager.isKeyPressed('arrowright')) {
    myPosition.x += speed;
  }
}

function render(): void {
  const width = canvas.width;
  const height = canvas.height;
  
  // Clear
  ctx.fillStyle = '#1d3260';
  ctx.fillRect(0, 0, width, height);
  
  // Draw game content
  const state = gameState.getState();
  
  // Draw rooms (placeholder)
  ctx.fillStyle = '#2a3563';
  ctx.fillRect(100, 100, 400, 300);
  
  ctx.fillStyle = '#f3efe6';
  ctx.font = '16px Arial';
  ctx.fillText('Crew & Impostor', 150, 150);
  ctx.fillText(`Players: ${Object.keys(state.pl).length}`, 150, 200);
}

function gameLoop(): void {
  const now = performance.now();
  const dt = (now - (gameLoop.lastTime || now)) / 1000;
  gameLoop.lastTime = now;
  
  update(Math.min(dt, 0.05)); // Cap dt at 50ms
  render();
  requestAnimationFrame(gameLoop);
}
(gameLoop as any).lastTime = 0;

// Event Listeners
$('host')!.addEventListener('click', () => {
  isHost = true;
  gameState.setState({ ph: 'lobby' });
  playSound('pop');
});

$('join')!.addEventListener('click', () => {
  gameState.setState({ ph: 'play' });
  playSound('pop');
});

$('start')!.addEventListener('click', () => {
  gameState.setState({ ph: 'play' });
  playSound('alarm');
});

inputManager.on('keydown', (e: any) => {
  if (e.key === 'e') playSound('vent');
  if (e.key === 'q') playSound('kill');
  if (e.key === 'r') playSound('alarm');
});

// Initialize audio on first interaction
document.addEventListener('click', () => initAudio(), { once: true });

// Subscribe to state changes
gameState.subscribe((state) => {
  const updateUI = (selector: string, show: boolean) => {
    const el = $(selector);
    if (el) el.classList.toggle('hidden', !show);
  };
  
  updateUI('menu', state.ph === 'menu');
  updateUI('lobby', state.ph === 'lobby');
  updateUI('hud', state.ph === 'play');
  updateUI('btns', state.ph === 'play');
  updateUI('meet', state.ph === 'meet');
  updateUI('end', state.ph === 'end');
  
  // Update HUD info
  const info = $('info');
  if (info && state.ph === 'play') {
    info.textContent = `${myRole === 'imp' ? 'IMPOSTOR' : 'CREWMATE'} | Tasks ${state.td}/${state.tt}`;
  }
});

// Start game loop
requestAnimationFrame(gameLoop);
