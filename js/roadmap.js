/* ============================================
   ZenType English — 365-Day Roadmap Module
   ============================================ */

window.RoadmapModule = {
  currentMonth: 1,
  selectedDay: null,
  activeLesson: null, // Stores current lesson state

  // Get localized storage keys
  getStorageKeys() {
    const settings = ZenStorage.getSettings();
    const lang = settings.language || 'en';
    return {
      currentDay: lang === 'de' ? 'zen_roadmap_current_day_de' : 'zen_roadmap_current_day',
      completedDays: lang === 'de' ? 'zen_roadmap_completed_days_de' : 'zen_roadmap_completed_days'
    };
  },

  getCurrentDay() {
    const keys = this.getStorageKeys();
    return parseInt(localStorage.getItem(keys.currentDay)) || 1;
  },

  getCompletedDays() {
    const keys = this.getStorageKeys();
    try {
      return JSON.parse(localStorage.getItem(keys.completedDays)) || [];
    } catch (e) {
      return [];
    }
  },

  saveProgress(day) {
    const keys = this.getStorageKeys();
    const completed = this.getCompletedDays();
    if (!completed.includes(day)) {
      completed.push(day);
    }
    localStorage.setItem(keys.completedDays, JSON.stringify(completed));
    
    const currentDay = this.getCurrentDay();
    if (day === currentDay) {
      localStorage.setItem(keys.currentDay, (currentDay + 1).toString());
    }
  },

  // Generate 12 Months metadata
  getMonths() {
    const settings = ZenStorage.getSettings();
    const lang = settings.language || 'en';
    
    if (lang === 'de') {
      return [
        { id: 1, name: 'Tháng 1: Khởi Đầu', desc: 'Giao tiếp tiếng Đức cơ bản nhất', startDay: 1, endDay: 30 },
        { id: 2, name: 'Tháng 2: Đời Sống', desc: 'Sinh hoạt và thói quen hàng ngày', startDay: 31, endDay: 60 },
        { id: 3, name: 'Tháng 3: Du Lịch', desc: 'Từ vựng di chuyển, khách sạn', startDay: 61, endDay: 90 },
        { id: 4, name: 'Tháng 4: Gia Đình', desc: 'Mối quan hệ và nhà cửa', startDay: 91, endDay: 120 },
        { id: 5, name: 'Tháng 5: Công Việc 1', desc: 'Nghề nghiệp và công sở cơ bản', startDay: 121, endDay: 150 },
        { id: 6, name: 'Tháng 6: Công Việc 2', desc: 'Hợp đồng, lương bổng công sở', startDay: 151, endDay: 180 },
        { id: 7, name: 'Tháng 7: Ẩm Thực', desc: 'Nhà hàng, món ăn tiếng Đức', startDay: 181, endDay: 210 },
        { id: 8, name: 'Tháng 8: Mua Sắm', desc: 'Giá cả và giao dịch thương mại', startDay: 211, endDay: 240 },
        { id: 9, name: 'Tháng 9: Thời Tiết', desc: 'Khí hậu và hoạt động ngoài trời', startDay: 241, endDay: 270 },
        { id: 10, name: 'Tháng 10: Sức Khỏe', desc: 'Y tế và cảm xúc cơ bản', startDay: 271, endDay: 300 },
        { id: 11, name: 'Tháng 11: Ôn Tập Tổng Hợp 1', desc: 'Luyện tập nâng cao cấu trúc', startDay: 301, endDay: 330 },
        { id: 12, name: 'Tháng 12: Làm Chủ', desc: 'Luyện nói và giao tiếp lưu loát', startDay: 331, endDay: 365 }
      ];
    } else {
      return [
        { id: 1, name: 'Tháng 1: Khởi Động', desc: 'Giao tiếp & đời sống cơ bản (A1)', startDay: 1, endDay: 30 },
        { id: 2, name: 'Tháng 2: Đời Sống', desc: 'Hoạt động & sở thích cá nhân (A2)', startDay: 31, endDay: 60 },
        { id: 3, name: 'Tháng 3: Du Lịch', desc: 'Hành trình, sân bay & khám phá (A2)', startDay: 61, endDay: 90 },
        { id: 4, name: 'Tháng 4: Nền Tảng Công Việc', desc: 'Môi trường văn phòng cơ bản (B1)', startDay: 91, endDay: 120 },
        { id: 5, name: 'Tháng 5: Hợp Tác & Họp Hành', desc: 'Làm việc nhóm & đàm phán (B1)', startDay: 121, endDay: 150 },
        { id: 6, name: 'Tháng 6: Quản Lý Dự Án', desc: 'Kế hoạch, ngân sách & hiệu suất (B2)', startDay: 151, endDay: 180 },
        { id: 7, name: 'Tháng 7: Kinh Doanh & Tiếp Thị', desc: 'Quảng bá sản phẩm, doanh thu (B2)', startDay: 181, endDay: 210 },
        { id: 8, name: 'Tháng 8: TOEIC Trọng Tâm 1', desc: 'Hợp đồng, hóa đơn & giao dịch (TOEIC)', startDay: 211, endDay: 240 },
        { id: 9, name: 'Tháng 9: TOEIC Trọng Tâm 2', desc: 'Bằng sáng chế, thâu tóm & nhân sự (TOEIC)', startDay: 241, endDay: 270 },
        { id: 10, name: 'Tháng 10: IELTS Học Thuật 1', desc: 'Phân tích, nghiên cứu & giả thuyết (IELTS)', startDay: 271, endDay: 300 },
        { id: 11, name: 'Tháng 11: IELTS Học Thuật 2', desc: 'Cơ sở hạ tầng, mâu thuẫn & logic (IELTS)', startDay: 301, endDay: 330 },
        { id: 12, name: 'Tháng 12: Chuyên Ngành Excel', desc: 'Từ vựng mở rộng & cấu trúc nâng cao', startDay: 331, endDay: 365 }
      ];
    }
  },

  // Get sorted list of words for the active language
  getSortedWords() {
    const settings = ZenStorage.getSettings();
    const lang = settings.language || 'en';
    const dataObj = lang === 'de' ? ZenDataDE : ZenData;
    
    // Sort static words systematically from easy to hard
    const allWords = dataObj.getAllWords();
    
    if (lang === 'de') {
      // Just return German words in their standard order
      return allWords;
    }

    // For English: order by topic hierarchy
    const topicOrder = [
      'general', 'communication', 'travel', 'cafe', 'restaurant', 
      'oxford_basic', 'work', 'oxford_inter', 
      'toeic_business', 'ielts_academic', 'advanced'
    ];

    return allWords.sort((a, b) => {
      const idxA = topicOrder.indexOf(a.topicId);
      const idxB = topicOrder.indexOf(b.topicId);
      return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
    });
  },

  // Get words assigned for a specific day
  getWordsForDay(day) {
    const sortedWords = this.getSortedWords();
    const totalWords = sortedWords.length;
    if (totalWords === 0) return { newWords: [], reviewWords: [], isReviewDay: false };

    // Every 7th day is a milestone review day (Day 7, 14, 21...)
    if (day % 7 === 0) {
      // Review day: review words learned in the past 6 days
      const startDay = day - 6;
      const endDay = day - 1;
      let reviewWords = [];
      for (let d = startDay; d <= endDay; d++) {
        reviewWords = reviewWords.concat(this.getWordsForDay(d).newWords);
      }
      return { newWords: [], reviewWords: reviewWords.slice(0, 8), isReviewDay: true };
    }

    // Study day calculation
    const studyDayIndex = day - Math.floor(day / 7); // 1-indexed study day
    
    // Distribute words across the remaining study days
    const wordsPerDay = Math.ceil(totalWords / 313); // Approx 2 words per study day
    const startIndex = (studyDayIndex - 1) * wordsPerDay;
    const endIndex = Math.min(startIndex + wordsPerDay, totalWords);
    
    const newWords = sortedWords.slice(startIndex, endIndex);

    // Get 3 random previously learned words for spaced-repetition review
    let reviewWords = [];
    if (startIndex > 0) {
      const previouslyLearned = sortedWords.slice(0, startIndex);
      const shuffled = [...previouslyLearned].sort(() => Math.random() - 0.5);
      reviewWords = shuffled.slice(0, Math.min(3, shuffled.length));
    }

    return { newWords, reviewWords, isReviewDay: false };
  },

  render(container) {
    this.container = container;
    const currentDay = this.getCurrentDay();
    const completedDays = this.getCompletedDays();
    const months = this.getMonths();
    
    // Find current active month
    const activeMonth = months.find(m => currentDay >= m.startDay && currentDay <= m.endDay) || months[months.length - 1];
    this.currentMonth = activeMonth.id;

    this.renderHeader();
    this.renderMonthProgress();
    this.renderDaysGrid();
  },

  renderHeader() {
    const currentDay = this.getCurrentDay();
    const completedDays = this.getCompletedDays();
    const percent = Math.round((completedDays.length / 365) * 100);

    const headerHtml = `
      <div class="roadmap-header glass-card p-lg mb-lg flex justify-between align-center flex-wrap gap-md animate-slide-down">
        <div>
          <span class="badge badge-accent mb-xs" style="font-size: 0.8rem; padding: 4px 10px;">LỘ TRÌNH 365 NGÀY</span>
          <h2 style="font-size: 2.2rem; font-family: 'Outfit', sans-serif;">Hành Trình Bứt Phá</h2>
          <p class="text-secondary mt-xs">Học tập bài bản mỗi ngày từ cấp độ cơ bản đến chuyên ngành nâng cao.</p>
        </div>
        <div class="flex gap-lg align-center">
          <div class="roadmap-stat text-center">
            <span class="stat-num block text-primary" style="font-size: 2rem; font-weight: 800;">${completedDays.length}</span>
            <span class="stat-label text-secondary" style="font-size: 0.8rem;">Ngày Hoàn Thành</span>
          </div>
          <div class="roadmap-stat text-center">
            <span class="stat-num block text-accent" style="font-size: 2rem; font-weight: 800;">Day ${currentDay}</span>
            <span class="stat-label text-secondary" style="font-size: 0.8rem;">Ngày Hiện Tại</span>
          </div>
          <div class="roadmap-progress-circle" style="position: relative; width: 70px; height: 70px;">
            <svg style="transform: rotate(-90deg); width: 70px; height: 70px;">
              <circle cx="35" cy="35" r="28" fill="transparent" stroke="var(--border-primary)" stroke-width="6"/>
              <circle cx="35" cy="35" r="28" fill="transparent" stroke="var(--primary)" stroke-width="6" 
                      stroke-dasharray="175.9" stroke-dashoffset="${175.9 - (175.9 * percent / 100)}" 
                      style="transition: stroke-dashoffset 0.8s ease-in-out;"/>
            </svg>
            <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: 700; font-size: 0.9rem;">${percent}%</span>
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = headerHtml;
  },

  renderMonthProgress() {
    const months = this.getMonths();
    const currentDay = this.getCurrentDay();
    const completedDays = this.getCompletedDays();

    const tabsHtml = `
      <div class="month-tabs-container glass-card p-md mb-lg animate-slide-up">
        <h4 class="mb-md"><i class="fa-solid fa-map-location-dot text-primary mr-sm"></i> Bản đồ 12 tháng học</h4>
        <div class="month-tabs" style="display: flex; gap: var(--space-sm); overflow-x: auto; padding-bottom: 8px;">
          ${months.map(m => {
            const isActive = m.id === this.currentMonth;
            const completedInMonth = completedDays.filter(d => d >= m.startDay && d <= m.endDay).length;
            const totalDaysInMonth = m.endDay - m.startDay + 1;
            const progressPercent = Math.round((completedInMonth / totalDaysInMonth) * 100);
            
            // Check if month is locked (no day in it is unlocked yet)
            const isLocked = currentDay < m.startDay;
            
            return `
              <button class="month-tab-btn ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}" 
                      onclick="window.RoadmapModule.switchMonth(${m.id})" 
                      style="flex-shrink: 0; min-width: 160px; text-align: left; padding: 12px; border-radius: 8px; border: 1px solid ${isActive ? 'var(--primary)' : 'var(--border-primary)'}; background: ${isActive ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255,255,255,0.02)'}; opacity: ${isLocked ? 0.5 : 1}; cursor: pointer;">
                <div class="flex justify-between align-center mb-xs">
                  <strong style="font-size: 0.85rem; color: ${isActive ? 'var(--primary)' : 'var(--text-primary)'};">${m.name}</strong>
                  ${isLocked ? '<i class="fa-solid fa-lock" style="font-size: 0.75rem;"></i>' : ''}
                </div>
                <div class="text-secondary" style="font-size: 0.7rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px;">${m.desc}</div>
                <div class="flex align-center gap-sm">
                  <div class="progress-bar-container" style="flex: 1; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;">
                    <div style="width: ${progressPercent}%; background: var(--primary); height: 100%; border-radius: 2px;"></div>
                  </div>
                  <span style="font-size: 0.7rem; font-weight: 600;">${completedInMonth}/${totalDaysInMonth}</span>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = tabsHtml;
    this.container.appendChild(wrapper);
  },

  switchMonth(monthId) {
    const months = this.getMonths();
    const currentDay = this.getCurrentDay();
    const targetMonth = months.find(m => m.id === monthId);
    
    // Allow clicking if the month is not locked (current day is greater or equal to startDay)
    if (currentDay >= targetMonth.startDay) {
      this.currentMonth = monthId;
      // Re-render
      const gridContainer = document.getElementById('roadmap-days-grid-container');
      if (gridContainer) {
        gridContainer.outerHTML = this.getDaysGridHtml();
      }
      
      // Update tab active classes
      const tabs = document.querySelectorAll('.month-tab-btn');
      months.forEach((m, idx) => {
        tabs[idx].classList.toggle('active', m.id === monthId);
      });
    } else {
      alert("Tháng học này đang bị khóa. Hãy hoàn thành các ngày học trước đó để mở khóa!");
    }
  },

  getDaysGridHtml() {
    const currentDay = this.getCurrentDay();
    const completedDays = this.getCompletedDays();
    const months = this.getMonths();
    const activeMonth = months.find(m => m.id === this.currentMonth);
    
    let daysHtml = [];
    for (let d = activeMonth.startDay; d <= activeMonth.endDay; d++) {
      const isCompleted = completedDays.includes(d);
      const isCurrent = d === currentDay;
      const isLocked = d > currentDay;
      const dayData = this.getWordsForDay(d);
      
      let cardClass = 'locked';
      let statusBadge = `<span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-secondary);"><i class="fa-solid fa-lock"></i> Khóa</span>`;
      let btnAction = '';

      if (isCompleted) {
        cardClass = 'completed';
        statusBadge = `<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: var(--success);"><i class="fa-solid fa-circle-check"></i> Đã học</span>`;
        btnAction = `<button class="btn btn-secondary w-full btn-sm mt-md" onclick="window.RoadmapModule.startLesson(${d})"><i class="fa-solid fa-rotate-left"></i> Ôn tập lại</button>`;
      } else if (isCurrent) {
        cardClass = 'current active-glow';
        statusBadge = `<span class="badge badge-accent pulse-element"><i class="fa-solid fa-bolt"></i> Học ngay</span>`;
        btnAction = `<button class="btn btn-primary w-full btn-sm mt-md" onclick="window.RoadmapModule.startLesson(${d})"><i class="fa-solid fa-play"></i> Bắt đầu</button>`;
      }

      const wordsPreview = dayData.isReviewDay 
        ? `<div class="text-accent font-bold" style="font-size: 0.8rem; margin-top: 6px;"><i class="fa-solid fa-award"></i> Ngày Ôn Tập Cột Mốc</div>`
        : `<div class="text-secondary" style="font-size: 0.8rem; margin-top: 6px;">Từ mới: ${dayData.newWords.map(w => `<strong class="text-primary">${w.word}</strong>`).join(', ') || 'Không có'}</div>`;

      daysHtml.push(`
        <div class="glass-card day-card p-md ${cardClass} flex flex-col justify-between" style="border: 1px solid ${isCurrent ? 'var(--accent)' : 'var(--border-primary)'}; opacity: ${isLocked ? 0.5 : 1}; transition: all 0.3s;">
          <div>
            <div class="flex justify-between align-center mb-xs">
              <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.15rem;">Ngày ${d}</h3>
              ${statusBadge}
            </div>
            ${wordsPreview}
            <div class="text-secondary mt-xs" style="font-size: 0.75rem;">
              ${dayData.isReviewDay ? 'Tổng hợp 8 từ đã học' : `Luyện tập: ${dayData.newWords.length} từ mới + ${dayData.reviewWords.length} từ ôn`}
            </div>
          </div>
          ${btnAction}
        </div>
      `);
    }

    return `
      <div id="roadmap-days-grid-container" class="animate-fade-in">
        <div class="flex justify-between align-center mb-md">
          <h3 style="font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-calendar-day text-accent mr-sm"></i> Chi tiết tháng: ${activeMonth.name}</h3>
          <span class="text-secondary" style="font-size: 0.85rem;">Từ ngày ${activeMonth.startDay} đến ngày ${activeMonth.endDay}</span>
        </div>
        <div class="roadmap-days-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-md);">
          ${daysHtml.join('')}
        </div>
      </div>
    `;
  },

  renderDaysGrid() {
    const gridWrapper = document.createElement('div');
    gridWrapper.innerHTML = this.getDaysGridHtml();
    this.container.appendChild(gridWrapper);
  },

  // Start the Lesson Screen/Overlay
  startLesson(day) {
    const dayData = this.getWordsForDay(day);
    if (!dayData.isReviewDay && dayData.newWords.length === 0) {
      alert("Đã học hết toàn bộ từ vựng hiện có trong lộ trình này! Bạn hãy chờ cập nhật thêm từ mới nhé.");
      return;
    }

    // Build lesson state
    this.activeLesson = {
      day: day,
      newWords: dayData.newWords,
      reviewWords: dayData.reviewWords,
      isReviewDay: dayData.isReviewDay,
      step: 1, // Step 1: Learn/Preview, Step 2: Quiz Practice, Step 3: Finished
      quizIndex: 0,
      quizQuestions: [],
      score: 0
    };

    // Prepare quiz questions
    this.generateLessonQuiz();

    // Create Modal Overlay for the lesson
    let overlay = document.getElementById('roadmap-lesson-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'roadmap-lesson-overlay';
      overlay.className = 'modal-overlay active';
      document.body.appendChild(overlay);
    }
    overlay.classList.add('active');

    this.renderLessonStep();
  },

  generateLessonQuiz() {
    const lesson = this.activeLesson;
    const allPool = lesson.isReviewDay ? lesson.reviewWords : [...lesson.newWords, ...lesson.reviewWords];
    const quizQuestions = [];

    allPool.forEach(wordObj => {
      // Question Type 1: Multiple choice meaning
      const options = this.getMultipleChoiceOptions(wordObj);
      quizQuestions.push({
        type: 'quiz',
        word: wordObj,
        question: `Nghĩa của từ "${wordObj.word}" là gì?`,
        options: options,
        correctIndex: options.indexOf(wordObj.meaning)
      });

      // Question Type 2: Spelling/Typing
      quizQuestions.push({
        type: 'typing',
        word: wordObj,
        question: `Gõ từ tiếng Anh có nghĩa: <strong>"${wordObj.meaning}"</strong> (${wordObj.pos})`,
        correctAnswer: wordObj.word
      });
    });

    // Shuffle questions
    lesson.quizQuestions = quizQuestions.sort(() => Math.random() - 0.5).slice(0, 5); // Max 5 questions for micro-lesson
  },

  getMultipleChoiceOptions(correctWord) {
    const allWords = this.getSortedWords();
    const distractors = allWords.filter(w => w.word !== correctWord.word && w.meaning !== correctWord.meaning);
    const shuffledDistractors = distractors.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = shuffledDistractors.map(w => w.meaning);
    options.push(correctWord.meaning);
    return options.sort(() => Math.random() - 0.5);
  },

  renderLessonStep() {
    const overlay = document.getElementById('roadmap-lesson-overlay');
    const lesson = this.activeLesson;
    
    if (lesson.step === 1) {
      // Step 1: Preview/Learn Day Words
      let wordsIntroHtml = '';
      
      if (lesson.isReviewDay) {
        wordsIntroHtml = `
          <div class="text-center p-lg">
            <i class="fa-solid fa-chess-knight text-accent" style="font-size: 3rem; margin-bottom: var(--space-md);"></i>
            <h3>Ngày Ôn Tập Tổng Hợp</h3>
            <p class="text-secondary mt-sm">Hôm nay chúng ta sẽ ôn tập tổng hợp 8 từ vựng đã học trong tuần qua để khắc sâu vào trí nhớ dài hạn!</p>
          </div>
        `;
      } else {
        wordsIntroHtml = `
          <h4 class="mb-md text-primary"><i class="fa-solid fa-lightbulb"></i> Từ vựng mới hôm nay:</h4>
          <div class="roadmap-words-preview-list flex flex-col gap-sm">
            ${lesson.newWords.map(w => `
              <div class="glass-card p-md flex justify-between align-center" style="border-left: 4px solid var(--primary);">
                <div>
                  <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.3rem;">${w.word} <span class="text-accent" style="font-size: 0.85rem; font-weight: normal;">(${w.pos})</span></h3>
                  <div class="text-secondary" style="font-size: 0.8rem; font-family: 'JetBrains Mono', monospace;">${w.phonetic || ''}</div>
                  <div class="font-bold text-primary mt-xs" style="font-size: 0.95rem;">${w.meaning}</div>
                  <div class="text-secondary mt-sm" style="font-size: 0.8rem; border-top: 1px dashed rgba(255,255,255,0.05); padding-top: 5px;">
                    <i>"${w.example || ''}"</i>
                    <div style="font-size: 0.75rem; color: var(--text-secondary); opacity: 0.8;">${w.exampleVi || ''}</div>
                  </div>
                </div>
                <button class="btn-icon" onclick="VocabularyModule.playAudio('${w.word.replace(/'/g, "\\'")}')" style="background: rgba(255,255,255,0.05); width: 40px; height: 40px; border-radius: 50%;">
                  <i class="fa-solid fa-volume-high"></i>
                </button>
              </div>
            `).join('')}
          </div>
        `;
      }

      overlay.innerHTML = `
        <div class="modal animate-scale-in" style="max-width: 600px; padding: var(--space-lg);">
          <div class="modal-header">
            <h3 class="modal-title">Học Ngày ${lesson.day}</h3>
            <button class="modal-close" onclick="window.RoadmapModule.closeLesson()"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="modal-body mt-md" style="max-height: 450px; overflow-y: auto; padding-right: 5px;">
            ${wordsIntroHtml}
          </div>
          <button class="btn btn-primary w-full mt-lg" onclick="window.RoadmapModule.nextStep()">Bắt đầu luyện tập <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      `;
    } else if (lesson.step === 2) {
      // Step 2: Practice Quiz
      const q = lesson.quizQuestions[lesson.quizIndex];
      const progressPercent = Math.round((lesson.quizIndex / lesson.quizQuestions.length) * 100);
      
      let quizContent = '';
      if (q.type === 'quiz') {
        quizContent = `
          <p class="mb-md font-bold" style="font-size: 1.1rem;">${q.question}</p>
          <div class="quiz-options flex flex-col gap-sm">
            ${q.options.map((opt, idx) => `
              <button class="btn btn-secondary text-left quiz-opt-btn" onclick="window.RoadmapModule.checkAnswer(${idx})" style="padding: var(--space-md); border-radius: 8px; font-weight: normal; font-size: 0.95rem; display: flex; align-content: center; gap: var(--space-sm);">
                <span class="opt-label font-bold text-accent" style="width: 25px; display: inline-block;">${String.fromCharCode(65 + idx)}.</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
        `;
      } else if (q.type === 'typing') {
        quizContent = `
          <p class="mb-md font-bold" style="font-size: 1.1rem;">${q.question}</p>
          <div class="form-group">
            <input type="text" id="roadmap-typing-input" class="form-input" placeholder="Gõ từ vựng tiếng Anh chính xác..." autocomplete="off" style="text-align: center; font-size: 1.3rem; font-family: 'Outfit', sans-serif; letter-spacing: 1px;" onkeydown="if(event.key === 'Enter') window.RoadmapModule.submitTyping()">
          </div>
          <button class="btn btn-primary w-full mt-md" onclick="window.RoadmapModule.submitTyping()">Kiểm tra câu trả lời</button>
        `;
      }

      overlay.innerHTML = `
        <div class="modal animate-scale-in" style="max-width: 500px; padding: var(--space-lg);">
          <div class="modal-header">
            <h3 class="modal-title">Luyện tập: Câu ${lesson.quizIndex + 1}/${lesson.quizQuestions.length}</h3>
            <button class="modal-close" onclick="window.RoadmapModule.closeLesson()"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="progress-bar-container mt-sm mb-lg" style="height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px;">
            <div style="width: ${progressPercent}%; background: var(--primary); height: 100%; border-radius: 3px; transition: width 0.3s;"></div>
          </div>
          <div class="modal-body">
            ${quizContent}
          </div>
        </div>
      `;
      
      // Auto focus typing input if present
      setTimeout(() => {
        document.getElementById('roadmap-typing-input')?.focus();
      }, 100);
    } else if (lesson.step === 3) {
      // Step 3: Finish Screen
      const success = lesson.score >= Math.round(lesson.quizQuestions.length * 0.6); // 60% correct to pass
      let messageHtml = '';
      
      if (success) {
        messageHtml = `
          <div class="text-center p-lg">
            <div class="success-icon animate-scale-in" style="width: 80px; height: 80px; background: rgba(16,185,129,0.15); color: var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-lg); font-size: 3rem;">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <h3 style="font-size: 1.6rem; font-family: 'Outfit', sans-serif;">Tuyệt Vời!</h3>
            <p class="text-secondary mt-sm">Bạn đã hoàn thành Ngày ${lesson.day} của lộ trình học tập.</p>
            <div class="flex justify-center gap-lg mt-lg">
              <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-primary); padding: 12px 20px; border-radius: 8px; min-width: 100px;">
                <span class="block text-secondary" style="font-size: 0.75rem;">Kết quả</span>
                <strong style="font-size: 1.3rem;">${lesson.score}/${lesson.quizQuestions.length}</strong>
              </div>
              <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); padding: 12px 20px; border-radius: 8px; min-width: 100px;">
                <span class="block text-secondary" style="font-size: 0.75rem;">XP Đạt Được</span>
                <strong style="font-size: 1.3rem; color: var(--accent);">+20 XP</strong>
              </div>
            </div>
          </div>
        `;
      } else {
        messageHtml = `
          <div class="text-center p-lg">
            <div class="fail-icon" style="width: 80px; height: 80px; background: rgba(239, 68, 68, 0.15); color: var(--error); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-lg); font-size: 3rem;">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 style="font-size: 1.6rem; font-family: 'Outfit', sans-serif;">Chưa Vượt Qua</h3>
            <p class="text-secondary mt-sm">Bạn cần trả lời đúng ít nhất 60% để hoàn thành. Hãy cố gắng luyện tập lại nhé!</p>
            <div class="flex justify-center gap-lg mt-lg">
              <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-primary); padding: 12px 20px; border-radius: 8px; min-width: 100px;">
                <span class="block text-secondary" style="font-size: 0.75rem;">Đúng</span>
                <strong style="font-size: 1.3rem;">${lesson.score}/${lesson.quizQuestions.length}</strong>
              </div>
            </div>
          </div>
        `;
      }

      overlay.innerHTML = `
        <div class="modal animate-scale-in" style="max-width: 450px; padding: var(--space-lg);">
          <div class="modal-body">
            ${messageHtml}
          </div>
          <div class="modal-footer flex gap-md mt-lg">
            ${success 
              ? `<button class="btn btn-primary w-full" onclick="window.RoadmapModule.finishLesson(true)">Hoàn thành & Tiếp tục</button>`
              : `<button class="btn btn-secondary w-full" onclick="window.RoadmapModule.finishLesson(false)">Luyện tập lại</button>`}
          </div>
        </div>
      `;
    }
  },

  nextStep() {
    this.activeLesson.step++;
    this.renderLessonStep();
  },

  checkAnswer(selectedIndex) {
    const lesson = this.activeLesson;
    const q = lesson.quizQuestions[lesson.quizIndex];
    const optionBtns = document.querySelectorAll('.quiz-opt-btn');

    // Disable all options
    optionBtns.forEach(btn => btn.style.pointerEvents = 'none');

    const isCorrect = selectedIndex === q.correctIndex;
    
    if (isCorrect) {
      optionBtns[selectedIndex].style.background = 'rgba(16, 185, 129, 0.15)';
      optionBtns[selectedIndex].style.borderColor = 'var(--success)';
      lesson.score++;
      Gamification.playDingSound();
    } else {
      optionBtns[selectedIndex].style.background = 'rgba(239, 68, 68, 0.15)';
      optionBtns[selectedIndex].style.borderColor = 'var(--error)';
      
      optionBtns[q.correctIndex].style.background = 'rgba(16, 185, 129, 0.15)';
      optionBtns[q.correctIndex].style.borderColor = 'var(--success)';
    }

    // Go to next question after delay
    setTimeout(() => {
      lesson.quizIndex++;
      if (lesson.quizIndex >= lesson.quizQuestions.length) {
        lesson.step = 3;
      }
      this.renderLessonStep();
    }, 1500);
  },

  submitTyping() {
    const lesson = this.activeLesson;
    const q = lesson.quizQuestions[lesson.quizIndex];
    const input = document.getElementById('roadmap-typing-input');
    const userAns = input.value.trim().toLowerCase();
    const correctAns = q.correctAnswer.toLowerCase();

    if (!userAns) return;

    input.disabled = true;

    const isCorrect = userAns === correctAns;
    
    if (isCorrect) {
      input.style.borderColor = 'var(--success)';
      input.style.background = 'rgba(16, 185, 129, 0.1)';
      lesson.score++;
      Gamification.playDingSound();
    } else {
      input.style.borderColor = 'var(--error)';
      input.style.background = 'rgba(239, 68, 68, 0.1)';
      
      // Create correction element
      const correction = document.createElement('div');
      correction.className = 'text-success mt-sm font-bold text-center';
      correction.innerHTML = `<i class="fa-solid fa-circle-check"></i> Đáp án đúng là: ${q.correctAnswer}`;
      input.parentNode.appendChild(correction);
    }

    setTimeout(() => {
      lesson.quizIndex++;
      if (lesson.quizIndex >= lesson.quizQuestions.length) {
        lesson.step = 3;
      }
      this.renderLessonStep();
    }, 2000);
  },

  finishLesson(passed) {
    const lesson = this.activeLesson;
    
    if (passed) {
      // Award XP
      Gamification.addXP(20, `Hoàn thành Ngày ${lesson.day} Lộ trình`);
      
      // Add lesson words to user vocabulary mastery if they aren't already
      const vocab = ZenStorage.getVocabulary();
      let updated = false;
      
      lesson.newWords.forEach(w => {
        const storedWord = vocab.find(v => v.word.toLowerCase() === w.word.toLowerCase());
        if (storedWord) {
          // Increase mastery level slightly since they passed the lesson
          storedWord.masteryLevel = Math.min(100, (storedWord.masteryLevel || 0) + 15);
          updated = true;
        }
      });
      
      if (updated) {
        const keys = this.getStorageKeys();
        // Resolve key correctly
        const vocabKey = ZenStorage.resolveKey(ZenStorage.keys.VOCAB);
        localStorage.setItem(vocabKey, JSON.stringify(vocab));
      }

      // Save roadmap progress
      this.saveProgress(lesson.day);
    }
    
    // Close lesson dialog
    this.closeLesson();

    // Re-render Roadmap page
    if (this.container) {
      this.render(this.container);
    }
    
    // Play sound and show reward modal if passed
    if (passed) {
      // Trigger a refresh of sidebar values
      const refreshBtn = document.getElementById('btn-quick-review');
      if (refreshBtn) {
        // Just dispatch custom event to sync sidebar
        const event = new Event('roadmap-completed');
        document.dispatchEvent(event);
      }
    } else {
      // Re-trigger lesson immediately if failed and requested
      this.startLesson(lesson.day);
    }
  },

  closeLesson() {
    const overlay = document.getElementById('roadmap-lesson-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.innerHTML = '';
    }
    this.activeLesson = null;
  }
};
