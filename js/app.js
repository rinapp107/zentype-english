/**
 * RinType English - Core Typing Engine & App Logic
 */

class RinTypeApplication {
  constructor() {
    // State management
    this.activeMode = 'vocabulary'; // vocabulary | phrases | stories
    this.wordLimit = 10;            // 10 | 20 | 30 | 50
    this.practiceType = 'words';    // words | time
    this.practiceValue = 10;        // 10, 25, 50 words OR 15, 30, 60 seconds
    this.timerSeconds = 0;
    this.storyIndex = 0;            // Index of selected story

    this.words = [];                // List of words to type (array of objects or strings)
    this.wordStrings = [];          // Pure string representation of words
    
    // Caret and typing progression
    this.wordIndex = 0;
    this.charIndex = 0;
    
    // Keystroke statistics
    this.startTime = null;
    this.timerInterval = null;
    this.isTestActive = false;
    this.isTestFinished = false;

    this.correctKeystrokes = 0;
    this.totalKeystrokes = 0;
    
    // Config states
    this.ttsEnabled = true;
    this.voiceLang = 'en-US';
    
    // DOM Elements cache
    this.dom = {};
  }

  /**
   * Initializes the application and caches DOM nodes
   */
  init() {
    this.cacheDom();
    this.bindEvents();
    
    // Load and render stories in dropdown
    this.setupStoryDropdown();
    
    // Load historical stats
    this.loadHistory();
    
    // Reset/Start the first test session
    this.resetTest();
  }

  cacheDom() {
    this.dom.typingInput = document.getElementById('typing-input');
    this.dom.typingBox = document.getElementById('typing-box');
    this.dom.wordsWrapper = document.getElementById('words-wrapper');
    this.dom.typingCaret = document.getElementById('typing-caret');
    this.dom.focusPrompt = document.getElementById('focus-prompt');
    this.dom.btnReset = document.getElementById('btn-reset');
    
    // Stat HUDs
    this.dom.liveWpm = document.getElementById('live-wpm');
    this.dom.liveAccuracy = document.getElementById('live-accuracy');
    this.dom.liveTimer = document.getElementById('live-timer');
    
    // Dictionary Card
    this.dom.dictCard = document.getElementById('dict-card');
    this.dom.dictWord = document.getElementById('dict-word');
    this.dom.dictPos = document.getElementById('dict-pos');
    this.dom.dictIpa = document.getElementById('dict-ipa');
    this.dom.dictDefinition = document.getElementById('dict-definition');
    this.dom.btnSpeakWord = document.getElementById('btn-speak-word');
    
    // Toolbar elements
    this.dom.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.dom.soundSelect = document.getElementById('sound-select');
    this.dom.btnTtsToggle = document.getElementById('btn-tts-toggle');
    this.dom.voiceAccent = document.getElementById('voice-accent');
    this.dom.themeSelect = document.getElementById('theme-select');
    
    // Tabs & Options
    this.dom.tabs = document.querySelectorAll('.nav-tab');
    this.dom.optionsCount = document.getElementById('options-count');
    this.dom.optionsStories = document.getElementById('options-stories');
    this.dom.optionsRoadmap = document.getElementById('options-roadmap');
    this.dom.roadmapLevelSelect = document.getElementById('roadmap-level-select');
    this.dom.roadmapStepSelect = document.getElementById('roadmap-step-select');
    this.dom.optionBtns = document.querySelectorAll('#options-count .option-btn');
    this.dom.storySelect = document.getElementById('story-select');
    
    // Analytics Dashboard
    this.dom.btnClearHistory = document.getElementById('btn-clear-history');
    this.dom.statsTotalTests = document.getElementById('stats-total-tests');
    this.dom.statsPeakWpm = document.getElementById('stats-peak-wpm');
    this.dom.statsAvgWpm = document.getElementById('stats-avg-wpm');
    this.dom.statsAvgAccuracy = document.getElementById('stats-avg-accuracy');
    this.dom.historyTableBody = document.getElementById('history-table-body');

    // Main selector & Game container caching
    this.dom.btnModePractice = document.getElementById('btn-mode-practice');
    this.dom.btnModeGame = document.getElementById('btn-mode-game');
    this.dom.gameArenaSection = document.getElementById('game-arena-section');
    this.dom.btnStartGame = document.getElementById('btn-start-game');
    this.dom.btnRestartGame = document.getElementById('btn-restart-game');
  }

