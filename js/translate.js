/* ============================================
   ZenType English — Translate Module (Redesign)
   Luyện Dịch Theo Chủ Đề + Giải Đáp Ngữ Cảnh
   ============================================ */

window.TranslateModule = {
  exercises: [],
  currentIndex: 0,
  totalXP: 0,
  mode: 'vi-en',
  selectedTopic: null, // null = random mix
  allKeyVocab: [],     // collected across exercises for summary

  // Topic definitions for the setup screen
  topicMeta: [
    { id: 'communication', icon: '💬', name: 'Giao Tiếp', desc: 'Chào hỏi, cảm ơn, xin lỗi' },
    { id: 'restaurant',    icon: '🍽️', name: 'Nhà Hàng & Cafe', desc: 'Gọi món, thanh toán' },
    { id: 'travel',        icon: '✈️', name: 'Du Lịch', desc: 'Sân bay, khách sạn, hỏi đường' },
    { id: 'work',          icon: '💼', name: 'Công Việc', desc: 'Họp hành, email, deadline' },
    { id: 'toeic',         icon: '📊', name: 'TOEIC', desc: 'Hợp đồng, giao dịch, nhân sự' },
    { id: 'ielts',         icon: '🎓', name: 'IELTS', desc: 'Nghiên cứu, phân tích, học thuật' }
  ],

  render(container) {
    this.container = container;
    this.showSetup();
  },

  // ─── STEP 1: SETUP SCREEN ────────────────────────
  showSetup() {
    const topicCards = this.topicMeta.map(t => `
      <div class="translate-topic-card" data-topic="${t.id}">
        <span class="translate-topic-icon">${t.icon}</span>
        <div class="translate-topic-name">${t.name}</div>
        <div class="translate-topic-desc">${t.desc}</div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="setup-container mx-auto" style="max-width: 700px; padding-top: 30px;">
        <div class="text-center mb-xl animate-slide-down">
          <i class="fa-solid fa-language text-accent mb-md" style="font-size: 3rem;"></i>
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 2rem;">Luyện Dịch Theo Chủ Đề</h2>
          <p class="text-secondary">Dịch câu, xem giải đáp chi tiết về ngữ pháp và hoàn cảnh sử dụng.</p>
        </div>

        <div class="glass-card p-xl animate-scale-in">
          <div class="form-group mb-lg">
            <label class="form-label">Chọn chủ đề</label>
            <div class="translate-topic-grid">
              <div class="translate-topic-card active" data-topic="random">
                <span class="translate-topic-icon">🔀</span>
                <div class="translate-topic-name">Trộn Ngẫu Nhiên</div>
                <div class="translate-topic-desc">Tất cả chủ đề</div>
              </div>
              ${topicCards}
            </div>
          </div>

          <div class="form-group mb-lg">
            <label class="form-label">Chế độ dịch</label>
            <div class="quiz-type-cards grid" style="grid-template-columns: 1fr 1fr; gap: 15px;">
              <div class="quiz-type-card active" data-mode="vi-en">
                <i class="fa-solid fa-arrow-right-long text-success" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
                <div class="mt-sm"><strong>Việt → Anh</strong></div>
                <div class="text-secondary text-sm">Rèn khả năng diễn đạt</div>
              </div>
              <div class="quiz-type-card" data-mode="en-vi">
                <i class="fa-solid fa-arrow-left-long text-primary" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
                <div class="mt-sm"><strong>Anh → Việt</strong></div>
                <div class="text-secondary text-sm">Rèn khả năng hiểu nghĩa</div>
              </div>
            </div>
          </div>

          <button id="btn-start-translate" class="btn btn-primary w-full mt-md btn-lg">
            <i class="fa-solid fa-play"></i> Bắt đầu luyện tập
          </button>
        </div>
      </div>
    `;

    // Topic card selection
    const topicCardEls = this.container.querySelectorAll('.translate-topic-card');
    topicCardEls.forEach(card => {
      card.addEventListener('click', () => {
        topicCardEls.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectedTopic = card.dataset.topic === 'random' ? null : card.dataset.topic;
      });
    });

    // Mode selection
    const modeCards = this.container.querySelectorAll('.quiz-type-card');
    modeCards.forEach(card => {
      card.addEventListener('click', () => {
        modeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.mode = card.dataset.mode;
      });
    });

    // Start button
    this.selectedTopic = null;
    this.mode = 'vi-en';
    document.getElementById('btn-start-translate').addEventListener('click', () => {
      this.startExercises();
    });
  },

  // ─── GET EXERCISES ────────────────────────────────
  getExercisePool() {
    // Primary source: translationExercises
    let pool = [];
    if (ZenData.translationExercises && ZenData.translationExercises.length > 0) {
      pool = [...ZenData.translationExercises];
    } else {
      // Fallback: combine phrases + sentences, wrap with default fields
      const combined = [...(ZenData.phrases || []), ...(ZenData.sentences || [])];
      pool = combined.map(item => ({
        en: item.en,
        vi: item.vi,
        topic: item.topic || 'general',
        level: item.level || 'beginner',
        altTranslations: [],
        grammar: 'Hãy so sánh bản dịch của bạn với bản tham khảo để học thêm cách diễn đạt mới.',
        keyVocab: [],
        contexts: ['💡 Dùng trong giao tiếp hàng ngày']
      }));
    }

    // Filter by topic if selected
    if (this.selectedTopic) {
      pool = pool.filter(ex => ex.topic === this.selectedTopic);
    }

    return pool;
  },

  startExercises() {
    const pool = this.getExercisePool();
    if (pool.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state animate-scale-in text-center" style="padding-top: 60px;">
          <i class="fa-solid fa-folder-open text-secondary" style="font-size: 4rem;"></i>
          <h3 class="mt-lg">Chưa có dữ liệu</h3>
          <p class="text-secondary">Chủ đề này chưa có câu dịch. Hãy chọn chủ đề khác.</p>
          <button class="btn btn-secondary mt-lg" onclick="TranslateModule.showSetup()">
            <i class="fa-solid fa-arrow-left"></i> Quay lại
          </button>
        </div>
      `;
      return;
    }

    // Pick 5 random exercises
    const shuffled = pool.sort(() => Math.random() - 0.5);
    this.exercises = shuffled.slice(0, Math.min(5, shuffled.length));
    this.currentIndex = 0;
    this.totalXP = 0;
    this.allKeyVocab = [];
    this.startTime = Date.now();

    this.renderExercise();
  },

  // ─── STEP 2: EXERCISE SCREEN ─────────────────────
  renderExercise() {
    const current = this.exercises[this.currentIndex];
    const total = this.exercises.length;

    const sourceText = this.mode === 'vi-en' ? current.vi : current.en;
    const targetLang = this.mode === 'vi-en' ? 'Tiếng Anh' : 'Tiếng Việt';
    const placeholder = this.mode === 'vi-en' ? 'Nhập bản dịch Tiếng Anh của bạn...' : 'Nhập bản dịch Tiếng Việt của bạn...';

    // Find topic meta for badge
    const topicInfo = this.topicMeta.find(t => t.id === current.topic);
    const topicBadge = topicInfo
      ? `<span class="badge" style="background: rgba(99,102,241,0.15); color: var(--primary); font-size: 0.75rem;">${topicInfo.icon} ${topicInfo.name}</span>`
      : '';

    const levelMap = { beginner: 'Cơ bản', intermediate: 'Trung cấp', advanced: 'Nâng cao' };
    const levelColor = { beginner: 'var(--success)', intermediate: 'var(--warning, #f59e0b)', advanced: 'var(--error, #ef4444)' };
    const levelBadge = `<span class="badge" style="background: ${levelColor[current.level] || 'var(--primary)'}22; color: ${levelColor[current.level] || 'var(--primary)'}; font-size: 0.75rem;">${levelMap[current.level] || current.level}</span>`;

    this.container.innerHTML = `
      <div class="translate-container mx-auto" style="max-width: 700px; padding-top: 20px;">
        <div class="flex justify-between align-center mb-lg">
          <button class="btn btn-secondary btn-sm" onclick="TranslateModule.showSetup()">
            <i class="fa-solid fa-arrow-left"></i> Thoát
          </button>
          <div class="font-bold">Câu ${this.currentIndex + 1}/${total}</div>
          <div class="font-bold text-accent"><i class="fa-solid fa-star"></i> ${this.totalXP} XP</div>
        </div>

        <div class="progress-bar-container mb-lg">
          <div class="progress-bar-fill" style="width: ${(this.currentIndex / total) * 100}%"></div>
        </div>

        <div class="glass-card p-xl animate-fade-in">
          <div class="flex gap-sm mb-md justify-center flex-wrap">
            ${topicBadge} ${levelBadge}
          </div>

          <div class="text-secondary text-sm mb-sm text-center text-uppercase tracking-wider">
            Dịch câu sau sang ${targetLang}:
          </div>

          <h2 class="text-center mb-xl" style="font-size: 1.6rem; line-height: 1.6; font-weight: 600;">
            "${sourceText}"
          </h2>

          <div class="form-group text-left">
            <textarea id="translate-input" class="form-input" rows="3"
              placeholder="${placeholder}"
              style="font-size: 1.1rem; padding: 15px; resize: vertical;"></textarea>
          </div>

          <div id="translate-analysis-area" class="mt-lg"></div>

          <div id="translate-actions" class="flex justify-center mt-lg">
            <button id="btn-show-analysis" class="btn btn-primary btn-lg">
              Xem Giải Đáp <i class="fa-solid fa-book-open"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Focus input
    setTimeout(() => {
      const input = document.getElementById('translate-input');
      if (input) input.focus();
    }, 150);

    // Bind show analysis
    document.getElementById('btn-show-analysis').addEventListener('click', () => {
      this.showAnalysis();
    });

    // Enter key to show analysis
    document.getElementById('translate-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.showAnalysis();
      }
    });
  },

  // ─── STEP 3: ANALYSIS PANEL ──────────────────────
  showAnalysis() {
    const userInput = (document.getElementById('translate-input').value || '').trim();
    const current = this.exercises[this.currentIndex];
    const referenceText = this.mode === 'vi-en' ? current.en : current.vi;

    // Collect key vocab for summary
    if (current.keyVocab && current.keyVocab.length > 0) {
      this.allKeyVocab.push(...current.keyVocab);
    }

    // Disable input
    const inputEl = document.getElementById('translate-input');
    if (inputEl) {
      inputEl.disabled = true;
      inputEl.style.opacity = '0.7';
    }

    // Build alternative translations list
    const altList = (current.altTranslations && current.altTranslations.length > 0)
      ? `<div class="mt-sm">
           <div class="text-secondary text-sm mb-xs" style="font-weight: 600;">Các cách diễn đạt khác:</div>
           <div class="translate-alt-list">
             ${current.altTranslations.map(alt => `<div class="translate-alt-item">• ${alt}</div>`).join('')}
           </div>
         </div>`
      : '';

    // Build vocab items
    const vocabHtml = (current.keyVocab && current.keyVocab.length > 0)
      ? current.keyVocab.map(v => `
          <div class="translate-vocab-item">
            <span class="translate-vocab-word">${v.word}</span>
            <span class="translate-vocab-meaning">${v.meaning}</span>
            ${v.note ? `<div class="translate-vocab-note">${v.note}</div>` : ''}
          </div>
        `).join('')
      : '';

    // Build contexts
    const contextsHtml = (current.contexts && current.contexts.length > 0)
      ? current.contexts.map(ctx => `<div class="translate-context-item">${ctx}</div>`).join('')
      : '<div class="translate-context-item">💡 Dùng trong giao tiếp hàng ngày</div>';

    // Display user answer or placeholder
    const userAnswerDisplay = userInput
      ? `<div class="translate-user-answer">${userInput}</div>`
      : `<div class="translate-user-answer" style="opacity: 0.5; font-style: italic;">Bạn chưa nhập câu trả lời</div>`;

    const analysisHtml = `
      <div class="translate-analysis-panel animate-slide-up">
        <!-- Section 1: User's answer -->
        <div class="translate-section translate-section-user">
          <div class="translate-section-title">📝 Bản Dịch Của Bạn</div>
          ${userAnswerDisplay}
        </div>

        <!-- Section 2: Reference -->
        <div class="translate-section translate-section-reference">
          <div class="translate-section-title">📖 Bản Dịch Tham Khảo</div>
          <div class="translate-reference">${referenceText}</div>
          ${altList}
        </div>

        <!-- Section 3: Grammar & Vocab -->
        <div class="translate-section translate-section-grammar">
          <div class="translate-section-title">💡 Giải Thích Ngữ Pháp & Từ Vựng</div>
          ${current.grammar ? `<div class="translate-grammar-note">${current.grammar}</div>` : ''}
          ${vocabHtml ? `<div class="mt-md">${vocabHtml}</div>` : ''}
        </div>

        <!-- Section 4: Contexts -->
        <div class="translate-section translate-section-context">
          <div class="translate-section-title">🎯 Hoàn Cảnh Sử Dụng</div>
          ${contextsHtml}
        </div>

        <!-- Self-rate buttons -->
        <div class="translate-rate-group">
          <div class="text-secondary text-sm text-center mb-sm" style="width: 100%;">Bạn tự đánh giá mức độ hiểu:</div>
          <button class="translate-rate-btn rate-review" data-xp="5">
            😕 Cần ôn thêm<span class="rate-xp">+5 XP</span>
          </button>
          <button class="translate-rate-btn rate-understood" data-xp="10">
            😊 Hiểu rồi<span class="rate-xp">+10 XP</span>
          </button>
          <button class="translate-rate-btn rate-mastered" data-xp="15">
            🔥 Nắm chắc<span class="rate-xp">+15 XP</span>
          </button>
        </div>
      </div>
    `;

    // Insert analysis panel
    const analysisArea = document.getElementById('translate-analysis-area');
    analysisArea.innerHTML = analysisHtml;

    // Hide the "Xem Giải Đáp" button
    document.getElementById('translate-actions').style.display = 'none';

    // Scroll to analysis
    analysisArea.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Bind self-rate buttons
    const rateButtons = analysisArea.querySelectorAll('.translate-rate-btn');
    rateButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const xp = parseInt(btn.dataset.xp);
        this.totalXP += xp;
        Gamification.playDingSound();

        // Visual feedback on clicked button
        rateButtons.forEach(b => b.style.opacity = '0.4');
        btn.style.opacity = '1';
        btn.style.transform = 'scale(1.05)';

        // Advance after a short delay
        setTimeout(() => {
          this.currentIndex++;
          if (this.currentIndex < this.exercises.length) {
            this.renderExercise();
          } else {
            this.showResult();
          }
        }, 600);
      });
    });
  },

  // ─── STEP 4: RESULT SCREEN ───────────────────────
  showResult() {
    const total = this.exercises.length;
    const timeTaken = Math.round((Date.now() - this.startTime) / 1000);

    // Save history
    ZenStorage.addHistory({
      type: 'translate',
      score: total,
      total: total,
      accuracy: 100,
      duration: timeTaken,
      details: `${this.mode} | ${this.selectedTopic || 'random'}`
    });

    // Award XP
    Gamification.addXP(this.totalXP, 'Luyện Dịch Theo Chủ Đề');

    // Deduplicate key vocab
    const uniqueVocab = [];
    const seen = new Set();
    for (const v of this.allKeyVocab) {
      if (!seen.has(v.word)) {
        seen.add(v.word);
        uniqueVocab.push(v);
      }
    }

    const vocabSummaryHtml = uniqueVocab.length > 0
      ? `<div class="translate-vocab-summary mt-xl">
           <h4 class="mb-md"><i class="fa-solid fa-book"></i> Từ Vựng Đã Gặp</h4>
           <div class="translate-vocab-summary-grid">
             ${uniqueVocab.map(v => `
               <div class="translate-vocab-summary-item">
                 <span class="font-bold text-primary">${v.word}</span>
                 <span class="text-secondary"> — ${v.meaning}</span>
               </div>
             `).join('')}
           </div>
         </div>`
      : '';

    const topicLabel = this.selectedTopic
      ? (this.topicMeta.find(t => t.id === this.selectedTopic)?.name || this.selectedTopic)
      : 'Ngẫu nhiên';

    this.container.innerHTML = `
      <div class="result-container mx-auto text-center" style="max-width: 650px; padding-top: 30px;">
        <div class="glass-card p-xl animate-scale-in">
          <i class="fa-solid fa-language" style="font-size: 4rem; color: var(--success); margin-bottom: 15px;"></i>
          <h2 class="mb-xs">Hoàn Thành Bài Luyện!</h2>
          <p class="text-secondary mb-lg">Chủ đề: ${topicLabel}</p>

          <div class="result-stats grid grid-3 gap-md mb-lg">
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: var(--radius-md);">
              <div class="text-secondary text-sm">Câu đã luyện</div>
              <div class="font-bold text-xl">${total}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(255,255,255,0.05); border-radius: var(--radius-md);">
              <div class="text-secondary text-sm">Thời gian</div>
              <div class="font-bold text-xl">${Math.floor(timeTaken / 60)}:${String(timeTaken % 60).padStart(2, '0')}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); border: 1px solid var(--success);">
              <div class="text-success text-sm">XP Nhận được</div>
              <div class="font-bold text-xl text-success">+${this.totalXP}</div>
            </div>
          </div>

          ${vocabSummaryHtml}

          <div class="flex gap-md justify-center mt-xl flex-wrap">
            <button class="btn btn-secondary" onclick="TranslateModule.showSetup()">
              <i class="fa-solid fa-list"></i> Chọn chủ đề khác
            </button>
            <button class="btn btn-primary" onclick="TranslateModule.startExercises()">
              <i class="fa-solid fa-redo"></i> Luyện lại
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
