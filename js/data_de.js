/* ============================================
   ZenType German — Vocabulary Data
   ============================================ */

const ZenDataDE = {
  topics: [
    {
      id: 'communication_de', name: 'Giao Tiếp (Deutsch)', icon: 'fa-comments', color: '#10b981',
      words: [
        { word: 'Hallo', meaning: 'xin chào', phonetic: '/ˈhaloː/', pos: 'phrase', example: 'Hallo! Wie geht es dir?', exampleVi: 'Xin chào! Bạn thế nào?' },
        { word: 'Bitte', meaning: 'làm ơn / không có chi', phonetic: '/ˈbɪtə/', pos: 'phrase', example: 'Bitte, helfen Sie mir.', exampleVi: 'Làm ơn giúp tôi với.' },
        { word: 'Danke', meaning: 'cảm ơn', phonetic: '/ˈdaŋkə/', pos: 'phrase', example: 'Danke für das Geschenk.', exampleVi: 'Cảm ơn vì món quà.' },
        { word: 'Ja', meaning: 'có / vâng', phonetic: '/jaː/', pos: 'phrase', example: 'Ja, das ist richtig.', exampleVi: 'Vâng, đúng vậy.' },
        { word: 'Nein', meaning: 'không', phonetic: '/naɪn/', pos: 'phrase', example: 'Nein, ich habe keine Zeit.', exampleVi: 'Không, tôi không có thời gian.' },
        { word: 'Tschüss', meaning: 'tạm biệt (thân mật)', phonetic: '/tʃyːs/', pos: 'phrase', example: 'Tschüss, bis morgen!', exampleVi: 'Tạm biệt, hẹn gặp lại ngày mai!' },
        { word: 'Guten Morgen', meaning: 'chào buổi sáng', phonetic: '/ˈɡuːtn̩ ˈmɔrɡn̩/', pos: 'phrase', example: 'Guten Morgen, mein Freund!', exampleVi: 'Chào buổi sáng, bạn tôi!' },
        { word: 'Entschuldigung', meaning: 'xin lỗi / phiền bạn', phonetic: '/ɛntˈʃʊldɪɡʊŋ/', pos: 'n', example: 'Entschuldigung, wo ist der Bahnhof?', exampleVi: 'Xin lỗi, ga tàu ở đâu?' },
        { word: 'Wie geht\'s?', meaning: 'bạn thế nào? (viết tắt)', phonetic: '/viː ɡeːt-s/', pos: 'phrase', example: 'Hallo! Wie geht\'s?', exampleVi: 'Xin chào! Bạn thế nào?' },
        { word: 'Freut mich', meaning: 'rất vui được gặp', phonetic: '/frɔɪt mɪç/', pos: 'phrase', example: 'Freut mich, Sie kennenzulernen.', exampleVi: 'Rất vui được làm quen với bạn.' }
      ]
    },
    {
      id: 'work_de', name: 'Công Việc (Deutsch)', icon: 'fa-briefcase', color: '#3b82f6',
      words: [
        { word: 'die Arbeit', meaning: 'công việc', phonetic: '/ˈarbaɪt/', pos: 'n', example: 'Ich liebe meine Arbeit.', exampleVi: 'Tôi yêu công việc của mình.' },
        { word: 'der Beruf', meaning: 'nghề nghiệp', phonetic: '//bəˈruːf//', pos: 'n', example: 'Was ist dein Beruf?', exampleVi: 'Nghề nghiệp của bạn là gì?' },
        { word: 'das Büro', meaning: 'văn phòng', phonetic: '/byˈroː/', pos: 'n', example: 'Unser Büro ist in Berlin.', exampleVi: 'Văn phòng của chúng tôi ở Berlin.' },
        { word: 'der Kollege', meaning: 'đồng nghiệp', phonetic: '/kɔˈleːɡə/', pos: 'n', example: 'Mein Kollege ist sehr nett.', exampleVi: 'Đồng nghiệp của tôi rất tốt bụng.' },
        { word: 'das Treffen', meaning: 'cuộc họp / gặp mặt', phonetic: '/ˈtrɛfn̩/', pos: 'n', example: 'Das Treffen beginnt um 9 Uhr.', exampleVi: 'Cuộc họp bắt đầu lúc 9 giờ.' },
        { word: 'der Chef', meaning: 'sếp / trưởng phòng', phonetic: '/ʃɛf/', pos: 'n', example: 'Der Chef hat das Dokument unterschrieben.', exampleVi: 'Sếp đã ký tài liệu.' },
        { word: 'der Vertrag', meaning: 'hợp đồng', phonetic: '/fɛɐ̯ˈtraːk/', pos: 'n', example: 'Bitte unterschreiben Sie den Vertrag.', exampleVi: 'Vui lòng ký hợp đồng.' },
        { word: 'das Gehalt', meaning: 'lương', phonetic: '/ɡəˈhalt/', pos: 'n', example: 'Er bekommt ein gutes Gehalt.', exampleVi: 'Anh ấy nhận được mức lương tốt.' },
        { word: 'die Bewerbung', meaning: 'đơn ứng tuyển', phonetic: '//bəˈvɛrbʊŋ//', pos: 'n', example: 'Ich habe meine Bewerbung abgeschickt.', exampleVi: 'Tôi đã gửi đơn ứng tuyển của mình.' },
        { word: 'der Erfolg', meaning: 'sự thành công', phonetic: '/ɛɐ̯ˈfɔlk/', pos: 'n', example: 'Ich wünsche dir viel Erfolg.', exampleVi: 'Chúc bạn nhiều thành công.' }
      ]
    },
    {
      id: 'travel_de', name: 'Du Lịch (Deutsch)', icon: 'fa-plane', color: '#f59e0b',
      words: [
        { word: 'die Reise', meaning: 'chuyến du lịch', phonetic: '/ˈraɪzə/', pos: 'n', example: 'Gute Reise!', exampleVi: 'Chúc chuyến đi tốt đẹp!' },
        { word: 'das Ticket', meaning: 'vé', phonetic: '/ˈtɪkət/', pos: 'n', example: 'Ich muss ein Ticket kaufen.', exampleVi: 'Tôi phải mua một chiếc vé.' },
        { word: 'das Hotel', meaning: 'khách sạn', phonetic: '/hoˈtɛl/', pos: 'n', example: 'Unser Hotel ist in der Nähe.', exampleVi: 'Khách sạn của chúng tôi ở gần đây.' },
        { word: 'der Pass', meaning: 'hộ chiếu', phonetic: '/pas/', pos: 'n', example: 'Vergiss deinen Pass nicht.', exampleVi: 'Đừng quên hộ chiếu của bạn.' },
        { word: 'das Gepäck', meaning: 'hành lý', phonetic: '/ɡəˈpɛk/', pos: 'n', example: 'Wo kann ich mein Gepäck abgeben?', exampleVi: 'Tôi có thể gửi hành lý ở đâu?' },
        { word: 'der Bahnhof', meaning: 'ga tàu', phonetic: '/ˈbaːnˌhoːf/', pos: 'n', example: 'Der Bahnhof ist sehr groß.', exampleVi: 'Ga tàu rất lớn.' },
        { word: 'der Flughafen', meaning: 'sân bay', phonetic: '/ˈfluːkˌhaːfn̩/', pos: 'n', example: 'Wir fahren zum Flughafen.', exampleVi: 'Chúng tôi đang đi đến sân bay.' },
        { word: 'das Flugzeug', meaning: 'máy bay', phonetic: '/ˈfluːkˌtsɔɪk/', pos: 'n', example: 'Das Flugzeug fliegt nach München.', exampleVi: 'Máy bay bay đến Munich.' },
        { word: 'der Urlaub', meaning: 'kỳ nghỉ', phonetic: '/ˈuːrlaʊp/', pos: 'n', example: 'Wir machen im Sommer Urlaub.', exampleVi: 'Chúng tôi đi nghỉ mát vào mùa hè.' },
        { word: 'die Karte', meaning: 'bản đồ / thẻ', phonetic: '/ˈkartə/', pos: 'n', example: 'Ich brauche eine Karte der Stadt.', exampleVi: 'Tôi cần một bản đồ thành phố.' }
      ]
    },
    {
      id: 'family_de', name: 'Gia Đình (Deutsch)', icon: 'fa-user-group', color: '#8b5cf6',
      words: [
        { word: 'die Familie', meaning: 'gia đình', phonetic: '/faˈmiːli̯ə/', pos: 'n', example: 'Meine Familie ist mir sehr wichtig.', exampleVi: 'Gia đình tôi rất quan trọng với tôi.' },
        { word: 'die Eltern', meaning: 'bố mẹ', phonetic: '/ˈɛltɐn/', pos: 'n', example: 'Meine Eltern wohnen in Hamburg.', exampleVi: 'Bố mẹ tôi sống ở Hamburg.' },
        { word: 'der Vater', meaning: 'bố', phonetic: '/ˈfaːtɐ/', pos: 'n', example: 'Mein Vater arbeitet viel.', exampleVi: 'Bố tôi làm việc nhiều.' },
        { word: 'die Mutter', meaning: 'mẹ', phonetic: '/ˈmʊtɐ/', pos: 'n', example: 'Meine Mutter kocht sehr gut.', exampleVi: 'Mẹ tôi nấu ăn rất ngon.' },
        { word: 'das Kind', meaning: 'đứa trẻ / con', phonetic: '/kɪnt/', pos: 'n', example: 'Sie haben ein Kind.', exampleVi: 'Họ có một đứa con.' },
        { word: 'der Bruder', meaning: 'anh/em trai', phonetic: '/ˈbruːdɐ/', pos: 'n', example: 'Mein Bruder lernt Deutsch.', exampleVi: 'Anh trai tôi đang học tiếng Đức.' },
        { word: 'die Schwester', meaning: 'chị/em gái', phonetic: '/ˈʃvɛstɐ/', pos: 'n', example: 'Meine Schwester studiert Medizin.', exampleVi: 'Em gái tôi học ngành Y.' },
        { word: 'der Freund', meaning: 'người bạn / bạn trai', phonetic: '/frɔɪnt/', pos: 'n', example: 'Er ist ein guter Freund.', exampleVi: 'Anh ấy là một người bạn tốt.' },
        { word: 'die Liebe', meaning: 'tình yêu', phonetic: '/ˈliːbə/', pos: 'n', example: 'Liebe ist alles.', exampleVi: 'Tình yêu là tất cả.' },
        { word: 'das Haus', meaning: 'ngôi nhà', phonetic: '/haʊs/', pos: 'n', example: 'Wir wohnen in einem kleinen Haus.', exampleVi: 'Chúng tôi sống trong một ngôi nhà nhỏ.' }
      ]
    }
  ],

  phrases: [
    { de: 'Guten Tag', vi: 'Chào ban ngày / Chào bạn', topic: 'communication_de' },
    { de: 'Auf Wiedersehen', vi: 'Tạm biệt (trang trọng)', topic: 'communication_de' },
    { de: 'Es tut mir leid', vi: 'Tôi xin lỗi', topic: 'communication_de' },
    { de: 'Kein Problem', vi: 'Không có vấn đề gì', topic: 'communication_de' },
    { de: 'Guten Appetit', vi: 'Chúc ngon miệng', topic: 'communication_de' }
  ],

  sentences: [
    { de: 'Sprechen Sie Englisch?', vi: 'Bạn có nói tiếng Anh không?', topic: 'communication_de' },
    { de: 'Ich verstehe das nicht.', vi: 'Tôi không hiểu điều đó.', topic: 'communication_de' },
    { de: 'Wie viel kostet das?', vi: 'Cái này giá bao nhiêu?', topic: 'communication_de' },
    { de: 'Wo ist die Toilette, bitte?', vi: 'Xin hỏi nhà vệ sinh ở đâu?', topic: 'communication_de' },
    { de: 'Ich möchte ein Bier bestellen.', vi: 'Tôi muốn gọi một cốc bia.', topic: 'communication_de' },
    { de: 'Können Sie mir helfen?', vi: 'Bạn có thể giúp tôi không?', topic: 'communication_de' }
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
    // Return all phrases or filter by topic (mapping english phrase key schema if needed)
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
