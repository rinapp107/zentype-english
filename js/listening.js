/* ============================================
   ZenType English — Listening Module
   ============================================ */

window.ListeningModule = {
  exercises: [],
  currentIndex: 0,
  score: 0,
  mode: 'dictation', // 'dictation', 'choice'
  audioRate: 1.0,
  
  render(container) {
    this.container = container;
    this.showSetup();
  },

  showSetup() {
    this.container.innerHTML = `
      <div class="setup-container mx-auto" style="max-width: 600px; padding-top: 40px;">
        <div class="text-center mb-xl animate-slide-down">
          <i class="fa-solid fa-headphones text-accent mb-md" style="font-size: 3rem;"></i>
          <h2>Luyện Nghe</h2>
          <p class="text-secondary">Nâng cao khả năng nghe hiểu với giọng đọc chuẩn.</p>
        </div>

        <div class="glass-card p-xl animate-scale-in">
          <div class="form-group mb-lg">
            <label class="form-label">Chọn chế độ luyện nghe</label>
            <div class="quiz-type-cards grid" style="grid-template-columns: 1fr; gap: 10px;">
              <div class="quiz-type-card active flex align-center gap-md" data-mode="dictation" style="text-align: left;">
                <i class="fa-solid fa-keyboard text-primary" style="font-size: 2rem;"></i>
                <div>
                  <div class="mt-sm"><strong>Nghe và chép chính tả</strong></div>
                  <div class="text-secondary text-sm">Nghe câu và viết lại chính xác (Khó)</div>
                </div>
              </div>
              <div class="quiz-type-card flex align-center gap-md" data-mode="choice" style="text-align: left;">
                <i class="fa-solid fa-list-check text-success" style="font-size: 2rem;"></i>
                <div>
                  <div class="mt-sm"><strong>Nghe và chọn từ</strong></div>
                  <div class="text-secondary text-sm">Nghe từ vựng và chọn nghĩa (Dễ)</div>
                </div>
              </div>
            </div>
          </div>

          <button id="btn-start-listening" class="btn btn-primary w-full mt-xl btn-lg">
            <i class="fa-solid fa-play"></i> Bắt đầu bài nghe
          </button>
        </div>
      </div>
    `;

    const typeCards = this.container.querySelectorAll('.quiz-type-card');
    typeCards.forEach(card => {
      card.addEventListener('click', () => {
        typeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.mode = card.dataset.mode;
      });
    });

    document.getElementById('btn-start-listening').addEventListener('click', () => {
      this.generateExercises();
    });
  },

  generateExercises() {
    if (this.mode === 'dictation') {
      const shuffled = [...ZenData.sentences].sort(() => Math.random() - 0.5);
      this.exercises = shuffled.slice(0, 5);
    } else {
      const allWords = ZenData.getAllWords();
      const shuffled = [...allWords].sort(() => Math.random() - 0.5);
      const targetWords = shuffled.slice(0, 10);
      
      this.exercises = targetWords.map(w => {
        let wrongPool = [...allWords].filter(x => x.word !== w.word);
        wrongPool.sort(() => Math.random() - 0.5);
        const options = [w, ...wrongPool.slice(0, 3)].sort(() => Math.random() - 0.5);
        return { target: w, options: options };
      });
    }
    
    this.currentIndex = 0;
    this.score = 0;
    this.startTime = Date.now();
    this.audioRate = 1.0;
    
    this.renderExercise();
  },

  renderExercise() {
    const current = this.exercises[this.currentIndex];
    const total = this.exercises.length;
    
    let exerciseHtml = '';
    
    if (this.mode === 'dictation') {
      exerciseHtml = `
        <div class="text-center mb-lg">
          <div class="sound-wave-container mb-md" id="audio-wave">
            <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
          </div>
          
          <button id="btn-play-dictation" class="btn-icon btn-lg" style="width: 80px; height: 80px; font-size: 2rem; border: 2px solid var(--accent); color: var(--accent); background: rgba(139, 92, 246, 0.1);">
            <i class="fa-solid fa-play"></i>
          </button>
          
          <div class="speed-controls mt-md flex justify-center gap-sm">
            <button class="btn btn-sm ${this.audioRate === 0.5 ? 'btn-primary' : 'btn-secondary'} btn-speed" data-speed="0.5">0.5x</button>
            <button class="btn btn-sm ${this.audioRate === 0.75 ? 'btn-primary' : 'btn-secondary'} btn-speed" data-speed="0.75">0.75x</button>
            <button class="btn btn-sm ${this.audioRate === 1.0 ? 'btn-primary' : 'btn-secondary'} btn-speed" data-speed="1.0">1.0x</button>
          </div>
        </div>
        
        <input type="text" id="dictation-input" class="form-input" style="font-size: 1.2rem; padding: 15px;" placeholder="Gõ lại câu bạn nghe được..." autocomplete="off">
        <div id="exercise-feedback" class="mt-sm font-bold text-center" style="min-height: 24px;"></div>
        
        <div class="flex justify-between mt-md">
          <button id="btn-hint" class="btn btn-secondary btn-sm"><i class="fa-solid fa-lightbulb"></i> Gợi ý (Xem nghĩa)</button>
          <button id="btn-check" class="btn btn-primary">Kiểm tra <i class="fa-solid fa-check"></i></button>
          <button id="btn-next" class="btn btn-success" style="display:none;">Tiếp theo <i class="fa-solid fa-arrow-right"></i></button>
        </div>
        
        <div id="hint-text" class="text-secondary text-sm mt-md text-center" style="display: none;">
           Nghĩa: ${current.vi}
        </div>
      `;
    } else {
      // Choice mode
      exerciseHtml = `
        <div class="text-center mb-xl">
          <button id="btn-play-choice" class="btn-icon btn-lg mb-md" style="width: 80px; height: 80px; font-size: 2rem; border: 2px solid var(--accent); color: var(--accent); background: rgba(139, 92, 246, 0.1);">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <div class="text-secondary">Nghe và chọn nghĩa tương ứng</div>
        </div>
        
        <div class="grid grid-2 gap-md" id="choice-options">
          ${current.options.map((opt, i) => `
            <button class="btn btn-secondary quiz-option-btn" style="padding: 15px; height: auto;" data-index="${i}">
              <div style="font-weight: bold; font-size: 1.1rem;">${opt.meaning}</div>
              <div class="text-sm opacity-70 mt-xs">(${opt.pos})</div>
            </button>
          `).join('')}
        </div>
        <div id="exercise-feedback" class="mt-lg font-bold text-center" style="min-height: 24px;"></div>
      `;
    }

    this.container.innerHTML = `
      <div class="listening-container mx-auto" style="max-width: 700px; padding-top: 20px;">
        <div class="flex justify-between align-center mb-lg">
          <button class="btn btn-secondary btn-sm" onclick="ListeningModule.showSetup()">
            <i class="fa-solid fa-arrow-left"></i> Thoát
          </button>
          <div class="font-bold">Bài ${this.currentIndex + 1}/${total}</div>
          <div class="font-bold text-accent"><i class="fa-solid fa-star"></i> ${this.score * (this.mode === 'dictation' ? 20 : 10)} XP</div>
        </div>
        
        <div class="progress-bar-container mb-xl">
          <div class="progress-bar-fill" style="width: ${(this.currentIndex / total) * 100}%"></div>
        </div>

        <div class="glass-card p-xl animate-fade-in">
          ${exerciseHtml}
        </div>
      </div>
    `;

    // Bind events
    if (this.mode === 'dictation') {
      const textToPlay = current.en;
      
      const playBtn = document.getElementById('btn-play-dictation');
      playBtn.addEventListener('click', () => {
        this.playAudio(textToPlay);
      });
      
      const speedBtns = document.querySelectorAll('.btn-speed');
      speedBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          speedBtns.forEach(b => b.classList.replace('btn-primary', 'btn-secondary'));
          e.target.classList.replace('btn-secondary', 'btn-primary');
          this.audioRate = parseFloat(e.target.dataset.speed);
          this.playAudio(textToPlay);
        });
      });
      
      document.getElementById('btn-check').addEventListener('click', () => this.checkDictation(current.en));
      document.getElementById('dictation-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.checkDictation(current.en);
      });
      
      document.getElementById('btn-hint').addEventListener('click', () => {
        document.getElementById('hint-text').style.display = 'block';
      });
      
      // Auto focus and auto play
      setTimeout(() => {
        document.getElementById('dictation-input').focus();
        this.playAudio(textToPlay);
      }, 300);
      
    } else {
      const textToPlay = current.target.word;
      
      const playBtn = document.getElementById('btn-play-choice');
      playBtn.addEventListener('click', () => {
        this.playAudio(textToPlay);
      });
      
      const optionBtns = document.querySelectorAll('.quiz-option-btn');
      optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (btn.disabled) return;
          this.checkChoice(parseInt(btn.closest('.quiz-option-btn').dataset.index));
        });
      });
      
      // Auto play
      setTimeout(() => this.playAudio(textToPlay), 300);
    }
  },
  
  playAudio(text) {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = ZenStorage.getSettings()?.voiceAccent || 'en-US';
    msg.rate = this.audioRate;
    
    const wave = document.getElementById('audio-wave');
    const playIcon = document.querySelector('#btn-play-dictation i, #btn-play-choice i');
    
    msg.onstart = () => {
      if (wave) wave.classList.add('active');
      if (playIcon) playIcon.className = 'fa-solid fa-volume-high';
    };
    
    msg.onend = () => {
      if (wave) wave.classList.remove('active');
      if (playIcon) playIcon.className = 'fa-solid fa-play';
    };
    
    window.speechSynthesis.speak(msg);
  },

  checkDictation(targetText) {
    const input = document.getElementById('dictation-input').value;
    if (!input) return;
    
    // Normalize string: lowercase, remove punctuation
    const normalize = (str) => str.toLowerCase().replace(/[.,!?]/g, '').trim();
    
    const normalizedInput = normalize(input);
    const normalizedTarget = normalize(targetText);
    
    const feedback = document.getElementById('exercise-feedback');
    const btnCheck = document.getElementById('btn-check');
    const btnNext = document.getElementById('btn-next');
    
    if (normalizedInput === normalizedTarget) {
      this.score++;
      Gamification.playDingSound();
      feedback.innerHTML = '<span class="text-success"><i class="fa-solid fa-check-circle"></i> Chính xác! +20 XP</span>';
      
      document.getElementById('dictation-input').disabled = true;
      document.getElementById('dictation-input').style.borderColor = 'var(--success)';
      
      btnCheck.style.display = 'none';
      btnNext.style.display = 'block';
      
      // Auto advance
      setTimeout(() => btnNext.click(), 2000);
    } else {
      feedback.innerHTML = `
        <span class="text-error"><i class="fa-solid fa-xmark-circle"></i> Sai rồi!</span><br>
        <span class="text-secondary text-sm font-normal">Đáp án: ${targetText}</span>
      `;
      if (navigator.vibrate) navigator.vibrate(200);
      
      document.getElementById('dictation-input').disabled = true;
      document.getElementById('dictation-input').style.borderColor = 'var(--error)';
      
      btnCheck.style.display = 'none';
      btnNext.style.display = 'block';
    }
    
    btnNext.onclick = () => {
      this.currentIndex++;
      if (this.currentIndex < this.exercises.length) {
        this.renderExercise();
      } else {
        this.showResult();
      }
    };
  },
  
  checkChoice(selectedIndex) {
    const current = this.exercises[this.currentIndex];
    const targetWord = current.target;
    const selectedOption = current.options[selectedIndex];
    
    const isCorrect = selectedOption.word === targetWord.word;
    const feedback = document.getElementById('exercise-feedback');
    
    const allBtns = document.querySelectorAll('.quiz-option-btn');
    allBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (current.options[idx].word === targetWord.word) {
        btn.classList.add('correct'); // defined in style.css
        btn.style.borderColor = 'var(--success)';
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add('incorrect');
        btn.style.borderColor = 'var(--error)';
      }
    });
    
    if (isCorrect) {
      this.score++;
      Gamification.playDingSound();
      feedback.innerHTML = '<span class="text-success"><i class="fa-solid fa-check-circle"></i> Chính xác! +10 XP</span>';
    } else {
      feedback.innerHTML = `<span class="text-error"><i class="fa-solid fa-xmark-circle"></i> Sai rồi! Từ đúng là: ${targetWord.word}</span>`;
      if (navigator.vibrate) navigator.vibrate(200);
    }
    
    setTimeout(() => {
      this.currentIndex++;
      if (this.currentIndex < this.exercises.length) {
        this.renderExercise();
      } else {
        this.showResult();
      }
    }, 2000);
  },

  showResult() {
    const total = this.exercises.length;
    const accuracy = Math.round((this.score / total) * 100);
    const xpMultiplier = this.mode === 'dictation' ? 20 : 10;
    const xpEarned = this.score * xpMultiplier + (accuracy === 100 ? 50 : 0);
    const timeTaken = Math.round((Date.now() - this.startTime) / 1000); 
    
    ZenStorage.addHistory({
      type: 'listening',
      score: this.score,
      total: total,
      accuracy: accuracy,
      duration: timeTaken,
      details: this.mode
    });
    
    Gamification.addXP(xpEarned, 'Hoàn thành bài Luyện Nghe');

    this.container.innerHTML = `
      <div class="result-container mx-auto text-center" style="max-width: 600px; padding-top: 40px;">
        <div class="glass-card p-xl animate-scale-in">
          <i class="fa-solid fa-headphones" style="font-size: 4rem; color: var(--accent); margin-bottom: 20px;"></i>
          <h2 class="mb-sm">Kết Quả Luyện Nghe</h2>
          
          <div class="result-stats grid grid-3 gap-md mb-xl mt-lg">
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Điểm số</div>
              <div class="font-bold text-xl">${this.score}/${total}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Độ chính xác</div>
              <div class="font-bold text-xl ${accuracy >= 80 ? 'text-success' : ''}">${accuracy}%</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; border: 1px solid var(--accent);">
              <div class="text-accent text-sm">XP Nhận được</div>
              <div class="font-bold text-xl text-accent">+${xpEarned}</div>
            </div>
          </div>
          
          <div class="flex gap-md justify-center">
            <button class="btn btn-secondary" onclick="ListeningModule.showSetup()">Trở về</button>
            <button class="btn btn-primary" onclick="ListeningModule.generateExercises()">Luyện tiếp</button>
          </div>
        </div>
      </div>
    `;
  }
};
