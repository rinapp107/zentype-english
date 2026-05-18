/**
 * RinType English - Database for Vocabularies, Phrases, and Stories
 */
const RINTYPE_DATABASE = {
  vocabulary: [
    // Technology
    { word: "algorithm", ipa: "/ˈæl.ɡə.rɪ.ðəm/", partOfSpeech: "n", definition: "thuật toán", category: "Technology" },
    { word: "database", ipa: "/ˈdeɪ.tə.beɪs/", partOfSpeech: "n", definition: "cơ sở dữ liệu", category: "Technology" },
    { word: "cybersecurity", ipa: "/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/", partOfSpeech: "n", definition: "an ninh mạng", category: "Technology" },
    { word: "artificial", ipa: "/ˌɑː.tɪˈfɪʃ.əl/", partOfSpeech: "adj", definition: "nhân tạo", category: "Technology" },
    { word: "intelligence", ipa: "/ɪnˈtel.ɪ.dʒəns/", partOfSpeech: "n", definition: "trí thông minh", category: "Technology" },
    { word: "application", ipa: "/ˌæp.lɪˈkeɪ.ʃən/", partOfSpeech: "n", definition: "ứng dụng", category: "Technology" },
    { word: "responsive", ipa: "/rɪˈspɒn.sɪv/", partOfSpeech: "adj", definition: "phản hồi nhanh, tương thích", category: "Technology" },
    { word: "framework", ipa: "/ˈfreɪm.wɜːk/", partOfSpeech: "n", definition: "khung làm việc, bộ khung", category: "Technology" },
    { word: "repository", ipa: "/rɪˈpɒz.ɪ.tər.i/", partOfSpeech: "n", definition: "kho chứa, kho mã nguồn", category: "Technology" },
    { word: "encryption", ipa: "/ɪnˈkrɪp.ʃən/", partOfSpeech: "n", definition: "sự mã hóa", category: "Technology" },

    // Business & Work
    { word: "collaboration", ipa: "/kəˌlæb.əˈreɪ.ʃən/", partOfSpeech: "n", definition: "sự hợp tác", category: "Business" },
    { word: "negotiation", ipa: "/nəˌɡəʊ.ʃiˈeɪ.ʃən/", partOfSpeech: "n", definition: "sự đàm phán", category: "Business" },
    { word: "entrepreneur", ipa: "/ˌɒn.trə.prəˈnɜːr/", partOfSpeech: "n", definition: "nhà khởi nghiệp", category: "Business" },
    { word: "innovative", ipa: "/ˈɪn.ə.və.tɪv/", partOfSpeech: "adj", definition: "sáng tạo, đổi mới", category: "Business" },
    { word: "productivity", ipa: "/ˌprɒd.ʌkˈtɪv.ə.ti/", partOfSpeech: "n", definition: "năng suất", category: "Business" },
    { word: "headquarters", ipa: "/ˌhedˈkwɔː.təz/", partOfSpeech: "n", definition: "trụ sở chính", category: "Business" },
    { word: "management", ipa: "/ˈmæn.ɪdʒ.mənt/", partOfSpeech: "n", definition: "sự quản lý, ban quản lý", category: "Business" },
    { word: "strategy", ipa: "/ˈstræt.ə.dʒi/", partOfSpeech: "n", definition: "chiến lược", category: "Business" },
    { word: "marketing", ipa: "/ˈmɑː.kɪ.tɪŋ/", partOfSpeech: "n", definition: "tiếp thị", category: "Business" },
    { word: "investment", ipa: "/ɪnˈvest.mənt/", partOfSpeech: "n", definition: "sự đầu tư", category: "Business" },

    // Oxford 3000 / Daily Life
    { word: "atmosphere", ipa: "/ˈæt.məs.fɪər/", partOfSpeech: "n", definition: "bầu không khí", category: "Daily Life" },
    { word: "experience", ipa: "/ɪkˈspɪə.ri.əns/", partOfSpeech: "n, v", definition: "kinh nghiệm, trải nghiệm", category: "Daily Life" },
    { word: "opportunity", ipa: "/ˌɒp.əˈtʃuː.nə.ti/", partOfSpeech: "n", definition: "cơ hội", category: "Daily Life" },
    { word: "communicate", ipa: "/kəˈmjuː.nɪ.keɪt/", partOfSpeech: "v", definition: "giao tiếp", category: "Daily Life" },
    { word: "environment", ipa: "/ɪnˈvaɪ.rən.mənt/", partOfSpeech: "n", definition: "môi trường", category: "Daily Life" },
    { word: "destination", ipa: "/ˌdes.tɪˈneɪ.ʃən/", partOfSpeech: "n", definition: "điểm đến", category: "Daily Life" },
    { word: "accomplish", ipa: "/əˈkʌm.plɪʃ/", partOfSpeech: "v", definition: "hoàn thành, đạt được", category: "Daily Life" },
    { word: "appreciate", ipa: "/əˈpriː.ʃi.eɪt/", partOfSpeech: "v", definition: "trân trọng, đánh giá cao", category: "Daily Life" },
    { word: "comfortable", ipa: "/ˈkʌm.fə.tə.bəl/", partOfSpeech: "adj", definition: "thoải mái, dễ chịu", category: "Daily Life" },
    { word: "enthusiastic", ipa: "/ɪnˌθjuː.ziˈæs.tɪk/", partOfSpeech: "adj", definition: "nhiệt huyết, say mê", category: "Daily Life" }
  ],

  phrases: [
    {
      text: "Actions speak louder than words.",
      translation: "Hành động có giá trị hơn lời nói.",
      category: "Idioms"
    },
    {
      text: "Every cloud has a silver lining.",
      translation: "Trong cái rủi có cái may (Sau cơn mưa trời lại sáng).",
      category: "Idioms"
    },
    {
      text: "Break a leg! You will do great today.",
      translation: "Chúc may mắn! Bạn sẽ làm rất tốt hôm nay.",
      category: "Idioms"
    },
    {
      text: "Better late than never, but better never late.",
      translation: "Muộn còn hơn không, nhưng không muộn vẫn tốt hơn.",
      category: "Phrases"
    },
    {
      text: "It is not rocket science, you can easily do it.",
      translation: "Nó không quá phức tạp đâu, bạn có thể dễ dàng làm được.",
      category: "Phrases"
    },
    {
      text: "Could you please clarify this point for me?",
      translation: "Bạn có thể vui lòng làm rõ điểm này giúp tôi được không?",
      category: "Professional"
    },
    {
      text: "We need to think outside the box for this campaign.",
      translation: "Chúng ta cần tư duy đột phá cho chiến dịch này.",
      category: "Professional"
    },
    {
      text: "Failure is simply the opportunity to begin again more intelligently.",
      translation: "Thất bại đơn giản là cơ hội để bắt đầu lại một cách thông minh hơn.",
      category: "Inspirational"
    },
    {
      text: "The only way to do great work is to love what you do.",
      translation: "Cách duy nhất để làm nên những điều vĩ đại là yêu việc bạn làm.",
      category: "Inspirational"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      translation: "Thành công không phải là điểm dừng, thất bại không phải là dấu chấm hết: lòng dũng cảm tiếp bước mới là điều quan trọng.",
      category: "Inspirational"
    }
  ],

  stories: [
    {
      title: "The Power of Consistency",
      text: "Consistency is the key to unlocking your full potential. Doing small things every single day adds up to massive results over time. If you improve by just one percent every day, you will be thirty-seven times better by the end of a year. Do not wait for intense inspiration; instead, build simple habits that keep you moving forward even when you feel tired.",
      translation: "Sự kiên trì chính là chìa khóa để mở khóa toàn bộ tiềm năng của bạn. Làm những việc nhỏ nhặt mỗi ngày sẽ tích lũy thành những kết quả khổng lồ theo thời gian. Nếu bạn tiến bộ chỉ một phần trăm mỗi ngày, bạn sẽ tốt hơn gấp ba mươi bảy lần vào cuối năm. Đừng chờ đợi nguồn cảm hứng mãnh liệt; thay vào đó, hãy xây dựng những thói quen đơn giản để giữ cho bạn luôn tiến về phía trước ngay cả khi bạn cảm thấy mệt mỏi."
    },
    {
      title: "Learning from Mistakes",
      text: "Mistakes are not signs of weakness; they are proof that you are trying. Every expert was once a beginner who made countless errors. The most successful people in the world are those who fail the most, because they dare to take risks and learn from their failures. Embrace your errors, analyze them, and use them as stepping stones to climb higher in your journey of personal growth.",
      translation: "Sai lầm không phải là dấu hiệu của sự yếu đuối; chúng là bằng chứng cho thấy bạn đang cố gắng. Mỗi chuyên gia đều từng là một người mới bắt đầu mắc vô số sai sót. Những người thành công nhất trên thế giới là những người thất bại nhiều nhất, bởi vì họ dám chấp nhận rủi ro và học hỏi từ những thất bại đó. Hãy đón nhận những sai lầm, phân tích chúng và biến chúng thành những viên đá đệm để leo cao hơn trên hành trình phát triển cá nhân của bạn."
    },
    {
      title: "The Speed of Light",
      text: "Light travels at an incredible speed of nearly three hundred thousand kilometers per second. It takes only eight minutes for light emitted from the surface of the Sun to reach our planet Earth. When we look up at the stars at night, we are actually looking back in time, seeing light that left those celestial bodies hundreds or thousands of years ago. The universe is a vast time machine.",
      translation: "Ánh sáng truyền đi với tốc độ đáng kinh ngạc gần ba trăm nghìn km mỗi giây. Chỉ mất tám phút để ánh sáng phát ra từ bề mặt Mặt trời tới Trái đất của chúng ta. Khi chúng ta ngước nhìn những ngôi sao vào ban đêm, thực chất chúng ta đang nhìn ngược thời gian, nhìn thấy ánh sáng đã rời khỏi các thiên thể đó từ hàng trăm hay hàng ngàn năm trước. Vũ trụ là một cỗ máy thời gian khổng lồ."
    }
  ]
};

// Export database for ES Modules or make it globally accessible
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RINTYPE_DATABASE;
} else {
  window.RINTYPE_DATABASE = RINTYPE_DATABASE;
}
