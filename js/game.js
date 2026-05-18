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
    
    this.isPlaying = true;
    this.isGameOverState = false;
    this.score = 0;
    this.hp = 100;
    this.level = 1;
    
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
    if (!this.isPlaying) return;
    
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
        const len = w.length;
        if (lengthVal === 'short') return len >= 3 && len <= 5;
        if (lengthVal === 'medium') return len >= 6 && len <= 8;
        if (lengthVal === 'long') return len >= 9;
        return true;
      });
      if (filtered.length > 0) {
        wordList = filtered;
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
    
    // 20% chance to drop powerup items (Glowing purple carrier meteor)
    const isItemCarrier = Math.random() < 0.20;
    
    const newEnemy = {
      x: Math.max(meteorWidth, Math.random() * (this.canvas.width - meteorWidth)),
      y: -20,
      word: randomWord,
      width: meteorWidth,
      height: 30,
      speed: this.baseSpeed + (this.level * 0.12) + (Math.random() * 0.2),
      color: isItemCarrier ? '#e879f9' : this.getRandomMeteorColor(),
      isItemCarrier: isItemCarrier
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
    
    const penalty = this.difficulty === 'hard' ? 5 : 2;
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
    const laserSpeed = 12;
    
    const newLaser = {
      x: this.ship.x,
      y: this.ship.y,
      targetX: target.x,
      targetY: target.y,
      targetEnemyRef: target,
      speed: laserSpeed
    };
    
    this.lasers.push(newLaser);
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
      this.freezeTimer = 300; // ~5 seconds of freeze at 60 FPS
      if (window.RinTypeAudio) window.RinTypeAudio.playFreeze();
      this.triggerSparkles(item.x, item.y, '#38bdf8');
    } else if (item.type === 'heal') {
      this.hp = Math.min(100, this.hp + 25);
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

  update() {
    // 1. Move stars background
    this.stars.forEach(star => {
      star.y += star.speed;
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
    const speedMultiplier = this.freezeTimer > 0 ? 0.25 : 1.0;
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.y += enemy.speed * speedMultiplier;
      
      // If meteor hits bottom shield boundary
      if (enemy.y > this.canvas.height - 50) {
        this.enemies.splice(i, 1);
        
        // HP Reduction
        this.hp -= 20;
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
          
          if (enemy.isItemCarrier) {
            this.spawnItemCapsule(enemy.x, enemy.y);
          }
          
          this.score += enemy.word.length * 10;
          this.enemies.splice(i, 1);
          
          if (this.currentTarget === enemy) {
            this.currentTarget = null;
            this.typedText = "";
          }
        }
      }
      
      if (this.shockwaveRadius > this.canvas.width) {
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
        
        // Drop item capsule if isItemCarrier was hit
        if (laser.targetEnemyRef.isItemCarrier) {
          this.spawnItemCapsule(laser.targetX, laser.targetY);
        }
        
        // Remove enemy from list
        const enemyIdx = this.enemies.indexOf(laser.targetEnemyRef);
        if (enemyIdx !== -1) {
          this.enemies.splice(enemyIdx, 1);
        }
        
        // Award score points
        this.score += laser.targetEnemyRef.word.length * 10;
        this.updateHUD();
        
        // Remove laser
        this.lasers.splice(i, 1);
        
        // Check level up (every 300 points)
        const newLevel = Math.floor(this.score / 300) + 1;
        if (newLevel > this.level) {
          this.level = newLevel;
          this.baseSpeed += 0.07;
          this.spawnInterval = Math.max(1000, this.spawnInterval - 150);
          this.startSpawner();
          this.updateHUD();
        }
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
    
    // Draw ship exhaust flame
    const flameTime = Date.now();
    const flameSize = Math.sin(flameTime / 50) * 8 + 12;
    this.ctx.fillStyle = '#f97316';
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x - 5, this.ship.y + 15);
    this.ctx.lineTo(this.ship.x + 5, this.ship.y + 15);
    this.ctx.lineTo(this.ship.x, this.ship.y + 15 + flameSize);
    this.ctx.closePath();
    this.ctx.fill();

    // Draw ship body
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x, this.ship.y - 20);
    this.ctx.lineTo(this.ship.x - 20, this.ship.y + 15);
    this.ctx.lineTo(this.ship.x, this.ship.y + 5);
    this.ctx.lineTo(this.ship.x + 20, this.ship.y + 15);
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

    // Draw lasers
    this.ctx.shadowBlur = 15;
    this.lasers.forEach(laser => {
      this.ctx.shadowColor = '#00ffff';
      this.ctx.strokeStyle = '#e0f2fe';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      const angle = Math.atan2(laser.targetY - laser.y, laser.targetX - laser.x);
      this.ctx.moveTo(laser.x, laser.y);
      this.ctx.lineTo(laser.x - Math.cos(angle) * 15, laser.y - Math.sin(angle) * 15);
      this.ctx.stroke();
    });
    this.ctx.shadowBlur = 0;

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
      this.ctx.fillStyle = 'rgba(30, 41, 59, 0.88)';
      
      if (enemy.isItemCarrier) {
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
      const y = enemy.y - 12;
      const w = enemy.width;
      const h = 26;
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
      this.ctx.font = 'bold 14px "Outfit", "Inter", sans-serif';
      this.ctx.textAlign = 'center';
      
      const wordStr = enemy.word;
      
      if (isLocked) {
        const typedStr = this.typedText;
        const untypedStr = wordStr.slice(typedStr.length);
        const fullWidth = this.ctx.measureText(wordStr).width;
        const typedWidth = this.ctx.measureText(typedStr).width;
        const startX = enemy.x - (fullWidth / 2);
        
        // 1. Draw typed letters
        this.ctx.fillStyle = '#22c55e';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(typedStr, startX, enemy.y + 6);
        
        // 2. Draw remaining letters
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(untypedStr, startX + typedWidth, enemy.y + 6);
      } else {
        this.ctx.fillStyle = enemy.isItemCarrier ? '#fdf2ff' : '#ffffff';
        this.ctx.fillText(wordStr, enemy.x, enemy.y + 6);
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
