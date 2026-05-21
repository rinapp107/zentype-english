/* ============================================
   ZenType English — Dashboard Module
   ============================================ */

window.DashboardModule = {
  render(container) {
    const progress = ZenStorage.getProgress();
    const vocab = ZenStorage.getVocabulary();
    const history = ZenStorage.getHistory();
    const reviewQueue = ZenStorage.getReviewQueue();
    const badges = Gamification.getAllBadgesStatus();
    
    // Quick stats calculations
    const masteredCount = vocab.filter(v => v.masteryLevel >= 80).length;
    const learningCount = vocab.length - masteredCount;
    
    // Calculate last 7 days activity
    const activityData = this.getActivityData(history);
    
    container.innerHTML = `
      <div class="dashboard-header animate-slide-up">
        <h2>Xin chào, người học tiếng Anh! 👋</h2>
        <p class="text-secondary">Hôm nay bạn muốn học gì?</p>
      </div>

      <!-- Main Overview Cards -->
      <div class="grid dashboard-overview mt-lg">
        <div class="glass-card animate-slide-up" style="animation-delay: 0.1s">
          <div class="stat-icon" style="background: rgba(139, 92, 246, 0.1); color: var(--primary);">
            <i class="fa-solid fa-fire"></i>
          </div>
          <div class="stat-content">
            <h3>${progress.streakDays} Ngày</h3>
            <p>Chuỗi học liên tục</p>
          </div>
        </div>
        
        <div class="glass-card animate-slide-up" style="animation-delay: 0.2s">
          <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1); color: var(--success);">
            <i class="fa-solid fa-brain"></i>
          </div>
          <div class="stat-content">
            <h3>${vocab.length} Từ</h3>
            <p>Đang học (${masteredCount} đã thuộc)</p>
          </div>
        </div>
        
        <div class="glass-card animate-slide-up" style="animation-delay: 0.3s">
          <div class="stat-icon" style="background: rgba(245, 158, 11, 0.1); color: var(--warning);">
            <i class="fa-solid fa-clock-rotate-left"></i>
          </div>
          <div class="stat-content">
            <h3>${reviewQueue.length} Từ</h3>
            <p>Cần ôn tập hôm nay</p>
          </div>
          ${reviewQueue.length > 0 ? '<button class="btn btn-primary btn-sm ml-auto" onclick="loadPage(\'spaced-repetition\')">Ôn ngay</button>' : ''}
        </div>
      </div>

      <!-- Quick Actions -->
      <h3 class="mt-xl mb-md">Lối tắt</h3>
      <div class="grid quick-actions animate-slide-up" style="animation-delay: 0.4s; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));">
        <button class="glass-card flex-col align-center p-md" onclick="loadPage('vocabulary')">
          <i class="fa-solid fa-book-medical text-primary" style="font-size: 2rem; margin-bottom: 10px;"></i>
          <span>Thêm Từ Mới</span>
        </button>
        <button class="glass-card flex-col align-center p-md" onclick="loadPage('quiz')">
          <i class="fa-solid fa-gamepad text-success" style="font-size: 2rem; margin-bottom: 10px;"></i>
          <span>Quiz Nhanh</span>
        </button>
        <button class="glass-card flex-col align-center p-md" onclick="loadPage('speaking')">
          <i class="fa-solid fa-microphone text-warning" style="font-size: 2rem; margin-bottom: 10px;"></i>
          <span>Luyện Nói</span>
        </button>
        <button class="glass-card flex-col align-center p-md" onclick="loadPage('typing')">
          <i class="fa-solid fa-keyboard text-accent" style="font-size: 2rem; margin-bottom: 10px;"></i>
          <span>Luyện Viết</span>
        </button>
      </div>

      <div class="grid mt-xl" style="grid-template-columns: 2fr 1fr; gap: var(--space-lg);">
        <!-- Activity Chart -->
        <div class="glass-card animate-slide-up" style="animation-delay: 0.5s">
          <h3 class="mb-md">Hoạt động tuần qua</h3>
          <div class="activity-chart" style="display: flex; align-items: flex-end; height: 200px; gap: 10px; padding-top: 20px;">
            ${this.renderActivityChart(activityData)}
          </div>
        </div>

        <!-- Badges / Achievements -->
        <div class="glass-card animate-slide-up" style="animation-delay: 0.6s">
          <h3 class="mb-md">Huy hiệu (${progress.badges.length}/${badges.length})</h3>
          <div class="badges-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            ${this.renderBadges(badges)}
          </div>
        </div>
      </div>
    `;
  },
  
  getActivityData(history) {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10); // YYYY-MM-DD
      
      const dayHistory = history.filter(h => h.date.startsWith(dateStr));
      let score = dayHistory.length * 10; // Simple score based on action count
      if (score > 100) score = 100;
      
      const dayName = d.toLocaleDateString('vi-VN', { weekday: 'short' });
      days.push({ dayName, score });
    }
    return days;
  },
  
  renderActivityChart(data) {
    return data.map(d => `
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;">
        <div style="width: 100%; background: var(--primary); border-radius: 4px 4px 0 0; height: ${d.score}%; max-height: 100%; transition: height 1s ease-out;"></div>
        <span style="font-size: 0.75rem; margin-top: 5px; color: var(--text-secondary)">${d.dayName}</span>
      </div>
    `).join('');
  },
  
  renderBadges(badges) {
    // Show up to 9 badges, prioritizing unlocked ones
    const sortedBadges = [...badges].sort((a, b) => (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0));
    
    return sortedBadges.slice(0, 9).map(b => `
      <div class="badge-item tooltip ${b.unlocked ? '' : 'locked'}" data-tooltip="${b.name}: ${b.desc}" 
           style="text-align: center; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px; filter: ${b.unlocked ? 'none' : 'grayscale(1) opacity(0.4)'};">
        <div style="font-size: 2rem; margin-bottom: 5px;">${b.icon}</div>
      </div>
    `).join('');
  }
};
