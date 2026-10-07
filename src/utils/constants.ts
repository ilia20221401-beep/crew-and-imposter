export const COLORS = [
  '#e53935', '#1e88e5', '#43a047', '#fdd835', '#8e24aa',
  '#f48fb1', '#ff8f00', '#00acc1', '#6d4c41', '#cfd8dc'
];

export const ROOMS = [
  [400, 60, 400, 240, 'Cafeteria'],
  [60, 380, 260, 260, 'Storage'],
  [880, 380, 260, 260, 'Reactor'],
  [470, 520, 260, 220, 'Electrical'],
  [160, 230, 60, 150],
  [160, 230, 240, 60],
  [980, 230, 60, 150],
  [800, 230, 240, 60],
  [1200, 60, 300, 240],
  [1200, 380, 300, 260],
  [300, 590, 160, 220],
  [1050, 680, 260, 220],
  [1380, 60, 140, 150],
  [1380, 280, 140, 150]
] as Array<[number, number, number, number, string?]>;

export const VENTS = [
  [400, 150], [630, 150], [1130, 150],
  [350, 400], [1150, 400],
  [750, 640]
];

export const BTN = [1100, 150];
export const FIX = [530, 620];

export const TASKS = [
  [480, 120], [720, 120], [120, 440], [260, 590],
  [940, 440], [1080, 590], [520, 690], [680, 690],
  [180, 140], [1340, 500], [150, 940], [520, 950],
  [680, 1010], [1260, 920], [1380, 1000], [1300, 120],
  [1700, 160], [1860, 200]
];

export const FLOOR_COLORS: Record<string, string> = {
  Cafeteria: '#f4d9a6', Storage: '#e0c9a6', Reactor: '#f2b8b0',
  Electrical: '#f6e8a0', Medbay: '#b9e6e0', Navigation: '#bccaf4',
  Lab: '#cde8b8', Admin: '#e3c8f0', Shields: '#b8e0f4',
  Comms: '#b8d8f0', Greenhouse: '#c8e6a0', Weapons: '#e6c8d8'
};

export const HATS = ['No hat', 'Cap', 'Crown', 'Cowboy hat', 'Party hat', 'Sprout', 'Cat ears'];
export const EMO = ['👍', '👎', '😂', '😡', '🤔', '😱'];
export const QUICK = ['Where?', 'I saw someone', 'Not me', 'Skip vote', 'Sus!', 'Trust me', 'Who?', 'Same'];
export const COLOR_NAMES = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Orange', 'Cyan', 'Brown', 'Grey'];

export const DOORS: Record<string, Array<[number, number, number, number]>> = {
  Storage: [[160, 372, 60, 16], [160, 632, 60, 16]],
  Reactor: [[980, 372, 60, 16], [1132, 480, 16, 60]],
  Electrical: [[570, 512, 60, 16], [570, 732, 60, 16]],
  Medbay: [[312, 100, 16, 60]],
  Navigation: [[1232, 480, 16, 60]],
  Lab: [[1050, 120, 16, 60]],
  Admin: [[950, 590, 60, 16]],
  Comms: [[1280, 590, 60, 16]]
};

export const GAME_CONFIG = {
  CANVAS_WIDTH: 1500,
  CANVAS_HEIGHT: 800,
  PLAYER_SPEED: 200,
  STEP_COOLDOWN: 0.3,
  KILL_COOLDOWN: { short: 20000, medium: 25000, long: 30000 },
  MEETING_TIME: { short: 300, medium: 600, long: 1200 },
  LIGHTS_DURATION: 45000,
  DOOR_COOLDOWN: 250
};
