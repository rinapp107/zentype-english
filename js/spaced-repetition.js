/* ============================================
   ZenType English — Spaced Repetition Module
   ============================================ */

window.SpacedRepetitionModule = {
  queue: [],
  currentIndex: 0,
  sessionStats: {
    reviewed: 0,
    learned: 0, // rating 4 or 5
    forgotten: 0 // rating 1 or 2
  },

  render(container) {
    this.container = container;
    this.queue = ZenStorage.getReviewQueue();
    this.showDashboard();
  },

  showDashboard() {
    const vocab = ZenStorage.getVocabulary();
    const mastered = vocab.filter(v => v.masteryLevel >= 80).length;
    const learning = vocab.filter(v => v.masteryLevel > 0 && v.masteryLevel < 80).length;
    const newWords = vocab.filter(v => v.masteryLevel === 0).length;
    
    this.container.innerHTML = `
      <div class="srs-dashboard mx-auto animate-slide-down" style="max-width: 800px; padding-top: 20px;">
        <div class="flex justify-between align-center mb-xl">
          <div>
            <h2><i class="fa-solid fa-brain text-accent mr-sm"></i> Ôn Tập Thông Minh</h2>
            <p class="text-secondary mt-xs">Thuật toán SM-2 giúp bạn nhớ từ vựng lâu nhất.</p>
          </div>
        </div>

        <!-- Main Banner -->
        <div class="glass-card p-xl mb-xl text-center" style="background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9)); border-left: 4px solid var(--accent);">
          <div style="font-size: 4rem; color: var(--accent); margin-bottom: 10px;">
            ${this.queue.length}
          </div>
          <h3 class="mb-sm">Từ cần ôn tập hôm nay</h3>
          <p class="text-secondary mb-lg">Đừng để từ vựng rơi vào quên lãng! Ôn tập ngay để kéo dài trí nhớ.</p>
          
          <button id="btn-start-review" class="btn btn-primary btn-lg" ${this.queue.length === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-play"></i> Bắt đầu ôn tập
          </button>
        </div>

        <!-- Stats Grid -->
        <h3 class="mb-md">Tiến độ học tập</h3>
        <div class="grid grid-3 gap-md mb-xl">
          <div class="stat-box p-md glass-card flex align-center gap-md">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); color: var(--success); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
              <i class="fa-solid fa-check-double"></i>
            </div>
            <div>
              <div class="text-secondary text-sm">Đã ghi nhớ sâu</div>
              <div class="font-bold text-xl">${mastered}</div>
            </div>
          </div>
          
          <div class="stat-box p-md glass-card flex align-center gap-md">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(245, 158, 11, 0.1); color: var(--warning); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
              <i class="fa-solid fa-spinner"></i>
            </div>
            <div>
              <div class="text-secondary text-sm">Đang học</div>
              <div class="font-bold text-xl">${learning}</div>
            </div>
          </div>
          
          <div class="stat-box p-md glass-card flex align-center gap-md">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(59, 130, 246, 0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
              <i class="fa-solid fa-seedling"></i>
            </div>
            <div>
              <div class="text-secondary text-sm">Từ mới tinh</div>
              <div class="font-bold text-xl">${newWords}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const startBtn = document.getElementById('btn-start-review');
    if (startBtn && this.queue.length > 0) {
      startBtn.addEventListener('click', () => {
        this.currentIndex = 0;
        this.sessionStats = { reviewed: 0, learned: 0, forgotten: 0 };
        this.renderReviewCard();
      });
    }
  },

  renderReviewCard() {
    const word = this.queue[this.currentIndex];
    const total = this.queue.length;
    
    this.container.innerHTML = `
      <div class="review-container mx-auto" style="max-width: 600px; padding-top: 20px;">
        <!-- Header -->
        <div class="flex justify-between align-center mb-md">
          <button class="btn btn-icon text-secondary" onclick="SpacedRepetitionModule.showDashboard()">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="font-bold text-secondary">
            Đang ôn tập: ${this.currentIndex + 1} / ${total}
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="progress-bar-container mb-xl">
          <div class="progress-bar-fill" style="width: ${(this.currentIndex / total) * 100}%; background: var(--accent);"></div>
        </div>

        <!-- The Card -->
        <div class="glass-card text-center p-xl mb-lg animate-fade-in" style="min-height: 250px; display: flex; flex-direction: column; justify-content: center;">
          <h2 style="font-size: 3rem; margin-bottom: 10px;">${word.word}</h2>
          ${word.phonetic ? `<div class="text-secondary mb-lg" style="font-family: monospace; font-size: 1.2rem;">${word.phonetic}</div>` : ''}
          
          <div id="review-answer" style="display: none; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 20px; margin-top: 10px;">
            <div class="text-accent mb-sm">(${word.pos || '?'})</div>
            <h3 style="font-size: 2rem; color: var(--success);">${word.meaning}</h3>
            ${word.example ? `
              <div class="mt-md" style="font-style: italic; color: var(--text-secondary);">"${word.example}"</div>
            ` : ''}
          </div>
        </div>

        <!-- Actions -->
        <div id="action-show" class="text-center">
          <button class="btn btn-primary btn-lg w-full" id="btn-show-answer">Hiển thị đáp án</button>
        </div>
        
        <div id="action-rate" class="grid grid-4 gap-sm animate-slide-up" style="display: none;">
          <button class="btn btn-secondary rate-btn flex-col p-sm" data-rating="1" style="border: 1px solid var(--error); color: var(--error);">
             <span class="font-bold mb-xs">Lại</span>
             <span class="text-xs opacity-70">Quên mất</span>
          </button>
          <button class="btn btn-secondary rate-btn flex-col p-sm" data-rating="3" style="border: 1px solid var(--warning); color: var(--warning);">
             <span class="font-bold mb-xs">Khó</span>
             <span class="text-xs opacity-70">Nhớ ra chậm</span>
          </button>
          <button class="btn btn-secondary rate-btn flex-col p-sm" data-rating="4" style="border: 1px solid var(--success); color: var(--success);">
             <span class="font-bold mb-xs">Đúng</span>
             <span class="text-xs opacity-70">Nhớ tốt</span>
          </button>
          <button class="btn btn-secondary rate-btn flex-col p-sm" data-rating="5" style="border: 1px solid var(--primary); color: var(--primary);">
             <span class="font-bold mb-xs">Dễ</span>
             <span class="text-xs opacity-70">Rất hoàn hảo</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-show-answer').addEventListener('click', () => {
      document.getElementById('review-answer').style.display = 'block';
      document.getElementById('action-show').style.display = 'none';
      document.getElementById('action-rate').style.display = 'grid';
    });

    const rateBtns = document.querySelectorAll('.rate-btn');
    rateBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rating = parseInt(e.currentTarget.dataset.rating);
        this.processRating(rating);
      });
    });
  },

  processRating(rating) {
    const word = this.queue[this.currentIndex];
    
    // Update algorithm
    ZenStorage.updateReviewData(word.word, rating);
    
    // Stats
    this.sessionStats.reviewed++;
    if (rating >= 4) this.sessionStats.learned++;
    else if (rating <= 2) this.sessionStats.forgotten++;

    this.currentIndex++;
    
    if (this.currentIndex < this.queue.length) {
      this.renderReviewCard();
    } else {
      this.showSessionComplete();
    }
  },

  showSessionComplete() {
    const xpEarned = this.sessionStats.reviewed * 5 + this.sessionStats.learned * 2;
    Gamification.addXP(xpEarned, 'Hoàn thành Ôn tập');
    
    // Refresh queue global badge
    if(window.updateGlobalBadges) window.updateGlobalBadges();

    this.container.innerHTML = `
      <div class="result-container mx-auto text-center" style="max-width: 600px; padding-top: 40px;">
        <div class="glass-card p-xl animate-scale-in">
          <i class="fa-solid fa-check-circle" style="font-size: 4rem; color: var(--success); margin-bottom: 20px;"></i>
          <h2 class="mb-sm">Hoàn Thành Tuyệt Vời!</h2>
          <p class="text-secondary mb-lg">Bạn đã hoàn thành mục tiêu ôn tập hôm nay.</p>
          
          <div class="result-stats grid grid-3 gap-md mb-xl">
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div class="text-secondary text-sm">Đã ôn</div>
              <div class="font-bold text-xl">${this.sessionStats.reviewed}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(16, 185, 129, 0.1); border-radius: 8px; border: 1px solid var(--success);">
              <div class="text-success text-sm">Nhớ tốt</div>
              <div class="font-bold text-xl text-success">${this.sessionStats.learned}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; border: 1px solid var(--accent);">
              <div class="text-accent text-sm">XP Nhận được</div>
              <div class="font-bold text-xl text-accent">+${xpEarned}</div>
            </div>
          </div>
          
          <button class="btn btn-primary" onclick="SpacedRepetitionModule.showDashboard()">Về trang quản lý</button>
        </div>
      </div>
    `;
  }
};
