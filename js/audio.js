/**
 * RinType English - Web Audio API Mechanical Keyboard Synthesizer
 * Provides lag-free, high-fidelity keyboard sound effects completely offline.
 */
class KeyboardAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.currentStyle = 'clicky'; // clicky, typewriter, silent
  }

  /**
   * Initializes the AudioContext upon user interaction to satisfy browser autoplay policies
   */
  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Generates a short burst of filtered white noise for crisp clicks
   */
  createNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 0.05; // 50ms buffer
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * Plays a synthesized mechanical key click
   */
  playKeydown() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    
    // Choose appropriate sound builder based on active style
    switch (this.currentStyle) {
      case 'typewriter':
        this.playTypewriterClick(time);
        break;
      case 'silent':
        this.playSilentClick(time);
        break;
      case 'clicky':
      default:
        this.playClickyClick(time);
        break;
    }
  }

  /**
   * Synthesizes a Cherry MX Blue style clicky switch
   */
  playClickyClick(time) {
    const ctx = this.ctx;
    
    // 1. Noise click (crisp high end)
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.createNoiseBuffer();
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 6500; // high frequency crispness
    noiseFilter.Q.value = 4.0;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0, time);
    noiseGain.gain.linearRampToValueAtTime(0.2, time + 0.001); // ultra fast attack
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.025); // fast decay

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // 2. Body thud (solid plastic keycap bottom out)
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, time); // low-mid body thud
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.03);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.0, time);
    oscGain.gain.linearRampToValueAtTime(0.3, time + 0.002);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    // Start & Stop
    noiseSource.start(time);
    noiseSource.stop(time + 0.03);
    osc.start(time);
    osc.stop(time + 0.04);
  }

  /**
   * Synthesizes a vintage metal typewriter striking paper
   */
  playTypewriterClick(time) {
    const ctx = this.ctx;

    // Metallic ping oscillator
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, time);
    osc.frequency.exponentialRampToValueAtTime(200, time + 0.06);

    const oscFilter = ctx.createBiquadFilter();
    oscFilter.type = 'bandpass';
    oscFilter.frequency.value = 1000;
    oscFilter.Q.value = 2.0;

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.0, time);
    oscGain.gain.linearRampToValueAtTime(0.15, time + 0.002);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);

    osc.connect(oscFilter);
    oscFilter.connect(oscGain);
    oscGain.connect(ctx.destination);

    // Deep bar thump
    const thump = ctx.createOscillator();
    thump.type = 'triangle';
    thump.frequency.setValueAtTime(110, time);
    thump.frequency.exponentialRampToValueAtTime(60, time + 0.08);

    const thumpGain = ctx.createGain();
    thumpGain.gain.setValueAtTime(0.0, time);
    thumpGain.gain.linearRampToValueAtTime(0.4, time + 0.003);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.09);

    thump.connect(thumpGain);
    thumpGain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.1);
    thump.start(time);
    thump.stop(time + 0.1);
  }

  /**
   * Synthesizes a soft, dampened high-end custom keyboard switch
   */
  playSilentClick(time) {
    const ctx = this.ctx;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time); // low frequency
    osc.frequency.exponentialRampToValueAtTime(70, time + 0.02);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 600; // filter high clicky ticks

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0, time);
    gain.gain.linearRampToValueAtTime(0.18, time + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.02); // very quick damping

    osc.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.03);
  }

  /**
   * Synthesizes a sci-fi laser gun shot for the game mode
   */
  playLaser() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, time);
    osc.frequency.exponentialRampToValueAtTime(110, time + 0.15);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2000;

    gainNode.gain.setValueAtTime(0.0, time);
    gainNode.gain.linearRampToValueAtTime(0.15, time + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.16);
  }

  /**
   * Synthesizes a deep space meteorite explosion
   */
  playExplosion() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = this.createNoiseBuffer();

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, time);
    filter.frequency.exponentialRampToValueAtTime(80, time + 0.3);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.0, time);
    gainNode.gain.linearRampToValueAtTime(0.4, time + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.35);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    // Deep low frequency thump
    const thump = this.ctx.createOscillator();
    thump.type = 'triangle';
    thump.frequency.setValueAtTime(90, time);
    thump.frequency.exponentialRampToValueAtTime(20, time + 0.3);

    const thumpGain = this.ctx.createGain();
    thumpGain.gain.setValueAtTime(0.0, time);
    thumpGain.gain.linearRampToValueAtTime(0.3, time + 0.02);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.35);

    thump.connect(thumpGain);
    thumpGain.connect(this.ctx.destination);

    noiseSource.start(time);
    noiseSource.stop(time + 0.36);
    thump.start(time);
    thump.stop(time + 0.36);
  }

  /**
   * Mutes or unmutes the audio engine
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.initContext();
    return this.isMuted;
  }

  /**
   * Sets the sound style (clicky, typewriter, silent)
   */
  setStyle(style) {
    this.currentStyle = style;
    this.initContext();
  }
}

// Global exposure
window.RinTypeAudio = new KeyboardAudioEngine();
