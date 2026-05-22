/* ============================================
   ZenType Korean — Vocabulary Data
   ============================================ */

const ZenDataKR = {
  topics: [
    {
      id: 'communication_kr', name: 'Giao Tiếp (한국어)', icon: 'fa-comments', color: '#10b981',
      words: [
        { word: '안녕하세요', meaning: 'xin chào', phonetic: '/annyeonghaseyo/', pos: 'phrase', example: '안녕하세요! 만나서 반갑고 영광입니다.', exampleVi: 'Xin chào! Rất vui và vinh dự được gặp bạn.' },
        { word: '감사합니다', meaning: 'cảm ơn', phonetic: '/gamsahamnida/', pos: 'phrase', example: '도와주셔서 정말 감사합니다.', exampleVi: 'Thật sự cảm ơn bạn rất nhiều vì đã giúp đỡ.' },
        { word: '죄송합니다', meaning: 'xin lỗi', phonetic: '/joesonghamnida/', pos: 'phrase', example: '늦어서 정말 죄송합니다.', exampleVi: 'Thật sự xin lỗi vì tôi đã đến muộn.' },
        { word: '네', meaning: 'vâng / dạ', phonetic: '/ne/', pos: 'phrase', example: '네, 알겠습니다.', exampleVi: 'Vâng, tôi đã rõ.' },
        { word: '아니요', meaning: 'không', phonetic: '/aniyo/', pos: 'phrase', example: '아니요, 저는 괜찮습니다.', exampleVi: 'Không, tôi ổn.' },
        { word: '안녕히 계세요', meaning: 'tạm biệt (khi người nói đi, người nghe ở lại)', phonetic: '/annyeonghi gyeseyo/', pos: 'phrase', example: '안녕히 계세요. 다음에 또 뵙겠습니다.', exampleVi: 'Tạm biệt. Hẹn gặp lại lần sau.' },
        { word: '안녕히 가세요', meaning: 'tạm biệt (khi người nghe đi, hoặc cả hai cùng đi)', phonetic: '/annyeonghi gaseyo/', pos: 'phrase', example: '안녕히 가세요. 조심히 들어가세요.', exampleVi: 'Tạm biệt. Đi cẩn thận nhé.' },
        { word: '실례합니다', meaning: 'xin lỗi / phiền bạn', phonetic: '/sillyehamnida/', pos: 'phrase', example: '실례합니다, 길 좀 물어볼게요.', exampleVi: 'Xin lỗi, cho tôi hỏi đường một chút.' },
        { word: '어떻게 지내세요?', meaning: 'bạn thế nào?', phonetic: '/eotteoke jinaeseyo?/', pos: 'phrase', example: '요즘 어떻게 지내세요?', exampleVi: 'Dạo này bạn thế nào rồi?' },
        { word: '반가워요', meaning: 'rất vui được gặp', phonetic: '/bangawoyo/', pos: 'phrase', example: '만나서 반가워요.', exampleVi: 'Rất vui được gặp bạn.' }
      ]
    },
    {
      id: 'work_kr', name: 'Công Việc (한국어)', icon: 'fa-briefcase', color: '#3b82f6',
      words: [
        { word: '회사', meaning: 'công ty', phonetic: '/hoesa/', pos: 'n', example: '저는 서울에 있는 회사에 다닙니다.', exampleVi: 'Tôi làm việc tại một công ty ở Seoul.' },
        { word: '직업', meaning: 'nghề nghiệp', phonetic: '/jigeop/', pos: 'n', example: '당신의 직업은 무엇입니까?', exampleVi: 'Nghề nghiệp của bạn là gì?' },
        { word: '사무실', meaning: 'văn phòng', phonetic: '/samusil/', pos: 'n', example: '사무실은 5층에 있습니다.', exampleVi: 'Văn phòng ở tầng 5.' },
        { word: '동료', meaning: 'đồng nghiệp', phonetic: '/dongryo/', pos: 'n', example: '제 직장 동료들은 아주 친절합니다.', exampleVi: 'Đồng nghiệp ở nơi làm việc của tôi rất tốt bụng.' },
        { word: '회의', meaning: 'cuộc họp', phonetic: '/hoeui/', pos: 'n', example: '회의가 오전 10시에 시작합니다.', exampleVi: 'Cuộc họp bắt đầu lúc 10 giờ sáng.' },
        { word: '사장님', meaning: 'giám đốc / sếp', phonetic: '/sajangnim/', pos: 'n', example: '사장님께서 보고서를 검토하셨습니다.', exampleVi: 'Giám đốc đã duyệt báo cáo.' },
        { word: '계약', meaning: 'hợp đồng', phonetic: '/geyak/', pos: 'n', example: '드디어 계약서에 서명했습니다.', exampleVi: 'Cuối cùng tôi đã ký hợp đồng.' },
        { word: '월급', meaning: 'lương tháng', phonetic: '/wolgeup/', pos: 'n', example: '월급날이 빨리 왔으면 좋겠어요.', exampleVi: 'Tôi mong ngày nhận lương mau đến.' },
        { word: '성공', meaning: 'sự thành công', phonetic: '/seonggong/', pos: 'n', example: '프로젝트의 성공을 기원합니다.', exampleVi: 'Chúc dự án thành công tốt đẹp.' },
        { word: '면접', meaning: 'phỏng vấn', phonetic: '/myeonjeop/', pos: 'n', example: '내일 큰 회사에서 면접이 있어요.', exampleVi: 'Ngày mai tôi có buổi phỏng vấn ở một công ty lớn.' }
      ]
    },
    {
      id: 'travel_kr', name: 'Du Lịch (한국어)', icon: 'fa-plane', color: '#f59e0b',
      words: [
        { word: '여행', meaning: 'chuyến du lịch', phonetic: '/yeoheng/', pos: 'n', example: '한국으로 여행을 가고 싶어요.', exampleVi: 'Tôi muốn đi du lịch Hàn Quốc.' },
        { word: '표', meaning: 'vé', phonetic: '/pyo/', pos: 'n', example: '기차표를 한 장 예매했습니다.', exampleVi: 'Tôi đã đặt trước một chiếc vé tàu.' },
        { word: '호텔', meaning: 'khách sạn', phonetic: '/hotel/', pos: 'n', example: '예약한 호텔은 명동에 있습니다.', exampleVi: 'Khách sạn đã đặt nằm ở Myeongdong.' },
        { word: '여권', meaning: 'hộ chiếu', phonetic: '/yeogwon/', pos: 'n', example: '공항에 가기 전에 여권을 꼭 확인하세요.', exampleVi: 'Nhớ kiểm tra hộ chiếu trước khi đi sân bay nhé.' },
        { word: '짐', meaning: 'hành lý', phonetic: '/jim/', pos: 'n', example: '제 짐이 어디에서 나옵니까?', exampleVi: 'Hành lý của tôi nhận ở đâu vậy?' },
        { word: '역', meaning: 'nhà ga', phonetic: '/yeok/', pos: 'n', example: '서울역은 밤에도 사람이 많습니다.', exampleVi: 'Ga Seoul lúc nửa đêm cũng rất đông người.' },
        { word: '공항', meaning: 'sân bay', phonetic: '/gonghang/', pos: 'n', example: '인천공항은 세계적으로 유명합니다.', exampleVi: 'Sân bay Incheon nổi tiếng trên thế giới.' },
        { word: '비행기', meaning: 'máy bay', phonetic: '/bihenggi/', pos: 'n', example: '비행기 표가 너무 비싸요.', exampleVi: 'Vé máy bay đắt quá.' },
        { word: '휴가', meaning: 'kỳ nghỉ', phonetic: '/hyuga/', pos: 'n', example: '여름 휴가 때 제주도에 갈 거예요.', exampleVi: 'Kỳ nghỉ hè này tôi sẽ đi đảo Jeju.' },
        { word: '지도', meaning: 'bản đồ', phonetic: '/jido/', pos: 'n', example: '스마트폰 지도를 보면서 길을 찾았어요.', exampleVi: 'Tôi đã tìm đường bằng cách xem bản đồ trên điện thoại.' }
      ]
    },
    {
      id: 'family_kr', name: 'Gia Đình (한국어)', icon: 'fa-user-group', color: '#8b5cf6',
      words: [
        { word: '가족', meaning: 'gia đình', phonetic: '/gajok/', pos: 'n', example: '우리 가족은 모두 네 명입니다.', exampleVi: 'Gia đình chúng tôi tổng cộng có bốn người.' },
        { word: '부모님', meaning: 'bố mẹ', phonetic: '/bumonim/', pos: 'n', example: '부모님께 매주 전화를 드립니다.', exampleVi: 'Mỗi tuần tôi đều gọi điện cho bố mẹ.' },
        { word: '아버지', meaning: 'bố', phonetic: '/abeoji/', pos: 'n', example: '아버지는 요리를 아주 잘하십니다.', exampleVi: 'Bố tôi nấu ăn rất ngon.' },
        { word: '어머니', meaning: 'mẹ', phonetic: '/eomeoni/', pos: 'n', example: '어머니의 따뜻한 손길이 그리워요.', exampleVi: 'Tôi nhớ bàn tay ấm áp của mẹ.' },
        { word: '아이', meaning: 'đứa trẻ / con', phonetic: '/ai/', pos: 'n', example: '아이가 운동장에서 놀고 있어요.', exampleVi: 'Đứa trẻ đang chơi trên sân vận động.' },
        { word: '형제', meaning: 'anh em', phonetic: '/hyeongje/', pos: 'n', example: '저는 형제가 세 명 있습니다.', exampleVi: 'Tôi có ba anh em.' },
        { word: '자매', meaning: 'chị em', phonetic: '/jamae/', pos: 'n', example: '우리 자매는 성격이 서로 달라요.', exampleVi: 'Chị em chúng tôi tính cách khác nhau.' },
        { word: '친구', meaning: 'người bạn', phonetic: '/chingu/', pos: 'n', example: '그는 가장 친한 친구입니다.', exampleVi: 'Anh ấy là người bạn thân nhất của tôi.' },
        { word: '사랑', meaning: 'tình yêu', phonetic: '/sarang/', pos: 'n', example: '사랑은 모든 것을 변화시킵니다.', exampleVi: 'Tình yêu làm thay đổi mọi thứ.' },
        { word: '집', meaning: 'ngôi nhà', phonetic: '/jip/', pos: 'n', example: '저는 아늑하고 작은 집에 살아요.', exampleVi: 'Tôi sống trong một ngôi nhà nhỏ ấm cúng.' }
      ]
    }
  ],

  phrases: [
    { kr: '안녕하세요', vi: 'Xin chào', topic: 'communication_kr' },
    { kr: '감사합니다', vi: 'Cảm ơn bạn', topic: 'communication_kr' },
    { kr: '죄송합니다', vi: 'Tôi xin lỗi', topic: 'communication_kr' },
    { kr: '실례합니다', vi: 'Xin lỗi / Xin phiền bạn', topic: 'communication_kr' },
    { kr: '천만에요', vi: 'Không có gì / Rất sẵn lòng', topic: 'communication_kr' }
  ],

  sentences: [
    { kr: '한국어를 하실 수 있나요?', vi: 'Bạn có nói được tiếng Hàn không?', topic: 'communication_kr' },
    { kr: '이해하지 못했습니다.', vi: 'Tôi không hiểu.', topic: 'communication_kr' },
    { kr: '이것은 얼마인가요?', vi: 'Cái này giá bao nhiêu?', topic: 'communication_kr' },
    { kr: '화장실이 어디에 있나요?', vi: 'Nhà vệ sinh ở đâu ạ?', topic: 'communication_kr' },
    { kr: '물이 필요합니다.', vi: 'Tôi cần một ít nước.', topic: 'communication_kr' },
    { kr: '도와주실 수 있나요?', vi: 'Bạn có thể giúp tôi không?', topic: 'communication_kr' }
  ],

  // Helper methods
  getTopicById(id) {
    return this.topics.find(t => t.id === id);
  },
  getWordsByTopic(topicId) {
    const topic = this.getTopicById(topicId);
    return topic ? topic.words : [];
  },
  getRandomWords(count, topicId) {
    let pool = topicId ? this.getWordsByTopic(topicId) : this.getAllWords();
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  },
  searchWords(query) {
    const q = query.toLowerCase();
    return this.getAllWords().filter(w =>
      w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q)
    );
  },
  getAllWords() {
    return this.topics.flatMap(t => t.words.map(w => ({ ...w, topicId: t.id, topicName: t.name, topicColor: t.color })));
  },
  getPhrasesByTopic(topicId) {
    return this.phrases;
  },
  getRandomPhrases(count, topicId) {
    const pool = this.phrases;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
  },
  getRandomSentences(count, topicId) {
    const pool = this.sentences;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
  }
};
