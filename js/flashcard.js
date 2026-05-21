/* ============================================
   ZenType English — Flashcard Module
   ============================================ */

window.FlashcardModule = {
  cards: [],
  currentIndex: 0,
  knownCount: 0,
  unknownCount: 0,
  isFlipped: false,
  autoPlayTimer: null,
  isAutoPlaying: false,
  
  render(container) {
    this.container = container;
    this.showSetup();
  },

  showSetup() {
    const topics = ZenData.topics;
    
    this.container.innerHTML = `
      <div class="setup-container mx-auto" style="max-width: 600px; padding-top: 40px;">
        <div class="text-center mb-xl animate-slide-down">
          <i class="fa-solid fa-clone text-accent mb-md" style="font-size: 3rem;"></i>
          <h2>Học bằng Flashcard</h2>
          <p class="text-secondary">Phương pháp lật thẻ truyền thống giúp ghi nhớ từ vựng hiệu quả.</p>
        </div>

        <div class="glass-card p-xl animate-scale-in">
          <div class="form-group">
            <label class="form-label">Chọn bộ từ vựng</label>
            <select id="flashcard-topic" class="form-select">
              <option value="all">Tất cả từ vựng (Trộn ngẫu nhiên)</option>
              <option value="review">Từ cần ôn tập hôm nay</option>
              ${topics.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
            </select>
          </div>

          <div class="form-group mt-lg">
            <label class="form-label">Số lượng thẻ</label>
            <select id="flashcard-count" class="form-select">
              <option value="10">10 từ</option>
              <option value="20" selected>20 từ</option>
              <option value="50">50 từ</option>
              <option value="all">Toàn bộ</option>
            </select>
          </div>

          <button id="btn-start-flashcard" class="btn btn-primary w-full mt-xl btn-lg">
            <i class="fa-solid fa-play"></i> Bắt đầu học
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-start-flashcard').addEventListener('click', () => {
      const topicId = document.getElementById('flashcard-topic').value;
      const count = document.getElementById('flashcard-count').value;
      this.startSession(topicId, count);
    });
  },

  startSession(topicId, countStr) {
    let sourceWords = [];
    
    if (topicId === 'review') {
      sourceWords = ZenStorage.getReviewQueue();
      if (sourceWords.length === 0) {
        alert('Không có từ nào cần ôn tập hôm nay! Bạn có thể chọn chủ đề khác.');
        return;
      }
    } else if (topicId !== 'all') {
      sourceWords = ZenStorage.getVocabulary().filter(w => w.topicId === topicId);
      if (sourceWords.length === 0) sourceWords = ZenData.getWordsByTopic(topicId);
    } else {
      sourceWords = ZenStorage.getVocabulary();
      if (sourceWords.length === 0) sourceWords = ZenData.getAllWords();
    }

    if (sourceWords.length === 0) {
      alert("Không tìm thấy từ vựng nào.");
      return;
    }

    // Shuffle and limit
    const shuffled = [...sourceWords].sort(() => Math.random() - 0.5);
    const count = countStr === 'all' ? shuffled.length : parseInt(countStr);
    this.cards = shuffled.slice(0, Math.min(count, shuffled.length));
    
    this.currentIndex = 0;
    this.knownCount = 0;
    this.unknownCount = 0;
    
    this.renderCard();
  },

  renderCard() {
    this.isFlipped = false;
    const total = this.cards.length;
    const current = this.cards[this.currentIndex];
    
    this.container.innerHTML = `
      <div class="flashcard-container mx-auto" style="max-width: 600px; padding-top: 20px;">
        <!-- Header -->
        <div class="flex justify-between align-center mb-md">
          <button class="btn btn-icon text-secondary" onclick="FlashcardModule.showSetup()">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <div class="font-bold text-secondary">
            ${this.currentIndex + 1} / ${total}
          </div>
          <button class="btn btn-icon ${this.isAutoPlaying ? 'text-accent' : 'text-secondary'}" onclick="FlashcardModule.toggleAutoPlay()" title="Tự động phát">
            <i class="fa-solid ${this.isAutoPlaying ? 'fa-pause' : 'fa-play'}"></i>
          </button>
        </div>
        
        <!-- Progress Bar -->
        <div class="progress-bar-container mb-xl">
          <div class="progress-bar-fill" style="width: ${(this.currentIndex / total) * 100}%; background: var(--accent);"></div>
        </div>

        <!-- The Card (3D Flip) -->
        <div class="flashcard-scene" style="perspective: 1000px; width: 100%; height: 350px; margin-bottom: 30px;">
          <div class="flashcard-inner glass-card" id="current-flashcard" style="width: 100%; height: 100%; position: relative; transition: transform 0.6s; transform-style: preserve-3d; cursor: pointer;">
            
            <!-- Front (English) -->
            <div class="flashcard-face flashcard-front flex-col justify-center align-center" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 12px;">
              <button class="btn-icon text-secondary" style="position: absolute; top: 15px; right: 15px;" onclick="event.stopPropagation(); FlashcardModule.playAudio('${current.word.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-volume-high"></i>
              </button>
              
              <h2 style="font-size: 3rem; margin-bottom: 10px;">${current.word}</h2>
              ${current.phonetic ? `<div class="text-secondary" style="font-family: monospace; font-size: 1.2rem;">${current.phonetic}</div>` : ''}
              
              <div class="text-secondary mt-xl" style="font-size: 0.85rem;">
                <i class="fa-solid fa-hand-pointer"></i> Nhấn để lật
              </div>
            </div>
            
            <!-- Back (Vietnamese) -->
            <div class="flashcard-face flashcard-back flex-col justify-center align-center" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); border-radius: 12px; background: rgba(30, 41, 59, 0.95); overflow-y: auto; padding: 20px;">
              <div class="text-accent mb-sm">(${current.pos || '?'})</div>
              <h2 style="font-size: ${current.isAdvanced ? '1.8rem' : '2.5rem'}; margin-bottom: 20px; color: var(--success); text-align: center;">${current.meaning}</h2>
              
              ${current.example ? `
                <div class="p-sm" style="border-top: 1px solid rgba(255,255,255,0.1); width: 90%; text-align: center;">
                  <div style="font-style: italic; margin-bottom: 5px;">"${current.example}"</div>
                  ${current.exampleVi ? `<div class="text-secondary" style="font-size: 0.85rem;">${current.exampleVi}</div>` : ''}
                </div>
              ` : ''}

              ${current.isAdvanced ? `
                <div class="flashcard-advanced mt-sm" style="font-size: 0.85rem; width: 100%; text-align: left; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
                  ${current.structures && current.structures.length > 0 ? `
                    <div class="mb-sm">
                      <div class="text-secondary font-bold" style="font-size: 0.75rem; text-transform: uppercase;">Cấu trúc ngữ pháp:</div>
                      <ul style="padding-left: 15px; margin-top: 5px; list-style-type: none;">
                        ${current.structures.slice(0, 2).map(s => `
                          <li style="margin-bottom: 8px;">
                            <span class="text-accent font-mono">${s.formula}</span><br>
                            ${s.meaning ? `<span class="text-secondary" style="font-size: 0.75rem;">${s.meaning}</span>` : ''}
                          </li>
                        `).join('')}
                        ${current.structures.length > 2 ? `<li class="text-secondary" style="font-size: 0.75rem;">... và ${current.structures.length - 2} cấu trúc khác</li>` : ''}
                      </ul>
                    </div>
                  ` : ''}
                  
                  ${current.collocations && current.collocations.length > 0 ? `
                    <div class="mb-sm">
                      <div class="text-secondary font-bold" style="font-size: 0.75rem; text-transform: uppercase;">Collocations & Cụm từ:</div>
                      <div class="flex flex-wrap gap-xs mt-xs">
                        ${current.collocations.slice(0, 3).map(c => `
                          <span style="background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); font-size: 0.75rem; margin-bottom: 4px;">${c}</span>
                        `).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>
              ` : ''}
            </div>
            
          </div>
        </div>

        <!-- Actions -->
        <div class="grid grid-2 gap-lg animate-slide-up" style="animation-delay: 0.2s;">
          <button class="btn btn-outline" style="border-color: var(--error); color: var(--error); height: 60px;" onclick="FlashcardModule.markCard(false)">
            <i class="fa-solid fa-xmark mr-sm"></i> Không nhớ
          </button>
          <button class="btn btn-outline" style="border-color: var(--success); color: var(--success); height: 60px;" onclick="FlashcardModule.markCard(true)">
            <i class="fa-solid fa-check mr-sm"></i> Đã nhớ
          </button>
        </div>
      </div>
    `;

    // Auto play TTS when card is shown
    setTimeout(() => this.playAudio(current.word), 300);

    // Bind Flip event
    document.getElementById('current-flashcard').addEventListener('click', () => {
      this.flipCard();
    });
    
    // Handle autoplay logic
    if (this.isAutoPlaying) {
      this.autoPlayTimer = setTimeout(() => {
        if (!this.isFlipped) {
          this.flipCard();
          this.autoPlayTimer = setTimeout(() => {
            this.markCard(true); // Default to known in autoplay
          }, 3000);
        }
      }, 3000);
    }
  },

  flipCard() {
    const card = document.getElementById('current-flashcard');
    if (!card) return;
    
    this.isFlipped = !this.isFlipped;
    if (this.isFlipped) {
      card.style.transform = 'rotateY(180deg)';
    } else {
      card.style.transform = 'rotateY(0deg)';
    }
  },

  markCard(isKnown) {
    // Clear autoplay timer if user interacted
    if (this.autoPlayTimer) clearTimeout(this.autoPlayTimer);

    if (isKnown) {
      this.knownCount++;
      // SM-2 logic (Good - 4)
      ZenStorage.updateReviewData(this.cards[this.currentIndex].word, 4);
    } else {
      this.unknownCount++;
      // SM-2 logic (Fail - 1)
      ZenStorage.updateReviewData(this.cards[this.currentIndex].word, 1);
    }

    this.currentIndex++;
    
    if (this.currentIndex < this.cards.length) {
      this.renderCard();
    } else {
      this.showResult();
    }
  },

  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
    }
    
    // Re-render to update button icon
    const tempIndex = this.currentIndex;
    this.currentIndex = tempIndex; // just to be safe
    
    if (this.currentIndex < this.cards.length) {
      this.renderCard();
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

  showResult() {
    this.isAutoPlaying = false;
    if (this.autoPlayTimer) clearTimeout(this.autoPlayTimer);

    const total = this.cards.length;
    const accuracy = Math.round((this.knownCount / total) * 100) || 0;
    const xpEarned = this.knownCount * 5; // 5 XP per known word
    
    // Save to history
    ZenStorage.addHistory({
      type: 'flashcard',
      score: this.knownCount,
      total: total,
      accuracy: accuracy,
      details: 'flashcard session'
    });
    
    Gamification.addXP(xpEarned, 'Ôn tập Flashcard');

    this.container.innerHTML = `
      <div class="result-container mx-auto text-center" style="max-width: 500px; padding-top: 40px;">
        <div class="glass-card p-xl animate-scale-in">
          <i class="fa-solid fa-brain" style="font-size: 4rem; color: var(--accent); margin-bottom: 20px;"></i>
          <h2 class="mb-sm">Hoàn Thành!</h2>
          <p class="text-secondary mb-lg">Bạn đã ôn tập xong ${total} từ vựng.</p>
          
          <div class="result-stats grid grid-2 gap-md mb-xl">
            <div class="stat-box p-md" style="background: rgba(16, 185, 129, 0.1); border-radius: 8px; border: 1px solid var(--success);">
              <div class="text-success text-sm">Đã thuộc</div>
              <div class="font-bold text-xl text-success">${this.knownCount}</div>
            </div>
            <div class="stat-box p-md" style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; border: 1px solid var(--error);">
              <div class="text-error text-sm">Cần ôn thêm</div>
              <div class="font-bold text-xl text-error">${this.unknownCount}</div>
            </div>
          </div>
          
          <div class="p-md mb-xl" style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; border: 1px solid var(--accent);">
             <div class="text-accent text-sm mb-xs">XP Nhận được</div>
             <div class="font-bold text-xl text-accent">+${xpEarned}</div>
          </div>
          
          <div class="flex gap-md justify-center">
            <button class="btn btn-secondary" onclick="FlashcardModule.showSetup()">Trở về</button>
            <button class="btn btn-primary" onclick="FlashcardModule.startSession('all', '${total}')">Học bộ khác</button>
          </div>
        </div>
      </div>
    `;
  }
};
