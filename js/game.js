/**
 * RinType English - Typing Space Shooter Game Engine
 * Highly optimized HTML5 Canvas game running at smooth 60 FPS.
 */

class RinTypeSpaceShooter {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    
    // Game state
    this.isPlaying = false;
    this.isGameOverState = false;
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.highScore = 0;
    
    // Game entities
    this.enemies = [];
    this.lasers = [];
    this.particles = [];
    this.stars = [];
    
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
    
    // Create random starry background background
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
    // Keep internal logical resolution 800x500 but styled responsively via CSS
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
    
    this.isPlaying = true;
    this.isGameOverState = false;
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.spawnInterval = 3000;
    
    this.enemies = [];
    this.lasers = [];
    this.particles = [];
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
    
    // Pull vocabulary from active app state if available, else fall back to basic database
    let wordList = ["hello", "morning", "please", "friend", "family", "mother", "father", "water", "happy", "smile"];
    try {
      if (window.RinTypeApp && window.RinTypeApp.words && window.RinTypeApp.words.length > 0) {
        // Collect strings based on current active levels
        if (window.RinTypeApp.activeMode === 'roadmap') {
          const levelKey = window.RinTypeApp.dom.roadmapLevelSelect.value;
          const levelData = window.RINTYPE_DATABASE.roadmap[levelKey];
          wordList = levelData.vocabulary.map(v => v.word);
        } else {
          // If not roadmap, pull from vocabulary
          wordList = window.RINTYPE_DATABASE.vocabulary.map(v => v.word);
        }
      }
    } catch (e) {
      console.warn("Could not load dynamic vocabulary for game spawner, using fallback.");
    }

    // Pick random word
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    
    // Ensure we don't spawn duplicate words currently on screen to avoid keyboard collision
    const existingWords = this.enemies.map(e => e.word);
    if (existingWords.includes(randomWord) && wordList.length > 5) {
      // Re-spawn once
      this.spawnMeteor();
      return;
    }
    
    const meteorWidth = this.ctx.measureText(randomWord).width + 30;
    
    const newEnemy = {
      x: Math.max(meteorWidth, Math.random() * (this.canvas.width - meteorWidth)),
      y: -20,
      word: randomWord,
      width: meteorWidth,
      height: 30,
      speed: this.baseSpeed + (this.level * 0.15) + (Math.random() * 0.2),
      color: this.getRandomMeteorColor()
    };
    
