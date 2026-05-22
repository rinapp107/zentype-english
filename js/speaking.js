/* ============================================
   ZenType English — Speaking Module
   ============================================ */

window.SpeakingModule = {
  exercises: [],
  currentIndex: 0,
  score: 0,
  mode: 'word', // 'word', 'sentence'
  recognition: null,
  isRecording: false,
  
  render(container) {
    this.container = container;
    this.checkBrowserSupport();
  },
  
  checkBrowserSupport() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.container.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-microphone-slash text-error" style="font-size: 3rem;"></i>
          <h3 class="mt-md">Trình duyệt không hỗ trợ</h3>
          <p class="text-secondary">Tính năng luyện nói yêu cầu trình duyệt Chrome, Edge, hoặc Safari hỗ trợ Web Speech API.</p>
        </div>
      `;
      return;
    }
    
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
    
    this.showSetup();
  },

  showSetup() {
    this.container.innerHTML = `
      <div class="setup-container mx-auto" style="max-width: 600px; padding-top: 40px;">
        <div class="text-center mb-xl animate-slide-down">
          <i class="fa-solid fa-microphone text-warning mb-md" style="font-size: 3rem;"></i>
          <h2>Luyện Nói</h2>
          <p class="text-secondary">Cải thiện phát âm với công nghệ nhận dạng giọng nói.</p>
        </div>

        <div class="glass-card p-xl animate-scale-in">
          <div class="form-group mb-lg">
            <label class="form-label">Chọn bài luyện tập</label>
            <div class="quiz-type-cards grid" style="grid-template-columns: 1fr; gap: 10px;">
              <div class="quiz-type-card active flex align-center gap-md" data-mode="word" style="text-align: left;">
                <i class="fa-solid fa-font text-primary" style="font-size: 2rem;"></i>
                <div>
                  <div class="mt-sm"><strong>Phát âm từ vựng</strong></div>
                  <div class="text-secondary text-sm">Đọc từng từ đơn lẻ (10 từ)</div>
                </div>
              </div>
              <div class="quiz-type-card flex align-center gap-md" data-mode="sentence" style="text-align: left;">
                <i class="fa-solid fa-align-left text-success" style="font-size: 2rem;"></i>
                <div>
                  <div class="mt-sm"><strong>Đọc cả câu</strong></div>
                  <div class="text-secondary text-sm">Đọc trôi chảy câu dài (5 câu)</div>
                </div>
              </div>
            </div>
          </div>

          <button id="btn-start-speaking" class="btn btn-primary w-full mt-xl btn-lg">
            <i class="fa-solid fa-microphone"></i> Bắt đầu thu âm
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

    document.getElementById('btn-start-speaking').addEventListener('click', () => {
      this.generateExercises();
    });
  },

  generateExercises() {
    if (this.mode === 'word') {
      const allWords = window.getActiveZenData().getAllWords();
      const shuffled = [...allWords].sort(() => Math.random() - 0.5);
      this.exercises = shuffled.slice(0, 10).map(w => ({
        target: w.word,
        phonetic: w.phonetic,
        translation: w.meaning
      }));
    } else {
      const shuffled = [...window.getActiveZenData().sentences].sort(() => Math.random() - 0.5);
      this.exercises = shuffled.slice(0, 5).map(s => ({
        target: s.en,
        phonetic: null,
        translation: s.vi
      }));
    }
    
    this.currentIndex = 0;
    this.score = 0;
    this.startTime = Date.now();
    
    this.renderExercise();
  },

  renderExercise() {
    const current = this.exercises[this.currentIndex];
    const total = this.exercises.length;
    
    this.container.innerHTML = `
      <div class="speaking-container mx-auto" style="max-width: 700px; padding-top: 20px;">
        <div class="flex justify-between align-center mb-lg">
          <button class="btn btn-secondary btn-sm" onclick="SpeakingModule.showSetup()">
            <i class="fa-solid fa-arrow-left"></i> Thoát
          </button>
          <div class="font-bold">Bài ${this.currentIndex + 1}/${total}</div>
          <div class="font-bold text-accent"><i class="fa-solid fa-star"></i> ${this.score * (this.mode === 'sentence' ? 20 : 10)} XP</div>
        </div>
        
        <div class="progress-bar-container mb-xl">
          <div class="progress-bar-fill" style="width: ${(this.currentIndex / total) * 100}%"></div>
        </div>

        <div class="glass-card p-xl animate-fade-in text-center">
          <button class="btn-icon text-secondary" style="position: absolute; top: 15px; right: 15px;" onclick="SpeakingModule.playSample('${current.target.replace(/'/g, "\\'")}')">
            <i class="fa-solid fa-volume-high"></i> Mẫu
          </button>
          
          <div class="text-secondary mb-sm text-sm text-uppercase">Hãy đọc to:</div>
          <h2 style="font-size: ${this.mode === 'sentence' ? '1.8rem' : '3rem'}; margin-bottom: 10px; line-height: 1.4;">${current.target}</h2>
          ${current.phonetic ? `<div class="text-secondary mb-md" style="font-family: monospace; font-size: 1.2rem;">${current.phonetic}</div>` : ''}
          <div class="text-secondary mb-xl">Nghĩa: ${current.translation}</div>
          
          <!-- Mic Button -->
          <div class="mic-container mb-lg">
            <button id="btn-mic" class="mic-button">
              <i class="fa-solid fa-microphone"></i>
            </button>
            <div class="recording-indicator text-error mt-sm" id="rec-indicator" style="opacity: 0; font-weight: bold; animation: pulse 1.5s infinite;">
              Đang nghe...
            </div>
          </div>
          
          <div class="result-box p-md" style="min-height: 80px; background: rgba(0,0,0,0.2); border-radius: 8px;">
            <div id="transcript-display" class="text-secondary" style="font-style: italic;">Nhấn nút micro và bắt đầu nói...</div>
            <div id="match-score" class="mt-sm font-bold text-xl"></div>
          </div>
          
          <div class="mt-lg text-right">
            <button id="btn-next" class="btn btn-primary" style="display:none;">Tiếp theo <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    `;

    const micBtn = document.getElementById('btn-mic');
    micBtn.addEventListener('click', () => this.toggleRecording());
    
    document.getElementById('btn-next').addEventListener('click', () => {
      this.currentIndex++;
      if (this.currentIndex < this.exercises.length) {
        this.renderExercise();
      } else {
        this.showResult();
      }
    });

    // Setup speech recognition handlers for this exercise
    this.recognition.onstart = () => {
      this.isRecording = true;
      micBtn.classList.add('recording');
      document.getElementById('rec-indicator').style.opacity = '1';
      document.getElementById('transcript-display').innerHTML = '<span class="text-secondary">Đang nghe...</span>';
      document.getElementById('match-score').innerHTML = '';
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const display = document.getElementById('transcript-display');
      if (finalTranscript !== '') {
        display.innerHTML = `<span style="color: white;">${finalTranscript}</span>`;
        this.evaluateSpeech(finalTranscript, current.target);
      } else {
        display.innerHTML = `<span style="color: var(--text-secondary);">${interimTranscript}</span>`;
      }
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      micBtn.classList.remove('recording');
      document.getElementById('rec-indicator').style.opacity = '0';
    };
    
    this.recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      this.isRecording = false;
      micBtn.classList.remove('recording');
      document.getElementById('rec-indicator').style.opacity = '0';
      document.getElementById('transcript-display').innerHTML = `<span class="text-error">Lỗi micro: ${event.error}. Vui lòng thử lại.</span>`;
    };
  },
  
  toggleRecording() {
    if (this.isRecording) {
      this.recognition.stop();
    } else {
      try {
        const settings = ZenStorage.getSettings();
        this.recognition.lang = settings?.voiceAccent || 'en-US';
        this.recognition.start();
      } catch(e) {
        // Handle case where it's already started
      }
    }
  },

  playSample(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = ZenStorage.getSettings()?.voiceAccent || 'en-US';
      window.speechSynthesis.speak(msg);
    }
  },

  evaluateSpeech(spoken, target) {
    // Normalize both strings
    const normSpoken = spoken.toLowerCase().replace(/[.,!?'"]/g, '').trim();
    const normTarget = target.toLowerCase().replace(/[.,!?'"]/g, '').trim();
    
    // Calculate a simple match score (in a real app, use Levenshtein or phonetic matching)
    let matchPercentage = 0;
    
    if (normSpoken === normTarget) {
      matchPercentage = 100;
    } else {
      // Very basic similarity check
      const spokenWords = normSpoken.split(' ');
      const targetWords = normTarget.split(' ');
      let matches = 0;
      
      targetWords.forEach(tw => {
        if (spokenWords.includes(tw)) matches++;
      });
      
      matchPercentage = Math.round((matches / targetWords.length) * 100);
      
      // Bonus if one string contains the other
      if (normTarget.includes(normSpoken) || normSpoken.includes(normTarget)) {
        matchPercentage = Math.max(matchPercentage, 70);
      }
    }
    
    const scoreDisplay = document.getElementById('match-score');
    const nextBtn = document.getElementById('btn-next');
    
    if (matchPercentage >= 80) {
      this.score++;
      Gamification.playDingSound();
      scoreDisplay.innerHTML = `<span class="text-success"><i class="fa-solid fa-check-circle"></i> Tuyệt vời! Độ chính xác: ${matchPercentage}%</span>`;
      nextBtn.style.display = 'inline-block';
    } else if (matchPercentage >= 50) {
      scoreDisplay.innerHTML = `<span class="text-warning"><i class="fa-solid fa-triangle-exclamation"></i> Khá tốt. Độ chính xác: ${matchPercentage}%. Hãy thử lại.</span>`;
      nextBtn.style.display = 'inline-block'; // Allow them to move on if they want
    } else {
      scoreDisplay.innerHTML = `<span class="text-error"><i class="fa-solid fa-xmark-circle"></i> Chưa chính xác. Hệ thống nghe được: "${spoken}". Hãy thử lại.</span>`;
      if (navigator.vibrate) navigator.vibrate(200);
    }
  },

  showResult() {
    const total = this.exercises.length;
    const accuracy = Math.round((this.score / total) * 100) || 0;
    const xpMultiplier = this.mode === 'sentence' ? 20 : 10;
    const xpEarned = this.score * xpMultiplier + (accuracy === 100 ? 50 : 0);
    const timeTaken = Math.round((Date.now() - this.startTime) / 1000); 
    
    ZenStorage.addHistory({
      type: 'speaking',
      score: this.score,
      total: total,
      accuracy: accuracy,
      duration: timeTaken,
      details: this.mode
    });
    
    Gamification.addXP(xpEarned, 'Hoàn thành Luyện Nói');

    this.container.innerHTML = `
      <div class="result-container mx-auto text-center" style="max-width: 600px; padding-top: 40px;">
        <div class="glass-card p-xl animate-scale-in">
          <i class="fa-solid fa-microphone-lines" style="font-size: 4rem; color: var(--warning); margin-bottom: 20px;"></i>
          <h2 class="mb-sm">Hoàn Thành!</h2>
          <p class="text-secondary mb-lg">Kỹ năng phát âm của bạn đang tốt lên từng ngày.</p>
          
          <div class="result-stats grid grid-3 gap-md mb-xl">
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Điểm số</div>
              <div class="font-bold text-xl">${this.score}/${total}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Phát âm đúng</div>
              <div class="font-bold text-xl ${accuracy >= 80 ? 'text-success' : ''}">${accuracy}%</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; border: 1px solid var(--warning);">
              <div class="text-warning text-sm">XP Nhận được</div>
              <div class="font-bold text-xl text-warning">+${xpEarned}</div>
            </div>
          </div>
          
          <div class="flex gap-md justify-center">
            <button class="btn btn-secondary" onclick="SpeakingModule.showSetup()">Trở về</button>
            <button class="btn btn-primary" onclick="SpeakingModule.generateExercises()">Luyện tiếp</button>
          </div>
        </div>
      </div>
    `;
  }
};
