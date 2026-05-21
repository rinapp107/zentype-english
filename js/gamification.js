/* ============================================
   ZenType English — Gamification System
   ============================================ */

const Gamification = {
  levelThresholds: [
    0, 100, 250, 500, 1000, 1750, 2800, 4200, 6000, 8500, // 1-10
    11500, 15000, 19000, 24000, 30000, 37000, 45000, 54000, 65000, 78000 // 11-20
  ],
  
  allBadges: [
    { id: 'newbie', name: 'Người mới', desc: 'Hoàn thành bài học đầu tiên', icon: '🌱' },
    { id: 'collector_50', name: 'Nhà sưu tập', desc: 'Học 50 từ vựng', icon: '📚' },
    { id: 'streak_3', name: 'Lửa nhỏ', desc: 'Học 3 ngày liên tục', icon: '🔥' },
    { id: 'streak_7', name: 'Chăm chỉ', desc: 'Học 7 ngày liên tục', icon: '🔥' },
    { id: 'streak_30', name: 'Kiên trì', desc: 'Học 30 ngày liên tục', icon: '🔥' },
    { id: 'perfect_quiz', name: 'Bách phát bách trúng', desc: '100% điểm trong Quiz', icon: '🎯' },
    { id: 'speed_light', name: 'Tốc độ ánh sáng', desc: 'Hoàn thành bài trong 30s', icon: '⚡' },
    { id: 'memory_master', name: 'Trí nhớ siêu phàm', desc: 'Master 100 từ', icon: '🧠' },
    { id: 'speaker_10', name: 'Người phát biểu', desc: '10 bài Speaking', icon: '🗣️' },
    { id: 'listener_10', name: 'Tai thính', desc: '10 bài Listening', icon: '👂' },
    { id: 'writer_10', name: 'Nhà văn', desc: '10 bài Writing/Typing', icon: '✍️' },
    { id: 'gamer_5', name: 'Game thủ', desc: 'Chơi 5 lần Minigame', icon: '🎮' },
    { id: 'level_10', name: 'Kim cương', desc: 'Đạt Level 10', icon: '💎' },
    { id: 'level_20', name: 'Vô địch', desc: 'Đạt Level 20', icon: '🏆' },
    { id: 'legend', name: 'Huyền thoại', desc: 'Hoàn thành mọi thử thách', icon: '🌟' }
  ],

  init() {
    this.checkStreak();
    this.updateUI();
  },

  // --- XP & Leveling ---
  addXP(amount, reason = '') {
    if (!amount || amount <= 0) return;
    
    const progress = ZenStorage.getProgress();
    const oldLevel = progress.level;
    
    progress.xp += amount;
    
    // Check level up
    let newLevel = 1;
    for (let i = 0; i < this.levelThresholds.length; i++) {
      if (progress.xp >= this.levelThresholds[i]) {
        newLevel = i + 1;
      } else {
        break;
      }
    }
    // Calculate for levels > 20 using formula
    if (progress.xp >= this.levelThresholds[19]) {
      newLevel = 20 + Math.floor((progress.xp - this.levelThresholds[19]) / 15000);
    }
    
    progress.level = newLevel;
    
    // Check if studied today
    const today = new Date().toDateString();
    if (progress.lastStudyDate !== today) {
      this.checkStreak(); // updates lastStudyDate and streak
    } else {
       ZenStorage.updateProgress(progress);
    }

    // UI Updates
    this.showXPNotification(amount, reason);
    
    if (newLevel > oldLevel) {
      setTimeout(() => this.showLevelUpNotification(newLevel), 1000);
      this.checkBadges();
    }
    
    this.updateUI();
  },

  getXP() {
    return ZenStorage.getProgress().xp || 0;
  },

  getLevel() {
    return ZenStorage.getProgress().level || 1;
  },

  getXPForNextLevel() {
    const lvl = this.getLevel();
    if (lvl < 20) {
      return this.levelThresholds[lvl];
    }
    return this.levelThresholds[19] + (lvl - 19) * 15000;
  },
  
  getXPForCurrentLevel() {
    const lvl = this.getLevel();
    if (lvl === 1) return 0;
    if (lvl <= 20) {
      return this.levelThresholds[lvl - 1];
    }
    return this.levelThresholds[19] + (lvl - 20) * 15000;
  },

  getLevelProgress() {
    const current = this.getXP();
    const base = this.getXPForCurrentLevel();
    const next = this.getXPForNextLevel();
    const progress = ((current - base) / (next - base)) * 100;
    return Math.min(100, Math.max(0, progress));
  },

  // --- Streak ---
  checkStreak() {
    const progress = ZenStorage.getProgress();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastStudy = progress.lastStudyDate ? new Date(progress.lastStudyDate) : null;
    if (lastStudy) lastStudy.setHours(0, 0, 0, 0);
    
    if (!lastStudy) {
      progress.streakDays = 1;
      progress.lastStudyDate = new Date().toDateString();
    } else {
      const diffTime = Math.abs(today - lastStudy);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays === 1) {
        // Studied yesterday, increment streak
        progress.streakDays += 1;
        progress.lastStudyDate = new Date().toDateString();
      } else if (diffDays === 0) {
        // Already studied today, do nothing
      } else {
        // Missed a day, reset streak
        progress.streakDays = 1;
        progress.lastStudyDate = new Date().toDateString();
      }
    }
    
    ZenStorage.updateProgress(progress);
    this.checkBadges();
  },

  // --- Badges ---
  checkBadges() {
    const progress = ZenStorage.getProgress();
    const history = ZenStorage.getHistory();
    const vocab = ZenStorage.getVocabulary();
    const currentBadges = progress.badges || [];
    let newBadgeEarned = false;
    
    const awardBadge = (badgeId) => {
      if (!currentBadges.includes(badgeId)) {
        currentBadges.push(badgeId);
        newBadgeEarned = true;
        const badgeDef = this.allBadges.find(b => b.id === badgeId);
        if (badgeDef) {
          setTimeout(() => this.showBadgeNotification(badgeDef), 2000);
        }
      }
    };

    // Check conditions
    if (history.length > 0) awardBadge('newbie');
    if (vocab.length >= 50) awardBadge('collector_50');
    if (progress.streakDays >= 3) awardBadge('streak_3');
    if (progress.streakDays >= 7) awardBadge('streak_7');
    if (progress.streakDays >= 30) awardBadge('streak_30');
    
    const mastered = vocab.filter(v => v.masteryLevel >= 80).length;
    if (mastered >= 100) awardBadge('memory_master');
    
    if (progress.level >= 10) awardBadge('level_10');
    if (progress.level >= 20) awardBadge('level_20');
    
    const speakingCount = history.filter(h => h.type === 'speaking').length;
    if (speakingCount >= 10) awardBadge('speaker_10');
    
    const listeningCount = history.filter(h => h.type === 'listening').length;
    if (listeningCount >= 10) awardBadge('listener_10');
    
    const gameCount = history.filter(h => h.type === 'game').length;
    if (gameCount >= 5) awardBadge('gamer_5');
    
    if (newBadgeEarned) {
      progress.badges = currentBadges;
      ZenStorage.updateProgress(progress);
    }
  },

  getAllBadgesStatus() {
    const earned = ZenStorage.getProgress().badges || [];
    return this.allBadges.map(b => ({
      ...b,
      unlocked: earned.includes(b.id)
    }));
  },

  // --- Notifications ---
  showXPNotification(amount, reason) {
    const notif = document.createElement('div');
    notif.className = 'xp-notification';
    notif.innerHTML = `+${amount} XP ${reason ? '<span style="font-size:0.6em;color:#fff;">'+reason+'</span>' : ''}`;
    
    // Position near bottom center
    notif.style.left = '50%';
    notif.style.bottom = '100px';
    notif.style.transform = 'translateX(-50%)';
    
    document.body.appendChild(notif);
    
    // Play sound if enabled
    const settings = ZenStorage.getSettings();
    if (settings && settings.soundEnabled) {
      this.playDingSound();
    }
    
    setTimeout(() => {
      if (notif.parentNode) notif.parentNode.removeChild(notif);
    }, 1500);
  },

  showLevelUpNotification(level) {
    const overlay = document.createElement('div');
    overlay.className = 'levelup-overlay';
    
    // Generate some confetti dots
    let confettiHTML = '';
    for(let i=0; i<30; i++) {
      const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100 + 'vw';
      const animDuration = (Math.random() * 2 + 2) + 's';
      const delay = Math.random() * 1 + 's';
      confettiHTML += `<div class="confetti" style="background:${color}; left:${left}; animation-duration:${animDuration}; animation-delay:${delay}"></div>`;
    }
    
    overlay.innerHTML = `
      ${confettiHTML}
      <div class="levelup-content glass-card">
        <h2>🎉 CHÚC MỪNG BẠN LÊN CẤP!</h2>
        <div class="level-num">${level}</div>
        <p class="text-secondary mt-md">Tiếp tục phát huy nhé!</p>
        <button class="btn btn-primary mt-lg" onclick="this.closest('.levelup-overlay').remove()">Tuyệt vời</button>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    const settings = ZenStorage.getSettings();
    if (settings && settings.soundEnabled) {
      this.playLevelUpSound();
    }
  },
  
  showBadgeNotification(badge) {
    const notif = document.createElement('div');
    notif.className = 'glass-card animate-slide-in-right';
    notif.style.position = 'fixed';
    notif.style.top = '80px';
    notif.style.right = '20px';
    notif.style.zIndex = '9999';
    notif.style.display = 'flex';
    notif.style.alignItems = 'center';
    notif.style.gap = '15px';
    notif.style.padding = '15px 20px';
    notif.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.2)';
    notif.style.border = '1px solid var(--warning)';
    
    notif.innerHTML = `
      <div style="font-size: 2.5rem">${badge.icon}</div>
      <div>
        <div style="font-size: 0.75rem; color: var(--warning-light); text-transform: uppercase; font-weight: bold;">Huy hiệu mới!</div>
        <div style="font-weight: 700; font-size: 1.1rem">${badge.name}</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary)">${badge.desc}</div>
      </div>
    `;
    
    document.body.appendChild(notif);
    
    const settings = ZenStorage.getSettings();
    if (settings && settings.soundEnabled) {
      this.playBadgeSound();
    }
    
    setTimeout(() => {
      notif.style.opacity = '0';
      notif.style.transform = 'translateX(30px)';
      setTimeout(() => {
        if (notif.parentNode) notif.parentNode.removeChild(notif);
      }, 300);
    }, 4000);
  },

  // --- UI Update ---
  updateUI() {
    const progress = ZenStorage.getProgress();
    
    // Update sidebar Elements if they exist
    const elLevel = document.getElementById('sidebar-level-num');
    const elXp = document.getElementById('sidebar-xp');
    const elXpNext = document.getElementById('sidebar-xp-next');
    const elXpBar = document.getElementById('sidebar-xp-bar');
    const elStreak = document.getElementById('sidebar-streak');
    
    if (elLevel) elLevel.textContent = progress.level;
    if (elXp) elXp.textContent = progress.xp;
    if (elXpNext) elXpNext.textContent = this.getXPForNextLevel();
    if (elXpBar) elXpBar.style.width = this.getLevelProgress() + '%';
    if (elStreak) elStreak.textContent = progress.streakDays;
  },

  // --- Simple Audio Synthesis for rewards ---
  playDingSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1); // A6
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  },
  
  playLevelUpSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const playNote = (freq, time, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + duration);
      };
      const now = ctx.currentTime;
      playNote(523.25, now, 0.15); // C5
      playNote(659.25, now + 0.15, 0.15); // E5
      playNote(783.99, now + 0.3, 0.15); // G5
      playNote(1046.50, now + 0.45, 0.6); // C6
    } catch (e) {}
  },
  
  playBadgeSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const playNote = (freq, time, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + duration);
      };
      const now = ctx.currentTime;
      playNote(880, now, 0.1); // A5
      playNote(1108.73, now + 0.1, 0.1); // C#6
      playNote(1318.51, now + 0.2, 0.4); // E6
    } catch (e) {}
  }
};
