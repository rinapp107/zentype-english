/**
 * RinType English - Typing Space Shooter Game Engine
 * Highly optimized HTML5 Canvas game running at smooth 60 FPS.
 * Upgraded features: 3 Difficulties, Health Points, Mistyping Penalties, Screen Shaking,
 * and falling Power-up capsules (Freeze, Heal, Shockwave) with direct keyboard shortcut activation.
 */

class RinTypeSpaceShooter {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    
    // Game state
    this.isPlaying = false;
    this.isGameOverState = false;
    this.score = 0;
    this.hp = 100;
    this.level = 1;
    this.highScore = 0;
    this.difficulty = 'medium'; // easy | medium | hard
    
    // Coins and Upgrades
    this.coins = 0;
    this.laserLevel = 1;      // Max 4
    this.shieldLevel = 1;     // Max 3
    this.hpLevel = 1;         // Max 3
    this.boosterLevel = 1;    // Max 3
    this.maxHp = 100;
    
    // Wave / Stage system
    this.waveEnemiesKilled = 0;
    this.waveTarget = 10;
    this.waveClearTimer = 0;  // Frames left in wave clear warp animation
    
    // Game entities
    this.enemies = [];
    this.lasers = [];
    this.particles = [];
    this.stars = [];
    this.activeItems = []; // Floating capsules dropped
    
    // Power-up counters / states
    this.freezeTimer = 0;       // Freeze duration in frames
    this.shockwaveActive = false;
    this.shockwaveRadius = 0;
    this.shakeTimer = 0;        // Screen shake frame counter
    
    // Input management
    this.currentTarget = null; // Locked enemy target
    this.typedText = "";      // Current successfully typed part of the target word
    
    // Spawning timers
    this.spawnTimer = null;
    this.spawnInterval = 3000; // ms between meteor spawns
    this.baseSpeed = 0.6;      // Base fall speed
    
    // Ship dimensions
    this.ship = {
      x: 400,
      y: 460,
      width: 40,
      height: 35
    };
    
