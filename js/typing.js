/* ============================================
   ZenType English — Typing Module
   ============================================ */

window.TypingModule = {
  exercises: [],
  currentIndex: 0,
  score: 0,
  mode: 'sentence', // 'sentence', 'jumble', 'fill'
  
  render(container) {
    this.container = container;
    this.showSetup();
  },

  showSetup() {
    this.container.innerHTML = `
      <div class="setup-container mx-auto" style="max-width: 600px; padding-top: 40px;">
        <div class="text-center mb-xl animate-slide-down">
          <i class="fa-solid fa-keyboard text-accent mb-md" style="font-size: 3rem;"></i>
          <h2>Luyện Viết & Gõ Phím</h2>
          <p class="text-secondary">Cải thiện tốc độ gõ và kỹ năng đặt câu tiếng Anh.</p>
        </div>

        <div class="glass-card p-xl animate-scale-in">
          <div class="form-group mb-lg">
            <label class="form-label">Chọn chế độ tập luyện</label>
            <div class="quiz-type-cards grid" style="grid-template-columns: 1fr; gap: 10px;">
              <div class="quiz-type-card active flex align-center gap-md" data-mode="sentence" style="text-align: left;">
                <i class="fa-solid fa-pen-nib text-primary" style="font-size: 2rem;"></i>
                <div>
                  <div class="mt-sm"><strong>Gõ lại câu hoàn chỉnh</strong></div>
                  <div class="text-secondary text-sm">Luyện tốc độ và độ chính xác (10 câu)</div>
                </div>
              </div>
              <div class="quiz-type-card flex align-center gap-md" data-mode="jumble" style="text-align: left;">
                <i class="fa-solid fa-random text-warning" style="font-size: 2rem;"></i>
                <div>
                  <div class="mt-sm"><strong>Sắp xếp từ thành câu</strong></div>
                  <div class="text-secondary text-sm">Luyện ngữ pháp cấu trúc câu (10 câu)</div>
                </div>
              </div>
            </div>
          </div>

          <button id="btn-start-typing" class="btn btn-primary w-full mt-xl btn-lg">
            <i class="fa-solid fa-play"></i> Bắt đầu luyện tập
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

    document.getElementById('btn-start-typing').addEventListener('click', () => {
      this.generateExercises();
    });
  },

  generateExercises() {
    const allSentences = window.getActiveZenData().sentences;
    
    // Pick 10 random sentences
    const shuffled = [...allSentences].sort(() => Math.random() - 0.5);
    this.exercises = shuffled.slice(0, 10);
    
    this.currentIndex = 0;
    this.score = 0;
    this.startTime = Date.now();
    
    this.renderExercise();
  },

  renderExercise() {
    const current = this.exercises[this.currentIndex];
    const total = this.exercises.length;
    
    let exerciseHtml = '';
    
    if (this.mode === 'sentence') {
      exerciseHtml = `
        <div class="typing-target-container p-lg mb-lg" style="background: rgba(0,0,0,0.2); border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 1.2rem; line-height: 1.6; user-select: none;">
           ${this.getHighlightHTML(current.en, '')}
        </div>
        <div class="text-secondary mb-sm text-sm"><i class="fa-solid fa-language"></i> ${current.vi}</div>
        <input type="text" id="typing-input" class="form-input" style="font-family: 'JetBrains Mono', monospace; font-size: 1.2rem; padding: 15px;" placeholder="Gõ lại câu trên..." autocomplete="off" spellcheck="false" autofocus>
      `;
    } else if (this.mode === 'jumble') {
      const words = current.en.replace(/[.,!?]/g, '').split(' ');
      const jumbledWords = [...words].sort(() => Math.random() - 0.5);
      
      exerciseHtml = `
        <div class="text-center mb-lg">
          <div class="text-secondary mb-sm text-sm"><i class="fa-solid fa-language"></i> Ý nghĩa: ${current.vi}</div>
        </div>
        
        <div class="jumble-dropzone p-lg mb-lg flex gap-sm flex-wrap align-center min-h-[60px]" id="jumble-answer" style="background: rgba(0,0,0,0.2); border-radius: 8px; border: 2px dashed var(--border-primary); min-height: 80px;">
          <!-- Dropped words go here -->
        </div>
        
        <div class="jumble-source flex gap-sm flex-wrap justify-center" id="jumble-source">
          ${jumbledWords.map((w, i) => `<button class="btn btn-secondary jumble-word-btn" data-word="${w}">${w}</button>`).join('')}
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="typing-container mx-auto" style="max-width: 800px; padding-top: 20px;">
        <div class="flex justify-between align-center mb-lg">
          <button class="btn btn-secondary btn-sm" onclick="TypingModule.showSetup()">
            <i class="fa-solid fa-arrow-left"></i> Thoát
          </button>
          <div class="font-bold">Bài ${this.currentIndex + 1}/${total}</div>
          <div class="font-bold text-accent"><i class="fa-solid fa-star"></i> ${this.score * 15} XP</div>
        </div>
        
        <div class="progress-bar-container mb-xl">
          <div class="progress-bar-fill" style="width: ${(this.currentIndex / total) * 100}%"></div>
        </div>

        <div class="glass-card p-xl animate-fade-in" style="position: relative;">
          ${exerciseHtml}
          
          <div id="exercise-feedback" class="text-center mt-md font-bold" style="min-height: 24px;"></div>
          
          <div class="flex justify-end mt-lg">
            <button id="btn-next" class="btn btn-primary" ${this.mode === 'sentence' ? 'disabled' : 'style="display:none;"'}>
              Tiếp theo <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind Events
    if (this.mode === 'sentence') {
      const input = document.getElementById('typing-input');
      const targetContainer = document.querySelector('.typing-target-container');
      
      // Auto focus doesn't always work after innerHTML
      setTimeout(() => input.focus(), 100);
      
      input.addEventListener('input', (e) => {
        const val = e.target.value;
        targetContainer.innerHTML = this.getHighlightHTML(current.en, val);
        
        if (val === current.en) {
          this.handleCorrect();
        }
      });
      
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value !== current.en) {
           document.getElementById('exercise-feedback').innerHTML = '<span class="text-error">Chưa chính xác! Chú ý dấu câu và viết hoa.</span>';
           // Vibrate
           if (navigator.vibrate) navigator.vibrate(200);
        }
      });
    } else if (this.mode === 'jumble') {
      const wordBtns = document.querySelectorAll('.jumble-word-btn');
      const source = document.getElementById('jumble-source');
      const answer = document.getElementById('jumble-answer');
      
      // Simple click to move logic (better than drag and drop for mobile)
      wordBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const el = e.target;
          if (el.parentNode.id === 'jumble-source') {
            answer.appendChild(el);
          } else {
            source.appendChild(el);
          }
          this.checkJumbleAnswer(current.en);
        });
      });
    }
  },

  getHighlightHTML(targetStr, inputStr) {
    let html = '';
    for (let i = 0; i < targetStr.length; i++) {
      if (i < inputStr.length) {
        if (inputStr[i] === targetStr[i]) {
          html += `<span class="text-success">${targetStr[i]}</span>`;
        } else {
          // Add visible indicator for space errors
          const char = targetStr[i] === ' ' ? '_' : targetStr[i];
          html += `<span class="text-error" style="background: rgba(239, 68, 68, 0.2);">${char}</span>`;
        }
      } else {
        html += `<span style="opacity: 0.5;">${targetStr[i]}</span>`;
      }
    }
    return html;
  },
  
  checkJumbleAnswer(targetSentence) {
    const answerDiv = document.getElementById('jumble-answer');
    const sourceDiv = document.getElementById('jumble-source');
    
    // Only check if all words are used
    if (sourceDiv.children.length > 0) return;
    
    // Get current order
    const words = Array.from(answerDiv.children).map(btn => btn.dataset.word);
    const currentStr = words.join(' ');
    
    // Create a target string without punctuation for comparison
    const targetNoPunc = targetSentence.replace(/[.,!?]/g, '');
    
    if (currentStr === targetNoPunc) {
      this.handleCorrect();
    } else {
      document.getElementById('exercise-feedback').innerHTML = '<span class="text-error">Thứ tự chưa chính xác! Hãy thử lại.</span>';
      if (navigator.vibrate) navigator.vibrate(200);
    }
  },

  handleCorrect() {
    this.score++;
    Gamification.playDingSound();
    
    const feedback = document.getElementById('exercise-feedback');
    feedback.innerHTML = '<span class="text-success"><i class="fa-solid fa-check-circle"></i> Tuyệt vời! +15 XP</span>';
    
    if (this.mode === 'sentence') {
      document.getElementById('typing-input').disabled = true;
    } else {
      const answerDiv = document.getElementById('jumble-answer');
      answerDiv.style.borderColor = 'var(--success)';
      Array.from(answerDiv.children).forEach(c => c.classList.replace('btn-secondary', 'btn-success'));
    }
    
    const nextBtn = document.getElementById('btn-next');
    nextBtn.style.display = 'block';
    nextBtn.disabled = false;
    
    // Auto advance after 1.5s
    setTimeout(() => {
      this.currentIndex++;
      if (this.currentIndex < this.exercises.length) {
        this.renderExercise();
      } else {
        this.showResult();
      }
    }, 1500);
  },

  showResult() {
    const total = this.exercises.length;
    const accuracy = Math.round((this.score / total) * 100);
    const xpEarned = this.score * 15 + (accuracy === 100 ? 50 : 0);
    const timeTaken = Math.round((Date.now() - this.startTime) / 1000); // seconds
    
    // Calculate WPM (Words per minute) for sentence mode
    let wpm = 0;
    if (this.mode === 'sentence') {
      const totalWords = this.exercises.reduce((acc, ex) => acc + ex.en.split(' ').length, 0);
      wpm = Math.round((totalWords / timeTaken) * 60);
    }
    
    ZenStorage.addHistory({
      type: 'typing',
      score: this.score,
      total: total,
      accuracy: accuracy,
      duration: timeTaken,
      details: this.mode
    });
    
    Gamification.addXP(xpEarned, 'Luyện tập Viết');
    
    let wpmHtml = '';
    if (this.mode === 'sentence') {
      wpmHtml = `
        <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
          <div class="text-secondary text-sm">Tốc độ gõ</div>
          <div class="font-bold text-xl text-primary">${wpm} WPM</div>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="result-container mx-auto text-center" style="max-width: 600px; padding-top: 40px;">
        <div class="glass-card p-xl animate-scale-in">
          <i class="fa-solid fa-keyboard" style="font-size: 4rem; color: var(--accent); margin-bottom: 20px;"></i>
          <h2 class="mb-sm">Hoàn Thành Bài Tập!</h2>
          
          <div class="result-stats grid grid-3 gap-md mb-xl mt-lg">
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Điểm số</div>
              <div class="font-bold text-xl">${this.score}/${total}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Thời gian</div>
              <div class="font-bold text-xl">${timeTaken}s</div>
            </div>
            ${wpmHtml}
            <div class="stat-box p-md" style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; border: 1px solid var(--accent); ${this.mode !== 'sentence' ? 'grid-column: 1 / -1' : ''}">
              <div class="text-accent text-sm">XP Nhận được</div>
              <div class="font-bold text-xl text-accent">+${xpEarned}</div>
            </div>
          </div>
          
          <div class="flex gap-md justify-center">
            <button class="btn btn-secondary" onclick="TypingModule.showSetup()">Trở về</button>
            <button class="btn btn-primary" onclick="TypingModule.generateExercises()">Làm lại</button>
          </div>
        </div>
      </div>
    `;
  }
};