  bindEvents() {
    // Typing input focus management
    this.dom.focusPrompt.addEventListener('click', () => this.focusInput());
    this.dom.typingBox.addEventListener('click', () => this.focusInput());
    
    this.dom.typingInput.addEventListener('blur', () => this.showFocusOverlay());
    this.dom.typingInput.addEventListener('focus', () => this.hideFocusOverlay());
    
    // Real-time input stream
    this.dom.typingInput.addEventListener('input', (e) => this.handleInput(e));
    this.dom.typingInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
    
    // Window keyboard styling listener (for virtual keyboard feedback)
    window.addEventListener('keydown', (e) => this.animateVirtualKey(e, true));
    window.addEventListener('keyup', (e) => this.animateVirtualKey(e, false));
    
    // Reset buttons
    this.dom.btnReset.addEventListener('click', () => this.resetTest());
    
    // Keybind listeners: Tab + Enter to reset quickly
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        this.resetTest();
      }
    });

    // Navigation Tabs
    this.dom.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.dom.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeMode = tab.dataset.mode;
        
        // Show/hide suboptions based on mode
        if (this.activeMode === 'stories') {
          this.dom.optionsCount.style.display = 'none';
          this.dom.optionsStories.style.display = 'flex';
          this.dom.optionsRoadmap.style.display = 'none';
        } else if (this.activeMode === 'roadmap') {
          this.dom.optionsCount.style.display = 'none';
          this.dom.optionsStories.style.display = 'none';
          this.dom.optionsRoadmap.style.display = 'flex';
        } else {
          this.dom.optionsCount.style.display = 'flex';
          this.dom.optionsStories.style.display = 'none';
          this.dom.optionsRoadmap.style.display = 'none';
        }
        
        this.resetTest();
      });
    });

    // Roadmap Selectors
    this.dom.roadmapLevelSelect.addEventListener('change', () => this.resetTest());
    this.dom.roadmapStepSelect.addEventListener('change', () => this.resetTest());

    // Sub-options practice mode selector
    this.dom.optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.optionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        this.practiceType = btn.dataset.type || 'words';
        this.practiceValue = parseInt(btn.dataset.value);
        if (this.practiceType === 'words') {
          this.wordLimit = this.practiceValue;
        }
        this.resetTest();
      });
    });

    // Practice vs Game Mode Switcher
    if (this.dom.btnModePractice && this.dom.btnModeGame) {
      this.dom.btnModePractice.addEventListener('click', () => {
        this.dom.btnModePractice.classList.add('active');
        this.dom.btnModeGame.classList.remove('active');
        
        // Show practice panels, hide game
        if (this.dom.gameArenaSection) this.dom.gameArenaSection.style.display = 'none';
        document.querySelector('.mode-navigation').style.display = 'block';
        document.querySelector('.stats-hud').style.display = 'grid';
        document.querySelector('.typing-arena-container').style.display = 'block';
        document.querySelector('.analytics-dashboard').style.display = 'block';
        
        // Stop game loop
        if (window.RinTypeSpaceShooter) window.RinTypeSpaceShooter.stop();
        this.resetTest();
      });

      this.dom.btnModeGame.addEventListener('click', () => {
        this.dom.btnModeGame.classList.add('active');
        this.dom.btnModePractice.classList.remove('active');
        
        // Hide practice panels, show game
        if (this.dom.gameArenaSection) this.dom.gameArenaSection.style.display = 'flex';
        document.querySelector('.mode-navigation').style.display = 'none';
        document.querySelector('.stats-hud').style.display = 'none';
        document.querySelector('.typing-arena-container').style.display = 'none';
        document.querySelector('.analytics-dashboard').style.display = 'none';
        
        // Pause practice test
        clearInterval(this.timerInterval);
        this.isTestActive = false;
        
        // Initialize Space Shooter Canvas
        if (window.RinTypeSpaceShooter) window.RinTypeSpaceShooter.init('game-canvas');
      });

      // Game start & restart triggers
      if (this.dom.btnStartGame) {
        this.dom.btnStartGame.addEventListener('click', () => {
          if (window.RinTypeSpaceShooter) window.RinTypeSpaceShooter.start();
        });
      }
      if (this.dom.btnRestartGame) {
        this.dom.btnRestartGame.addEventListener('click', () => {
          if (window.RinTypeSpaceShooter) window.RinTypeSpaceShooter.start();
        });
      }
    }

    // Story dropdown selection
    this.dom.storySelect.addEventListener('change', (e) => {
      this.storyIndex = parseInt(e.target.value);
      this.resetTest();
    });

    // Sound toggle and selector
    this.dom.btnSoundToggle.addEventListener('click', () => {
      const isMuted = window.RinTypeAudio.toggleMute();
      this.dom.btnSoundToggle.classList.toggle('active', !isMuted);
      const icon = this.dom.btnSoundToggle.querySelector('i');
      if (isMuted) {
        icon.className = 'fa-solid fa-volume-xmark';
      } else {
        icon.className = 'fa-solid fa-volume-high';
      }
      this.focusInput();
    });
    
    this.dom.soundSelect.addEventListener('change', (e) => {
      window.RinTypeAudio.setStyle(e.target.value);
      this.focusInput();
    });

    // TTS voice controls
    this.dom.btnTtsToggle.addEventListener('click', () => {
      this.ttsEnabled = !this.ttsEnabled;
      this.dom.btnTtsToggle.classList.toggle('active', this.ttsEnabled);
      const icon = this.dom.btnTtsToggle.querySelector('i');
      icon.className = this.ttsEnabled ? 'fa-solid fa-ear-listen text-accent' : 'fa-solid fa-ear-deaf';
      this.focusInput();
    });

    this.dom.voiceAccent.addEventListener('change', (e) => {
      this.voiceLang = e.target.value;
      this.focusInput();
    });

    // Theme selector
    this.dom.themeSelect.addEventListener('change', (e) => {
      document.documentElement.setAttribute('data-theme', e.target.value);
      this.focusInput();
      setTimeout(() => this.updateCaret(), 150); // recalculate caret on theme styles adjustment
    });

    // Pronunciation trigger buttons
    this.dom.btnSpeakWord.addEventListener('click', () => {
      this.speakActiveWord();
      this.focusInput();
    });

    // Clear history
    this.dom.btnClearHistory.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử luyện tập không?')) {
        localStorage.removeItem('rintype_history');
        this.loadHistory();
      }
      this.focusInput();
    });

    // Recalculate caret on resize
    window.addEventListener('resize', () => this.updateCaret());
  }

  focusInput() {
    if (!this.isTestFinished) {
      this.dom.typingInput.focus();
    }
  }

  showFocusOverlay() {
    if (!this.isTestFinished) {
      this.dom.focusPrompt.classList.add('active');
    }
  }

  hideFocusOverlay() {
    this.dom.focusPrompt.classList.remove('active');
  }

  setupStoryDropdown() {
    this.dom.storySelect.innerHTML = '';
    window.RINTYPE_DATABASE.stories.forEach((story, idx) => {
      const option = document.createElement('option');
      option.value = idx;
      option.textContent = story.title;
      this.dom.storySelect.appendChild(option);
    });
  }

  /**
   * Generates target text for the selected mode
   */
  generateWords() {
    const db = window.RINTYPE_DATABASE;
    this.words = [];
    this.wordStrings = [];
    const targetLimit = this.practiceType === 'time' ? 50 : this.wordLimit;

    if (this.activeMode === 'vocabulary') {
      // Pick random oxford/tech vocab
      const list = [...db.vocabulary];
      // Shuffle array
      const shuffled = list.sort(() => 0.5 - Math.random());
      this.words = shuffled.slice(0, Math.min(targetLimit, shuffled.length));
      this.wordStrings = this.words.map(w => w.word);

    } else if (this.activeMode === 'phrases') {
      // Pick random phrases
      const list = [...db.phrases];
      const shuffled = list.sort(() => 0.5 - Math.random());
      // Pick a phrase and slice words out of it
      let count = 0;
      let phraseIdx = 0;
      while (count < targetLimit && phraseIdx < shuffled.length) {
        const phrase = shuffled[phraseIdx++];
        this.words.push(phrase); // Hold ref
        const splitWords = phrase.text.split(' ');
        splitWords.forEach(w => {
          this.wordStrings.push(w);
        });
        count += splitWords.length;
      }
      // Trim to limit
      this.wordStrings = this.wordStrings.slice(0, targetLimit);

    } else if (this.activeMode === 'stories') {
      // Load full story block
      const story = db.stories[this.storyIndex];
      this.words = [story];
      this.wordStrings = story.text.split(' ');
    } else if (this.activeMode === 'roadmap') {
      const levelKey = this.dom.roadmapLevelSelect.value;
      const stepKey = this.dom.roadmapStepSelect.value;
      const levelData = db.roadmap[levelKey];
      
      if (stepKey === 'vocab') {
        this.words = levelData.vocabulary;
        this.wordStrings = this.words.map(w => w.word);
      } else if (stepKey === 'phrases') {
        this.words = levelData.phrases;
        this.wordStrings = [];
        this.words.forEach(p => {
          p.text.split(' ').forEach(w => this.wordStrings.push(w));
        });
      } else if (stepKey === 'story') {
        this.words = [levelData.story];
        this.wordStrings = levelData.story.text.split(' ');
      }
    }
  }

  appendMoreWords() {
    const db = window.RINTYPE_DATABASE;
    let newWords = [];
    
    if (this.activeMode === 'vocabulary') {
      const list = [...db.vocabulary];
      const shuffled = list.sort(() => 0.5 - Math.random());
      newWords = shuffled.slice(0, 20).map(w => w.word);
    } else if (this.activeMode === 'phrases') {
      const list = [...db.phrases];
      const shuffled = list.sort(() => 0.5 - Math.random());
      shuffled.slice(0, 5).forEach(p => {
        p.text.split(' ').forEach(w => newWords.push(w));
      });
    } else if (this.activeMode === 'stories') {
      const story = db.stories[Math.floor(Math.random() * db.stories.length)];
      newWords = story.text.split(' ');
    } else if (this.activeMode === 'roadmap') {
      const levelKey = this.dom.roadmapLevelSelect.value;
      const stepKey = this.dom.roadmapStepSelect.value;
      const levelData = db.roadmap[levelKey];
      if (stepKey === 'vocab') {
        newWords = levelData.vocabulary.map(w => w.word);
      } else if (stepKey === 'phrases') {
        levelData.phrases.forEach(p => {
          p.text.split(' ').forEach(w => newWords.push(w));
        });
      } else if (stepKey === 'story') {
        newWords = levelData.story.text.split(' ');
      }
    }
    
    // Append to wordStrings
    const startIdx = this.wordStrings.length;
    newWords.forEach((word, index) => {
      const wIdx = startIdx + index;
      this.wordStrings.push(word);
      
      const wordContainer = document.createElement('div');
      wordContainer.className = 'typing-word';
      wordContainer.dataset.wordIndex = wIdx;

      for (let cIdx = 0; cIdx < word.length; cIdx++) {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'typing-letter';
        letterSpan.textContent = word[cIdx];
        wordContainer.appendChild(letterSpan);
      }

      const spaceSpan = document.createElement('span');
      spaceSpan.className = 'typing-letter space-letter';
      spaceSpan.textContent = ' ';
      wordContainer.appendChild(spaceSpan);

      this.dom.wordsWrapper.appendChild(wordContainer);
    });
  }

  /**
   * Renders the monospaced characters inside the glassmorphic typing arena
   */
  renderWords() {
    this.dom.wordsWrapper.innerHTML = '';
    
    this.wordStrings.forEach((word, wIdx) => {
      const wordContainer = document.createElement('div');
      wordContainer.className = 'typing-word';
      wordContainer.dataset.wordIndex = wIdx;

      // Render individual characters
      for (let cIdx = 0; cIdx < word.length; cIdx++) {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'typing-letter';
        letterSpan.textContent = word[cIdx];
        wordContainer.appendChild(letterSpan);
      }

      // Add a trailing space span at the end of each word (except the absolute last one)
      if (this.practiceType === 'time' || wIdx < this.wordStrings.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.className = 'typing-letter space-letter';
        spaceSpan.textContent = ' ';
        wordContainer.appendChild(spaceSpan);
      }

      this.dom.wordsWrapper.appendChild(wordContainer);
    });

    // Mark first word as active
    const firstWordElement = this.dom.wordsWrapper.children[0];
    if (firstWordElement) {
      firstWordElement.classList.add('current-word');
    }
  }

  /**
   * Recalculates caret position and animates its translation
   */
  updateCaret() {
    if (this.isTestFinished) return;

    const currentWordEl = this.dom.wordsWrapper.children[this.wordIndex];
    if (!currentWordEl) return;

    let targetSpan = currentWordEl.children[this.charIndex];
    
    // If we've completed the last character of the word (i.e. waiting on space),
    // and there's a space span, focus that.
    if (!targetSpan) {
      // Caret positions at the right of the word
      this.dom.typingCaret.classList.add('blink');
      // If we are at the end of the very last word
      if (this.wordIndex === this.wordStrings.length - 1) {
        const lastLetter = currentWordEl.children[currentWordEl.children.length - 1];
        if (lastLetter) {
          this.dom.typingCaret.style.left = `${lastLetter.offsetLeft + lastLetter.offsetWidth}px`;
          this.dom.typingCaret.style.top = `${lastLetter.offsetTop + 4}px`;
        }
        return;
      }
      return;
    }

    // Smooth movement styles
    this.dom.typingCaret.style.left = `${targetSpan.offsetLeft}px`;
    this.dom.typingCaret.style.top = `${targetSpan.offsetTop + 4}px`;
    
    // Center viewport vertically if we shift lines
    const boxHeight = this.dom.typingBox.offsetHeight;
    const scrollOffset = targetSpan.offsetTop - (boxHeight / 2) + 12;
    if (targetSpan.offsetTop > 40) {
      this.dom.wordsWrapper.style.transform = `translateY(-${Math.max(0, scrollOffset)}px)`;
    } else {
      this.dom.wordsWrapper.style.transform = `translateY(0px)`;
    }

    // Target the next physical key to press
    this.highlightNextKey(targetSpan.textContent);
  }

  /**
   * Highlights the next visual key that the user needs to hit
   */
  highlightNextKey(char) {
    // Clear all highlights
    document.querySelectorAll('.key.highlight-next').forEach(k => k.classList.remove('highlight-next'));
    
    if (!char) return;
    
    let keyId = null;
    if (char === ' ') {
      keyId = 'key-Space';
    } else {
      const upperChar = char.toUpperCase();
      // Handle digits
      if (/[0-9]/.test(upperChar)) {
        keyId = `key-Digit${upperChar}`;
      } else {
        keyId = `key-Key${upperChar}`;
      }
    }
    
    const keyEl = document.getElementById(keyId);
    if (keyEl) {
      keyEl.classList.add('highlight-next');
    }
  }

  /**
   * Animates keyboard caps upon physical typing feedback
   */
  animateVirtualKey(e, isDown) {
    let code = e.code;
    
    // Handle shift left/right specifically if needed
    let keyEl = document.getElementById(`key-${code}`);
    if (!keyEl) {
      // Fallback for special keys
      if (e.key === ' ') keyEl = document.getElementById('key-Space');
    }

    if (keyEl) {
      if (isDown) {
        keyEl.classList.add('active-physical');
      } else {
        keyEl.classList.remove('active-physical');
      }
    }
  }

  /**
   * Resets active configurations and restarts typing sandbox
   */
  resetTest() {
    // Clear interval
    clearInterval(this.timerInterval);
    
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isTestActive = false;
    this.isTestFinished = false;
    this.startTime = null;
    this.correctKeystrokes = 0;
    this.totalKeystrokes = 0;
    
    this.timerSeconds = this.practiceType === 'time' ? this.practiceValue : 0;

    // Clear and restore input
    this.dom.typingInput.value = '';
    this.dom.typingInput.disabled = false;
    this.dom.wordsWrapper.style.transform = `translateY(0px)`;

    // Update HUD counters
    this.dom.liveWpm.textContent = '0';
    this.dom.liveAccuracy.textContent = '100%';
    this.dom.liveTimer.textContent = this.practiceType === 'time' ? `${this.timerSeconds}s` : '0s';

    // Generate database
    this.generateWords();
    this.renderWords();
    
    // Focus & position caret
    this.focusInput();
    this.updateCaret();
    
    // Update active dictionary panel
    this.updateDictionaryPanel();
    
    // Audio trigger init
    window.RinTypeAudio.initContext();
  }

  /**
   * Starts the ticking interval
   */
  startTest() {
    this.isTestActive = true;
    this.startTime = new Date();
    this.timerSeconds = this.practiceType === 'time' ? this.practiceValue : 0;
    
    this.timerInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);

    // Initial TTS speak on start if in Phrase/Story mode
    if (this.activeMode !== 'vocabulary' && this.ttsEnabled) {
      this.speakActiveSentence();
    }
  }

  updateTimer() {
    if (!this.startTime || this.isTestFinished) return;
    
    if (this.practiceType === 'time') {
      this.timerSeconds--;
      this.dom.liveTimer.textContent = `${this.timerSeconds}s`;
      
      const elapsed = this.practiceValue - this.timerSeconds;
      this.calculateRealtimeStats(elapsed);
      
      if (this.timerSeconds <= 0) {
        this.finishTest();
        return;
      }
    } else {
      const elapsed = Math.round((new Date() - this.startTime) / 1000);
      this.dom.liveTimer.textContent = `${elapsed}s`;
      this.calculateRealtimeStats(elapsed);
    }
  }

  /**
   * Computes typing indexes and compares characters
   */
  handleInput(e) {
    if (this.isTestFinished) return;
    
    const val = this.dom.typingInput.value;
    
    // Initialize timer on first keypress
    if (!this.isTestActive) {
      this.startTest();
    }

    // Play mechanical click style
    window.RinTypeAudio.playKeydown();

    const currentWordStr = this.wordStrings[this.wordIndex];
    const currentWordEl = this.dom.wordsWrapper.children[this.wordIndex];
    
    // Compare character by character
    const charElements = currentWordEl.querySelectorAll('.typing-letter');
    
    // Total length typed in current word
    this.charIndex = val.length;
    this.totalKeystrokes++;

    for (let i = 0; i < charElements.length; i++) {
      const letterSpan = charElements[i];
      const targetChar = letterSpan.textContent;
      const typedChar = val[i];

      if (typedChar === undefined) {
        // Character not yet typed
        letterSpan.className = 'typing-letter';
      } else if (typedChar === targetChar) {
        // Correct
        if (!letterSpan.classList.contains('correct')) {
          this.correctKeystrokes++;
        }
        letterSpan.className = 'typing-letter correct';
      } else {
        // Incorrect
        letterSpan.className = 'typing-letter incorrect';
      }
    }

    // Handle character index overshoot (extra chars typed beyond target length)
    if (val.length > currentWordStr.length && this.wordIndex < this.wordStrings.length - 1) {
      // Force space or backspace limit - or we can render extra chars dynamically
      // For simplicity, we just cap input size to word length + 1 (for space)
    }

    this.updateCaret();
    this.calculateRealtimeStats();
  }

  /**
   * Listens for key events (space, backspaces, and word skips)
   */
  handleKeyDown(e) {
    if (this.isTestFinished) return;

    const val = this.dom.typingInput.value;
    const currentWordStr = this.wordStrings[this.wordIndex];

    // 1. SPACEBAR: Move to next word
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      
      // If we typed at least some characters or it's space, advance
      if (val.length > 0) {
        // Trigger Speak on Word Complete in Vocabulary mode
        if (this.activeMode === 'vocabulary' && this.ttsEnabled) {
          this.speakActiveWord();
        }

        // De-highlight current word
        const currentWordEl = this.dom.wordsWrapper.children[this.wordIndex];
        if (currentWordEl) {
          currentWordEl.classList.remove('current-word');
        }

        // Advance word index
        this.wordIndex++;
        this.charIndex = 0;
        this.dom.typingInput.value = '';

        // Handle infinite streaming in Time Mode
        if (this.practiceType === 'time' && this.wordIndex >= this.wordStrings.length - 3) {
          this.appendMoreWords();
        }

        // Check if we finished the test (Words Mode)
        if (this.practiceType !== 'time' && this.wordIndex >= this.wordStrings.length) {
          this.finishTest();
          return;
        }

        // Highlight next word
        const nextWordEl = this.dom.wordsWrapper.children[this.wordIndex];
        if (nextWordEl) {
          nextWordEl.classList.add('current-word');
        }

        this.updateDictionaryPanel();
        this.updateCaret();
      }
    }

    // 2. BACKSPACE: Move back character or word
    if (e.key === 'Backspace') {
      if (val.length === 0 && this.wordIndex > 0) {
        e.preventDefault();
        
        // Move back to previous word
        const currentWordEl = this.dom.wordsWrapper.children[this.wordIndex];
        if (currentWordEl) {
          currentWordEl.classList.remove('current-word');
        }

        this.wordIndex--;
        const prevWordEl = this.dom.wordsWrapper.children[this.wordIndex];
        const prevWordStr = this.wordStrings[this.wordIndex];
        
        if (prevWordEl) {
          prevWordEl.classList.add('current-word');
          
          // Re-populate hidden input with previous characters so user can delete
          const letters = prevWordEl.querySelectorAll('.typing-letter');
          let prevTypedVal = '';
          
          // Try to recover what was typed based on correct/incorrect states,
          // or just load the target string to edit. For premium typing feel,
          // we re-populate with correct chars, but let's just grab text content of what was correct/incorrect
          letters.forEach(span => {
            if (span.classList.contains('correct')) {
              prevTypedVal += span.textContent;
            } else if (span.classList.contains('incorrect')) {
              prevTypedVal += 'x'; // placeholder for incorrect to keep offset
            }
          });
          
          // Simple fall back: just restore word length
          this.dom.typingInput.value = prevWordStr;
          this.charIndex = prevWordStr.length;
        }

        this.updateDictionaryPanel();
        this.updateCaret();
      }
    }

    // 3. ENTER: Check if final word finished
    if (e.key === 'Enter') {
      if (this.wordIndex === this.wordStrings.length - 1 && val.trim() === currentWordStr) {
        this.finishTest();
      }
    }
  }

  /**
   * Finalizes the typing session and prints statistics
   */
  finishTest() {
    clearInterval(this.timerInterval);
    this.isTestFinished = true;
    this.dom.typingInput.disabled = true;

    // Calculate final metrics
    const elapsed = Math.max(1, Math.round((new Date() - this.startTime) / 1000));
    const finalWpm = this.calculateWpm(elapsed);
    const finalAccuracy = this.calculateAccuracy();

    // Render exact final values
    this.dom.liveWpm.textContent = finalWpm;
    this.dom.liveAccuracy.textContent = `${finalAccuracy}%`;
    this.dom.liveTimer.textContent = `${elapsed}s`;

    // De-highlight virtual keyboard keys
    document.querySelectorAll('.key.highlight-next').forEach(k => k.classList.remove('highlight-next'));

    // Speak congrats voice
    if (this.ttsEnabled) {
      this.speakCongratulations(finalWpm);
    }

    // Save to local histories
    this.saveToHistory(finalWpm, finalAccuracy, elapsed);
    this.loadHistory();
  }

  calculateRealtimeStats(forcedElapsed = null) {
    const elapsed = forcedElapsed !== null ? forcedElapsed : Math.max(1, Math.round((new Date() - this.startTime) / 1000));
    
    // Live WPM
    const wpm = this.calculateWpm(elapsed);
    this.dom.liveWpm.textContent = wpm;

    // Live Accuracy
    const accuracy = this.calculateAccuracy();
    this.dom.liveAccuracy.textContent = `${accuracy}%`;
  }

  calculateWpm(elapsedSeconds) {
    // WPM formula: (typed correct characters / 5) / elapsed minutes
    if (elapsedSeconds <= 0) return 0;
    
    // Count exact correct characters typed in completed words + current word
    let totalCorrectChars = 0;
    const completedWords = this.dom.wordsWrapper.querySelectorAll('.typing-word');
    completedWords.forEach(wordEl => {
      const corrects = wordEl.querySelectorAll('.typing-letter.correct');
      totalCorrectChars += corrects.length;
    });

    const minutes = elapsedSeconds / 60;
    const words = totalCorrectChars / 5;
    return Math.round(words / minutes);
  }

  calculateAccuracy() {
    if (this.totalKeystrokes === 0) return 100;
    return Math.round((this.correctKeystrokes / this.totalKeystrokes) * 100);
  }

  /**
   * Refreshes the translation and pronunciation information card
   */
  updateDictionaryPanel() {
    const db = window.RINTYPE_DATABASE;
    
    if (this.activeMode === 'vocabulary') {
      const activeWordObj = this.words[this.wordIndex];
      if (activeWordObj) {
        this.dom.dictWord.textContent = activeWordObj.word;
        this.dom.dictPos.textContent = activeWordObj.partOfSpeech;
        this.dom.dictPos.style.display = 'inline-block';
        this.dom.dictIpa.textContent = activeWordObj.ipa;
        this.dom.dictIpa.style.display = 'inline-block';
        this.dom.dictDefinition.textContent = activeWordObj.definition;
      }
    } else if (this.activeMode === 'phrases') {
      // Find corresponding phrase object
      const targetWord = this.wordStrings[this.wordIndex];
      // Search database for phrase text containing this word
      const phraseObj = this.words.find(p => p.text.includes(targetWord)) || this.words[0];
      if (phraseObj) {
        this.dom.dictWord.textContent = phraseObj.category || "Phrases";
        this.dom.dictPos.style.display = 'none';
        this.dom.dictIpa.style.display = 'none';
        this.dom.dictDefinition.textContent = `"${phraseObj.text}" ➔ ${phraseObj.translation}`;
      }
    } else if (this.activeMode === 'stories') {
      const storyObj = this.words[0];
      if (storyObj) {
        this.dom.dictWord.textContent = storyObj.title;
        this.dom.dictPos.style.display = 'none';
        this.dom.dictIpa.style.display = 'none';
        this.dom.dictDefinition.textContent = `Gợi ý nghĩa dịch: ${storyObj.translation.slice(0, 120)}...`;
      }
    } else if (this.activeMode === 'roadmap') {
      const stepKey = this.dom.roadmapStepSelect.value;
      if (stepKey === 'vocab') {
        const activeWordObj = this.words[this.wordIndex];
        if (activeWordObj) {
          this.dom.dictWord.textContent = activeWordObj.word;
          this.dom.dictPos.textContent = activeWordObj.partOfSpeech;
          this.dom.dictPos.style.display = 'inline-block';
          this.dom.dictIpa.textContent = activeWordObj.ipa;
          this.dom.dictIpa.style.display = 'inline-block';
          this.dom.dictDefinition.textContent = activeWordObj.definition;
        }
      } else if (stepKey === 'phrases') {
        const targetWord = this.wordStrings[this.wordIndex];
        const phraseObj = this.words.find(p => p.text.includes(targetWord)) || this.words[0];
        if (phraseObj) {
          this.dom.dictWord.textContent = "Phrases (Level)";
          this.dom.dictPos.style.display = 'none';
          this.dom.dictIpa.style.display = 'none';
          this.dom.dictDefinition.textContent = `"${phraseObj.text}" ➔ ${phraseObj.translation}`;
        }
      } else if (stepKey === 'story') {
        const storyObj = this.words[0];
        if (storyObj) {
          this.dom.dictWord.textContent = storyObj.title;
          this.dom.dictPos.style.display = 'none';
          this.dom.dictIpa.style.display = 'none';
          this.dom.dictDefinition.textContent = `Gợi ý nghĩa dịch: ${storyObj.translation}`;
        }
      }
    }
  }

  /**
   * Vocalizes Text-to-Speech audio pronunciations using Web Speech API
   */
  speakActiveWord() {
    if (this.activeMode === 'vocabulary') {
      const activeWordObj = this.words[this.wordIndex];
      if (activeWordObj) {
        this.speakText(activeWordObj.word);
      }
    } else if (this.activeMode === 'roadmap') {
      const stepKey = this.dom.roadmapStepSelect.value;
      if (stepKey === 'vocab') {
        const activeWordObj = this.words[this.wordIndex];
        if (activeWordObj) {
          this.speakText(activeWordObj.word);
        }
      }
    }
  }

  speakActiveSentence() {
    if (this.activeMode === 'phrases') {
      // Pronounce whole phrase text
      const phraseObj = this.words.find(p => p.text.includes(this.wordStrings[this.wordIndex])) || this.words[0];
      if (phraseObj) {
        this.speakText(phraseObj.text);
      }
    } else if (this.activeMode === 'stories') {
      const storyObj = this.words[0];
      if (storyObj) {
        this.speakText(storyObj.text);
      }
    } else if (this.activeMode === 'roadmap') {
      const stepKey = this.dom.roadmapStepSelect.value;
      if (stepKey === 'phrases') {
        const phraseObj = this.words.find(p => p.text.includes(this.wordStrings[this.wordIndex])) || this.words[0];
        if (phraseObj) {
          this.speakText(phraseObj.text);
        }
      } else if (stepKey === 'story') {
        const storyObj = this.words[0];
        if (storyObj) {
          this.speakText(storyObj.text);
        }
      }
    }
  }

  speakText(text) {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any active speak queues
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.voiceLang;
    
    // Choose specific native speaking voice
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(this.voiceLang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
    
    utterance.rate = 0.9; // speak slightly slower for typing clarity
    window.speechSynthesis.speak(utterance);
  }

  speakCongratulations(wpm) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    let text = `Great job! You finished at ${wpm} words per minute.`;
    if (wpm > 60) {
      text = `Excellent! You are a speed tycoon at ${wpm} words per minute.`;
    } else if (wpm < 30) {
      text = `Well done! Keep practicing, you reached ${wpm} words per minute.`;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  /**
   * Persistent storage managers
   */
  saveToHistory(wpm, accuracy, duration) {
    const historyItem = {
      date: new Date().toLocaleString('vi-VN'),
      mode: this.activeMode.toUpperCase(),
      wpm: wpm,
      accuracy: accuracy,
      duration: `${duration}s`
    };

    let history = [];
    try {
      history = JSON.parse(localStorage.getItem('rintype_history')) || [];
    } catch(e) {
      history = [];
    }

    history.unshift(historyItem); // Add to top
    // Limit histories to 50 items
    if (history.length > 50) history.pop();
    
    localStorage.setItem('rintype_history', JSON.stringify(history));
  }

  loadHistory() {
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem('rintype_history')) || [];
    } catch(e) {
      history = [];
    }

    // Render table body
    this.dom.historyTableBody.innerHTML = '';
    
    if (history.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.className = 'empty-row';
      emptyRow.innerHTML = `<td colspan="5">Chưa có dữ liệu lịch sử. Hãy hoàn thành bài test đầu tiên!</td>`;
      this.dom.historyTableBody.appendChild(emptyRow);
      
      // Zero out stats
      this.dom.statsTotalTests.textContent = '0';
      this.dom.statsPeakWpm.textContent = '0';
      this.dom.statsAvgWpm.textContent = '0';
      this.dom.statsAvgAccuracy.textContent = '0%';
      return;
    }

    // Loop & Append rows
    history.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.date}</td>
        <td><span class="part-of-speech">${item.mode}</span></td>
        <td class="text-accent font-weight-bold">${item.wpm} WPM</td>
        <td>${item.accuracy}%</td>
        <td>${item.duration}</td>
      `;
      this.dom.historyTableBody.appendChild(row);
    });

    // Compute metrics
    const total = history.length;
    let peak = 0;
    let sumWpm = 0;
    let sumAcc = 0;

    history.forEach(item => {
      if (item.wpm > peak) peak = item.wpm;
      sumWpm += item.wpm;
      sumAcc += item.accuracy;
    });

    this.dom.statsTotalTests.textContent = total;
    this.dom.statsPeakWpm.textContent = peak;
    this.dom.statsAvgWpm.textContent = Math.round(sumWpm / total);
    this.dom.statsAvgAccuracy.textContent = `${Math.round(sumAcc / total)}%`;
  }
}

// Instantiate and initiate application on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.RinTypeApp = new RinTypeApplication();
  window.RinTypeApp.init();
});
