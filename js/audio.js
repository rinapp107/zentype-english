/**
 * RinType English - Web Audio API Mechanical Keyboard Synthesizer
 * Provides lag-free, high-fidelity keyboard sound effects completely offline.
 */
class KeyboardAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.currentStyle = 'clicky'; // clicky, typewriter, silent, zen
    
    // "Mặt Trời Của Em" - Phương Ly (Chorus vocal melody loop)
    this.zenMelody = [
      // "Gửi làn gió mang tiếng cười"
      392.00, 440.00, 493.88, 493.88, 440.00, 392.00, 440.00,
      // "Đến bên người em yêu"
      493.88, 440.00, 392.00, 329.63, 392.00,
      // "Mặt trời kia sẽ luôn ấm áp"
      392.00, 440.00, 493.88, 587.33, 493.88, 440.00, 493.88,
      // "Bên em chẳng đi đâu"
      392.00, 329.63, 293.66, 329.63, 392.00,
      // "Là nụ cười tỏa nắng ấm áp"
      392.00, 440.00, 493.88, 587.33, 493.88, 440.00, 493.88,
      // "Khiến lòng này xao xuyến"
      392.00, 329.63, 293.66, 329.63, 392.00,
      // "Yêu thương kia gửi trao cho anh"
      392.00, 440.00, 493.88, 493.88, 440.00, 392.00, 440.00,
      // "Mãi không bao giờ phai"
      493.88, 440.00, 392.00, 329.63, 392.00
    ];
    this.zenNoteIndex = 0;
    this.backingInterval = null;
    this.backingProgress = 0;
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
      case 'zen':
        if (!this.backingInterval) {
          this.startBackingTrack();
        }
        this.playZenMelodyNote(time);
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
   * Synthesizes a magical, high-frequency freezing chime
   */
  playFreeze() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, time);
    osc.frequency.exponentialRampToValueAtTime(600, time + 0.5);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.0, time);
    gainNode.gain.linearRampToValueAtTime(0.25, time + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.51);
  }

  /**
   * Synthesizes an epic thunderclap electric shockwave blast
   */
  playShockwave() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    
    // Crackle noise
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = this.createNoiseBuffer();

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1000, time);
    noiseFilter.frequency.exponentialRampToValueAtTime(300, time + 0.6);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0, time);
    noiseGain.gain.linearRampToValueAtTime(0.4, time + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.6);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    // Deep low rumble
    const sub = this.ctx.createOscillator();
    sub.type = 'sawtooth';
    sub.frequency.setValueAtTime(120, time);
    sub.frequency.linearRampToValueAtTime(30, time + 0.6);

    const subFilter = this.ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.value = 150;

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.0, time);
    subGain.gain.linearRampToValueAtTime(0.55, time + 0.02);
    subGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.6);

    sub.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(this.ctx.destination);

    noiseSource.start(time);
    noiseSource.stop(time + 0.61);
    sub.start(time);
    sub.stop(time + 0.61);
  }

  /**
   * Synthesizes a tranquil, warm bell-like note following a circular pentatonic melody loop
   */
  playZenMelodyNote(time) {
    const ctx = this.ctx;
    const freq = this.zenMelody[this.zenNoteIndex];
    this.zenNoteIndex = (this.zenNoteIndex + 1) % this.zenMelody.length;

    // Primary bell sine tone
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    // Warm sub triangle overtone for depth
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 0.5, time);

    // Soft high-end shimmer harmonic
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 2, time);

    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.0, time);
    gain1.gain.linearRampToValueAtTime(0.18, time + 0.005); // quick soft attack
    gain1.gain.exponentialRampToValueAtTime(0.0001, time + 0.8); // elegant long decay

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.0, time);
    gain2.gain.linearRampToValueAtTime(0.08, time + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);

    const gain3 = ctx.createGain();
    gain3.gain.setValueAtTime(0.0, time);
    gain3.gain.linearRampToValueAtTime(0.04, time + 0.005);
    gain3.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);

    // Lowpass filter to keep it warm, smooth, and relaxing
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);

    gain1.connect(filter);
    gain2.connect(filter);
    gain3.connect(filter);

    filter.connect(ctx.destination);

    osc1.start(time);
    osc1.stop(time + 1.0);
    osc2.start(time);
    osc2.stop(time + 0.6);
    osc3.start(time);
    osc3.stop(time + 0.4);
  }

  /**
   * Starts a continuous ambient backing chord progression track in the background for Zen Mode
   */
  startBackingTrack() {
    if (this.backingInterval) return;
    this.initContext();
    if (!this.ctx) return;
    
    this.backingProgress = 0;
    const playChord = () => {
      if (this.currentStyle !== 'zen' || this.isMuted) {
        this.stopBackingTrack();
        return;
      }
      
      // Gorgeous warm G major chord progression for "Mặt Trời Của Em" (G -> Em -> C -> D)
      const chords = [
        [196.00, 246.94, 293.66], // G3, B3, D4 (G Major)
        [164.81, 196.00, 246.94], // E3, G3, B3 (E Minor)
        [130.81, 164.81, 196.00], // C3, E3, G3 (C Major)
        [146.83, 185.00, 220.00]  // D3, F#3, A3 (D Major)
      ];
      
      const time = this.ctx.currentTime;
      const freqList = chords[this.backingProgress];
      this.backingProgress = (this.backingProgress + 1) % chords.length;
      
      freqList.forEach(freq => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.0, time);
        gain.gain.linearRampToValueAtTime(0.02, time + 1.2); // extra soft fade-in arpeggio hum
        gain.gain.setValueAtTime(0.02, time + 3.0);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 4.0); // slow fade-out
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600; // keep background chord track extremely low-key & smooth
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(time);
        osc.stop(time + 4.0);
      });
    };
    
    // Play immediately
    playChord();
    // Loop every 4 seconds
    this.backingInterval = setInterval(playChord, 4000);
  }

  /**
   * Stops the continuous background track
   */
  stopBackingTrack() {
    if (this.backingInterval) {
      clearInterval(this.backingInterval);
      this.backingInterval = null;
    }
  }

  /**
   * Mutes or unmutes the audio engine
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.initContext();
    if (this.isMuted) {
      this.stopBackingTrack();
    } else if (this.currentStyle === 'zen') {
      this.startBackingTrack();
    }
    return this.isMuted;
  }

  /**
   * Sets the sound style (clicky, typewriter, silent, zen)
   */
  setStyle(style) {
    this.currentStyle = style;
    this.initContext();
    if (style === 'zen') {
      this.startBackingTrack();
    } else {
      this.stopBackingTrack();
    }
  }
}

// Global exposure
window.RinTypeAudio = new KeyboardAudioEngine();
