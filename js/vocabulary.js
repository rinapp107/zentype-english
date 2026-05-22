/* ============================================
   ZenType English — Vocabulary Module
   ============================================ */

window.VocabularyModule = {
  currentFilter: 'all',
  searchQuery: '',

  render(container) {
    this.container = container;
    const vocab = ZenStorage.getVocabulary();
    const topics = getActiveZenData().topics;

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
      const topic = getActiveZenData().getTopicById(v.topicId);
      const topicName = topic ? topic.name : 'Chung';
      const topicColor = topic ? topic.color : 'var(--primary)';
      
      return `
        <div class="glass-card vocab-card p-md animate-scale-in" style="animation-delay: ${Math.min(index * 0.05, 0.5)}s" onclick="VocabularyModule.showWordDetail('${v.word.replace(/'/g, "\\'")}', event)">
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
  },

  showWordDetail(wordStr, event) {
    if (event && (event.target.closest('.vocab-actions') || event.target.closest('.btn-icon'))) {
      return;
    }

    const vocab = ZenStorage.getVocabulary();
    const wordObj = vocab.find(v => v.word.toLowerCase() === wordStr.toLowerCase());
    if (!wordObj) return;

    let overlay = document.getElementById('word-detail-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'word-detail-modal';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }
    overlay.classList.add('active');

    this.activeWordObj = wordObj;
    this.renderWordDetail(overlay, wordObj);
  },

  closeWordDetail() {
    const overlay = document.getElementById('word-detail-modal');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.innerHTML = '';
    }
    this.activeWordObj = null;
    this.practiceState = null;
  },

  parseMeaningToDomains(meaningString, pos) {
    if (!meaningString) return [];
    const parts = meaningString.split('/').map(s => s.trim());
    
    const domainMap = [
      { key: 'doanh thu', domain: 'Tài chính' },
      { key: 'lợi nhuận', domain: 'Tài chính' },
      { key: 'hóa đơn', domain: 'Kế toán' },
      { key: 'ngân sách', domain: 'Tài chính' },
      { key: 'hợp đồng', domain: 'Pháp lý' },
      { key: 'tuyển dụng', domain: 'Nhân sự' },
      { key: 'nhân sự', domain: 'Nhân sự' },
      { key: 'thăng chức', domain: 'Nhân sự' },
      { key: 'quản lý', domain: 'Quản lý' },
      { key: 'quản trị', domain: 'Quản lý' },
      { key: 'thúc đẩy', domain: 'Quản lý' },
      { key: 'quảng bá', domain: 'Marketing' },
      { key: 'tiếp thị', domain: 'Marketing' },
      { key: 'quảng cáo', domain: 'Marketing' },
      { key: 'sáp nhập', domain: 'Quản trị Doanh nghiệp' },
      { key: 'đàm phán', domain: 'Thương mại' },
      { key: 'thương lượng', domain: 'Thương mại' },
      { key: 'giao dịch', domain: 'Thương mại' },
      { key: 'sức khỏe', domain: 'Y tế' },
      { key: 'điều trị', domain: 'Y tế' },
      { key: 'bệnh', domain: 'Y tế' },
      { key: 'du lịch', domain: 'Du lịch' },
      { key: 'khách sạn', domain: 'Du lịch' },
      { key: 'sân bay', domain: 'Giao thông' },
      { key: 'bay', domain: 'Giao thông' },
      { key: 'khoa học', domain: 'Khoa học' },
      { key: 'nghiên cứu', domain: 'Khoa học' },
      { key: 'thực nghiệm', domain: 'Khoa học' },
      { key: 'bằng sáng chế', domain: 'Sở hữu trí tuệ' },
      { key: 'công nghệ', domain: 'Công nghệ' },
      { key: 'lập trình', domain: 'Công nghệ' },
      { key: 'phát âm', domain: 'Ngôn ngữ học' },
      { key: 'dịch', domain: 'Ngôn ngữ học' }
    ];
    
    return parts.map(part => {
      let domain = 'Thông dụng';
      for (const item of domainMap) {
        if (part.toLowerCase().includes(item.key)) {
          domain = item.domain;
          break;
        }
      }
      return { meaning: part, domain: domain };
    });
  },

  getRandomDistractors(correctWordStr, count) {
    const vocab = ZenStorage.getVocabulary();
    let pool = vocab.filter(v => v.word.toLowerCase() !== correctWordStr.toLowerCase());
    
    if (pool.length < count) {
      getActiveZenData().topics.forEach(t => {
        t.words.forEach(w => {
          if (w.word.toLowerCase() !== correctWordStr.toLowerCase() && !pool.some(p => p.word.toLowerCase() === w.word.toLowerCase())) {
            pool.push(w);
          }
        });
      });
    }
    
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(v => v.meaning.split('/')[0].trim());
  },

  getWordDistractors(correctWordStr, count) {
    const vocab = ZenStorage.getVocabulary();
    let pool = vocab.filter(v => v.word.toLowerCase() !== correctWordStr.toLowerCase());
    if (pool.length < count) {
      getActiveZenData().topics.forEach(t => {
        t.words.forEach(w => {
          if (w.word.toLowerCase() !== correctWordStr.toLowerCase() && !pool.some(p => p.word.toLowerCase() === w.word.toLowerCase())) {
            pool.push(w);
          }
        });
      });
    }
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(v => v.word);
  },

  renderWordDetail(overlay, wordObj) {
    const isMastered = (wordObj.masteryLevel || 0) >= 80;
    const parsedMeanings = this.parseMeaningToDomains(wordObj.meaning, wordObj.pos);
    
    const structures = wordObj.structures || [];
    const collocations = wordObj.collocations || [];
    const relatedForms = wordObj.relatedForms || [];
    
    let detailsHtml = `
      <div class="modal animate-scale-in" style="max-width: 600px; padding: var(--space-lg);">
        <div class="modal-header">
          <h3 class="modal-title">Chi Tiết Từ Vựng</h3>
          <button class="modal-close" onclick="VocabularyModule.closeWordDetail()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body mt-md" style="max-height: 480px; overflow-y: auto; padding-right: 5px;">
          
          <div class="detail-header-section mb-md">
            <div>
              <h2 style="font-family: 'Outfit', sans-serif; font-size: 2.2rem; margin: 0; color: var(--text-primary); display: inline-block; vertical-align: middle;">${wordObj.word}</h2>
              <span class="text-accent font-bold" style="font-size: 1.1rem; margin-left: 10px; vertical-align: middle;">(${wordObj.pos || '?'})</span>
              ${wordObj.phonetic ? `<div class="text-secondary mt-xs" style="font-family: 'JetBrains Mono', monospace; font-size: 0.95rem;">${wordObj.phonetic}</div>` : ''}
            </div>
            <button class="detail-pronounce-btn" onclick="VocabularyModule.playAudio('${wordObj.word.replace(/'/g, "\\'")}')" title="Nghe phát âm">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>

          <!-- Mastery progress -->
          <div class="vocab-progress mb-lg" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-primary); padding: var(--space-md); border-radius: var(--radius-md);">
            <div class="flex justify-between" style="font-size: 0.8rem; margin-bottom: 6px;">
              <span class="text-secondary">Tiến độ ghi nhớ</span>
              <span class="${isMastered ? 'text-success' : 'text-secondary'} font-bold">${wordObj.masteryLevel || 0}%</span>
            </div>
            <div class="progress-bar-container" style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px;">
              <div style="width: ${wordObj.masteryLevel || 0}%; background: ${isMastered ? 'var(--success)' : 'var(--primary)'}; height: 100%; border-radius: 3px;"></div>
            </div>
          </div>

          <!-- Multi meanings and domains -->
          <div class="mb-lg">
            <h4 class="mb-sm text-primary"><i class="fa-solid fa-tags mr-xs"></i> Nghĩa & Chuyên ngành bổ trợ:</h4>
            <div class="detail-meanings-list">
              ${parsedMeanings.map(pm => {
                let domainClass = 'domain-general';
                if (pm.domain.includes('Tài chính') || pm.domain.includes('Kế toán')) domainClass = 'domain-finance';
                else if (pm.domain.includes('Marketing') || pm.domain.includes('Thương mại')) domainClass = 'domain-marketing';
                else if (pm.domain.includes('Nhân sự') || pm.domain.includes('Quản lý')) domainClass = 'domain-hr';
                
                return `
                  <div class="detail-meaning-item">
                    <span class="detail-domain-tag ${domainClass}">${pm.domain}</span>
                    <span class="detail-meaning-text">${pm.meaning}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Example sentence -->
          ${wordObj.example ? `
            <div class="mb-lg">
              <h4 class="mb-sm text-primary"><i class="fa-solid fa-quote-left mr-xs"></i> Câu ví dụ minh họa:</h4>
              <div class="detail-example-box">
                <div style="font-size: 1rem; font-weight: 500; margin-bottom: 5px; color: var(--text-primary);">"${wordObj.example}"</div>
                ${wordObj.exampleVi ? `<div class="text-secondary" style="font-size: 0.85rem;">${wordObj.exampleVi}</div>` : ''}
              </div>
            </div>
          ` : ''}

          <!-- Grammar & Collocations for advanced words -->
          ${structures.length > 0 ? `
            <div class="mb-lg">
              <h4 class="mb-sm text-primary"><i class="fa-solid fa-gears mr-xs"></i> Cấu trúc ngữ pháp liên quan:</h4>
              <ul style="padding-left: 15px; list-style-type: none;">
                ${structures.map(s => `
                  <li style="margin-bottom: 12px; padding: var(--space-sm); background: rgba(255,255,255,0.01); border: 1px dashed var(--border-primary); border-radius: var(--radius-sm);">
                    <span class="text-accent font-mono" style="font-weight: 600;">${s.formula}</span><br>
                    ${s.meaning ? `<span class="text-secondary" style="font-size: 0.85rem;">→ Nghĩa: ${s.meaning}</span><br>` : ''}
                    ${s.example ? `<i class="text-secondary" style="font-size: 0.8rem; display: block; margin-top: 4px;">"${s.example}"</i>` : ''}
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          ${collocations.length > 0 ? `
            <div class="mb-lg">
              <h4 class="mb-sm text-primary"><i class="fa-solid fa-link mr-xs"></i> Collocations thường gặp:</h4>
              <div class="flex flex-wrap gap-xs">
                ${collocations.map(c => `
                  <span style="background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-primary); font-size: 0.85rem;">${c}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${relatedForms.length > 0 ? `
            <div class="mb-lg">
              <h4 class="mb-sm text-primary"><i class="fa-solid fa-network-wired mr-xs"></i> Các từ loại liên quan khác:</h4>
              <ul style="padding-left: 0; list-style-type: none; display: flex; flex-direction: column; gap: 6px;">
                ${relatedForms.map(rf => `
                  <li style="font-size: 0.9rem; padding: 6px var(--space-sm); background: rgba(255,255,255,0.01); border-radius: var(--radius-sm);">
                    <strong class="text-primary">${rf.word}</strong> <span class="text-accent" style="font-size: 0.75rem;">(${rf.pos})</span>: <span class="text-secondary">${rf.meaning}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

        </div>
        <div class="modal-footer flex gap-md mt-lg" style="border-top: 1px solid var(--border-primary); padding-top: var(--space-md);">
          <button class="btn btn-primary w-full" onclick="VocabularyModule.startMicroPractice()"><i class="fa-solid fa-bolt"></i> Luyện tập riêng từ này</button>
          <button class="btn btn-secondary w-full" onclick="VocabularyModule.closeWordDetail()">Đóng lại</button>
        </div>
      </div>
    `;
    overlay.innerHTML = detailsHtml;
  },

  startMicroPractice() {
    const wordObj = this.activeWordObj;
    if (!wordObj) return;

    const correctMeaning = wordObj.meaning.split('/')[0].trim();
    const options1 = this.getRandomDistractors(wordObj.word, 3);
    options1.push(correctMeaning);
    const shuffledOptions1 = options1.sort(() => Math.random() - 0.5);

    const exampleText = wordObj.example || `We should study the word ________ to improve our skills.`;
    const blankSentence = exampleText.replace(new RegExp('\\b' + wordObj.word + '\\b', 'gi'), '______');
    const options2 = this.getWordDistractors(wordObj.word, 3);
    options2.push(wordObj.word);
    const shuffledOptions2 = options2.sort(() => Math.random() - 0.5);

    this.practiceState = {
      wordObj: wordObj,
      step: 1,
      correctCount: 0,
      ex1: {
        question: `Từ "${wordObj.word}" có nghĩa là gì?`,
        options: shuffledOptions1,
        correctIndex: shuffledOptions1.indexOf(correctMeaning)
      },
      ex2: {
        question: `Chọn từ thích hợp điền vào chỗ trống:<br><br><i>"${blankSentence}"</i>`,
        options: shuffledOptions2,
        correctIndex: shuffledOptions2.indexOf(wordObj.word)
      },
      ex3: {
        question: `Nghe phát âm & Gõ lại từ tiếng Anh tương ứng với nghĩa:<br><strong class="text-primary">${wordObj.meaning}</strong> (${wordObj.pos})`,
        correctAnswer: wordObj.word
      }
    };

    this.playAudio(wordObj.word);
    this.renderPracticeStep();
  },

  renderPracticeStep() {
    const overlay = document.getElementById('word-detail-modal');
    if (!overlay) return;
    const state = this.practiceState;
    const wordObj = state.wordObj;
    const progressPercent = Math.round(((state.step - 1) / 3) * 100);

    let stepHtml = '';

    if (state.step === 1) {
      stepHtml = `
        <div class="practice-step-container">
          <p class="mb-md font-bold" style="font-size: 1.15rem;">${state.ex1.question}</p>
          <div class="quiz-options flex flex-col gap-sm">
            ${state.ex1.options.map((opt, idx) => `
              <button class="practice-option-btn" onclick="VocabularyModule.checkPracticeAnswer(1, ${idx})">
                <span class="opt-label font-bold text-accent">${String.fromCharCode(65 + idx)}.</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (state.step === 2) {
      stepHtml = `
        <div class="practice-step-container">
          <p class="mb-md font-bold" style="font-size: 1.15rem;">${state.ex2.question}</p>
          <div class="quiz-options flex flex-col gap-sm">
            ${state.ex2.options.map((opt, idx) => `
              <button class="practice-option-btn" onclick="VocabularyModule.checkPracticeAnswer(2, ${idx})">
                <span class="opt-label font-bold text-accent">${String.fromCharCode(65 + idx)}.</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (state.step === 3) {
      stepHtml = `
        <div class="practice-step-container">
          <p class="mb-md font-bold text-center" style="font-size: 1.15rem;">${state.ex3.question}</p>
          
          <div class="flex justify-center mb-md">
            <button class="btn-icon" onclick="VocabularyModule.playAudio('${wordObj.word.replace(/'/g, "\\'")}')" style="background: var(--bg-glass); width: 50px; height: 50px; border-radius: 50%; font-size: 1.2rem;">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>

          <div class="form-group">
            <input type="text" id="practice-spelling-input" class="form-input" placeholder="Gõ lại từ tiếng Anh..." autocomplete="off" style="text-align: center; font-size: 1.3rem; font-family: 'Outfit', sans-serif; letter-spacing: 1px;" onkeydown="if(event.key === 'Enter') VocabularyModule.checkPracticeTyping()">
          </div>
          <div id="spelling-feedback-area"></div>
          <button class="btn btn-primary w-full mt-md" onclick="VocabularyModule.checkPracticeTyping()">Kiểm tra đáp án</button>
        </div>
      `;
    } else if (state.step === 4) {
      stepHtml = `
        <div class="text-center p-lg animate-scale-in">
          <div class="success-icon" style="width: 80px; height: 80px; background: rgba(16,185,129,0.15); color: var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-lg); font-size: 3rem;">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h3 style="font-size: 1.6rem; font-family: 'Outfit', sans-serif;">Hoàn Thành Luyện Tập!</h3>
          <p class="text-secondary mt-sm">Chúc mừng bạn đã hoàn thành bài tập riêng cho từ: <strong>${wordObj.word}</strong>.</p>
          
          <div class="flex justify-center gap-lg mt-lg">
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-primary); padding: 12px 20px; border-radius: 8px; min-width: 110px;">
              <span class="block text-secondary" style="font-size: 0.75rem;">Kết quả</span>
              <strong style="font-size: 1.3rem;">${state.correctCount}/3 Đúng</strong>
            </div>
            <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); padding: 12px 20px; border-radius: 8px; min-width: 110px;">
              <span class="block text-secondary" style="font-size: 0.75rem;">Phần thưởng</span>
              <strong style="font-size: 1.3rem; color: var(--accent);">+5 XP</strong>
            </div>
          </div>
        </div>
      `;
    }

    overlay.innerHTML = `
      <div class="modal animate-scale-in" style="max-width: 500px; padding: var(--space-lg);">
        <div class="modal-header">
          <h3 class="modal-title">Luyện tập: ${wordObj.word}</h3>
          <button class="modal-close" onclick="VocabularyModule.closeWordDetail()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="progress-bar-container mt-sm mb-lg" style="height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px;">
          <div style="width: ${progressPercent}%; background: var(--primary); height: 100%; border-radius: 3px; transition: width 0.3s;"></div>
        </div>
        <div class="modal-body">
          ${stepHtml}
        </div>
        ${state.step === 4 ? `
          <div class="modal-footer flex gap-md mt-lg">
            <button class="btn btn-primary w-full" onclick="VocabularyModule.completePractice()">Hoàn thành</button>
          </div>
        ` : ''}
      </div>
    `;

    if (state.step === 3) {
      setTimeout(() => {
        document.getElementById('practice-spelling-input')?.focus();
      }, 100);
    }
  },

  checkPracticeAnswer(stepNum, selectedIndex) {
    const state = this.practiceState;
    const isEx1 = stepNum === 1;
    const qData = isEx1 ? state.ex1 : state.ex2;
    const correctIndex = qData.correctIndex;
    const optionBtns = document.querySelectorAll('.practice-option-btn');

    optionBtns.forEach(btn => btn.style.pointerEvents = 'none');

    const isCorrect = selectedIndex === correctIndex;
    if (isCorrect) {
      optionBtns[selectedIndex].classList.add('correct');
      state.correctCount++;
      Gamification.playDingSound();
    } else {
      optionBtns[selectedIndex].classList.add('incorrect');
      optionBtns[correctIndex].classList.add('correct');
    }

    setTimeout(() => {
      state.step++;
      this.renderPracticeStep();
    }, 1500);
  },

  checkPracticeTyping() {
    const state = this.practiceState;
    const input = document.getElementById('practice-spelling-input');
    const feedbackArea = document.getElementById('spelling-feedback-area');
    if (!input || !feedbackArea) return;

    const userAns = input.value.trim().toLowerCase();
    const correctAns = state.ex3.correctAnswer.toLowerCase();
    
    if (!userAns) return;

    input.disabled = true;

    const isCorrect = userAns === correctAns;
    if (isCorrect) {
      feedbackArea.innerHTML = `
        <div class="spelling-feedback correct mt-sm">
          <i class="fa-solid fa-circle-check"></i> Rất chính xác!
        </div>
      `;
      state.correctCount++;
      Gamification.playDingSound();
    } else {
      feedbackArea.innerHTML = `
        <div class="spelling-feedback incorrect mt-sm">
          <i class="fa-solid fa-circle-xmark"></i> Sai rồi! Đáp án đúng: <span style="font-family: monospace;">${state.ex3.correctAnswer}</span>
        </div>
      `;
    }

    setTimeout(() => {
      state.step++;
      this.renderPracticeStep();
    }, 2000);
  },

  completePractice() {
    const state = this.practiceState;
    const wordObj = state.wordObj;

    Gamification.addXP(5, `Luyện tập riêng từ: ${wordObj.word}`);

    const newMastery = Math.min(100, (wordObj.masteryLevel || 0) + 10);
    ZenStorage.updateWord(wordObj.word, { masteryLevel: newMastery });

    this.renderVocabGrid();
    this.showWordDetail(wordObj.word);
  }
};
