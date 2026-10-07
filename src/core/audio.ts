// ============ AUDIO/SFX ENGINE ============

interface SoundEffect {
  frequencies: Array<[number, number]>;
  type: 'sine' | 'square' | 'sawtooth';
}

const SFX_LIBRARY: Record<string, SoundEffect> = {
  ok: { type: 'square', frequencies: [[660, 0.08], [880, 0.12]] },
  bad: { type: 'sawtooth', frequencies: [[160, 0.18]] },
  kill: { type: 'sawtooth', frequencies: [[110, 0.12], [70, 0.3]] },
  alarm: { type: 'square', frequencies: [[880, 0.15], [660, 0.15], [880, 0.15], [660, 0.15]] },
  end: { type: 'sine', frequencies: [[523, 0.12], [659, 0.12], [784, 0.25]] },
  vent: { type: 'sine', frequencies: [[300, 0.08], [200, 0.1]] },
  vote: { type: 'square', frequencies: [[440, 0.1], [550, 0.15]] },
  win: { type: 'sine', frequencies: [[800, 0.1], [1000, 0.15], [1200, 0.2]] },
  click: { type: 'square', frequencies: [[400, 0.05]] },
  step: { type: 'sine', frequencies: [[200, 0.05]] },
  pop: { type: 'square', frequencies: [[600, 0.08]] }
};

let audioContext: AudioContext | null = null;

export function playSound(soundId: string = ''): void {
  try {
    audioContext = audioContext || new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const sfx = SFX_LIBRARY[soundId] || SFX_LIBRARY.click;
    const now = audioContext.currentTime;

    sfx.frequencies.forEach(([frequency, duration]) => {
      const oscillator = audioContext!.createOscillator();
      const gain = audioContext!.createGain();

      oscillator.type = sfx.type;
      oscillator.frequency.value = frequency;

      gain.gain.setValueAtTime(soundId === 'step' ? 0.02 : 0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      oscillator.connect(gain);
      gain.connect(audioContext!.destination);

      oscillator.start(now);
      oscillator.stop(now + duration);
    });
  } catch (e) {
    console.error('Audio error:', e);
  }
}

export function initAudio(): void {
  // Initialize audio context on first user interaction
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('AudioContext not available');
    }
  }
}
