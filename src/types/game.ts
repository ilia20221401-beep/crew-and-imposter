export interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  c: number;
  a: number;
  h?: number;
}

export interface GameState {
  ph: 'menu' | 'lobby' | 'play' | 'meet' | 'reveal' | 'result' | 'end';
  pl: Record<string, Player>;
  bodies: Body[];
  td: number;
  tt: number;
  chat: string[];
  voted: Record<string, number>;
  lt?: number;
  dr?: Record<string, number>;
  lv?: number;
  tm?: number;
  mi?: string;
  mn?: string;
  ej?: Ejection;
  res?: string;
  rl?: Record<string, string>;
  em?: Record<string, Emotion>;
  vt?: Record<string, string>;
  win?: 'Crew' | 'Impostors';
  pub?: number;
}

export interface Body {
  x: number;
  y: number;
  c: string;
}

export interface Emotion {
  e: number;
}

export interface Ejection {
  n: string;
  c: number;
  h?: number;
}

export interface NearInfo {
  t: number;
  rep: number;
  kill: string | null;
  fix: number;
  vent: number;
}

export interface MoveInfo {
  x: number;
  y: number;
  f: number;
  t: number;
}
