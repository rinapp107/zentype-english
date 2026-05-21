/* ============================================
   ZenType English — LocalStorage Manager
   ============================================ */

const ZenStorage = {
  keys: {
    VOCAB: 'zen_vocab',
    PROGRESS: 'zen_progress',
    HISTORY: 'zen_history',
    SETTINGS: 'zen_settings'
  },

  resolveKey(key) {
    if (key === this.keys.SETTINGS) return key;
    try {
      const settingsStr = localStorage.getItem(this.keys.SETTINGS);
      if (settingsStr) {
        const settings = JSON.parse(settingsStr);
        const lang = settings.language || 'en';
        if (lang === 'de') {
          if (key === this.keys.VOCAB) return 'zen_vocab_de';
          if (key === this.keys.PROGRESS) return 'zen_progress_de';
          if (key === this.keys.HISTORY) return 'zen_history_de';
        }
      }
    } catch (e) {
      console.error('Error parsing settings in resolveKey', e);
    }
    return key;
  },

  syncNewWords() {
    try {
      const settingsStr = localStorage.getItem(this.keys.SETTINGS);
      const settings = settingsStr ? JSON.parse(settingsStr) : {};
      const activeLang = settings.language || 'en';
      const dataObj = activeLang === 'de' ? ZenDataDE : ZenData;
      const vocabKey = this.resolveKey(this.keys.VOCAB);
      
      const currentVocab = this.getVocabulary();
      const allStaticWords = dataObj.getAllWords();
      let updated = false;

      allStaticWords.forEach(wordObj => {
        const index = currentVocab.findIndex(v => v.word.toLowerCase() === wordObj.word.toLowerCase());
        if (index === -1) {
          currentVocab.push({
            ...wordObj,
            addedAt: new Date().toISOString(),
            masteryLevel: 0,
            nextReview: new Date().toISOString(),
            reviewCount: 0,
            correctCount: 0,
            easeFactor: 2.5,
            interval: 0,
            isCustom: false
          });
          updated = true;
        } else {
          const stored = currentVocab[index];
          const merged = {
            ...wordObj,
            ...stored,
            topicId: wordObj.isAdvanced ? 'advanced' : (stored.topicId || wordObj.topicId),
            meaning: wordObj.meaning,
            pos: wordObj.pos,
            phonetic: wordObj.phonetic || stored.phonetic,
            example: wordObj.example || stored.example,
            exampleVi: wordObj.exampleVi || stored.exampleVi,
            structures: wordObj.structures || stored.structures,
            collocations: wordObj.collocations || stored.collocations,
            relatedForms: wordObj.relatedForms || stored.relatedForms,
            isAdvanced: wordObj.isAdvanced !== undefined ? wordObj.isAdvanced : stored.isAdvanced
          };
          
          if (JSON.stringify(stored) !== JSON.stringify(merged)) {
            currentVocab[index] = merged;
            updated = true;
          }
        }
      });

      if (updated) {
        localStorage.setItem(vocabKey, JSON.stringify(currentVocab));
        console.log(`[ZenStorage] Synced ${activeLang} vocabulary definitions successfully.`);
      }
    } catch (e) {
      console.error('[ZenStorage] Error syncing vocabulary:', e);
    }
  },

  init() {
    if (!localStorage.getItem(this.keys.SETTINGS)) {
      this.set(this.keys.SETTINGS, {
        theme: 'minimal-light',
        soundEnabled: true,
        ttsEnabled: true,
        voiceAccent: 'en-US',
        dailyGoal: 10,
        language: 'en'
      });
    } else {
      try {
        const settings = JSON.parse(localStorage.getItem(this.keys.SETTINGS));
        if (!settings.language) {
          settings.language = 'en';
          localStorage.setItem(this.keys.SETTINGS, JSON.stringify(settings));
        }
      } catch (e) {
        console.error(e);
      }
    }

    const vocabKey = this.resolveKey(this.keys.VOCAB);
    const progressKey = this.resolveKey(this.keys.PROGRESS);
    const historyKey = this.resolveKey(this.keys.HISTORY);

    if (!localStorage.getItem(vocabKey)) {
      const settingsStr = localStorage.getItem(this.keys.SETTINGS);
      const settings = settingsStr ? JSON.parse(settingsStr) : {};
      const activeLang = settings.language || 'en';
      const dataObj = activeLang === 'de' ? ZenDataDE : ZenData;
      
      const defaultVocab = dataObj.getAllWords().map(w => ({
        ...w,
        addedAt: new Date().toISOString(),
        masteryLevel: 0,
        nextReview: new Date().toISOString(),
        reviewCount: 0,
        correctCount: 0,
        easeFactor: 2.5,
        interval: 0,
        isCustom: false
      }));
      localStorage.setItem(vocabKey, JSON.stringify(defaultVocab));
    } else {
      this.syncNewWords();
    }

    if (!localStorage.getItem(progressKey)) {
      const defaultProgress = {
        totalWords: 0,
        masteredWords: 0,
        streakDays: 0,
        lastStudyDate: null,
        xp: 0,
        level: 1,
        badges: []
      };
      localStorage.setItem(progressKey, JSON.stringify(defaultProgress));
    }

    if (!localStorage.getItem(historyKey)) {
      localStorage.setItem(historyKey, JSON.stringify([]));
    }
  },

  // Core CRUD
  get(key, defaultValue = null) {
    const resolvedKey = this.resolveKey(key);
    try {
      const item = localStorage.getItem(resolvedKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return defaultValue;
    }
  },

  set(key, value) {
    const resolvedKey = this.resolveKey(key);
    try {
      localStorage.setItem(resolvedKey, JSON.stringify(value));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  },

  remove(key) {
    const resolvedKey = this.resolveKey(key);
    localStorage.removeItem(resolvedKey);
  },

  // --- Vocabulary ---
  getVocabulary() {
    return this.get(this.keys.VOCAB, []);
  },

  addWord(wordObj) {
    const vocab = this.getVocabulary();
    // Check if word exists
    if (vocab.some(v => v.word.toLowerCase() === wordObj.word.toLowerCase())) {
      return false; // Word exists
    }
    
    const newWord = {
      ...wordObj,
      addedAt: new Date().toISOString(),
      masteryLevel: 0,
      nextReview: new Date().toISOString(),
      reviewCount: 0,
      correctCount: 0,
      easeFactor: 2.5,
      interval: 0,
      isCustom: true
    };
    
    vocab.push(newWord);
    this.set(this.keys.VOCAB, vocab);
    return true;
  },

  removeWord(wordStr) {
    const vocab = this.getVocabulary();
    const newVocab = vocab.filter(v => v.word !== wordStr);
    this.set(this.keys.VOCAB, newVocab);
  },

  updateWord(wordStr, updates) {
    const vocab = this.getVocabulary();
    const index = vocab.findIndex(v => v.word === wordStr);
    if (index !== -1) {
      vocab[index] = { ...vocab[index], ...updates };
      this.set(this.keys.VOCAB, vocab);
    }
  },

  // --- Spaced Repetition (SM-2) ---
  getReviewQueue() {
    const vocab = this.getVocabulary();
    const now = new Date();
    return vocab.filter(v => new Date(v.nextReview) <= now)
                .sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));
  },

  updateReviewData(wordStr, quality) {
    // Quality: 0 (Blackout), 1 (Incorrect, remembered), 2 (Incorrect, seemed easy), 
    // 3 (Correct, hard), 4 (Correct, hesitation), 5 (Correct, easy)
    const vocab = this.getVocabulary();
    const index = vocab.findIndex(v => v.word === wordStr);
    if (index === -1) return;

    const word = vocab[index];
    let { easeFactor, interval, reviewCount, correctCount } = word;

    if (quality < 3) {
      // Failed
      interval = 1;
      reviewCount++;
    } else {
      // Succeeded
      correctCount++;
      if (reviewCount === 0) {
        interval = 1;
      } else if (reviewCount === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      reviewCount++;
    }

    // Update ease factor
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    // Calculate next review date
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    // Calculate mastery (0-100%)
    let masteryLevel = Math.min(100, Math.round((easeFactor - 1.3) / 1.2 * 100));
    if (masteryLevel < 0) masteryLevel = 0;

    vocab[index] = {
      ...word,
      easeFactor,
      interval,
      reviewCount,
      correctCount,
      nextReview: nextReview.toISOString(),
      masteryLevel,
      lastReviewed: new Date().toISOString()
    };

    this.set(this.keys.VOCAB, vocab);
    return vocab[index];
  },

  // --- Progress & Stats ---
  getProgress() {
    return this.get(this.keys.PROGRESS);
  },

  updateProgress(updates) {
    const prog = this.getProgress();
    this.set(this.keys.PROGRESS, { ...prog, ...updates });
  },

  // --- History ---
  getHistory() {
    return this.get(this.keys.HISTORY, []);
  },

  addHistory(entry) {
    const history = this.getHistory();
    history.unshift({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...entry
    });
    // Keep only last 100 entries to save space
    if (history.length > 100) history.pop();
    this.set(this.keys.HISTORY, history);
  },

  clearHistory() {
    this.set(this.keys.HISTORY, []);
  },

  // --- Settings ---
  getSettings() {
    return this.get(this.keys.SETTINGS);
  },

  updateSettings(updates) {
    const settings = this.getSettings();
    this.set(this.keys.SETTINGS, { ...settings, ...updates });
  },

  // --- Export/Import ---
  exportAll() {
    return JSON.stringify({
      vocab: this.get(this.keys.VOCAB),
      progress: this.get(this.keys.PROGRESS),
      history: this.get(this.keys.HISTORY),
      settings: this.get(this.keys.SETTINGS)
    });
  },

  importAll(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.vocab) this.set(this.keys.VOCAB, data.vocab);
      if (data.progress) this.set(this.keys.PROGRESS, data.progress);
      if (data.history) this.set(this.keys.HISTORY, data.history);
      if (data.settings) this.set(this.keys.SETTINGS, data.settings);
      return true;
    } catch (e) {
      console.error('Invalid import data', e);
      return false;
    }
  },
  
  // Nuke everything
  resetAll() {
    localStorage.clear();
    this.init();
  }
};
