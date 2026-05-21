/* ============================================
   ZenType English — Quiz Module
   ============================================ */

window.QuizModule = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  isAnswered: false,
  quizType: 'en-vi', // 'en-vi', 'vi-en', 'listen'
  currentTopicId: null,

  render(container) {
    this.container = container;
    this.showSetup();
  },

  showSetup() {
    const topics = ZenData.topics;
    
    this.container.innerHTML = `
      <div class="setup-container mx-auto" style="max-width: 600px; padding-top: 40px;">
        <div class="text-center mb-xl animate-slide-down">
          <i class="fa-solid fa-brain text-primary mb-md" style="font-size: 3rem;"></i>
          <h2>Kiểm Tra Kiến Thức</h2>
          <p class="text-secondary">Làm bài tập trắc nghiệm để kiếm XP và củng cố từ vựng.</p>
        </div>

        <div class="glass-card p-xl animate-scale-in">
          <div class="form-group">
            <label class="form-label">Chọn chủ đề</label>
            <select id="quiz-topic" class="form-select">
              <option value="all">Tất cả từ vựng đang học</option>
              ${topics.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
            </select>
          </div>

          <div class="form-group mt-lg">
            <label class="form-label">Loại bài tập</label>
            <div class="quiz-type-cards grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="quiz-type-card active" data-type="en-vi">
                <i class="fa-solid fa-language text-primary"></i>
                <div class="mt-sm"><strong>Anh → Việt</strong></div>
                <div class="text-secondary text-sm">Chọn nghĩa tiếng Việt</div>
              </div>
              <div class="quiz-type-card" data-type="vi-en">
                <i class="fa-solid fa-language text-success"></i>
                <div class="mt-sm"><strong>Việt → Anh</strong></div>
                <div class="text-secondary text-sm">Chọn từ tiếng Anh</div>
              </div>
              <div class="quiz-type-card" data-type="listen">
                <i class="fa-solid fa-headphones text-warning"></i>
                <div class="mt-sm"><strong>Nghe hiểu</strong></div>
                <div class="text-secondary text-sm">Nghe và chọn từ</div>
              </div>
            </div>
          </div>

          <button id="btn-start-quiz" class="btn btn-primary w-full mt-xl btn-lg">
            <i class="fa-solid fa-play"></i> Bắt đầu làm bài
          </button>
        </div>
      </div>
    `;

    // Bind type selection
    const typeCards = this.container.querySelectorAll('.quiz-type-card');
    typeCards.forEach(card => {
      card.addEventListener('click', () => {
        typeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.quizType = card.dataset.type;
      });
    });

    // Start button
    document.getElementById('btn-start-quiz').addEventListener('click', () => {
      this.currentTopicId = document.getElementById('quiz-topic').value;
      if (this.currentTopicId === 'all') this.currentTopicId = null;
      this.generateQuiz();
    });
  },

  generateQuiz() {
    let sourceWords = [];
    if (this.currentTopicId) {
      sourceWords = ZenStorage.getVocabulary().filter(w => w.topicId === this.currentTopicId);
      // Fallback to defaults if user has no words in this topic yet
      if (sourceWords.length < 4) {
        sourceWords = ZenData.getWordsByTopic(this.currentTopicId);
      }
    } else {
      sourceWords = ZenStorage.getVocabulary();
      if (sourceWords.length < 4) {
        sourceWords = ZenData.getAllWords();
      }
    }

    if (sourceWords.length < 4) {
      alert("Cần ít nhất 4 từ vựng để tạo bài trắc nghiệm. Vui lòng thêm từ mới hoặc chọn chủ đề khác.");
      return;
    }

    // Pick 10 random words
    const shuffled = [...sourceWords].sort(() => Math.random() - 0.5);
    const quizWords = shuffled.slice(0, Math.min(10, shuffled.length));
    
    this.questions = quizWords.map(targetWord => {
      // Get 3 wrong options
      let wrongPool = [...sourceWords].filter(w => w.word !== targetWord.word);
      wrongPool.sort(() => Math.random() - 0.5);
      const wrongOptions = wrongPool.slice(0, 3);
      
      const options = [targetWord, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      return {
        word: targetWord,
        options: options
      };
    });

    this.currentQuestionIndex = 0;
    this.score = 0;
    
    // Add start time
    this.startTime = Date.now();
    
    this.renderQuestion();
  },

  renderQuestion() {
    this.isAnswered = false;
    const q = this.questions[this.currentQuestionIndex];
    const total = this.questions.length;
    
    let questionContent = '';
    
    if (this.quizType === 'en-vi') {
      questionContent = `
        <h2 class="quiz-target-word">${q.word.word}</h2>
        ${q.word.phonetic ? `<div class="quiz-phonetic">${q.word.phonetic}</div>` : ''}
      `;
    } else if (this.quizType === 'vi-en') {
      questionContent = `
        <div class="text-secondary mb-sm">Chọn từ tiếng Anh cho:</div>
        <h2 class="quiz-target-word">${q.word.meaning}</h2>
      `;
    } else if (this.quizType === 'listen') {
      questionContent = `
        <button id="btn-play-audio" class="btn-icon btn-lg" style="width: 80px; height: 80px; font-size: 2rem; border: 2px solid var(--primary); color: var(--primary);">
          <i class="fa-solid fa-volume-high"></i>
        </button>
        <div class="mt-md text-secondary">Nghe và chọn nghĩa đúng</div>
      `;
      
      // Auto play
      setTimeout(() => this.playAudio(q.word.word), 300);
    }

    this.container.innerHTML = `
      <div class="quiz-container mx-auto" style="max-width: 700px; padding-top: 20px;">
        <!-- Header: Progress & Score -->
        <div class="flex justify-between align-center mb-lg">
          <button class="btn btn-secondary btn-sm" onclick="QuizModule.showSetup()">
            <i class="fa-solid fa-arrow-left"></i> Thoát
          </button>
          <div class="font-bold">Câu ${this.currentQuestionIndex + 1}/${total}</div>
          <div class="font-bold text-accent"><i class="fa-solid fa-star"></i> ${this.score * 10} XP</div>
        </div>
        
        <!-- Progress Bar -->
        <div class="progress-bar-container mb-xl">
          <div class="progress-bar-fill" style="width: ${(this.currentQuestionIndex / total) * 100}%"></div>
        </div>

        <!-- Question Area -->
        <div class="glass-card text-center p-xl mb-xl animate-fade-in" style="min-height: 200px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          ${questionContent}
        </div>

        <!-- Options Area -->
        <div class="quiz-options grid grid-2 gap-md">
          ${q.options.map((opt, i) => `
            <button class="btn quiz-option-btn animate-slide-up" data-index="${i}" style="animation-delay: ${i * 0.1}s">
              ${this.quizType === 'vi-en' ? opt.word : opt.meaning}
            </button>
          `).join('')}
        </div>
        
        <div id="quiz-feedback" class="quiz-feedback text-center mt-lg" style="min-height: 40px; font-weight: bold; font-size: 1.2rem;"></div>
      </div>
    `;

    // Bind Option clicks
    const optionBtns = this.container.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleAnswer(parseInt(btn.dataset.index), e.target));
    });

    if (this.quizType === 'listen') {
      document.getElementById('btn-play-audio').addEventListener('click', () => {
        this.playAudio(q.word.word);
      });
    }
  },

  playAudio(text) {
    const settings = ZenStorage.getSettings();
    if (settings && settings.ttsEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = settings.voiceAccent || 'en-US';
      window.speechSynthesis.speak(msg);
    }
  },

  handleAnswer(selectedIndex, btnElement) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const q = this.questions[this.currentQuestionIndex];
    const selectedOption = q.options[selectedIndex];
    const isCorrect = selectedOption.word === q.word.word;
    const feedback = document.getElementById('quiz-feedback');

    // Show correct answer visually
    const allBtns = this.container.querySelectorAll('.quiz-option-btn');
    allBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (q.options[idx].word === q.word.word) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      this.score++;
      Gamification.playDingSound();
      feedback.innerHTML = '<span class="text-success"><i class="fa-solid fa-check-circle"></i> Chính xác! +10 XP</span>';
    } else {
      feedback.innerHTML = `<span class="text-error"><i class="fa-solid fa-xmark-circle"></i> Sai rồi! Đáp án đúng: ${this.quizType === 'vi-en' ? q.word.word : q.word.meaning}</span>`;
      // Vibrate if supported
      if (navigator.vibrate) navigator.vibrate(200);
    }

    setTimeout(() => {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        this.renderQuestion();
      } else {
        this.showResult();
      }
    }, 1500);
  },

  showResult() {
    const total = this.questions.length;
    const accuracy = Math.round((this.score / total) * 100);
    const xpEarned = this.score * 10 + (accuracy === 100 ? 50 : 0); // Bonus for perfect score
    
    const timeTaken = Math.round((Date.now() - this.startTime) / 1000); // seconds
    
    // Save to history
    ZenStorage.addHistory({
      type: 'quiz',
      score: this.score,
      total: total,
      accuracy: accuracy,
      duration: timeTaken,
      details: this.quizType
    });
    
    // Add XP
    Gamification.addXP(xpEarned, 'Hoàn thành Quiz');
    
    // Check speed badge
    if (timeTaken <= 30 && accuracy >= 80) {
      const progress = ZenStorage.getProgress();
      if (progress && !progress.badges.includes('speed_light')) {
        Gamification.checkBadges(); // Will trigger speed badge if implemented correctly in gamification
      }
    }

    let message, icon, color;
    if (accuracy === 100) {
      message = "Hoàn hảo! Bách phát bách trúng!";
      icon = "fa-trophy";
      color = "var(--warning)";
      Gamification.playLevelUpSound();
    } else if (accuracy >= 80) {
      message = "Rất tốt! Bạn làm rất tuyệt.";
      icon = "fa-star";
      color = "var(--success)";
    } else if (accuracy >= 50) {
      message = "Cố lên! Bạn có thể làm tốt hơn.";
      icon = "fa-thumbs-up";
      color = "var(--primary)";
    } else {
      message = "Cần ôn tập thêm. Đừng nản chí!";
      icon = "fa-book";
      color = "var(--text-secondary)";
    }

    this.container.innerHTML = `
      <div class="result-container mx-auto text-center" style="max-width: 500px; padding-top: 40px;">
        <div class="glass-card p-xl animate-scale-in">
          <i class="fa-solid ${icon}" style="font-size: 4rem; color: ${color}; margin-bottom: 20px;"></i>
          <h2 class="mb-sm">Kết Quả</h2>
          <p class="text-secondary mb-lg">${message}</p>
          
          <div class="result-stats grid grid-2 gap-md mb-xl">
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Điểm số</div>
              <div class="font-bold text-xl">${this.score}/${total}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Độ chính xác</div>
              <div class="font-bold text-xl ${accuracy >= 80 ? 'text-success' : ''}">${accuracy}%</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Thời gian</div>
              <div class="font-bold text-xl">${timeTaken}s</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; border: 1px solid var(--accent);">
              <div class="text-accent text-sm">XP Nhận được</div>
              <div class="font-bold text-xl text-accent">+${xpEarned}</div>
            </div>
          </div>
          
          <div class="flex gap-md justify-center">
            <button class="btn btn-secondary" onclick="QuizModule.showSetup()">Trở về</button>
            <button class="btn btn-primary" onclick="QuizModule.generateQuiz()">Làm lại</button>
          </div>
        </div>
      </div>
    `;
  }
};
