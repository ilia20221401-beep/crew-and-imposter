import { GameState } from '../types/game';

export class GameStateManager {
  private state: GameState = {
    ph: 'menu',
    pl: {},
    bodies: [],
    td: 0,
    tt: 1,
    chat: [],
    voted: {}
  };
  private listeners: Array<(state: GameState) => void> = [];

  getState(): GameState { return this.state; }

  setState(newState: Partial<GameState>): void {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  updateState(updater: (state: GameState) => void): void {
    updater(this.state);
    this.notify();
  }

  subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter(l => l !== listener); };
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  reset(): void {
    this.state = { ph: 'menu', pl: {}, bodies: [], td: 0, tt: 1, chat: [], voted: {} };
    this.notify();
  }
}

export const gameState = new GameStateManager();
