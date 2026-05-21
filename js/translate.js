/* ============================================
   ZenType English — Translate Module
   ============================================ */

window.TranslateModule = {
  exercises: [],
  currentIndex: 0,
  score: 0,
  mode: 'vi-en', // 'vi-en' (Dịch sang Tiếng Anh) or 'en-vi' (Dịch sang Tiếng Việt)
  
  render(container) {
    this.container = container;
    this.showSetup();
  },

  showSetup() {
    this.container.innerHTML = `
      <div class="setup-container mx-auto" style="max-width: 600px; padding-top: 40px;">
        <div class="text-center mb-xl animate-slide-down">
          <i class="fa-solid fa-language text-success mb-md" style="font-size: 3rem;"></i>
          <h2>Thử Thách Dịch Thuật</h2>
          <p class="text-secondary">Rèn luyện phản xạ ngôn ngữ và khả năng diễn đạt.</p>
        </div>

        <div class="glass-card p-xl animate-scale-in">
          <div class="form-group mb-lg">
            <label class="form-label">Chọn chế độ dịch</label>
            <div class="quiz-type-cards grid" style="grid-template-columns: 1fr 1fr; gap: 15px;">
              <div class="quiz-type-card active" data-mode="vi-en">
                <i class="fa-solid fa-arrow-right-long text-success" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
                <div class="mt-sm"><strong>Việt → Anh</strong></div>
                <div class="text-secondary text-sm">Khó hơn, rèn ngữ pháp</div>
              </div>
              <div class="quiz-type-card" data-mode="en-vi">
                <i class="fa-solid fa-arrow-left-long text-primary" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
                <div class="mt-sm"><strong>Anh → Việt</strong></div>
                <div class="text-secondary text-sm">Dễ hơn, rèn từ vựng</div>
              </div>
            </div>
          </div>

          <button id="btn-start-translate" class="btn btn-primary w-full mt-xl btn-lg">
            <i class="fa-solid fa-play"></i> Bắt đầu thử thách
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

    document.getElementById('btn-start-translate').addEventListener('click', () => {
      this.generateExercises();
    });
  },

  generateExercises() {
    // Combine phrases and sentences for translation
    const allContent = [...ZenData.phrases, ...ZenData.sentences];
    
    // Pick 5 random items
    const shuffled = [...allContent].sort(() => Math.random() - 0.5);
    this.exercises = shuffled.slice(0, 5);
    
    this.currentIndex = 0;
    this.score = 0;
    this.startTime = Date.now();
    
    this.renderExercise();
  },

  renderExercise() {
    const current = this.exercises[this.currentIndex];
    const total = this.exercises.length;
    
    const sourceText = this.mode === 'vi-en' ? current.vi : current.en;
    const placeholder = this.mode === 'vi-en' ? 'Nhập bản dịch Tiếng Anh...' : 'Nhập bản dịch Tiếng Việt...';
    
    this.container.innerHTML = `
      <div class="translate-container mx-auto" style="max-width: 700px; padding-top: 20px;">
        <div class="flex justify-between align-center mb-lg">
          <button class="btn btn-secondary btn-sm" onclick="TranslateModule.showSetup()">
            <i class="fa-solid fa-arrow-left"></i> Thoát
          </button>
          <div class="font-bold">Câu ${this.currentIndex + 1}/${total}</div>
          <div class="font-bold text-accent"><i class="fa-solid fa-star"></i> ${this.score * 20} XP</div>
        </div>
        
        <div class="progress-bar-container mb-xl">
          <div class="progress-bar-fill" style="width: ${(this.currentIndex / total) * 100}%"></div>
        </div>

        <div class="glass-card p-xl animate-fade-in text-center">
          <div class="text-secondary text-sm mb-sm text-uppercase tracking-wider">
            Dịch câu sau sang ${this.mode === 'vi-en' ? 'Tiếng Anh' : 'Tiếng Việt'}:
          </div>
          <h2 class="mb-lg" style="font-size: 1.8rem; line-height: 1.5;">"${sourceText}"</h2>
          
          <div class="form-group mt-xl text-left">
            <textarea id="translate-input" class="form-input" rows="3" placeholder="${placeholder}" style="font-size: 1.2rem; padding: 15px;"></textarea>
          </div>
          
          <div id="translate-feedback" class="mt-md font-bold text-left" style="min-height: 60px;"></div>
          
          <div class="flex justify-between mt-md">
            <button id="btn-hint" class="btn btn-secondary btn-sm tooltip" data-tooltip="Tốn 5 XP">
              <i class="fa-solid fa-lightbulb"></i> Gợi ý
            </button>
            <button id="btn-check" class="btn btn-primary">
              Kiểm tra <i class="fa-solid fa-check"></i>
            </button>
            <button id="btn-next" class="btn btn-success" style="display:none;">
              Tiếp theo <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Focus input
    setTimeout(() => {
      const input = document.getElementById('translate-input');
      if (input) input.focus();
    }, 100);

    // Bind events
    document.getElementById('btn-check').addEventListener('click', () => this.checkAnswer());
    
    document.getElementById('translate-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.checkAnswer();
      }
    });
    
    // Hint logic
    let hintsUsed = 0;
    document.getElementById('btn-hint').addEventListener('click', () => {
      const targetText = this.mode === 'vi-en' ? current.en : current.vi;
      const input = document.getElementById('translate-input');
      
      hintsUsed++;
      
      // Provide first few words as hint
      const words = targetText.split(' ');
      const hintText = words.slice(0, hintsUsed).join(' ');
      
      input.value = hintText + ' ';
      input.focus();
      
      // Deduct XP penalty in UI
      const feedback = document.getElementById('translate-feedback');
      feedback.innerHTML = `<span class="text-warning"><i class="fa-solid fa-exclamation-circle"></i> Đã dùng gợi ý (-5 XP thưởng)</span>`;
    });
  },

  checkAnswer() {
    const input = document.getElementById('translate-input').value.trim();
    if (!input) return;
    
    const current = this.exercises[this.currentIndex];
    const targetText = this.mode === 'vi-en' ? current.en : current.vi;
    
    // Simple fuzzy matching - remove punctuation and lowercase
    const normalize = (str) => str.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
    
    const normalizedInput = normalize(input);
    const normalizedTarget = normalize(targetText);
    
    const feedback = document.getElementById('translate-feedback');
    const btnCheck = document.getElementById('btn-check');
    const btnNext = document.getElementById('btn-next');
    const btnHint = document.getElementById('btn-hint');
    
    // In real app, you'd use a Levenshtein distance algorithm here for fuzzy matching
    // For now, doing exact normalized match or high substring match
    let isCorrect = false;
    let isClose = false;
    
    if (normalizedInput === normalizedTarget) {
      isCorrect = true;
    } else if (normalizedTarget.includes(normalizedInput) && normalizedInput.length > normalizedTarget.length * 0.8) {
      isClose = true;
    }
    
    if (isCorrect) {
      this.score++;
      Gamification.playDingSound();
      feedback.innerHTML = `<span class="text-success"><i class="fa-solid fa-check-circle"></i> Chính xác tuyệt đối! +20 XP</span>`;
      
      document.getElementById('translate-input').disabled = true;
      document.getElementById('translate-input').style.borderColor = 'var(--success)';
      document.getElementById('translate-input').style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
      
      btnCheck.style.display = 'none';
      btnHint.style.display = 'none';
      btnNext.style.display = 'block';
      
      // Auto advance
      setTimeout(() => {
        if(document.getElementById('btn-next').style.display !== 'none') {
          btnNext.click();
        }
      }, 2000);
      
    } else if (isClose) {
      feedback.innerHTML = `
        <span class="text-warning"><i class="fa-solid fa-triangle-exclamation"></i> Khá sát nghĩa, nhưng chưa chính xác hoàn toàn.</span>
        <div class="mt-sm p-sm" style="background: rgba(255,255,255,0.05); border-radius: 4px;">
          <span class="text-secondary text-sm">Đáp án đúng:</span><br>
          <span class="text-success font-bold">${targetText}</span>
        </div>
      `;
      // Allow them to fix it, or show next button
      btnCheck.innerHTML = 'Thử lại';
      btnNext.style.display = 'block';
    } else {
      feedback.innerHTML = `
        <span class="text-error"><i class="fa-solid fa-xmark-circle"></i> Sai rồi!</span>
        <div class="mt-sm p-sm" style="background: rgba(255,255,255,0.05); border-radius: 4px;">
          <span class="text-secondary text-sm">Đáp án đúng:</span><br>
          <span class="text-success font-bold">${targetText}</span>
        </div>
      `;
      if (navigator.vibrate) navigator.vibrate(200);
      
      document.getElementById('translate-input').disabled = true;
      document.getElementById('translate-input').style.borderColor = 'var(--error)';
      
      btnCheck.style.display = 'none';
      btnHint.style.display = 'none';
      btnNext.style.display = 'block';
    }
    
    // Bind Next button if it's the first time we show it
    if (!btnNext.onclick) {
      btnNext.onclick = () => {
        this.currentIndex++;
        if (this.currentIndex < this.exercises.length) {
          this.renderExercise();
        } else {
          this.showResult();
        }
      };
    }
  },

  showResult() {
    const total = this.exercises.length;
    const accuracy = Math.round((this.score / total) * 100);
    const xpEarned = this.score * 20 + (accuracy === 100 ? 50 : 0);
    const timeTaken = Math.round((Date.now() - this.startTime) / 1000); 
    
    ZenStorage.addHistory({
      type: 'translate',
      score: this.score,
      total: total,
      accuracy: accuracy,
      duration: timeTaken,
      details: this.mode
    });
    
    Gamification.addXP(xpEarned, 'Thử thách Dịch Thuật');

    this.container.innerHTML = `
      <div class="result-container mx-auto text-center" style="max-width: 600px; padding-top: 40px;">
        <div class="glass-card p-xl animate-scale-in">
          <i class="fa-solid fa-language" style="font-size: 4rem; color: var(--success); margin-bottom: 20px;"></i>
          <h2 class="mb-sm">Hoàn Thành Thử Thách!</h2>
          <p class="text-secondary mb-lg">Bạn đang tiến bộ rất nhanh.</p>
          
          <div class="result-stats grid grid-3 gap-md mb-xl">
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Điểm số</div>
              <div class="font-bold text-xl">${this.score}/${total}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Độ chính xác</div>
              <div class="font-bold text-xl ${accuracy >= 80 ? 'text-success' : ''}">${accuracy}%</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(16, 185, 129, 0.1); border-radius: 8px; border: 1px solid var(--success);">
              <div class="text-success text-sm">XP Nhận được</div>
              <div class="font-bold text-xl text-success">+${xpEarned}</div>
            </div>
          </div>
          
          <div class="flex gap-md justify-center">
            <button class="btn btn-secondary" onclick="TranslateModule.showSetup()">Trở về</button>
            <button class="btn btn-primary" onclick="TranslateModule.generateExercises()">Làm lại</button>
          </div>
        </div>
      </div>
    `;
  }
};
