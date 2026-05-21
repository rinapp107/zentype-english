/* ============================================
   ZenType English — Vocabulary Module
   ============================================ */

window.VocabularyModule = {
  currentFilter: 'all',
  searchQuery: '',

  render(container) {
    this.container = container;
    const vocab = ZenStorage.getVocabulary();
    const topics = ZenData.topics;

    container.innerHTML = `
      <div class="vocab-header flex justify-between align-center mb-lg animate-slide-down">
        <div>
          <h2>Từ Vựng Của Tôi</h2>
          <p class="text-secondary">Bạn đang học ${vocab.length} từ</p>
        </div>
        <button class="btn btn-primary" id="btn-add-word">
          <i class="fa-solid fa-plus"></i> Thêm Từ Mới
        </button>
      </div>

      <!-- Search & Filter -->
      <div class="vocab-controls glass-card p-md mb-lg flex gap-md align-center flex-wrap animate-slide-up">
        <div class="search-box" style="flex: 1; min-width: 250px; position: relative;">
          <i class="fa-solid fa-search" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: var(--text-secondary);"></i>
          <input type="text" id="vocab-search" class="form-input" placeholder="Tìm kiếm từ vựng, ý nghĩa..." style="padding-left: 40px; width: 100%;">
        </div>
        <div class="filter-chips flex gap-sm" style="overflow-x: auto; padding-bottom: 5px;">
          <button class="chip active" data-topic="all">Tất cả</button>
          ${topics.map(t => `<button class="chip" data-topic="${t.id}">${t.name}</button>`).join('')}
        </div>
      </div>

      <!-- Vocab Grid -->
      <div class="vocab-grid" id="vocab-grid">
        <!-- Rendered by JS -->
      </div>
      
      <!-- Add Word Modal -->
      <div class="modal-overlay" id="add-word-modal">
        <div class="modal animate-scale-in">
          <div class="modal-header">
            <h3 class="modal-title">Thêm Từ Mới</h3>
            <button class="modal-close" id="close-add-word"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <form id="add-word-form">
            <div class="form-group">
              <label class="form-label">Từ vựng (English) *</label>
              <input type="text" id="aw-word" class="form-input" required autocomplete="off">
            </div>
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 15px;">
              <div class="form-group">
                <label class="form-label">Phiên âm (tùy chọn)</label>
                <input type="text" id="aw-phonetic" class="form-input" placeholder="/.../">
              </div>
              <div class="form-group">
                <label class="form-label">Loại từ</label>
                <select id="aw-pos" class="form-select">
                  <option value="n">Danh từ (n)</option>
                  <option value="v">Động từ (v)</option>
                  <option value="adj">Tính từ (adj)</option>
                  <option value="adv">Trạng từ (adv)</option>
                  <option value="phrase">Cụm từ</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Nghĩa tiếng Việt *</label>
              <input type="text" id="aw-meaning" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Chủ đề</label>
              <select id="aw-topic" class="form-select">
                <option value="general">Chung (General)</option>
                ${topics.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Câu ví dụ (tùy chọn)</label>
              <textarea id="aw-example" class="form-input" rows="2" placeholder="Example sentence in English"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Nghĩa câu ví dụ (tùy chọn)</label>
              <textarea id="aw-example-vi" class="form-input" rows="2" placeholder="Nghĩa tiếng Việt của câu ví dụ"></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-full mt-md">Lưu Từ Vựng</button>
          </form>
        </div>
      </div>
    `;

    this.bindEvents();
    this.renderVocabGrid();
  },

  bindEvents() {
    // Search
    const searchInput = document.getElementById('vocab-search');
    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderVocabGrid();
    });

    // Filters
    const chips = document.querySelectorAll('.filter-chips .chip');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        chips.forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.topic;
        this.renderVocabGrid();
      });
    });

    // Add Word Modal
    const modal = document.getElementById('add-word-modal');
    document.getElementById('btn-add-word').addEventListener('click', () => {
      modal.classList.add('active');
    });
    document.getElementById('close-add-word').addEventListener('click', () => {
      modal.classList.remove('active');
    });

    // Form Submit
    document.getElementById('add-word-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newWord = {
        word: document.getElementById('aw-word').value.trim(),
        phonetic: document.getElementById('aw-phonetic').value.trim(),
        pos: document.getElementById('aw-pos').value,
        meaning: document.getElementById('aw-meaning').value.trim(),
        topicId: document.getElementById('aw-topic').value,
        example: document.getElementById('aw-example').value.trim(),
        exampleVi: document.getElementById('aw-example-vi').value.trim()
      };

      const success = ZenStorage.addWord(newWord);
      
      if (success) {
        modal.classList.remove('active');
        e.target.reset();
        
        // Gamification reward
        Gamification.addXP(10, 'Thêm từ mới');
        
        // Refresh grid
        this.renderVocabGrid();
        
        // Auto select the new word's topic
        if (this.currentFilter !== 'all' && this.currentFilter !== newWord.topicId) {
           document.querySelector(`.chip[data-topic="${newWord.topicId}"]`)?.click();
        }
      } else {
        alert('Từ này đã có trong danh sách của bạn!');
      }
    });
  },

  renderVocabGrid() {
    const grid = document.getElementById('vocab-grid');
    let vocab = ZenStorage.getVocabulary();

    // Apply filters
    if (this.currentFilter !== 'all') {
      vocab = vocab.filter(v => v.topicId === this.currentFilter);
    }

    if (this.searchQuery) {
      vocab = vocab.filter(v => 
        v.word.toLowerCase().includes(this.searchQuery) || 
        v.meaning.toLowerCase().includes(this.searchQuery)
      );
    }

    if (vocab.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 40px;">
          <i class="fa-solid fa-ghost text-secondary" style="font-size: 3rem;"></i>
          <h3 class="mt-md">Không tìm thấy từ nào</h3>
          <p class="text-secondary">Hãy thử tìm kiếm khác hoặc thêm từ mới.</p>
        </div>
      `;
      return;
    }

    // Sort by addedAt descending
    vocab.sort((a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0));

    // Render cards
    grid.innerHTML = vocab.map((v, index) => {
      const isMastered = v.masteryLevel >= 80;
      const topic = ZenData.getTopicById(v.topicId);
      const topicName = topic ? topic.name : 'Chung';
      const topicColor = topic ? topic.color : 'var(--primary)';
      
      return `
        <div class="glass-card vocab-card p-md animate-scale-in" style="animation-delay: ${Math.min(index * 0.05, 0.5)}s">
          <div class="vocab-card-header flex justify-between">
            <span class="badge" style="background: ${topicColor}20; color: ${topicColor}; font-size: 0.7rem;">${topicName}</span>
            <div class="vocab-actions">
              <button class="btn-icon" onclick="VocabularyModule.playAudio('${v.word.replace(/'/g, "\\'")}')" title="Nghe phát âm">
                <i class="fa-solid fa-volume-high"></i>
              </button>
              ${v.isCustom ? `
                <button class="btn-icon text-error ml-sm" onclick="VocabularyModule.deleteWord('${v.word.replace(/'/g, "\\'")}')" title="Xóa">
                  <i class="fa-solid fa-trash"></i>
                </button>
              ` : ''}
            </div>
          </div>
          
          <h3 class="vocab-word mt-sm" style="font-size: 1.5rem; font-family: 'Outfit', sans-serif;">${v.word}</h3>
          ${v.phonetic ? `<div class="vocab-phonetic text-secondary" style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">${v.phonetic}</div>` : ''}
          
          <div class="vocab-meaning mt-sm mb-md">
            <span class="text-accent" style="font-size: 0.8rem; margin-right: 5px;">(${v.pos || '?'})</span>
            <strong>${v.meaning}</strong>
          </div>
          
          ${v.example ? `
            <div class="vocab-example mt-sm" style="font-size: 0.85rem; padding-top: 10px; border-top: 1px solid var(--border-primary);">
              <i>"${v.example}"</i>
              ${v.exampleVi ? `<div class="text-secondary mt-xs">${v.exampleVi}</div>` : ''}
            </div>
          ` : ''}
          
          ${v.isAdvanced ? `
            <div class="vocab-advanced mt-sm" style="font-size: 0.85rem; padding-top: 10px; border-top: 1px solid var(--border-primary); max-height: 150px; overflow-y: auto;">
              ${v.structures && v.structures.length > 0 ? `
                <div class="mb-sm">
                  <div class="text-secondary font-bold" style="font-size: 0.75rem; text-transform: uppercase;">Cấu trúc ngữ pháp:</div>
                  <ul style="padding-left: 15px; margin-top: 5px; list-style-type: none;">
                    ${v.structures.map(s => `
                      <li style="margin-bottom: 8px;">
                        <span class="text-accent font-mono">${s.formula}</span><br>
                        ${s.meaning ? `<span class="text-secondary">${s.meaning}</span><br>` : ''}
                        ${s.example ? `<i>"${s.example}"</i>` : ''}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}
              
              ${v.collocations && v.collocations.length > 0 ? `
                <div class="mb-sm">
                  <div class="text-secondary font-bold" style="font-size: 0.75rem; text-transform: uppercase;">Collocations & Cụm từ:</div>
                  <div class="flex flex-wrap gap-xs mt-xs">
                    ${v.collocations.map(c => `
                      <span style="background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); font-size: 0.8rem; margin-bottom: 4px;">${c}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              
              ${v.relatedForms && v.relatedForms.length > 0 ? `
                <div>
                  <div class="text-secondary font-bold" style="font-size: 0.75rem; text-transform: uppercase;">Từ loại liên quan:</div>
                  <ul style="padding-left: 0; margin-top: 5px; list-style-type: none;">
                    ${v.relatedForms.map(r => `
                      <li style="margin-bottom: 4px;">
                        <strong class="text-primary">${r.word}</strong> <span class="text-accent" style="font-size: 0.75rem;">(${r.pos})</span>: ${r.meaning}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          <div class="vocab-progress mt-md">
            <div class="flex justify-between" style="font-size: 0.75rem; margin-bottom: 4px;">
              <span class="text-secondary">Độ ghi nhớ</span>
              <span class="${isMastered ? 'text-success' : 'text-secondary'}">${v.masteryLevel || 0}%</span>
            </div>
            <div class="progress-bar-container" style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;">
              <div class="progress-bar-fill" style="width: ${v.masteryLevel || 0}%; background: ${isMastered ? 'var(--success)' : 'var(--primary)'}; height: 100%; border-radius: 2px; transition: width 0.3s;"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  playAudio(word) {
    const settings = ZenStorage.getSettings();
    if (settings && settings.ttsEnabled && 'speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(word);
      msg.lang = settings.voiceAccent || 'en-US';
      window.speechSynthesis.speak(msg);
    }
  },

  deleteWord(word) {
    if (confirm(`Bạn có chắc chắn muốn xóa từ "${word}" khỏi danh sách?`)) {
      ZenStorage.removeWord(word);
      this.renderVocabGrid();
    }
  }
};
