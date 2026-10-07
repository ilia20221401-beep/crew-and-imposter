export class InputManager {
  private keys: Record<string, boolean> = {};
  private mouseX = 0;
  private mouseY = 0;
  private joystickX = 0;
  private joystickY = 0;
  private listeners: Record<string, Function[]> = {};

  constructor() {
    this.setupKeyboardInput();
    this.setupMouseInput();
    this.setupTouchInput();
  }

  private setupKeyboardInput(): void {
    document.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      this.keys[k] = true;
      this.emit('keydown', { key: k });
    });
    document.addEventListener('keyup', (e) => {
      const k = e.key.toLowerCase();
      this.keys[k] = false;
      this.emit('keyup', { key: k });
    });
  }

  private setupMouseInput(): void {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }

  private setupTouchInput(): void {
    // Placeholder for touch support
  }

  isKeyPressed(key: string): boolean {
    return this.keys[key] || false;
  }

  getMousePos(): { x: number; y: number } {
    return { x: this.mouseX, y: this.mouseY };
  }

  getJoystick(): { x: number; y: number } {
    return { x: this.joystickX, y: this.joystickY };
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  private emit(event: string, data: any): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }
}