    this.enemies.push(newEnemy);
  }

  getRandomMeteorColor() {
    const colors = [
      '#f43f5e', // rose red
      '#fb923c', // light orange
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
      
      // If we don't have an active target locked
      if (!this.currentTarget) {
        // Find an enemy starting with this character
        // Priority to the ones lowest on the screen (highest Y value)
        let potentialTargets = this.enemies.filter(enemy => enemy.word.toLowerCase().startsWith(char.toLowerCase()));
        
        if (potentialTargets.length > 0) {
          // Sort descending by Y coordinate
          potentialTargets.sort((a, b) => b.y - a.y);
          this.currentTarget = potentialTargets[0];
          this.typedText = char;
          
          // Play click sound feedback
          window.RinTypeAudio.playKeydown();
          
          // Check if word completed (single char word)
          this.checkWordCompletion();
        }
      } else {
        // We have a target locked, check if the next character matches
        const nextCharIndex = this.typedText.length;
        const targetNextChar = this.currentTarget.word[nextCharIndex];
        
        if (char.toLowerCase() === targetNextChar.toLowerCase()) {
          this.typedText += targetNextChar;
          
          // Play click sound feedback
          window.RinTypeAudio.playKeydown();
          
          this.checkWordCompletion();
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

  checkWordCompletion() {
    if (this.typedText === this.currentTarget.word) {
      // Fire laser!
      this.fireLaser(this.currentTarget);
      
      // Clear targets
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
      speed: laserSpeed,
      progress: 0
    };
    
    this.lasers.push(newLaser);
    
    // Play sci-fi laser shot sound
    window.RinTypeAudio.playLaser();
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

    // 2. Move meteor enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.y += enemy.speed;
      
      // If meteor hits the bottom boundary (collides with shield)
      if (enemy.y > this.canvas.height - 50) {
        // Remove from list
        this.enemies.splice(i, 1);
        
        // Lose a life
        this.lives--;
        this.updateHUD();
        
        // Shake screen visual effect (can trigger canvas offset)
        this.triggerShieldHitEffect();
        
        // If lost all lives
        if (this.lives <= 0) {
          this.gameOver();
          return;
        }
        
        // If target was destroyed, unlock target
        if (this.currentTarget === enemy) {
          this.currentTarget = null;
          this.typedText = "";
        }
      }
    }

    // 3. Move active Lasers
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i];
      
      // Move closer to destination coordinates
      const dx = laser.targetX - laser.x;
      const dy = laser.targetY - laser.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < laser.speed) {
        // Collision hit!
        this.triggerExplosion(laser.targetX, laser.targetY, laser.targetEnemyRef.color);
        
        // Play explosion sound effect
        window.RinTypeAudio.playExplosion();
        
        // Remove enemy
        const enemyIdx = this.enemies.indexOf(laser.targetEnemyRef);
        if (enemyIdx !== -1) {
          this.enemies.splice(enemyIdx, 1);
        }
        
        // Award scores
        this.score += laser.targetEnemyRef.word.length * 10;
        this.updateHUD();
        
        // Remove laser
        this.lasers.splice(i, 1);
        
        // Check level up (every 300 points)
        const newLevel = Math.floor(this.score / 300) + 1;
        if (newLevel > this.level) {
          this.level = newLevel;
          this.baseSpeed += 0.08;
          this.spawnInterval = Math.max(1200, 3000 - (this.level * 200));
          this.startSpawner(); // restart spawner interval
          this.updateHUD();
        }
      } else {
        // Advance laser position
        const angle = Math.atan2(dy, dx);
        laser.x += Math.cos(angle) * laser.speed;
        laser.y += Math.sin(angle) * laser.speed;
      }
    }

    // 4. Update particles
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
    // Shaking offset handled dynamically during drawing, we trigger a brief screen red glow
    this.canvas.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.7)';
    setTimeout(() => {
      this.canvas.style.boxShadow = 'none';
    }, 150);
  }

  triggerExplosion(x, y, color) {
    // Generate beautiful colorful circular particles
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
    // Clear canvas
    this.ctx.fillStyle = '#0d0f12';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw stars
    this.ctx.fillStyle = '#ffffff';
    this.stars.forEach(star => {
      this.ctx.globalAlpha = star.speed * 4; // brighter stars move faster
      this.ctx.fillRect(star.x, star.y, star.size, star.size);
    });
    this.ctx.globalAlpha = 1.0;
    
    // Draw ship exhaust flame
    const flameTime = Date.now();
    const flameSize = Math.sin(flameTime / 50) * 8 + 12;
    this.ctx.fillStyle = '#f97316'; // orange flame
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x - 5, this.ship.y + 15);
    this.ctx.lineTo(this.ship.x + 5, this.ship.y + 15);
    this.ctx.lineTo(this.ship.x, this.ship.y + 15 + flameSize);
    this.ctx.closePath();
    this.ctx.fill();

    // Draw ship (spaceship body)
    this.ctx.fillStyle = '#38bdf8'; // neon blue body
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x, this.ship.y - 20); // nose
    this.ctx.lineTo(this.ship.x - 20, this.ship.y + 15); // left wing
    this.ctx.lineTo(this.ship.x, this.ship.y + 5); // center bottom indentation
    this.ctx.lineTo(this.ship.x + 20, this.ship.y + 15); // right wing
    this.ctx.closePath();
    this.ctx.fill();
    
    // Ship decorations / nose cone
    this.ctx.fillStyle = '#0284c7';
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x, this.ship.y - 12);
    this.ctx.lineTo(this.ship.x - 8, this.ship.y + 4);
    this.ctx.lineTo(this.ship.x + 8, this.ship.y + 4);
    this.ctx.closePath();
    this.ctx.fill();

    // Draw active lasers
    this.ctx.shadowBlur = 15;
    this.lasers.forEach(laser => {
      this.ctx.shadowColor = '#00ffff';
      this.ctx.strokeStyle = '#e0f2fe';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      // Calculate small trail
      const angle = Math.atan2(laser.targetY - laser.y, laser.targetX - laser.x);
      this.ctx.moveTo(laser.x, laser.y);
      this.ctx.lineTo(laser.x - Math.cos(angle) * 15, laser.y - Math.sin(angle) * 15);
      this.ctx.stroke();
    });
    this.ctx.shadowBlur = 0; // reset glow

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
      this.ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
      this.ctx.strokeStyle = isLocked ? '#22c55e' : enemy.color;
      this.ctx.lineWidth = isLocked ? 3 : 1.5;
      
      // Draw meteor shadow blur if locked
      if (isLocked) {
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#22c55e';
      }
      
      // Draw smooth rounded pill background for word clarity
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

      // Draw word text inside meteorite
      this.ctx.font = 'bold 14px "Outfit", "Inter", sans-serif';
      this.ctx.textAlign = 'center';
      
      const wordStr = enemy.word;
      
      if (isLocked) {
        // Draw matched characters in green
        const typedStr = this.typedText;
        const untypedStr = wordStr.slice(typedStr.length);
        
        const fullWidth = this.ctx.measureText(wordStr).width;
        const typedWidth = this.ctx.measureText(typedStr).width;
        
        // Start text drawing alignment offset
        const startX = enemy.x - (fullWidth / 2);
        
        // 1. Draw typed letters
        this.ctx.fillStyle = '#22c55e';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(typedStr, startX, enemy.y + 6);
        
        // 2. Draw remaining letters
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(untypedStr, startX + typedWidth, enemy.y + 6);
      } else {
        // Pure white for standard enemies
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(wordStr, enemy.x, enemy.y + 6);
      }
    });

    // Draw simple bottom boundary shield line (at canvas height - 40)
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.height - 40);
    this.ctx.lineTo(this.canvas.width, this.canvas.height - 40);
    this.ctx.stroke();
  }

  drawStaticScene() {
    // Render deep dark canvas background with start game label
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
    document.getElementById('game-lives').textContent = this.lives;
    document.getElementById('game-level').textContent = this.level;
  }

  gameOver() {
    this.isPlaying = false;
    this.isGameOverState = true;
    
    if (this.spawnTimer) clearInterval(this.spawnTimer);
    this.unbindKeyboard();
    
    // Save high score
    this.saveHighScore();
    
    // Show game over overlay with scores
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
