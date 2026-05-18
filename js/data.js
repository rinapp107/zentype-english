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
  ],

  roadmap: {
    starter: {
      levelName: "Cấp 1: Starter (Mới Bắt Đầu - A1)",
      description: "Luyện gõ các từ vựng và câu chào hỏi giao tiếp căn bản nhất hàng ngày.",
      vocabulary: [
        { word: "hello", ipa: "/həˈləʊ/", partOfSpeech: "excl", definition: "xin chào", category: "Greetings" },
        { word: "morning", ipa: "/ˈmɔː.nɪŋ/", partOfSpeech: "n", definition: "buổi sáng", category: "Time" },
        { word: "please", ipa: "/pliːz/", partOfSpeech: "excl, v", definition: "vui lòng, xin mời", category: "Essentials" },
        { word: "friend", ipa: "/frend/", partOfSpeech: "n", definition: "người bạn", category: "Social" },
        { word: "family", ipa: "/ˈfæm.əl.i/", partOfSpeech: "n", definition: "gia đình", category: "Social" },
        { word: "father", ipa: "/ˈfɑː.ðər/", partOfSpeech: "n", definition: "người cha", category: "Social" },
        { word: "mother", ipa: "/ˈmʌð.ər/", partOfSpeech: "n", definition: "người mẹ", category: "Social" },
        { word: "house", ipa: "/haʊs/", partOfSpeech: "n", definition: "ngôi nhà", category: "Home" },
        { word: "water", ipa: "/ˈwɔː.tər/", partOfSpeech: "n", definition: "nước", category: "Daily" },
        { word: "happy", ipa: "/ˈhæp.i/", partOfSpeech: "adj", definition: "hạnh phúc, vui vẻ", category: "Feelings" }
      ],
      phrases: [
        { text: "How are you doing today?", translation: "Hôm nay bạn thế nào?", category: "Greetings" },
        { text: "Nice to meet you here.", translation: "Rất vui được gặp bạn ở đây.", category: "Greetings" },
        { text: "Have a wonderful day ahead.", translation: "Chúc bạn một ngày tuyệt vời phía trước.", category: "Wishes" },
        { text: "Thank you very much indeed.", translation: "Thành thật cảm ơn bạn rất nhiều.", category: "Greetings" }
      ],
      story: {
        title: "A Happy Family (A1)",
        text: "A happy family lives in a small and beautiful house. Every morning, they have breakfast together and share sweet smiles. They love learning new things and helping their friends. Life is simple but wonderful when you appreciate every single moment.",
        translation: "Một gia đình hạnh phúc sống trong một ngôi nhà nhỏ và xinh đẹp. Mỗi buổi sáng, họ cùng nhau ăn sáng và trao nhau những nụ cười ngọt ngào. Họ thích học hỏi những điều mới và giúp đỡ bạn bè của mình. Cuộc sống tuy đơn giản nhưng thật tuyệt vời khi bạn trân trọng từng khoảnh khắc."
      }
    },
    elementary: {
      levelName: "Cấp 2: Elementary (Cơ Bản - A2)",
      description: "Mở rộng từ vựng về công việc, thói quen và hoạt động vui chơi giải trí.",
      vocabulary: [
        { word: "kitchen", ipa: "/ˈkɪtʃ.ən/", partOfSpeech: "n", definition: "nhà bếp", category: "Home" },
        { word: "breakfast", ipa: "/ˈbrek.fəst/", partOfSpeech: "n", definition: "bữa ăn sáng", category: "Daily" },
        { word: "together", ipa: "/təˈɡeð.ər/", partOfSpeech: "adv", definition: "cùng nhau", category: "Social" },
        { word: "computer", ipa: "/kəmˈpjuː.tər/", partOfSpeech: "n", definition: "máy vi tính", category: "Work" },
        { word: "routine", ipa: "/ruːˈtiːn/", partOfSpeech: "n, adj", definition: "thói quen thường nhật", category: "Daily" },
        { word: "doctor", ipa: "/ˈdɒk.tər/", partOfSpeech: "n", definition: "bác sĩ", category: "Jobs" },
        { word: "teacher", ipa: "/ˈtiː.tʃər/", partOfSpeech: "n", definition: "giáo viên", category: "Jobs" },
        { word: "meeting", ipa: "/ˈmiː.tɪŋ/", partOfSpeech: "n", definition: "cuộc họp", category: "Work" },
        { word: "holiday", ipa: "/ˈhɒl.ə.deɪ/", partOfSpeech: "n", definition: "ngày nghỉ, kỳ nghỉ", category: "Leisure" },
        { word: "travel", ipa: "/ˈtræv.əl/", partOfSpeech: "v, n", definition: "du lịch, đi lại", category: "Leisure" }
      ],
      phrases: [
        { text: "What is your favorite hobby?", translation: "Sở thích yêu thích của bạn là gì?", category: "Conversation" },
        { text: "I usually go for a run in the evening.", translation: "Tôi thường đi chạy bộ vào buổi tối.", category: "Habits" },
        { text: "She works as a software engineer.", translation: "Cô ấy làm việc như một kỹ sư phần mềm.", category: "Work" },
        { text: "We need to buy some fresh vegetables.", translation: "Chúng ta cần mua một ít rau củ quả tươi.", category: "Shopping" }
      ],
      story: {
        title: "The Busy Office (A2)",
        text: "Every Monday, the office becomes very active and busy. Doctors, teachers, and engineers start their routines. They use computers to manage their tasks and prepare for important meetings. When the work is done, they enjoy their hobbies or travel with friends to relax.",
        translation: "Mỗi thứ Hai, văn phòng đều trở nên hoạt động náo nhiệt và bận rộn. Các bác sĩ, giáo viên và kỹ sư bắt đầu công việc thường nhật của họ. Họ sử dụng máy tính để quản lý các tác vụ và chuẩn bị cho các cuộc họp quan trọng. Khi công việc hoàn thành, họ tận hưởng sở thích của mình hoặc đi du lịch cùng bạn bè để thư giãn."
      }
    },
    intermediate: {
      levelName: "Cấp 3: Intermediate (Trung Cấp - B1)",
      description: "Luyện tiếng Anh công sở chuyên nghiệp, thuyết trình và giải quyết thử thách.",
      vocabulary: [
        { word: "management", ipa: "/ˈmæn.ɪdʒ.mənt/", partOfSpeech: "n", definition: "sự quản lý, ban quản lý", category: "Business" },
        { word: "investment", ipa: "/ɪnˈvest.mənt/", partOfSpeech: "n", definition: "sự đầu tư", category: "Business" },
        { word: "strategy", ipa: "/ˈstræt.ə.dʒi/", partOfSpeech: "n", definition: "chiến lược", category: "Business" },
        { word: "marketing", ipa: "/ˈmɑː.kɪ.tɪŋ/", partOfSpeech: "n", definition: "tiếp thị, marketing", category: "Business" },
        { word: "innovative", ipa: "/ˈɪn.ə.və.tɪv/", partOfSpeech: "adj", definition: "sáng tạo, đổi mới", category: "Business" },
        { word: "productivity", ipa: "/ˌprɒd.ʌkˈtɪv.ə.ti/", partOfSpeech: "n", definition: "năng suất", category: "Work" },
        { word: "collaborate", ipa: "/kəˈlæb.ə.reɪt/", partOfSpeech: "v", definition: "hợp tác", category: "Professional" },
        { word: "negotiate", ipa: "/nəˈɡəʊ.ʃi.eɪt/", partOfSpeech: "v", definition: "thương lượng, đàm phán", category: "Professional" },
        { word: "schedule", ipa: "/ˈʃedʒ.uːl/", partOfSpeech: "n, v", definition: "lịch trình, thời khóa biểu", category: "Work" },
        { word: "challenge", ipa: "/ˈtʃæl.ɪndʒ/", partOfSpeech: "n, v", definition: "thử thách, thách thức", category: "Growth" }
      ],
      phrases: [
        { text: "We must find a practical solution to this challenge.", translation: "Chúng ta phải tìm ra giải pháp thiết thực cho thách thức này.", category: "Work" },
        { text: "Active collaboration is the key to corporate growth.", translation: "Hợp tác chủ động là chìa khóa cho sự phát triển của doanh nghiệp.", category: "Business" },
        { text: "Customer feedback helps us improve our services.", translation: "Phản hồi của khách hàng giúp chúng tôi cải thiện dịch vụ của mình.", category: "Business" },
        { text: "He explained the new business strategy in detail.", translation: "Anh ấy đã giải thích chi tiết về chiến lược kinh doanh mới.", category: "Professional" }
      ],
      story: {
        title: "Solving Challenges Together (B1)",
        text: "To succeed in business, every single employee must cooperate and think about creative solutions. Good management builds strong strategies, while active customer feedback points out areas of improvement. With pure confidence and a standard workflow, we can turn any massive challenge into a great opportunity for progress.",
        translation: "Để thành công trong kinh doanh, mỗi nhân viên đều phải hợp tác và nghĩ ra những giải pháp sáng tạo. Ban quản lý giỏi xây dựng các chiến lược vững chắc, trong khi phản hồi tích cực từ khách hàng chỉ ra những lĩnh vực cần cải thiện. Với sự tự tin thuần khiết và quy trình làm việc chuẩn mực, chúng ta có thể biến mọi thách thức lớn thành cơ hội tuyệt vời để tiến bộ."
      }
    },
    "upper-intermediate": {
      levelName: "Cấp 4: Upper-Intermediate (Khá - B2)",
      description: "Tiếp cận từ vựng kỹ thuật, công nghệ thông tin và phát triển bền vững.",
      vocabulary: [
        { word: "algorithm", ipa: "/ˈæl.ɡə.rɪ.ðəm/", partOfSpeech: "n", definition: "thuật toán", category: "Tech" },
        { word: "responsive", ipa: "/rɪˈspɒn.sɪv/", partOfSpeech: "adj", definition: "phản hồi nhanh, tương thích", category: "Tech" },
        { word: "artificial", ipa: "/ˌɑː.tɪˈfɪʃ.əl/", partOfSpeech: "adj", definition: "nhân tạo", category: "Tech" },
        { word: "intelligence", ipa: "/ɪnˈtel.ɪ.dʒəns/", partOfSpeech: "n", definition: "trí thông minh", category: "Tech" },
        { word: "framework", ipa: "/ˈfreɪm.wɜːk/", partOfSpeech: "n", definition: "khung làm việc, bộ khung", category: "Tech" },
        { word: "repository", ipa: "/rɪˈpɒz.ɪ.tər.i/", partOfSpeech: "n", definition: "kho chứa, kho mã nguồn", category: "Tech" },
        { word: "encryption", ipa: "/ɪnˈkrɪp.ʃən/", partOfSpeech: "n", definition: "sự mã hóa bảo mật", category: "Tech" },
        { word: "cybersecurity", ipa: "/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/", partOfSpeech: "n", definition: "an ninh mạng", category: "Tech" },
        { word: "sustainable", ipa: "/səˈsteɪ.nə.bəl/", partOfSpeech: "adj", definition: "bền vững", category: "Environment" },
        { word: "conservation", ipa: "/ˌkɒn.səˈveɪ.ʃən/", partOfSpeech: "n", definition: "sự bảo tồn, gìn giữ", category: "Environment" }
      ],
      phrases: [
        { text: "Artificial intelligence is changing the modern labor market.", translation: "Trí tuệ nhân tạo đang thay đổi thị trường lao động hiện đại.", category: "Trends" },
        { text: "Our development team has pushed the final code repository.", translation: "Đội ngũ phát triển của chúng tôi đã đẩy kho chứa mã nguồn cuối cùng.", category: "Coding" },
        { text: "Responsive web design ensures standard cross-device layouts.", translation: "Thiết kế web tương thích đảm bảo bố cục chuẩn trên các thiết bị.", category: "Design" },
        { text: "Cybersecurity encryption keeps personal database records fully secure.", translation: "Mã hóa an ninh mạng giữ cho các hồ sơ cơ sở dữ liệu cá nhân hoàn toàn an toàn.", category: "Security" }
      ],
      story: {
        title: "The Green Tech Revolution (B2)",
        text: "Sustainable technology combined with artificial intelligence is creating a modern green revolution. Developers build smart algorithms and framework templates to optimize resource usage and encourage environmental conservation. High encryption and responsive designs make these apps safe, robust, and accessible across the globalized world.",
        translation: "Công nghệ bền vững kết hợp với trí tuệ nhân tạo đang tạo ra một cuộc cách mạng xanh hiện đại. Các nhà phát triển xây dựng các thuật toán thông minh và các mẫu khung làm việc để tối ưu hóa việc sử dụng tài nguyên và khuyến khích bảo tồn môi trường. Độ mã hóa cao và thiết kế tương thích giúp các ứng dụng này an toàn, mạnh mẽ và có thể tiếp cận được trên toàn thế giới toàn cầu hóa."
      }
    },
    master: {
      levelName: "Cấp 5: Advanced Master (Thành Thạo - C1/C2)",
      description: "Thử thách đỉnh cao với chủ đề triết học, vật lý thiên văn và phát triển bản thân.",
      vocabulary: [
        { word: "consistency", ipa: "/kənˈsɪs.tən.si/", partOfSpeech: "n", definition: "sự nhất quán, kiên định", category: "Mindset" },
        { word: "enthusiasm", ipa: "/ɪnˈθjuː.zi.æz.əm/", partOfSpeech: "n", definition: "sự hăng hái, nhiệt huyết", category: "Mindset" },
        { word: "astrophysics", ipa: "/ˌæs.trəʊˈfɪz.ɪks/", partOfSpeech: "n", definition: "vật lý thiên văn", category: "Science" },
        { word: "celestial", ipa: "/sɪˈles.tʃəl/", partOfSpeech: "adj", definition: "thuộc về thiên thể, bầu trời", category: "Science" },
        { word: "philosophy", ipa: "/fɪˈlɒs.ə.fi/", partOfSpeech: "n", definition: "triết học, triết lý", category: "Wisdom" },
        { word: "consciousness", ipa: "/ˈkɒn.ʃəs.nəs/", partOfSpeech: "n", definition: "ý thức, nhận thức sâu", category: "Wisdom" },
        { word: "sophisticated", ipa: "/səˈfɪs.tɪ.keɪ.tɪd/", partOfSpeech: "adj", definition: "tinh vi, phức tạp, sành sỏi", category: "Academic" },
        { word: "perseverance", ipa: "/ˌpɜː.sɪˈvɪə.rəns/", partOfSpeech: "n", definition: "sự kiên trì vượt khó", category: "Mindset" },
        { word: "transformation", ipa: "/ˌtræns.fəˈmeɪ.ʃən/", partOfSpeech: "n", definition: "sự biến đổi, lột xác", category: "Growth" },
        { word: "authenticity", ipa: "/ˌɔː.θenˈtɪs.ə.ti/", partOfSpeech: "n", definition: "tính chân thực, xác thực", category: "Wisdom" }
      ],
      phrases: [
        { text: "Perseverance and meticulous practice unlock the true gates of mastery.", translation: "Sự kiên trì và thực hành tỉ mỉ sẽ mở ra những cánh cổng thực sự của sự thành thạo.", category: "Wisdom" },
        { text: "Astrophysics reveals the sophisticated secrets of the celestial universe.", translation: "Vật lý thiên văn tiết lộ những bí mật tinh vi của vũ trụ thiên thể.", category: "Science" },
        { text: "A phenomenal shift in perspective leads to ultimate self-transformation.", translation: "Một sự thay đổi phi thường trong góc nhìn dẫn đến sự biến đổi bản thân tối thượng.", category: "Growth" },
        { text: "Consistency builds the sturdy foundation of every magnificent achievement.", translation: "Sự nhất quán xây dựng nên nền móng vững chắc cho mọi thành tựu lộng lẫy.", category: "Wisdom" }
      ],
      story: {
        title: "The Cosmic Journey of Consciousness (C1/C2)",
        text: "Human consciousness has always explored the abstract depths of the celestial universe. Through sophisticated astrophysics and philosophical inquiry, we seek to understand our tiny position within the majestic cosmos. Meticulous observation and continuous transformation drive the dynamic progress of our modern civilization. Ultimate mastery is not a final destination, but an ongoing quest for pure truth and authenticity.",
        translation: "Ý thức con người luôn khám phá những chiều sâu trừu tượng của vũ trụ thiên thể. Thông qua vật lý thiên văn tinh vi và tìm tòi triết học, chúng ta tìm cách hiểu vị trí nhỏ bé của mình trong vũ trụ hùng vĩ. Sự quan sát tỉ mỉ và sự biến đổi liên tục thúc đẩy sự tiến bộ năng động của nền văn minh hiện đại của chúng ta. Sự thành thạo tối thượng không phải là điểm đến cuối cùng, mà là một cuộc tìm kiếm không ngừng cho sự thật thuần khiết và tính chân thực."
      }
    }
  }
};

// Export database for ES Modules or make it globally accessible
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RINTYPE_DATABASE;
} else {
  window.RINTYPE_DATABASE = RINTYPE_DATABASE;
}