    // Event listeners refs
    this.keydownHandler = null;
  }

  /**
   * Initializes the game with canvas DOM binding
   */
  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    // Create random starry background
    this.generateStars();
    
    // Load high score
    this.loadHighScore();
    
    // Load existing upgrades and gold coins from localStorage
    this.loadUpgrades();
    
    // Bind click events for upgrade shop tabs and buttons
    this.bindShopEvents();
    
    // Set initial size
    this.resizeCanvas();
    
    // Setup initial draw
    this.drawStaticScene();
  }

  generateStars() {
    this.stars = [];
    for (let i = 0; i < 80; i++) {
      this.stars.push({
        x: Math.random() * 800,
        y: Math.random() * 500,
        size: Math.random() * 2,
        speed: Math.random() * 0.2 + 0.05
      });
    }
  }

  loadHighScore() {
    try {
      this.highScore = parseInt(localStorage.getItem('rintype_game_highscore')) || 0;
    } catch (e) {
      this.highScore = 0;
    }
    document.getElementById('game-high-score').textContent = this.highScore;
  }

  saveHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      try {
        localStorage.setItem('rintype_game_highscore', this.highScore);
      } catch (e) {}
      document.getElementById('game-high-score').textContent = this.highScore;
    }
  }

  loadUpgrades() {
    try {
      this.coins = parseInt(localStorage.getItem('rintype_game_coins')) || 0;
      this.laserLevel = parseInt(localStorage.getItem('rintype_upgrade_laser')) || 1;
      this.shieldLevel = parseInt(localStorage.getItem('rintype_upgrade_shield')) || 1;
      this.hpLevel = parseInt(localStorage.getItem('rintype_upgrade_hp')) || 1;
      this.boosterLevel = parseInt(localStorage.getItem('rintype_upgrade_booster')) || 1;
    } catch (e) {
      this.coins = 0;
      this.laserLevel = 1;
      this.shieldLevel = 1;
      this.hpLevel = 1;
      this.boosterLevel = 1;
    }
    
    // Recalculate max HP
    if (this.hpLevel === 2) this.maxHp = 120;
    else if (this.hpLevel === 3) this.maxHp = 150;
    else this.maxHp = 100;
    
    this.updateShopUI();
  }

  saveUpgrades() {
    try {
      localStorage.setItem('rintype_game_coins', this.coins);
      localStorage.setItem('rintype_upgrade_laser', this.laserLevel);
      localStorage.setItem('rintype_upgrade_shield', this.shieldLevel);
      localStorage.setItem('rintype_upgrade_hp', this.hpLevel);
      localStorage.setItem('rintype_upgrade_booster', this.boosterLevel);
    } catch (e) {}
    
    // Recalculate max HP
    if (this.hpLevel === 2) this.maxHp = 120;
    else if (this.hpLevel === 3) this.maxHp = 150;
    else this.maxHp = 100;
    
    this.updateShopUI();
  }

  updateShopUI() {
    // Costs tables
    const costs = {
      laser: [0, 100, 250, 500, 999999], // 1->2 is 100, 2->3 is 250, 3->4 is 500
      shield: [0, 80, 200, 999999],
      hp: [0, 100, 220, 999999],
      booster: [0, 80, 180, 999999]
    };
    
    const coinHud = document.getElementById('game-coins-hud');
    if (coinHud) coinHud.textContent = this.coins;
    
    const shopCoins = document.getElementById('shop-coin-count');
    if (shopCoins) shopCoins.textContent = this.coins;
    
    // Laser button
    const laserLevelTxt = document.getElementById('laser-upgrade-level');
    const laserCostTxt = document.getElementById('laser-upgrade-cost');
    const laserBtn = document.getElementById('btn-upgrade-laser');
    if (laserLevelTxt && laserCostTxt && laserBtn) {
      laserLevelTxt.textContent = this.laserLevel;
      if (this.laserLevel >= 4) {
        laserCostTxt.textContent = 'MAX';
        laserBtn.disabled = true;
        laserBtn.style.background = '#475569';
      } else {
        const cost = costs.laser[this.laserLevel];
        laserCostTxt.innerHTML = `<i class="fa-solid fa-coins" style="color: #eab308; font-size: 0.8rem;"></i> ${cost}`;
        laserBtn.disabled = this.coins < cost;
        laserBtn.style.background = this.coins >= cost ? '#2563eb' : '#475569';
      }
    }
    
    // Shield button
    const shieldLevelTxt = document.getElementById('shield-upgrade-level');
    const shieldCostTxt = document.getElementById('shield-upgrade-cost');
    const shieldBtn = document.getElementById('btn-upgrade-shield');
    if (shieldLevelTxt && shieldCostTxt && shieldBtn) {
      shieldLevelTxt.textContent = this.shieldLevel;
      if (this.shieldLevel >= 3) {
        shieldCostTxt.textContent = 'MAX';
        shieldBtn.disabled = true;
        shieldBtn.style.background = '#475569';
      } else {
        const cost = costs.shield[this.shieldLevel];
        shieldCostTxt.innerHTML = `<i class="fa-solid fa-coins" style="color: #eab308; font-size: 0.8rem;"></i> ${cost}`;
        shieldBtn.disabled = this.coins < cost;
        shieldBtn.style.background = this.coins >= cost ? '#059669' : '#475569';
      }
    }
    
    // HP button
    const hpLevelTxt = document.getElementById('hp-upgrade-level');
    const hpCostTxt = document.getElementById('hp-upgrade-cost');
    const hpBtn = document.getElementById('btn-upgrade-hp');
    if (hpLevelTxt && hpCostTxt && hpBtn) {
      hpLevelTxt.textContent = this.hpLevel;
      if (this.hpLevel >= 3) {
        hpCostTxt.textContent = 'MAX';
        hpBtn.disabled = true;
        hpBtn.style.background = '#475569';
      } else {
        const cost = costs.hp[this.hpLevel];
        hpCostTxt.innerHTML = `<i class="fa-solid fa-coins" style="color: #eab308; font-size: 0.8rem;"></i> ${cost}`;
        hpBtn.disabled = this.coins < cost;
        hpBtn.style.background = this.coins >= cost ? '#dc2626' : '#475569';
      }
    }
    
    // Booster button
    const boosterLevelTxt = document.getElementById('booster-upgrade-level');
    const boosterCostTxt = document.getElementById('booster-upgrade-cost');
    const boosterBtn = document.getElementById('btn-upgrade-booster');
    if (boosterLevelTxt && boosterCostTxt && boosterBtn) {
      boosterLevelTxt.textContent = this.boosterLevel;
      if (this.boosterLevel >= 3) {
        boosterCostTxt.textContent = 'MAX';
        boosterBtn.disabled = true;
        boosterBtn.style.background = '#475569';
      } else {
        const cost = costs.booster[this.boosterLevel];
        boosterCostTxt.innerHTML = `<i class="fa-solid fa-coins" style="color: #eab308; font-size: 0.8rem;"></i> ${cost}`;
        boosterBtn.disabled = this.coins < cost;
        boosterBtn.style.background = this.coins >= cost ? '#7c3aed' : '#475569';
      }
    }
  }

  bindShopEvents() {
    const tabBattle = document.getElementById('btn-tab-battle');
    const tabShop = document.getElementById('btn-tab-shop');
    const panelBattle = document.getElementById('game-battle-panel');
    const panelShop = document.getElementById('game-shop-panel');
    
    if (tabBattle && tabShop && panelBattle && panelShop) {
      tabBattle.onclick = () => {
        tabBattle.classList.add('active');
        tabBattle.style.background = '#3b82f6';
        tabBattle.style.color = '#fff';
        
        tabShop.classList.remove('active');
        tabShop.style.background = 'rgba(255,255,255,0.05)';
        tabShop.style.color = '#94a3b8';
        
        panelBattle.style.display = 'flex';
        panelShop.style.display = 'none';
        
        if (window.RinTypeAudio) window.RinTypeAudio.playKeydown();
      };
      
      tabShop.onclick = () => {
        tabShop.classList.add('active');
        tabShop.style.background = '#3b82f6';
        tabShop.style.color = '#fff';
        
        tabBattle.classList.remove('active');
        tabBattle.style.background = 'rgba(255,255,255,0.05)';
        tabBattle.style.color = '#94a3b8';
        
        panelBattle.style.display = 'none';
        panelShop.style.display = 'flex';
        
        this.updateShopUI();
        if (window.RinTypeAudio) window.RinTypeAudio.playKeydown();
      };
    }
    
    // Purchase Upgrade Event Handlers
    const costs = {
      laser: [0, 100, 250, 500],
      shield: [0, 80, 200],
      hp: [0, 100, 220],
      booster: [0, 80, 180]
    };
    
    const laserBtn = document.getElementById('btn-upgrade-laser');
    if (laserBtn) {
      laserBtn.onclick = () => {
        if (this.laserLevel >= 4) return;
        const cost = costs.laser[this.laserLevel];
        if (this.coins >= cost) {
          this.coins -= cost;
          this.laserLevel++;
          this.saveUpgrades();
          if (window.RinTypeAudio) window.RinTypeAudio.playFreeze(); // success sound
        }
      };
    }
    
    const shieldBtn = document.getElementById('btn-upgrade-shield');
    if (shieldBtn) {
      shieldBtn.onclick = () => {
        if (this.shieldLevel >= 3) return;
        const cost = costs.shield[this.shieldLevel];
        if (this.coins >= cost) {
          this.coins -= cost;
          this.shieldLevel++;
          this.saveUpgrades();
          if (window.RinTypeAudio) window.RinTypeAudio.playFreeze(); // success sound
        }
      };
    }
    
    const hpBtn = document.getElementById('btn-upgrade-hp');
    if (hpBtn) {
      hpBtn.onclick = () => {
        if (this.hpLevel >= 3) return;
        const cost = costs.hp[this.hpLevel];
        if (this.coins >= cost) {
          this.coins -= cost;
          this.hpLevel++;
          this.saveUpgrades();
          if (window.RinTypeAudio) window.RinTypeAudio.playFreeze(); // success sound
        }
      };
    }
    
    const boosterBtn = document.getElementById('btn-upgrade-booster');
    if (boosterBtn) {
      boosterBtn.onclick = () => {
        if (this.boosterLevel >= 3) return;
        const cost = costs.booster[this.boosterLevel];
        if (this.coins >= cost) {
          this.coins -= cost;
          this.boosterLevel++;
          this.saveUpgrades();
          if (window.RinTypeAudio) window.RinTypeAudio.playFreeze(); // success sound
        }
      };
    }
  }

  resizeCanvas() {
    this.canvas.width = 800;
    this.canvas.height = 500;
    this.ship.x = this.canvas.width / 2;
    this.ship.y = this.canvas.height - 40;
  }

  /**
   * Starts a brand new game session
   */
  start() {
    if (this.isPlaying) return;
    
    const diffSelect = document.getElementById('game-difficulty-select');
    this.difficulty = diffSelect ? diffSelect.value : 'medium';
    
    // Load upgrades state and maxHp
    this.loadUpgrades();
    
    this.isPlaying = true;
    this.isGameOverState = false;
    this.score = 0;
    this.hp = this.maxHp; // Start with upgraded max HP
    this.level = 1;
    
    // Initial Wave setup
    this.waveEnemiesKilled = 0;
    this.waveTarget = 10;
    this.waveClearTimer = 0;
    
    // Configure based on difficulty
    if (this.difficulty === 'easy') {
      this.spawnInterval = 3500;
      this.baseSpeed = 0.45;
    } else if (this.difficulty === 'hard') {
      this.spawnInterval = 2000;
      this.baseSpeed = 0.85;
    } else {
      this.spawnInterval = 2800;
      this.baseSpeed = 0.6;
    }
    
    this.enemies = [];
    this.lasers = [];
    this.particles = [];
    this.activeItems = [];
    this.freezeTimer = 0;
    this.shockwaveActive = false;
    this.shockwaveRadius = 0;
    this.shakeTimer = 0;
    this.currentTarget = null;
    this.typedText = "";
    
    this.updateHUD();
    
    // Hide overlays
    document.getElementById('game-start-overlay').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    
    // Start Spawner
    this.startSpawner();
    
    // Bind Keyboard Hook
    this.bindKeyboard();
    
    // Start animation loop
    requestAnimationFrame(() => this.gameLoop());
  }

  startSpawner() {
    if (this.spawnTimer) clearInterval(this.spawnTimer);
    this.spawnTimer = setInterval(() => {
      this.spawnMeteor();
    }, this.spawnInterval);
  }

  /**
   * Spawns a new vocabulary meteor from active level database
   */
  spawnMeteor() {
    // If wave transition is active, do not spawn regular enemies
    if (!this.isPlaying || this.waveClearTimer > 0) return;
    
    // Pull vocabulary from active app state if available
    let wordList = ["hello", "morning", "please", "friend", "family", "mother", "father", "water", "happy", "smile"];
    try {
      if (window.RinTypeApp && window.RinTypeApp.words && window.RinTypeApp.words.length > 0) {
        if (window.RinTypeApp.activeMode === 'roadmap') {
          const levelKey = window.RinTypeApp.dom.roadmapLevelSelect.value;
          const levelData = window.RINTYPE_DATABASE.roadmap[levelKey];
          wordList = levelData.vocabulary.map(v => v.word);
        } else {
          wordList = window.RINTYPE_DATABASE.vocabulary.map(v => v.word);
        }
      }
    } catch (e) {
      console.warn("Could not load dynamic vocabulary for game spawner, using fallback.");
    }

    // Filter word list based on chosen word length setting
    const lengthSelect = document.getElementById('game-word-length-select');
    const lengthVal = lengthSelect ? lengthSelect.value : 'all';
    
    if (lengthVal !== 'all') {
      const filtered = wordList.filter(w => {
        const cleanW = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
        const len = cleanW.length;
        if (lengthVal === 'short') return len >= 3 && len <= 5;
        if (lengthVal === 'medium') return len >= 6 && len <= 8;
        if (lengthVal === 'long') return len >= 9;
        return true;
      });
      
      if (filtered.length > 0) {
        wordList = filtered;
      } else {
        // Safe matching length fallbacks for game spawns so we never leak incorrect lengths
        if (lengthVal === 'short') {
          wordList = ["run", "code", "time", "fast", "make", "work", "play", "easy", "help", "user", "data", "file", "web", "game", "app", "core", "page", "view", "task", "life"];
        } else if (lengthVal === 'medium') {
          wordList = ["active", "system", "design", "device", "future", "modern", "simple", "impact", "unique", "stable", "robust", "secure", "energy", "global", "growth"];
        } else if (lengthVal === 'long') {
          wordList = ["algorithm", "database", "cybersecurity", "artificial", "intelligence", "application", "responsive", "framework", "repository", "encryption"];
        }
      }
    }

    // Pick random word
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    
    // Avoid duplicate words currently on screen
    const existingWords = this.enemies.map(e => e.word);
    if (existingWords.includes(randomWord) && wordList.length > 5) {
      this.spawnMeteor();
      return;
    }
    
    const meteorWidth = this.ctx.measureText(randomWord).width + 30;
    
    // Chance to drop powerup items (Glowing purple carrier meteor) - Boosted by Booster level!
    let dropChance = 0.20;
    if (this.boosterLevel === 2) dropChance = 0.25;
    else if (this.boosterLevel === 3) dropChance = 0.30;
    
    const isItemCarrier = Math.random() < dropChance;
    
    const newEnemy = {
      x: Math.max(meteorWidth, Math.random() * (this.canvas.width - meteorWidth)),
      y: -20,
      word: randomWord,
      width: meteorWidth,
      height: 30,
      speed: this.baseSpeed + (this.level * 0.10) + (Math.random() * 0.2),
      color: isItemCarrier ? '#e879f9' : this.getRandomMeteorColor(),
      isItemCarrier: isItemCarrier,
      isBoss: false
    };
    
    this.enemies.push(newEnemy);
  }

  getRandomMeteorColor() {
    const colors = [
      '#f43f5e', // rose red
      '#fb923c', // orange
      '#facc15', // amber yellow
      '#38bdf8', // sky blue
      '#818cf8', // indigo
      '#fb7185'  // pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Binds the keyboard events exclusively
   */
  bindKeyboard() {
    if (this.keydownHandler) {
      window.removeEventListener('keydown', this.keydownHandler);
    }
    
    this.keydownHandler = (e) => {
      if (!this.isPlaying || this.isGameOverState) return;
      
      const char = e.key;
      
      // Ignore control keys, spaces or multi-character keys
      if (char.length !== 1) return;
      
      // 1. Check if user pressed an active floating item capsule shortcut (F, H, S)
      let itemActivated = false;
      for (let i = 0; i < this.activeItems.length; i++) {
        const item = this.activeItems[i];
        if (char.toUpperCase() === item.shortcut.toUpperCase()) {
          this.activateItem(item);
          this.activeItems.splice(i, 1);
          itemActivated = true;
          break;
        }
      }
      if (itemActivated) return;

      // 2. Typing target locked enemy logic
      if (!this.currentTarget) {
        // Find an enemy starting with this character
        let potentialTargets = this.enemies.filter(enemy => enemy.word.toLowerCase().startsWith(char.toLowerCase()));
        
        if (potentialTargets.length > 0) {
          potentialTargets.sort((a, b) => b.y - a.y); // lock lowest enemy first
          this.currentTarget = potentialTargets[0];
          this.typedText = char;
          
          window.RinTypeAudio.playKeydown();
          this.checkWordCompletion();
        } else {
          // Mistyped key penalty
          this.triggerMistypePenalty();
        }
      } else {
        const nextCharIndex = this.typedText.length;
        const targetNextChar = this.currentTarget.word[nextCharIndex];
        
        if (char.toLowerCase() === targetNextChar.toLowerCase()) {
          this.typedText += targetNextChar;
          window.RinTypeAudio.playKeydown();
          this.checkWordCompletion();
        } else {
          // Mistyped key penalty
          this.triggerMistypePenalty();
        }
      }
    };
    
    window.addEventListener('keydown', this.keydownHandler);
  }

  unbindKeyboard() {
    if (this.keydownHandler) {
      window.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }
  }

  triggerMistypePenalty() {
    if (this.difficulty === 'easy') return; // Easy mode: no penalty
    
    let penalty = this.difficulty === 'hard' ? 5 : 2;
    // Shield level deduction
    if (this.shieldLevel === 2) penalty = Math.max(1, penalty - 1);
    else if (this.shieldLevel === 3) penalty = Math.max(1, penalty - 2);
    
    this.hp -= penalty;
    if (this.hp < 0) this.hp = 0;
    this.updateHUD();
    
    // Screen shaking and light red glow overlay
    this.shakeTimer = 8;
    this.triggerShieldHitEffect();
    
    if (this.hp <= 0) {
      this.gameOver();
    }
  }

  checkWordCompletion() {
    if (this.typedText === this.currentTarget.word) {
      this.fireLaser(this.currentTarget);
      this.currentTarget = null;
      this.typedText = "";
    }
  }

  /**
   * Fires a cyan glowing laser towards the locked target
   */
  fireLaser(target) {
    const laserSpeed = 14;
    
    // Spawn multiple lasers based on weapon level!
    const startPoints = [];
    if (this.laserLevel === 1) {
      startPoints.push({ x: this.ship.x, y: this.ship.y - 10, ox: 0, color: '#06b6d4' });
    } else if (this.laserLevel === 2) {
      startPoints.push({ x: this.ship.x - 15, y: this.ship.y, ox: -15, color: '#10b981' });
      startPoints.push({ x: this.ship.x + 15, y: this.ship.y, ox: 15, color: '#10b981' });
    } else if (this.laserLevel === 3) {
      startPoints.push({ x: this.ship.x - 20, y: this.ship.y, ox: -20, color: '#c084fc' });
      startPoints.push({ x: this.ship.x, y: this.ship.y - 10, ox: 0, color: '#c084fc' });
      startPoints.push({ x: this.ship.x + 20, y: this.ship.y, ox: 20, color: '#c084fc' });
    } else { // Level 4 (Quad hyper-lasers with sparks!)
      startPoints.push({ x: this.ship.x - 25, y: this.ship.y + 5, ox: -25, color: '#fbbf24', spark: true });
      startPoints.push({ x: this.ship.x - 10, y: this.ship.y - 10, ox: -10, color: '#f59e0b' });
      startPoints.push({ x: this.ship.x + 10, y: this.ship.y - 10, ox: 10, color: '#f59e0b' });
      startPoints.push({ x: this.ship.x + 25, y: this.ship.y + 5, ox: 25, color: '#fbbf24', spark: true });
    }
    
    startPoints.forEach(pt => {
      this.lasers.push({
        x: pt.x,
        y: pt.y,
        originOffset: pt.ox,
        targetX: target.x,
        targetY: target.y,
        targetEnemyRef: target,
        color: pt.color,
        speed: laserSpeed,
        spark: pt.spark || false
      });
    });
    
    window.RinTypeAudio.playLaser();
  }

  /**
   * Drops a power-up capsule from a destroyed carrier meteorite
   */
  spawnItemCapsule(x, y) {
    const types = ['freeze', 'heal', 'shockwave'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let shortcut = 'F';
    if (type === 'heal') shortcut = 'H';
    if (type === 'shockwave') shortcut = 'S';
    
    this.activeItems.push({
      x: x,
      y: y,
      type: type,
      shortcut: shortcut,
      speed: 1.2,
      radius: 18,
      pulseAngle: 0
    });
  }

  /**
   * Activates power-up capsules
   */
  activateItem(item) {
    if (item.type === 'freeze') {
      let freezeDuration = 300; // ~5 seconds
      if (this.boosterLevel === 2) freezeDuration = 360; // 6s
      else if (this.boosterLevel === 3) freezeDuration = 420; // 7s
      
      this.freezeTimer = freezeDuration;
      if (window.RinTypeAudio) window.RinTypeAudio.playFreeze();
      this.triggerSparkles(item.x, item.y, '#38bdf8');
    } else if (item.type === 'heal') {
      let healAmount = 25;
      if (this.hpLevel === 2) healAmount = 30;
      else if (this.hpLevel === 3) healAmount = 40;
      
      this.hp = Math.min(this.maxHp, this.hp + healAmount);
      this.updateHUD();
      if (window.RinTypeAudio) window.RinTypeAudio.playFreeze(); // plays chime
      this.triggerSparkles(item.x, item.y, '#22c55e');
    } else if (item.type === 'shockwave') {
      this.shockwaveActive = true;
      this.shockwaveRadius = 10;
      if (window.RinTypeAudio) window.RinTypeAudio.playShockwave();
      this.triggerSparkles(item.x, item.y, '#eab308');
    }
  }

  triggerSparkles(x, y, color) {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        life: Math.random() * 20 + 10,
        maxLife: 30,
        alpha: 1,
        size: Math.random() * 2.5 + 0.8
      });
    }
  }

  /**
   * Core Game Loop (updates & redraws at 60 FPS)
   */
  gameLoop() {
    if (!this.isPlaying) return;
    
    this.update();
    this.draw();
    
    requestAnimationFrame(() => this.gameLoop());
  }

  awardCoins(enemy) {
    let base = enemy.word.length;
    let mult = 1.5;
    if (this.difficulty === 'easy') mult = 1.0;
    else if (this.difficulty === 'hard') mult = 2.0;
    
    let reward = Math.round(base * mult);
    if (enemy.isItemCarrier) reward += 5;
    if (enemy.isBoss) reward += 30;
    
    this.coins += reward;
    
    // Update coins HUD
    const coinHud = document.getElementById('game-coins-hud');
    if (coinHud) coinHud.textContent = this.coins;
    
    const shopCoins = document.getElementById('shop-coin-count');
    if (shopCoins) shopCoins.textContent = this.coins;
    
    // Save coins to localStorage
    try {
      localStorage.setItem('rintype_game_coins', this.coins);
    } catch (e) {}
    
    // Emit beautiful gold sparks
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.particles.push({
        x: enemy.x + (Math.random() - 0.5) * 15,
        y: enemy.y + (Math.random() - 0.5) * 15,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: '#fbbf24', // yellow gold
        life: Math.random() * 20 + 10,
        maxLife: 30,
        alpha: 1,
        size: Math.random() * 2 + 1
      });
    }
  }

  spawnBossMeteor() {
    const bossWords = ["SPACE-INVADER", "CHICKEN-BOSS", "HYPER-DRIVE", "GALACTIC-FORCE", "QUANTUM-CORE", "NEBULOUS-CLOUD"];
    const randomBossWord = bossWords[Math.floor(Math.random() * bossWords.length)];
    
    const meteorWidth = this.ctx.measureText(randomBossWord).width + 60; // extra wide!
    
    const bossEnemy = {
      x: this.canvas.width / 2,
      y: -50,
      word: randomBossWord,
      width: meteorWidth,
      height: 45,
      speed: this.baseSpeed * 0.4, // Boss moves slower but is huge!
      color: '#ef4444', // glowing crimson red boss
      isItemCarrier: true, // drops items when dead!
      isBoss: true
    };
    
    this.enemies.push(bossEnemy);
  }

  update() {
    // 1. Move stars background (hyperspeed scroll during wave transition!)
    const speedMult = this.freezeTimer > 0 ? 0.25 : (this.waveClearTimer > 0 ? 4.5 : 1.0);
    this.stars.forEach(star => {
      star.y += star.speed * speedMult * 6; // smooth continuous scroll
      if (star.y > this.canvas.height) {
        star.y = 0;
        star.x = Math.random() * this.canvas.width;
      }
    });

    // 2. Handle active Freeze Timer countdown
    if (this.freezeTimer > 0) {
      this.freezeTimer--;
    }

    // 3. Move floating items capsules
    for (let i = this.activeItems.length - 1; i >= 0; i--) {
      const item = this.activeItems[i];
      item.y += item.speed;
      item.pulseAngle += 0.05;
      
      // Auto-collect items if they land at bottom shield
      if (item.y > this.canvas.height - 50) {
        this.activateItem(item);
        this.activeItems.splice(i, 1);
      }
    }

    // 4. Move meteor enemies
    const enemySpeedMult = this.freezeTimer > 0 ? 0.25 : 1.0;
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.y += enemy.speed * enemySpeedMult;
      
      // If meteor hits bottom shield boundary
      if (enemy.y > this.canvas.height - 50) {
        this.enemies.splice(i, 1);
        
        // HP Reduction scaled down by Shield level!
        let collisionDmg = enemy.isBoss ? 40 : 20;
        if (this.shieldLevel === 2) collisionDmg = Math.round(collisionDmg * 0.75);
        else if (this.shieldLevel === 3) collisionDmg = Math.round(collisionDmg * 0.50);
        
        this.hp -= collisionDmg;
        if (this.hp < 0) this.hp = 0;
        this.updateHUD();
        
        // Shake screen & trigger brief red damage flash
        this.shakeTimer = 15;
        this.triggerShieldHitEffect();
        
        if (this.hp <= 0) {
          this.gameOver();
          return;
        }
        
        if (this.currentTarget === enemy) {
          this.currentTarget = null;
          this.typedText = "";
        }
      }
    }

    // 5. Expand Shockwave and destroy collided enemies
    if (this.shockwaveActive) {
      this.shockwaveRadius += 10;
      
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const enemy = this.enemies[i];
        const dx = enemy.x - this.ship.x;
        const dy = enemy.y - this.ship.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.shockwaveRadius) {
          this.triggerExplosion(enemy.x, enemy.y, enemy.color);
          
          if (enemy.isBoss) {
            // Drops 3 powerups fan layout!
            this.spawnItemCapsule(enemy.x - 30, enemy.y);
            this.spawnItemCapsule(enemy.x, enemy.y - 10);
            this.spawnItemCapsule(enemy.x + 30, enemy.y);
          } else if (enemy.isItemCarrier) {
            this.spawnItemCapsule(enemy.x, enemy.y);
          }
          
          // Earning gold coins & score
          this.awardCoins(enemy);
          this.score += enemy.word.length * 10;
          this.enemies.splice(i, 1);
          
          // Track wave metric
          this.waveEnemiesKilled++;
          
          if (this.currentTarget === enemy) {
            this.currentTarget = null;
            this.typedText = "";
          }
        }
      }
      
      let maxRadius = this.canvas.width;
      if (this.boosterLevel === 3) maxRadius = this.canvas.width * 1.2; // 20% larger shockwave!
      
      if (this.shockwaveRadius > maxRadius) {
        this.shockwaveActive = false;
        this.shockwaveRadius = 0;
      }
      this.updateHUD();
    }

    // 6. Move active Lasers
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i];
      
      const dx = laser.targetX - laser.x;
      const dy = laser.targetY - laser.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < laser.speed) {
        // Laser hit collision!
        this.triggerExplosion(laser.targetX, laser.targetY, laser.targetEnemyRef.color);
        window.RinTypeAudio.playExplosion();
        
        // Spawn capsule items
        if (laser.targetEnemyRef.isBoss) {
          // Spawn 3 capsules fan layout!
          this.spawnItemCapsule(laser.targetX - 30, laser.targetY);
          this.spawnItemCapsule(laser.targetX, laser.targetY - 10);
          this.spawnItemCapsule(laser.targetX + 30, laser.targetY);
        } else if (laser.targetEnemyRef.isItemCarrier) {
          this.spawnItemCapsule(laser.targetX, laser.targetY);
        }
        
        // Remove enemy from list
        const enemyIdx = this.enemies.indexOf(laser.targetEnemyRef);
        if (enemyIdx !== -1) {
          this.enemies.splice(enemyIdx, 1);
        }
        
        // Earning gold coins & score
        this.awardCoins(laser.targetEnemyRef);
        this.score += laser.targetEnemyRef.word.length * 10;
        this.updateHUD();
        
        // Track wave metric
        this.waveEnemiesKilled++;
        
        // Remove laser
        this.lasers.splice(i, 1);
      } else {
        // Advance laser closer to target
        const angle = Math.atan2(dy, dx);
        laser.x += Math.cos(angle) * laser.speed;
        laser.y += Math.sin(angle) * laser.speed;
      }
    }

    // 7. Update active explosion particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.alpha = p.life / p.maxLife;
      
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // 8. Wave Progression Transition
    if (this.waveEnemiesKilled >= this.waveTarget && this.waveClearTimer === 0) {
      this.waveClearTimer = 180; // 3 seconds warp drive animation
      this.enemies = []; // clear screen
      this.currentTarget = null;
      this.typedText = "";
      if (window.RinTypeAudio) window.RinTypeAudio.playFreeze(); // chime sound
    }

    if (this.waveClearTimer > 0) {
      this.waveClearTimer--;
      if (this.waveClearTimer === 0) {
        // Hyperspace warp complete! Go to next Wave/Stage
        this.level++;
        this.waveEnemiesKilled = 0;
        this.waveTarget = 10 + this.level * 2; // scale enemies required
        this.baseSpeed += 0.08;
        this.spawnInterval = Math.max(800, this.spawnInterval - 150);
        this.startSpawner();
        
        // Spawn boss every even wave!
        if (this.level % 2 === 0) {
          this.spawnBossMeteor();
        }
        
        this.updateHUD();
      }
    }
  }

  triggerShieldHitEffect() {
    this.canvas.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.8)';
    setTimeout(() => {
      this.canvas.style.boxShadow = 'none';
    }, 150);
  }

  triggerExplosion(x, y, color) {
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        life: Math.random() * 30 + 15,
        maxLife: 45,
        alpha: 1,
        size: Math.random() * 3 + 1
      });
    }
  }

  draw() {
    // Implement Screen Shaking offsets during drawings
    let shakeX = 0;
    let shakeY = 0;
    if (this.shakeTimer > 0) {
      shakeX = (Math.random() - 0.5) * 8;
      shakeY = (Math.random() - 0.5) * 8;
      this.shakeTimer--;
    }
    
    this.ctx.save();
    this.ctx.translate(shakeX, shakeY);

    // Clear screen
    this.ctx.fillStyle = '#0d0f12';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw stars
    this.ctx.fillStyle = '#ffffff';
    this.stars.forEach(star => {
      this.ctx.globalAlpha = star.speed * 4;
      this.ctx.fillRect(star.x, star.y, star.size, star.size);
    });
    this.ctx.globalAlpha = 1.0;
    
    // Draw ship exhaust flame (upgraded wings if higher laser level!)
    const flameTime = Date.now();
    const flameSize = Math.sin(flameTime / 50) * 8 + 12;
    this.ctx.fillStyle = this.laserLevel >= 4 ? '#fbbf24' : '#f97316'; // gold for level 4!
    
    // Core flame
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x - 5, this.ship.y + 15);
    this.ctx.lineTo(this.ship.x + 5, this.ship.y + 15);
    this.ctx.lineTo(this.ship.x, this.ship.y + 15 + flameSize);
    this.ctx.closePath();
    this.ctx.fill();
    
    // Wing side flames for laser levels 2, 3, 4!
    if (this.laserLevel >= 2) {
      this.ctx.fillStyle = this.laserLevel === 2 ? '#10b981' : (this.laserLevel === 3 ? '#c084fc' : '#fbbf24');
      
      // Left flame
      this.ctx.beginPath();
      this.ctx.moveTo(this.ship.x - 18, this.ship.y + 12);
      this.ctx.lineTo(this.ship.x - 12, this.ship.y + 12);
      this.ctx.lineTo(this.ship.x - 15, this.ship.y + 12 + flameSize * 0.6);
      this.ctx.closePath();
      this.ctx.fill();
      
      // Right flame
      this.ctx.beginPath();
      this.ctx.moveTo(this.ship.x + 12, this.ship.y + 12);
      this.ctx.lineTo(this.ship.x + 18, this.ship.y + 12);
      this.ctx.lineTo(this.ship.x + 15, this.ship.y + 12 + flameSize * 0.6);
      this.ctx.closePath();
      this.ctx.fill();
    }

    // Draw ship body
    this.ctx.fillStyle = '#38bdf8';
    
    // Custom wing shapes based on upgrade tier!
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x, this.ship.y - 20);
    this.ctx.lineTo(this.ship.x - (18 + this.laserLevel * 2), this.ship.y + 15);
    this.ctx.lineTo(this.ship.x, this.ship.y + 5);
    this.ctx.lineTo(this.ship.x + (18 + this.laserLevel * 2), this.ship.y + 15);
    this.ctx.closePath();
    this.ctx.fill();
    
    // Ship nose cone
    this.ctx.fillStyle = '#0284c7';
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x, this.ship.y - 12);
    this.ctx.lineTo(this.ship.x - 8, this.ship.y + 4);
    this.ctx.lineTo(this.ship.x + 8, this.ship.y + 4);
    this.ctx.closePath();
    this.ctx.fill();
    
    // Upgraded Cockpit shield overlay based on HP level
    this.ctx.fillStyle = this.hpLevel === 2 ? '#10b981' : (this.hpLevel === 3 ? '#ec4899' : '#06b6d4');
    this.ctx.beginPath();
    this.ctx.arc(this.ship.x, this.ship.y - 2, 4, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw lasers with custom color, sparks, and trails!
    this.lasers.forEach(laser => {
      this.ctx.save();
      this.ctx.shadowBlur = laser.spark ? 25 : 15;
      this.ctx.shadowColor = laser.color || '#00ffff';
      this.ctx.strokeStyle = laser.color || '#e0f2fe';
      this.ctx.lineWidth = laser.spark ? 4 : 3;
      this.ctx.beginPath();
      
      const angle = Math.atan2(laser.targetY - laser.y, laser.targetX - laser.x);
      this.ctx.moveTo(laser.x, laser.y);
      this.ctx.lineTo(laser.x - Math.cos(angle) * 18, laser.y - Math.sin(angle) * 18);
      this.ctx.stroke();
      
      if (laser.spark && Math.random() < 0.35) {
        // Emit beautiful electrical sparks in laser trajectory!
        this.particles.push({
          x: laser.x - Math.cos(angle) * 10,
          y: laser.y - Math.sin(angle) * 10,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          color: '#fbbf24',
          life: 8,
          maxLife: 8,
          alpha: 1,
          size: Math.random() * 2 + 1
        });
      }
      this.ctx.restore();
    });

    // Draw particles
    this.particles.forEach(p => {
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1.0;

    // Draw active enemies (meteorites with words)
    this.enemies.forEach(enemy => {
      const isLocked = (this.currentTarget === enemy);
      
      // Draw meteor body
      this.ctx.fillStyle = enemy.isBoss ? 'rgba(239, 68, 68, 0.15)' : 'rgba(30, 41, 59, 0.88)';
      
      if (enemy.isBoss) {
        // Crimson glowing red boss border
        this.ctx.strokeStyle = isLocked ? '#22c55e' : '#ef4444';
        this.ctx.lineWidth = isLocked ? 4.5 : 3;
        this.ctx.shadowBlur = isLocked ? 25 : 15;
        this.ctx.shadowColor = isLocked ? '#22c55e' : '#ef4444';
      } else if (enemy.isItemCarrier) {
        // Glowing purple carrier
        this.ctx.strokeStyle = isLocked ? '#22c55e' : '#e879f9';
        this.ctx.lineWidth = isLocked ? 3.5 : 2;
        this.ctx.shadowBlur = isLocked ? 18 : 10;
        this.ctx.shadowColor = isLocked ? '#22c55e' : '#e879f9';
      } else {
        this.ctx.strokeStyle = isLocked ? '#22c55e' : enemy.color;
        this.ctx.lineWidth = isLocked ? 3 : 1.5;
        if (isLocked) {
          this.ctx.shadowBlur = 15;
          this.ctx.shadowColor = '#22c55e';
        }
      }
      
      // Draw rounded pill meteor box
      this.ctx.beginPath();
      const radius = 8;
      const x = enemy.x - enemy.width / 2;
      const y = enemy.y - (enemy.isBoss ? 18 : 12);
      const w = enemy.width;
      const h = enemy.isBoss ? 36 : 26;
      this.ctx.moveTo(x + radius, y);
      this.ctx.lineTo(x + w - radius, y);
      this.ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      this.ctx.lineTo(x + w, y + h - radius);
      this.ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      this.ctx.lineTo(x + radius, y + h);
      this.ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      this.ctx.lineTo(x, y + radius);
      this.ctx.quadraticCurveTo(x, y, x + radius, y);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.shadowBlur = 0; // reset

      // Draw word text
      this.ctx.font = enemy.isBoss ? 'bold 16px "Outfit", sans-serif' : 'bold 14px "Outfit", "Inter", sans-serif';
      this.ctx.textAlign = 'center';
      
      const wordStr = enemy.word;
      const textOffset = enemy.isBoss ? 8 : 6;
      
      if (isLocked) {
        const typedStr = this.typedText;
        const untypedStr = wordStr.slice(typedStr.length);
        const fullWidth = this.ctx.measureText(wordStr).width;
        const typedWidth = this.ctx.measureText(typedStr).width;
        const startX = enemy.x - (fullWidth / 2);
        
        // 1. Draw typed letters
        this.ctx.fillStyle = '#22c55e';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(typedStr, startX, enemy.y + textOffset);
        
        // 2. Draw remaining letters
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(untypedStr, startX + typedWidth, enemy.y + textOffset);
      } else {
        this.ctx.fillStyle = enemy.isBoss ? '#ffe4e6' : (enemy.isItemCarrier ? '#fdf2ff' : '#ffffff');
        this.ctx.fillText(wordStr, enemy.x, enemy.y + textOffset);
      }
    });

    // Draw active falling capsules items
    this.activeItems.forEach(item => {
      const pulse = Math.sin(item.pulseAngle) * 3;
      const finalRad = item.radius + pulse;
      
      this.ctx.save();
      this.ctx.shadowBlur = 15;
      
      let strokeStyle = '';
      let glowColor = '';
      let label = '';
      
      if (item.type === 'freeze') {
        strokeStyle = '#38bdf8';
        glowColor = '#38bdf8';
        label = '❄️ F';
      } else if (item.type === 'heal') {
        strokeStyle = '#22c55e';
        glowColor = '#22c55e';
        label = '❤️ H';
      } else if (item.type === 'shockwave') {
        strokeStyle = '#eab308';
        glowColor = '#eab308';
        label = '⚡ S';
      }
      
      this.ctx.shadowColor = glowColor;
      this.ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.lineWidth = 2.5;
      
      this.ctx.beginPath();
      this.ctx.arc(item.x, item.y, finalRad, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      
      // Draw label
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 12px "Outfit", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(label, item.x, item.y + 4);
      
      this.ctx.restore();
    });

    // Draw expanding Shockwave visual effect
    if (this.shockwaveActive) {
      this.ctx.save();
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = '#eab308';
      this.ctx.strokeStyle = 'rgba(234, 179, 8, 0.8)';
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.arc(this.ship.x, this.ship.y, this.shockwaveRadius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Draw bottom shield line
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.height - 40);
    this.ctx.lineTo(this.canvas.width, this.canvas.height - 40);
    this.ctx.stroke();

    // Draw Freeze screen visual frost effect overlay
    if (this.freezeTimer > 0) {
      this.ctx.fillStyle = 'rgba(56, 189, 248, 0.08)'; // Light frozen cyan
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      this.ctx.lineWidth = 6;
      this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw Boss Alert
    const bossOnScreen = this.enemies.find(e => e.isBoss);
    if (bossOnScreen && Math.floor(Date.now() / 400) % 2 === 0) {
      this.ctx.font = 'bold 18px "Outfit", sans-serif';
      this.ctx.fillStyle = '#ef4444';
      this.ctx.textAlign = 'center';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#ef4444';
      this.ctx.fillText("⚠️ THIÊN THẠCH MẸ ĐANG XUẤT HIỆN! ⚠️", this.canvas.width / 2, 35);
      this.ctx.shadowBlur = 0;
    }

    // Draw Wave Clear Hyper-Speed Text Overlay
    if (this.waveClearTimer > 0) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.font = 'bold 32px "Outfit", sans-serif';
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.textAlign = 'center';
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = '#fbbf24';
      
      const secondsLeft = Math.ceil(this.waveClearTimer / 60);
      this.ctx.fillText(`WAVE ${this.level} CLEARED!`, this.canvas.width / 2, this.canvas.height / 2 - 20);
      
      this.ctx.font = '500 16px "Outfit", sans-serif';
      this.ctx.fillStyle = '#60a5fa';
      this.ctx.shadowColor = '#60a5fa';
      this.ctx.fillText(`KÍCH HOẠT NHẢY KHÔNG GIAN TRONG ${secondsLeft}s...`, this.canvas.width / 2, this.canvas.height / 2 + 20);
      
      this.ctx.shadowBlur = 0;
    }

    this.ctx.restore();
  }

  drawStaticScene() {
    this.ctx.fillStyle = '#0d0f12';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.generateStars();
    
    // Draw stars
    this.ctx.fillStyle = '#ffffff';
    this.stars.forEach(star => {
      this.ctx.globalAlpha = star.speed * 4;
      this.ctx.fillRect(star.x, star.y, star.size, star.size);
    });
    this.ctx.globalAlpha = 1.0;
    
    // Draw static ship
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x, this.ship.y - 20);
    this.ctx.lineTo(this.ship.x - 20, this.ship.y + 15);
    this.ctx.lineTo(this.ship.x, this.ship.y + 5);
    this.ctx.lineTo(this.ship.x + 20, this.ship.y + 15);
    this.ctx.closePath();
    this.ctx.fill();
  }

  updateHUD() {
    document.getElementById('game-score').textContent = this.score;
    document.getElementById('game-level').textContent = this.level;
    
    const fill = document.getElementById('game-hp-fill');
    const txt = document.getElementById('game-hp-text');
    if (fill && txt) {
      fill.style.width = `${this.hp}%`;
      txt.textContent = this.hp;
      
      // Update color dynamically based on health values
      if (this.hp > 50) {
        fill.style.backgroundColor = '#22c55e';
      } else if (this.hp > 25) {
        fill.style.backgroundColor = '#eab308';
      } else {
        fill.style.backgroundColor = '#ef4444';
      }
    }
  }

  gameOver() {
    this.isPlaying = false;
    this.isGameOverState = true;
    
    if (this.spawnTimer) clearInterval(this.spawnTimer);
    this.unbindKeyboard();
    
    this.saveHighScore();
    
    document.getElementById('game-final-score').textContent = this.score;
    document.getElementById('game-over-overlay').style.display = 'flex';
  }

  stop() {
    this.isPlaying = false;
    this.isGameOverState = false;
    if (this.spawnTimer) clearInterval(this.spawnTimer);
    this.unbindKeyboard();
  }
}

// Global exposure
window.RinTypeSpaceShooter = new RinTypeSpaceShooter();
