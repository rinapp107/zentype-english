/* ============================================
   ZenType English — Mini Games Module
   ============================================ */

window.MinigamesModule = {
  activeGame: null,
  score: 0,
  timer: null,
  
  render(container) {
    this.container = container;
    this.showMenu();
  },

  showMenu() {
    this.activeGame = null;
    if (this.timer) clearInterval(this.timer);

    this.container.innerHTML = `
      <div class="games-menu mx-auto" style="max-width: 800px; padding-top: 20px;">
        <div class="text-center mb-xl animate-slide-down">
          <i class="fa-solid fa-gamepad text-primary mb-md" style="font-size: 3rem;"></i>
          <h2>Giải Trí & Học Tập</h2>
          <p class="text-secondary">Chơi game để giải trí và củng cố từ vựng một cách tự nhiên.</p>
        </div>

        <div class="grid grid-2 gap-lg">
          <!-- Game 1: Word Match -->
          <div class="glass-card p-xl animate-scale-in flex-col align-center text-center" style="animation-delay: 0.1s; cursor: pointer; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'" onclick="MinigamesModule.startWordMatch()">
            <div style="width: 80px; height: 80px; border-radius: 20px; background: rgba(59, 130, 246, 0.2); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <i class="fa-solid fa-puzzle-piece text-primary" style="font-size: 2.5rem;"></i>
            </div>
            <h3 class="mb-sm">Ghép Cặp Từ Vựng</h3>
            <p class="text-secondary text-sm mb-lg">Lật thẻ và tìm cặp từ tiếng Anh - tiếng Việt tương ứng nhanh nhất có thể.</p>
            <button class="btn btn-primary btn-sm w-full mt-auto">Chơi ngay</button>
          </div>

          <!-- Game 2: Word Scramble -->
          <div class="glass-card p-xl animate-scale-in flex-col align-center text-center" style="animation-delay: 0.2s; cursor: pointer; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'" onclick="MinigamesModule.startScramble()">
            <div style="width: 80px; height: 80px; border-radius: 20px; background: rgba(245, 158, 11, 0.2); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <i class="fa-solid fa-shuffle text-warning" style="font-size: 2.5rem;"></i>
            </div>
            <h3 class="mb-sm">Giải Cứu Chữ Cái</h3>
            <p class="text-secondary text-sm mb-lg">Sắp xếp các chữ cái bị xáo trộn thành một từ có nghĩa trong 60 giây.</p>
            <button class="btn btn-warning btn-sm w-full mt-auto">Chơi ngay</button>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // GAME 1: WORD MATCH (Memory Card)
  // ==========================================
  startWordMatch() {
    this.activeGame = 'match';
    this.score = 0;
    this.matchState = {
      cards: [],
      flipped: [],
      matchedPairs: 0,
      moves: 0,
      startTime: Date.now()
    };
    
    // Get 8 random words
    const allWords = ZenData.getAllWords();
    const selectedWords = [...allWords].sort(() => Math.random() - 0.5).slice(0, 8);
    
    // Create pairs (En and Vi)
    selectedWords.forEach((w, index) => {
      this.matchState.cards.push({ id: index, type: 'en', text: w.word, matched: false });
      this.matchState.cards.push({ id: index, type: 'vi', text: w.meaning, matched: false });
    });
    
    // Shuffle
    this.matchState.cards.sort(() => Math.random() - 0.5);
    
    this.renderWordMatch();
  },
  
  renderWordMatch() {
    this.container.innerHTML = `
      <div class="game-container mx-auto" style="max-width: 600px; padding-top: 20px;">
        <div class="flex justify-between align-center mb-md">
          <button class="btn btn-secondary btn-sm" onclick="MinigamesModule.showMenu()">
            <i class="fa-solid fa-arrow-left"></i> Thoát
          </button>
          <div class="font-bold text-primary">Ghép Cặp Từ Vựng</div>
          <div class="font-bold">Lượt lật: <span id="match-moves">${this.matchState.moves}</span></div>
        </div>
        
        <div class="grid grid-4 gap-sm animate-fade-in" id="match-board" style="perspective: 1000px;">
          ${this.matchState.cards.map((c, i) => `
            <div class="match-card ${c.matched ? 'matched' : ''}" data-index="${i}" style="height: 100px; position: relative; cursor: pointer; transform-style: preserve-3d; transition: transform 0.5s;">
              <div class="match-card-front glass-card flex justify-center align-center" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; font-size: 2rem; color: var(--primary);">
                <i class="fa-solid fa-question"></i>
              </div>
              <div class="match-card-back glass-card flex justify-center align-center text-center p-sm" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); background: ${c.type === 'en' ? 'rgba(59,130,246,0.2)' : 'rgba(16,185,129,0.2)'}; border: 1px solid ${c.type === 'en' ? 'var(--primary)' : 'var(--success)'}; font-weight: bold; font-size: 0.9rem; word-break: break-word;">
                ${c.text}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Add CSS for matched state
    const style = document.createElement('style');
    style.innerHTML = `
      .match-card.flipped { transform: rotateY(180deg); }
      .match-card.matched { transform: rotateY(180deg); opacity: 0.6; pointer-events: none; }
    `;
    this.container.appendChild(style);
    
    // Bind events
    const cardEls = document.querySelectorAll('.match-card');
    cardEls.forEach(el => {
      el.addEventListener('click', () => this.handleMatchClick(parseInt(el.dataset.index), el));
    });
  },
  
  handleMatchClick(index, el) {
    const card = this.matchState.cards[index];
    if (card.matched || this.matchState.flipped.includes(index) || this.matchState.flipped.length >= 2) return;
    
    // Flip card
    el.classList.add('flipped');
    this.matchState.flipped.push(index);
    
    if (this.matchState.flipped.length === 2) {
      this.matchState.moves++;
      document.getElementById('match-moves').textContent = this.matchState.moves;
      
      const idx1 = this.matchState.flipped[0];
      const idx2 = this.matchState.flipped[1];
      const card1 = this.matchState.cards[idx1];
      const card2 = this.matchState.cards[idx2];
      
      if (card1.id === card2.id && card1.type !== card2.type) {
        // Match!
        setTimeout(() => {
          document.querySelectorAll('.match-card')[idx1].classList.add('matched');
          document.querySelectorAll('.match-card')[idx2].classList.add('matched');
          this.matchState.cards[idx1].matched = true;
          this.matchState.cards[idx2].matched = true;
          this.matchState.flipped = [];
          this.matchState.matchedPairs++;
          Gamification.playDingSound();
          
          if (this.matchState.matchedPairs === 8) {
            this.endWordMatch();
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          document.querySelectorAll('.match-card')[idx1].classList.remove('flipped');
          document.querySelectorAll('.match-card')[idx2].classList.remove('flipped');
          this.matchState.flipped = [];
        }, 1000);
      }
    }
  },
  
  endWordMatch() {
    const timeTaken = Math.round((Date.now() - this.matchState.startTime) / 1000);
    // Base 50, minus 1 for every extra move over minimum (16), minus 1 for every 5 seconds over 30s
    let score = 50 - Math.max(0, this.matchState.moves - 16) - Math.floor(Math.max(0, timeTaken - 30) / 5);
    score = Math.max(10, score); // minimum 10 XP
    
    Gamification.addXP(score, 'Thắng Minigame Ghép Từ');
    ZenStorage.addHistory({ type: 'game', score: score, details: 'Word Match' });
    
    this.container.innerHTML = `
      <div class="result-container mx-auto text-center animate-scale-in" style="max-width: 500px; padding-top: 40px;">
        <div class="glass-card p-xl">
          <i class="fa-solid fa-trophy text-warning" style="font-size: 4rem; margin-bottom: 20px;"></i>
          <h2 class="mb-sm">Hoàn Thành!</h2>
          <p class="text-secondary mb-lg">Bạn đã ghép xong tất cả các cặp từ.</p>
          
          <div class="result-stats grid grid-3 gap-md mb-xl">
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Số lượt lật</div>
              <div class="font-bold text-xl">${this.matchState.moves}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Thời gian</div>
              <div class="font-bold text-xl">${timeTaken}s</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; border: 1px solid var(--warning);">
              <div class="text-warning text-sm">XP Nhận được</div>
              <div class="font-bold text-xl text-warning">+${score}</div>
            </div>
          </div>
          
          <button class="btn btn-primary" onclick="MinigamesModule.showMenu()">Chơi game khác</button>
        </div>
      </div>
    `;
  },
  
  // ==========================================
  // GAME 2: WORD SCRAMBLE
  // ==========================================
  startScramble() {
    this.activeGame = 'scramble';
    this.score = 0; // words solved
    this.scrambleState = {
      timeLeft: 60, // 60 seconds
      currentWord: null,
      scrambled: []
    };
    
    this.nextScrambleWord();
    this.renderScramble();
    
    this.timer = setInterval(() => {
      this.scrambleState.timeLeft--;
      const timerEl = document.getElementById('scramble-timer');
      if (timerEl) {
        timerEl.textContent = this.scrambleState.timeLeft;
        if (this.scrambleState.timeLeft <= 10) {
          timerEl.style.color = 'var(--error)';
        }
      }
      
      if (this.scrambleState.timeLeft <= 0) {
        clearInterval(this.timer);
        this.endScramble();
      }
    }, 1000);
  },
  
  nextScrambleWord() {
    const allWords = ZenData.getAllWords().filter(w => w.word.length >= 4 && w.word.length <= 10 && !w.word.includes(' '));
    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    
    let chars = randomWord.word.split('');
    // Shuffle algorithm
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    // Prevent it from being correctly ordered by chance
    if (chars.join('') === randomWord.word) {
      [chars[0], chars[chars.length-1]] = [chars[chars.length-1], chars[0]];
    }
    
    this.scrambleState.currentWord = randomWord;
    this.scrambleState.scrambled = chars;
  },
  
  renderScramble() {
    this.container.innerHTML = `
      <div class="game-container mx-auto" style="max-width: 600px; padding-top: 20px;">
        <div class="flex justify-between align-center mb-md">
          <button class="btn btn-secondary btn-sm" onclick="MinigamesModule.showMenu()">
            <i class="fa-solid fa-arrow-left"></i> Thoát
          </button>
          <div class="font-bold text-warning">Giải Cứu Chữ Cái</div>
          <div class="font-bold font-mono text-xl" id="scramble-timer">${this.scrambleState.timeLeft}</div>
        </div>
        
        <div class="glass-card text-center p-xl animate-scale-in">
          <div class="flex justify-between mb-sm">
            <span class="text-secondary">Điểm: <span class="font-bold text-success">${this.score}</span></span>
            <span class="text-secondary">Gợi ý: ${this.scrambleState.currentWord.meaning}</span>
          </div>
          
          <div class="scramble-display mt-lg mb-xl p-md" style="font-size: 2.5rem; letter-spacing: 10px; font-family: monospace; background: rgba(0,0,0,0.2); border-radius: 8px; min-height: 80px;">
            ${this.scrambleState.scrambled.join('')}
          </div>
          
          <input type="text" id="scramble-input" class="form-input text-center mb-lg" style="font-size: 1.5rem; letter-spacing: 5px; text-transform: lowercase;" placeholder="Nhập từ đúng..." autocomplete="off">
          
          <button class="btn btn-secondary" onclick="MinigamesModule.nextScrambleWord(); MinigamesModule.renderScramble();">Bỏ qua (0 XP)</button>
        </div>
      </div>
    `;
    
    setTimeout(() => {
      const input = document.getElementById('scramble-input');
      if (input) {
        input.focus();
        input.addEventListener('input', (e) => {
          if (e.target.value.toLowerCase() === this.scrambleState.currentWord.word.toLowerCase()) {
            this.score++;
            Gamification.playDingSound();
            input.disabled = true;
            input.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
            input.style.borderColor = 'var(--success)';
            
            setTimeout(() => {
              this.nextScrambleWord();
              this.renderScramble();
            }, 800);
          }
        });
      }
    }, 100);
  },
  
  endScramble() {
    const xpEarned = this.score * 5; // 5 XP per word solved
    
    if (xpEarned > 0) {
      Gamification.addXP(xpEarned, 'Thắng Minigame Giải Cứu Chữ Cái');
      ZenStorage.addHistory({ type: 'game', score: xpEarned, details: 'Scramble' });
    }
    
    this.container.innerHTML = `
      <div class="result-container mx-auto text-center animate-scale-in" style="max-width: 500px; padding-top: 40px;">
        <div class="glass-card p-xl">
          <i class="fa-solid fa-clock text-error" style="font-size: 4rem; margin-bottom: 20px;"></i>
          <h2 class="mb-sm">Hết Giờ!</h2>
          
          <div class="result-stats grid grid-2 gap-md mb-xl mt-lg">
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Từ giải mã được</div>
              <div class="font-bold text-xl text-success">${this.score}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; border: 1px solid var(--warning);">
              <div class="text-warning text-sm">XP Nhận được</div>
              <div class="font-bold text-xl text-warning">+${xpEarned}</div>
            </div>
          </div>
          
          <button class="btn btn-primary" onclick="MinigamesModule.showMenu()">Trở về Menu</button>
        </div>
      </div>
    `;
  }
};
