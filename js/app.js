/* ============================================
   ZenType English — Main Application App.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize core systems
  ZenStorage.init();
  Gamification.init();
  
  // 2. Setup navigation
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const menuToggle = document.getElementById('menu-toggle');
  const navItems = document.querySelectorAll('.nav-item');
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
  const pageTitle = document.getElementById('page-title');
  const mainContent = document.getElementById('main-content');
  
  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    sidebar.classList.add('open');
    sidebarBackdrop.classList.add('active');
  });
  
  sidebarBackdrop.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('active');
  });

  // Routing
  const loadPage = (pageId) => {
    // Update active state on navs
    navItems.forEach(nav => {
      nav.classList.toggle('active', nav.dataset.page === pageId);
      if (nav.dataset.page === pageId) {
        // Update header title
        pageTitle.innerHTML = nav.innerHTML;
      }
    });
    
    bottomNavItems.forEach(nav => {
      nav.classList.toggle('active', nav.dataset.page === pageId);
    });

    // Close mobile sidebar if open
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('active');
    
    // Clear main content and show loading
    mainContent.innerHTML = `
      <div class="empty-state">
        <div class="spinner" style="margin: 0 auto var(--space-lg);"></div>
        <h3>Đang tải...</h3>
      </div>
    `;

    // Render appropriate module
    setTimeout(() => {
      mainContent.innerHTML = ''; // clear loading
      mainContent.className = `page-${pageId} animate-fade-in`;
      
      try {
        switch (pageId) {
          case 'dashboard':
            if (window.DashboardModule) DashboardModule.render(mainContent);
            else renderPlaceholder(mainContent, 'Dashboard');
            break;
          case 'vocabulary':
            if (window.VocabularyModule) VocabularyModule.render(mainContent);
            else renderPlaceholder(mainContent, 'Từ Vựng');
            break;
          case 'quiz':
            if (window.QuizModule) QuizModule.render(mainContent);
            else renderPlaceholder(mainContent, 'Trắc Nghiệm');
            break;
          case 'flashcard':
            if (window.FlashcardModule) FlashcardModule.render(mainContent);
            else renderPlaceholder(mainContent, 'Flashcard');
            break;
          case 'typing':
            if (window.TypingModule) TypingModule.render(mainContent);
            else renderPlaceholder(mainContent, 'Bài Tập Viết');
            break;
          case 'translate':
            if (window.TranslateModule) TranslateModule.render(mainContent);
            else renderPlaceholder(mainContent, 'Dịch Câu');
            break;
          case 'listening':
            if (window.ListeningModule) ListeningModule.render(mainContent);
            else renderPlaceholder(mainContent, 'Luyện Nghe');
            break;
          case 'speaking':
            if (window.SpeakingModule) SpeakingModule.render(mainContent);
            else renderPlaceholder(mainContent, 'Luyện Nói');
            break;
          case 'spaced-repetition':
            if (window.SpacedRepetitionModule) SpacedRepetitionModule.render(mainContent);
            else renderPlaceholder(mainContent, 'Ôn Tập Thông Minh');
            break;
          case 'minigames':
            if (window.MinigamesModule) MinigamesModule.render(mainContent);
            else renderPlaceholder(mainContent, 'Mini Games');
            break;
          default:
            renderPlaceholder(mainContent, 'Không tìm thấy trang');
        }
      } catch (e) {
        console.error(`Error rendering page ${pageId}:`, e);
        mainContent.innerHTML = `
          <div class="empty-state text-error">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <h3>Lỗi hiển thị</h3>
            <p>${e.message}</p>
          </div>
        `;
      }
    }, 100);
  };

  // Nav click handlers
  navItems.forEach(item => {
    item.addEventListener('click', () => loadPage(item.dataset.page));
  });
  
  bottomNavItems.forEach(item => {
    item.addEventListener('click', () => loadPage(item.dataset.page));
  });

  // Placeholder renderer for modules not yet implemented
  const renderPlaceholder = (container, name) => {
    container.innerHTML = `
      <div class="empty-state animate-scale-in">
        <i class="fa-solid fa-person-digging text-accent" style="font-size: 4rem;"></i>
        <h2 class="mt-md mb-sm">Tính năng ${name}</h2>
        <p class="text-secondary">Đang được xây dựng. Vui lòng quay lại sau!</p>
      </div>
    `;
  };

  // 3. Update Global Badges (Review Queue)
  const updateGlobalBadges = () => {
    const reviewQueue = ZenStorage.getReviewQueue();
    const reviewBadge = document.getElementById('review-badge');
    const wordCount = document.getElementById('sidebar-words');
    
    if (reviewQueue.length > 0) {
      reviewBadge.textContent = reviewQueue.length;
      reviewBadge.style.display = 'inline-block';
    } else {
      reviewBadge.style.display = 'none';
    }
    
    if (wordCount) {
      wordCount.textContent = ZenStorage.getVocabulary().length;
    }
  };
  updateGlobalBadges();

  // 4. Settings Modal
  const btnSettings = document.getElementById('btn-settings');
  const modalSettings = document.getElementById('settings-modal');
  const btnCloseSettings = document.getElementById('close-settings');
  
  if (btnSettings && modalSettings) {
    btnSettings.addEventListener('click', () => {
      const settings = ZenStorage.getSettings();
      document.getElementById('setting-voice').value = settings.voiceAccent || 'en-US';
      document.getElementById('setting-daily-goal').value = settings.dailyGoal || 10;
      
      const soundBtn = document.getElementById('setting-sound-toggle');
      if (settings.soundEnabled) {
        soundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Bật';
        soundBtn.className = 'btn btn-success';
      } else {
        soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> Tắt';
        soundBtn.className = 'btn btn-secondary';
      }
      
      modalSettings.classList.add('active');
    });
    
    btnCloseSettings.addEventListener('click', () => {
      modalSettings.classList.remove('active');
    });
    
    // Save settings on change
    document.getElementById('setting-voice').addEventListener('change', (e) => {
      ZenStorage.updateSettings({ voiceAccent: e.target.value });
    });
    document.getElementById('setting-daily-goal').addEventListener('change', (e) => {
      ZenStorage.updateSettings({ dailyGoal: parseInt(e.target.value) });
    });
    
    document.getElementById('setting-sound-toggle').addEventListener('click', (e) => {
      const settings = ZenStorage.getSettings();
      const newState = !settings.soundEnabled;
      ZenStorage.updateSettings({ soundEnabled: newState });
      
      const btn = e.currentTarget;
      if (newState) {
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Bật';
        btn.className = 'btn btn-success';
        Gamification.playDingSound();
      } else {
        btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> Tắt';
        btn.className = 'btn btn-secondary';
      }
    });

    // Data Management
    document.getElementById('setting-export').addEventListener('click', () => {
      const dataStr = ZenStorage.exportAll();
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = 'zentype_backup_' + new Date().toISOString().slice(0,10) + '.json';
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    });
    
    document.getElementById('setting-import').addEventListener('click', () => {
      document.getElementById('import-file').click();
    });
    
    document.getElementById('import-file').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        const success = ZenStorage.importAll(evt.target.result);
        if (success) {
          alert('Nhập dữ liệu thành công! Trang sẽ tải lại.');
          location.reload();
        } else {
          alert('Lỗi: File dữ liệu không hợp lệ.');
        }
      };
      reader.readAsText(file);
    });
    
    document.getElementById('setting-reset').addEventListener('click', () => {
      if (confirm('CẢNH BÁO: Bất khả thi! Bạn có chắc chắn muốn xóa TOÀN BỘ dữ liệu học tập, từ vựng và cấp độ không?')) {
        ZenStorage.resetAll();
        location.reload();
      }
    });
  }

  // Quick Review Button
  const btnQuickReview = document.getElementById('btn-quick-review');
  if (btnQuickReview) {
    btnQuickReview.addEventListener('click', () => loadPage('spaced-repetition'));
  }

  // 5. Initial Load - Default to Dashboard
  loadPage('dashboard');
  
  // Make some globals accessible for modules
  window.loadPage = loadPage;
  window.updateGlobalBadges = updateGlobalBadges;
});
