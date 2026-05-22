/* ============================================
   ZenType English — Vocabulary Data
   200+ từ vựng chia theo 7 chủ đề
   ============================================ */

const ZenData = {
  topics: [
    {
      id: 'work', name: 'Công Việc', icon: 'fa-briefcase', color: '#3b82f6',
      words: [
        { word: 'meeting', meaning: 'cuộc họp', phonetic: '/ˈmiːtɪŋ/', pos: 'n', example: 'We have a meeting at 10 AM.', exampleVi: 'Chúng tôi có cuộc họp lúc 10 giờ sáng.' },
        { word: 'deadline', meaning: 'hạn chót', phonetic: '/ˈdedlaɪn/', pos: 'n', example: 'The deadline is next Friday.', exampleVi: 'Hạn chót là thứ Sáu tới.' },
        { word: 'project', meaning: 'dự án', phonetic: '/ˈprɒdʒekt/', pos: 'n', example: 'This project will take three months.', exampleVi: 'Dự án này sẽ mất ba tháng.' },
        { word: 'manager', meaning: 'quản lý', phonetic: '/ˈmænɪdʒər/', pos: 'n', example: 'My manager is very supportive.', exampleVi: 'Quản lý của tôi rất hỗ trợ.' },
        { word: 'salary', meaning: 'lương', phonetic: '/ˈsæləri/', pos: 'n', example: 'He earns a good salary.', exampleVi: 'Anh ấy kiếm được mức lương tốt.' },
        { word: 'promote', meaning: 'thăng chức', phonetic: '/prəˈmoʊt/', pos: 'v', example: 'She was promoted to director.', exampleVi: 'Cô ấy được thăng chức giám đốc.' },
        { word: 'resign', meaning: 'từ chức', phonetic: '/rɪˈzaɪn/', pos: 'v', example: 'He decided to resign from the company.', exampleVi: 'Anh ấy quyết định từ chức.' },
        { word: 'colleague', meaning: 'đồng nghiệp', phonetic: '/ˈkɒliːɡ/', pos: 'n', example: 'My colleagues are very friendly.', exampleVi: 'Các đồng nghiệp của tôi rất thân thiện.' },
        { word: 'interview', meaning: 'phỏng vấn', phonetic: '/ˈɪntərvjuː/', pos: 'n', example: 'I have a job interview tomorrow.', exampleVi: 'Tôi có buổi phỏng vấn ngày mai.' },
        { word: 'overtime', meaning: 'tăng ca', phonetic: '/ˈoʊvərtaɪm/', pos: 'n', example: 'I worked overtime last night.', exampleVi: 'Tôi đã tăng ca tối qua.' },
        { word: 'schedule', meaning: 'lịch trình', phonetic: '/ˈskedʒuːl/', pos: 'n', example: 'Check the schedule for today.', exampleVi: 'Kiểm tra lịch trình hôm nay.' },
        { word: 'report', meaning: 'báo cáo', phonetic: '/rɪˈpɔːrt/', pos: 'n', example: 'Please submit the report by Friday.', exampleVi: 'Vui lòng nộp báo cáo trước thứ Sáu.' },
        { word: 'teamwork', meaning: 'làm việc nhóm', phonetic: '/ˈtiːmwɜːrk/', pos: 'n', example: 'Teamwork is essential for success.', exampleVi: 'Làm việc nhóm rất quan trọng để thành công.' },
        { word: 'presentation', meaning: 'bài thuyết trình', phonetic: '/ˌpreznˈteɪʃn/', pos: 'n', example: 'She gave an excellent presentation.', exampleVi: 'Cô ấy đã thuyết trình rất xuất sắc.' },
        { word: 'negotiate', meaning: 'đàm phán', phonetic: '/nɪˈɡoʊʃieɪt/', pos: 'v', example: 'We need to negotiate the contract.', exampleVi: 'Chúng ta cần đàm phán hợp đồng.' },
        { word: 'collaborate', meaning: 'hợp tác', phonetic: '/kəˈlæbəreɪt/', pos: 'v', example: 'Let us collaborate on this project.', exampleVi: 'Hãy cùng hợp tác trong dự án này.' },
        { word: 'feedback', meaning: 'phản hồi', phonetic: '/ˈfiːdbæk/', pos: 'n', example: 'Your feedback is very valuable.', exampleVi: 'Phản hồi của bạn rất giá trị.' },
        { word: 'performance', meaning: 'hiệu suất', phonetic: '/pərˈfɔːrməns/', pos: 'n', example: 'His performance has improved a lot.', exampleVi: 'Hiệu suất của anh ấy đã cải thiện nhiều.' },
        { word: 'strategy', meaning: 'chiến lược', phonetic: '/ˈstrætədʒi/', pos: 'n', example: 'We need a new marketing strategy.', exampleVi: 'Chúng ta cần chiến lược marketing mới.' },
        { word: 'implement', meaning: 'triển khai', phonetic: '/ˈɪmplɪment/', pos: 'v', example: 'We will implement the plan next week.', exampleVi: 'Chúng tôi sẽ triển khai kế hoạch tuần sau.' },
        { word: 'budget', meaning: 'ngân sách', phonetic: '/ˈbʌdʒɪt/', pos: 'n', example: 'The budget for this year is limited.', exampleVi: 'Ngân sách năm nay bị hạn chế.' },
        { word: 'proposal', meaning: 'đề xuất', phonetic: '/prəˈpoʊzl/', pos: 'n', example: 'The proposal was approved by the board.', exampleVi: 'Đề xuất đã được hội đồng phê duyệt.' },
        { word: 'contract', meaning: 'hợp đồng', phonetic: '/ˈkɒntrækt/', pos: 'n', example: 'Please sign the contract.', exampleVi: 'Vui lòng ký hợp đồng.' },
        { word: 'supervise', meaning: 'giám sát', phonetic: '/ˈsuːpərvaɪz/', pos: 'v', example: 'She supervises a team of ten people.', exampleVi: 'Cô ấy giám sát một nhóm mười người.' },
        { word: 'efficient', meaning: 'hiệu quả', phonetic: '/ɪˈfɪʃnt/', pos: 'adj', example: 'This method is more efficient.', exampleVi: 'Phương pháp này hiệu quả hơn.' },
        { word: 'revenue', meaning: 'doanh thu', phonetic: '/ˈrevənjuː/', pos: 'n', example: 'Revenue increased by 20% this quarter.', exampleVi: 'Doanh thu tăng 20% trong quý này.' },
        { word: 'delegate', meaning: 'ủy quyền', phonetic: '/ˈdelɪɡeɪt/', pos: 'v', example: 'Learn to delegate tasks effectively.', exampleVi: 'Hãy học cách ủy quyền công việc hiệu quả.' },
        { word: 'priority', meaning: 'ưu tiên', phonetic: '/praɪˈɒrəti/', pos: 'n', example: 'Safety is our top priority.', exampleVi: 'An toàn là ưu tiên hàng đầu của chúng tôi.' },
        { word: 'productivity', meaning: 'năng suất', phonetic: '/ˌprɒdʌkˈtɪvəti/', pos: 'n', example: 'We need to increase productivity.', exampleVi: 'Chúng ta cần tăng năng suất.' },
        { word: 'recruitment', meaning: 'tuyển dụng', phonetic: '/rɪˈkruːtmənt/', pos: 'n', example: 'The recruitment process takes two weeks.', exampleVi: 'Quy trình tuyển dụng mất hai tuần.' },
      ]
    },
    {
      id: 'communication', name: 'Giao Tiếp', icon: 'fa-comments', color: '#10b981',
      words: [
        { word: 'greet', meaning: 'chào hỏi', phonetic: '/ɡriːt/', pos: 'v', example: 'He greeted everyone warmly.', exampleVi: 'Anh ấy chào mọi người nồng nhiệt.' },
        { word: 'introduce', meaning: 'giới thiệu', phonetic: '/ˌɪntrəˈdjuːs/', pos: 'v', example: 'Let me introduce myself.', exampleVi: 'Hãy để tôi giới thiệu bản thân.' },
        { word: 'apologize', meaning: 'xin lỗi', phonetic: '/əˈpɒlədʒaɪz/', pos: 'v', example: 'I apologize for being late.', exampleVi: 'Tôi xin lỗi vì đến trễ.' },
        { word: 'compliment', meaning: 'khen ngợi', phonetic: '/ˈkɒmplɪmənt/', pos: 'v', example: 'She complimented my work.', exampleVi: 'Cô ấy khen ngợi công việc của tôi.' },
        { word: 'suggest', meaning: 'đề nghị', phonetic: '/səˈdʒest/', pos: 'v', example: 'I suggest we take a break.', exampleVi: 'Tôi đề nghị chúng ta nghỉ giải lao.' },
        { word: 'agree', meaning: 'đồng ý', phonetic: '/əˈɡriː/', pos: 'v', example: 'I agree with your opinion.', exampleVi: 'Tôi đồng ý với ý kiến của bạn.' },
        { word: 'disagree', meaning: 'không đồng ý', phonetic: '/ˌdɪsəˈɡriː/', pos: 'v', example: 'I respectfully disagree.', exampleVi: 'Tôi tôn trọng nhưng không đồng ý.' },
        { word: 'explain', meaning: 'giải thích', phonetic: '/ɪkˈspleɪn/', pos: 'v', example: 'Can you explain this to me?', exampleVi: 'Bạn có thể giải thích điều này cho tôi không?' },
        { word: 'promise', meaning: 'hứa', phonetic: '/ˈprɒmɪs/', pos: 'v', example: 'I promise to help you.', exampleVi: 'Tôi hứa sẽ giúp bạn.' },
        { word: 'recommend', meaning: 'giới thiệu, khuyên', phonetic: '/ˌrekəˈmend/', pos: 'v', example: 'I recommend this restaurant.', exampleVi: 'Tôi giới thiệu nhà hàng này.' },
        { word: 'confirm', meaning: 'xác nhận', phonetic: '/kənˈfɜːrm/', pos: 'v', example: 'Please confirm your attendance.', exampleVi: 'Vui lòng xác nhận sự tham dự.' },
        { word: 'request', meaning: 'yêu cầu', phonetic: '/rɪˈkwest/', pos: 'v', example: 'I would like to request a day off.', exampleVi: 'Tôi muốn xin nghỉ một ngày.' },
        { word: 'conversation', meaning: 'cuộc trò chuyện', phonetic: '/ˌkɒnvərˈseɪʃn/', pos: 'n', example: 'We had a great conversation.', exampleVi: 'Chúng tôi đã có cuộc trò chuyện tuyệt vời.' },
        { word: 'opinion', meaning: 'ý kiến', phonetic: '/əˈpɪnjən/', pos: 'n', example: 'What is your opinion on this?', exampleVi: 'Ý kiến của bạn về việc này là gì?' },
        { word: 'polite', meaning: 'lịch sự', phonetic: '/pəˈlaɪt/', pos: 'adj', example: 'She is always polite.', exampleVi: 'Cô ấy luôn lịch sự.' },
        { word: 'interrupt', meaning: 'ngắt lời', phonetic: '/ˌɪntəˈrʌpt/', pos: 'v', example: 'Please do not interrupt me.', exampleVi: 'Xin đừng ngắt lời tôi.' },
        { word: 'persuade', meaning: 'thuyết phục', phonetic: '/pərˈsweɪd/', pos: 'v', example: 'He persuaded me to join the team.', exampleVi: 'Anh ấy thuyết phục tôi tham gia nhóm.' },
        { word: 'appreciate', meaning: 'đánh giá cao', phonetic: '/əˈpriːʃieɪt/', pos: 'v', example: 'I appreciate your help.', exampleVi: 'Tôi đánh giá cao sự giúp đỡ của bạn.' },
        { word: 'misunderstand', meaning: 'hiểu lầm', phonetic: '/ˌmɪsʌndərˈstænd/', pos: 'v', example: 'I think you misunderstood me.', exampleVi: 'Tôi nghĩ bạn đã hiểu lầm tôi.' },
        { word: 'encourage', meaning: 'khuyến khích', phonetic: '/ɪnˈkʌrɪdʒ/', pos: 'v', example: 'She encouraged me to try again.', exampleVi: 'Cô ấy khuyến khích tôi thử lại.' },
        { word: 'respond', meaning: 'phản hồi', phonetic: '/rɪˈspɒnd/', pos: 'v', example: 'He did not respond to my email.', exampleVi: 'Anh ấy không phản hồi email của tôi.' },
        { word: 'express', meaning: 'bày tỏ', phonetic: '/ɪkˈspres/', pos: 'v', example: 'She expressed her gratitude.', exampleVi: 'Cô ấy bày tỏ lòng biết ơn.' },
        { word: 'communicate', meaning: 'giao tiếp', phonetic: '/kəˈmjuːnɪkeɪt/', pos: 'v', example: 'We need to communicate better.', exampleVi: 'Chúng ta cần giao tiếp tốt hơn.' },
        { word: 'clarify', meaning: 'làm rõ', phonetic: '/ˈklærəfaɪ/', pos: 'v', example: 'Could you clarify this point?', exampleVi: 'Bạn có thể làm rõ điểm này không?' },
        { word: 'discuss', meaning: 'thảo luận', phonetic: '/dɪˈskʌs/', pos: 'v', example: 'Let us discuss the plan.', exampleVi: 'Hãy thảo luận về kế hoạch.' },
        { word: 'fluent', meaning: 'lưu loát', phonetic: '/ˈfluːənt/', pos: 'adj', example: 'She is fluent in three languages.', exampleVi: 'Cô ấy nói lưu loát ba ngôn ngữ.' },
        { word: 'gesture', meaning: 'cử chỉ', phonetic: '/ˈdʒestʃər/', pos: 'n', example: 'He made a friendly gesture.', exampleVi: 'Anh ấy có một cử chỉ thân thiện.' },
        { word: 'awkward', meaning: 'lúng túng', phonetic: '/ˈɔːkwərd/', pos: 'adj', example: 'There was an awkward silence.', exampleVi: 'Có một khoảng im lặng lúng túng.' },
        { word: 'sincere', meaning: 'chân thành', phonetic: '/sɪnˈsɪr/', pos: 'adj', example: 'He gave a sincere apology.', exampleVi: 'Anh ấy đã xin lỗi chân thành.' },
        { word: 'hesitate', meaning: 'do dự', phonetic: '/ˈhezɪteɪt/', pos: 'v', example: 'Do not hesitate to ask questions.', exampleVi: 'Đừng do dự khi đặt câu hỏi.' },
      ]
    },
    {
      id: 'travel', name: 'Du Lịch', icon: 'fa-plane', color: '#f59e0b',
      words: [
        { word: 'airport', meaning: 'sân bay', phonetic: '/ˈeərpɔːrt/', pos: 'n', example: 'We arrived at the airport early.', exampleVi: 'Chúng tôi đến sân bay sớm.' },
        { word: 'passport', meaning: 'hộ chiếu', phonetic: '/ˈpæspɔːrt/', pos: 'n', example: 'Do not forget your passport.', exampleVi: 'Đừng quên hộ chiếu.' },
        { word: 'luggage', meaning: 'hành lý', phonetic: '/ˈlʌɡɪdʒ/', pos: 'n', example: 'My luggage is very heavy.', exampleVi: 'Hành lý của tôi rất nặng.' },
        { word: 'boarding', meaning: 'lên máy bay', phonetic: '/ˈbɔːrdɪŋ/', pos: 'n', example: 'Boarding begins at gate 5.', exampleVi: 'Lên máy bay bắt đầu ở cổng 5.' },
        { word: 'sightseeing', meaning: 'ngắm cảnh', phonetic: '/ˈsaɪtsiːɪŋ/', pos: 'n', example: 'We went sightseeing in Paris.', exampleVi: 'Chúng tôi đi ngắm cảnh ở Paris.' },
        { word: 'accommodation', meaning: 'chỗ ở', phonetic: '/əˌkɒməˈdeɪʃn/', pos: 'n', example: 'We booked accommodation online.', exampleVi: 'Chúng tôi đặt chỗ ở trực tuyến.' },
        { word: 'destination', meaning: 'điểm đến', phonetic: '/ˌdestɪˈneɪʃn/', pos: 'n', example: 'What is your travel destination?', exampleVi: 'Điểm đến du lịch của bạn là gì?' },
        { word: 'itinerary', meaning: 'hành trình', phonetic: '/aɪˈtɪnəreri/', pos: 'n', example: 'Here is our travel itinerary.', exampleVi: 'Đây là hành trình du lịch của chúng tôi.' },
        { word: 'reservation', meaning: 'đặt chỗ', phonetic: '/ˌrezərˈveɪʃn/', pos: 'n', example: 'I have a reservation for two.', exampleVi: 'Tôi có đặt chỗ cho hai người.' },
        { word: 'departure', meaning: 'khởi hành', phonetic: '/dɪˈpɑːrtʃər/', pos: 'n', example: 'The departure time is 8 AM.', exampleVi: 'Giờ khởi hành là 8 giờ sáng.' },
        { word: 'arrival', meaning: 'đến nơi', phonetic: '/əˈraɪvl/', pos: 'n', example: 'Our arrival was delayed.', exampleVi: 'Chuyến đến của chúng tôi bị trễ.' },
        { word: 'currency', meaning: 'tiền tệ', phonetic: '/ˈkʌrənsi/', pos: 'n', example: 'What currency do they use?', exampleVi: 'Họ sử dụng tiền tệ gì?' },
        { word: 'souvenir', meaning: 'quà lưu niệm', phonetic: '/ˌsuːvəˈnɪr/', pos: 'n', example: 'I bought some souvenirs.', exampleVi: 'Tôi đã mua vài món quà lưu niệm.' },
        { word: 'explore', meaning: 'khám phá', phonetic: '/ɪkˈsplɔːr/', pos: 'v', example: 'We explored the old town.', exampleVi: 'Chúng tôi khám phá phố cổ.' },
        { word: 'delay', meaning: 'trì hoãn', phonetic: '/dɪˈleɪ/', pos: 'n', example: 'There was a two-hour delay.', exampleVi: 'Có sự trì hoãn hai tiếng.' },
        { word: 'customs', meaning: 'hải quan', phonetic: '/ˈkʌstəmz/', pos: 'n', example: 'We passed through customs quickly.', exampleVi: 'Chúng tôi qua hải quan nhanh chóng.' },
        { word: 'guidebook', meaning: 'sách hướng dẫn', phonetic: '/ˈɡaɪdbʊk/', pos: 'n', example: 'I bought a guidebook for Japan.', exampleVi: 'Tôi mua sách hướng dẫn cho Nhật Bản.' },
        { word: 'excursion', meaning: 'chuyến tham quan', phonetic: '/ɪkˈskɜːrʒn/', pos: 'n', example: 'We joined a boat excursion.', exampleVi: 'Chúng tôi tham gia chuyến tham quan bằng thuyền.' },
        { word: 'scenic', meaning: 'phong cảnh đẹp', phonetic: '/ˈsiːnɪk/', pos: 'adj', example: 'We drove along a scenic route.', exampleVi: 'Chúng tôi lái xe dọc tuyến đường phong cảnh đẹp.' },
        { word: 'adventure', meaning: 'phiêu lưu', phonetic: '/ədˈventʃər/', pos: 'n', example: 'Traveling is a great adventure.', exampleVi: 'Du lịch là một cuộc phiêu lưu tuyệt vời.' },
        { word: 'backpack', meaning: 'ba lô', phonetic: '/ˈbækpæk/', pos: 'n', example: 'She travels with just a backpack.', exampleVi: 'Cô ấy đi du lịch chỉ với một ba lô.' },
        { word: 'landmark', meaning: 'địa danh', phonetic: '/ˈlændmɑːrk/', pos: 'n', example: 'The Eiffel Tower is a famous landmark.', exampleVi: 'Tháp Eiffel là một địa danh nổi tiếng.' },
        { word: 'journey', meaning: 'hành trình', phonetic: '/ˈdʒɜːrni/', pos: 'n', example: 'The journey took five hours.', exampleVi: 'Hành trình mất năm tiếng.' },
        { word: 'immigration', meaning: 'nhập cảnh', phonetic: '/ˌɪmɪˈɡreɪʃn/', pos: 'n', example: 'We went through immigration control.', exampleVi: 'Chúng tôi đi qua kiểm soát nhập cảnh.' },
        { word: 'terminal', meaning: 'nhà ga', phonetic: '/ˈtɜːrmɪnl/', pos: 'n', example: 'Our flight departs from terminal 2.', exampleVi: 'Chuyến bay khởi hành từ nhà ga 2.' },
        { word: 'sunscreen', meaning: 'kem chống nắng', phonetic: '/ˈsʌnskriːn/', pos: 'n', example: 'Apply sunscreen before going out.', exampleVi: 'Thoa kem chống nắng trước khi ra ngoài.' },
        { word: 'abroad', meaning: 'nước ngoài', phonetic: '/əˈbrɔːd/', pos: 'adv', example: 'She studied abroad for two years.', exampleVi: 'Cô ấy du học hai năm.' },
        { word: 'cruise', meaning: 'du thuyền', phonetic: '/kruːz/', pos: 'n', example: 'We took a cruise around the islands.', exampleVi: 'Chúng tôi đi du thuyền quanh các đảo.' },
        { word: 'visa', meaning: 'thị thực', phonetic: '/ˈviːzə/', pos: 'n', example: 'You need a visa to enter this country.', exampleVi: 'Bạn cần thị thực để vào nước này.' },
        { word: 'map', meaning: 'bản đồ', phonetic: '/mæp/', pos: 'n', example: 'Can you show me on the map?', exampleVi: 'Bạn có thể chỉ trên bản đồ không?' },
      ]
    },
    {
      id: 'restaurant', name: 'Nhà Hàng', icon: 'fa-utensils', color: '#ef4444',
      words: [
        { word: 'menu', meaning: 'thực đơn', phonetic: '/ˈmenjuː/', pos: 'n', example: 'Can I see the menu, please?', exampleVi: 'Cho tôi xem thực đơn được không?' },
        { word: 'order', meaning: 'gọi món', phonetic: '/ˈɔːrdər/', pos: 'v', example: 'Are you ready to order?', exampleVi: 'Bạn sẵn sàng gọi món chưa?' },
        { word: 'appetizer', meaning: 'món khai vị', phonetic: '/ˈæpɪtaɪzər/', pos: 'n', example: 'We had soup as an appetizer.', exampleVi: 'Chúng tôi ăn súp khai vị.' },
        { word: 'dessert', meaning: 'món tráng miệng', phonetic: '/dɪˈzɜːrt/', pos: 'n', example: 'I will have cake for dessert.', exampleVi: 'Tôi sẽ ăn bánh tráng miệng.' },
        { word: 'waiter', meaning: 'bồi bàn', phonetic: '/ˈweɪtər/', pos: 'n', example: 'The waiter was very polite.', exampleVi: 'Bồi bàn rất lịch sự.' },
        { word: 'bill', meaning: 'hóa đơn', phonetic: '/bɪl/', pos: 'n', example: 'Can I have the bill, please?', exampleVi: 'Cho tôi hóa đơn được không?' },
        { word: 'tip', meaning: 'tiền boa', phonetic: '/tɪp/', pos: 'n', example: 'We left a generous tip.', exampleVi: 'Chúng tôi để lại tiền boa hào phóng.' },
        { word: 'spicy', meaning: 'cay', phonetic: '/ˈspaɪsi/', pos: 'adj', example: 'This dish is very spicy.', exampleVi: 'Món này rất cay.' },
        { word: 'delicious', meaning: 'ngon', phonetic: '/dɪˈlɪʃəs/', pos: 'adj', example: 'The food was delicious.', exampleVi: 'Đồ ăn rất ngon.' },
        { word: 'ingredient', meaning: 'nguyên liệu', phonetic: '/ɪnˈɡriːdiənt/', pos: 'n', example: 'What are the main ingredients?', exampleVi: 'Nguyên liệu chính là gì?' },
        { word: 'vegetarian', meaning: 'chay', phonetic: '/ˌvedʒəˈteriən/', pos: 'adj', example: 'Do you have vegetarian options?', exampleVi: 'Bạn có món chay không?' },
        { word: 'portion', meaning: 'phần ăn', phonetic: '/ˈpɔːrʃn/', pos: 'n', example: 'The portions are very generous.', exampleVi: 'Phần ăn rất đầy đặn.' },
        { word: 'chef', meaning: 'đầu bếp', phonetic: '/ʃef/', pos: 'n', example: 'The chef prepared a special meal.', exampleVi: 'Đầu bếp chuẩn bị bữa ăn đặc biệt.' },
        { word: 'recipe', meaning: 'công thức', phonetic: '/ˈresəpi/', pos: 'n', example: 'Can you share this recipe?', exampleVi: 'Bạn có thể chia sẻ công thức này không?' },
        { word: 'beverage', meaning: 'đồ uống', phonetic: '/ˈbevərɪdʒ/', pos: 'n', example: 'What beverage would you like?', exampleVi: 'Bạn muốn đồ uống gì?' },
        { word: 'cuisine', meaning: 'ẩm thực', phonetic: '/kwɪˈziːn/', pos: 'n', example: 'I love Vietnamese cuisine.', exampleVi: 'Tôi yêu ẩm thực Việt Nam.' },
        { word: 'takeaway', meaning: 'đồ mang đi', phonetic: '/ˈteɪkəweɪ/', pos: 'n', example: 'I ordered takeaway for dinner.', exampleVi: 'Tôi gọi đồ mang đi cho bữa tối.' },
        { word: 'seasoning', meaning: 'gia vị', phonetic: '/ˈsiːznɪŋ/', pos: 'n', example: 'Add some seasoning to the dish.', exampleVi: 'Thêm gia vị vào món ăn.' },
        { word: 'appetizing', meaning: 'hấp dẫn (đồ ăn)', phonetic: '/ˈæpɪtaɪzɪŋ/', pos: 'adj', example: 'The food looks very appetizing.', exampleVi: 'Đồ ăn trông rất hấp dẫn.' },
        { word: 'grill', meaning: 'nướng', phonetic: '/ɡrɪl/', pos: 'v', example: 'We grilled some chicken.', exampleVi: 'Chúng tôi nướng gà.' },
        { word: 'roast', meaning: 'quay', phonetic: '/roʊst/', pos: 'v', example: 'Roast the vegetables in the oven.', exampleVi: 'Quay rau trong lò nướng.' },
        { word: 'stir-fry', meaning: 'xào', phonetic: '/ˈstɜːr fraɪ/', pos: 'v', example: 'Stir-fry the noodles with vegetables.', exampleVi: 'Xào mì với rau.' },
        { word: 'steam', meaning: 'hấp', phonetic: '/stiːm/', pos: 'v', example: 'Steam the fish for ten minutes.', exampleVi: 'Hấp cá trong mười phút.' },
        { word: 'bland', meaning: 'nhạt', phonetic: '/blænd/', pos: 'adj', example: 'This soup is too bland.', exampleVi: 'Món súp này quá nhạt.' },
        { word: 'leftovers', meaning: 'đồ ăn thừa', phonetic: '/ˈleftˌoʊvərz/', pos: 'n', example: 'We ate the leftovers for lunch.', exampleVi: 'Chúng tôi ăn đồ thừa cho bữa trưa.' },
        { word: 'allergy', meaning: 'dị ứng', phonetic: '/ˈælərdʒi/', pos: 'n', example: 'I have a nut allergy.', exampleVi: 'Tôi bị dị ứng hạt.' },
        { word: 'feast', meaning: 'bữa tiệc', phonetic: '/fiːst/', pos: 'n', example: 'They prepared a feast for the guests.', exampleVi: 'Họ chuẩn bị bữa tiệc cho khách.' },
        { word: 'course', meaning: 'món (trong bữa)', phonetic: '/kɔːrs/', pos: 'n', example: 'The dinner has three courses.', exampleVi: 'Bữa tối có ba món.' },
        { word: 'tablecloth', meaning: 'khăn trải bàn', phonetic: '/ˈteɪblklɒθ/', pos: 'n', example: 'The tablecloth is white and clean.', exampleVi: 'Khăn trải bàn trắng và sạch.' },
        { word: 'savor', meaning: 'thưởng thức', phonetic: '/ˈseɪvər/', pos: 'v', example: 'Savor every bite of this dish.', exampleVi: 'Hãy thưởng thức từng miếng của món này.' },
      ]
    },
    {
      id: 'cafe', name: 'Cafe', icon: 'fa-mug-hot', color: '#8b5cf6',
      words: [
        { word: 'espresso', meaning: 'cà phê đậm đặc', phonetic: '/eˈspresəʊ/', pos: 'n', example: 'I would like a double espresso.', exampleVi: 'Tôi muốn một ly espresso đôi.' },
        { word: 'latte', meaning: 'cà phê sữa', phonetic: '/ˈlɑːteɪ/', pos: 'n', example: 'She ordered a vanilla latte.', exampleVi: 'Cô ấy gọi một ly latte vani.' },
        { word: 'cappuccino', meaning: 'cà phê kem sữa', phonetic: '/ˌkæpuˈtʃiːnoʊ/', pos: 'n', example: 'A cappuccino with extra foam please.', exampleVi: 'Một ly cappuccino thêm bọt sữa.' },
        { word: 'brew', meaning: 'pha', phonetic: '/bruː/', pos: 'v', example: 'The coffee is freshly brewed.', exampleVi: 'Cà phê được pha mới.' },
        { word: 'barista', meaning: 'nhân viên pha chế', phonetic: '/bəˈriːstə/', pos: 'n', example: 'The barista made my coffee perfectly.', exampleVi: 'Nhân viên pha chế pha cà phê rất hoàn hảo.' },
        { word: 'pastry', meaning: 'bánh ngọt', phonetic: '/ˈpeɪstri/', pos: 'n', example: 'I had a pastry with my coffee.', exampleVi: 'Tôi ăn bánh ngọt cùng cà phê.' },
        { word: 'blend', meaning: 'pha trộn', phonetic: '/blend/', pos: 'v', example: 'This is a special coffee blend.', exampleVi: 'Đây là hỗn hợp cà phê đặc biệt.' },
        { word: 'caffeine', meaning: 'chất caffein', phonetic: '/ˈkæfiːn/', pos: 'n', example: 'I need some caffeine to wake up.', exampleVi: 'Tôi cần caffein để tỉnh táo.' },
        { word: 'decaf', meaning: 'không caffein', phonetic: '/ˈdiːkæf/', pos: 'adj', example: 'Do you have decaf coffee?', exampleVi: 'Bạn có cà phê không caffein không?' },
        { word: 'sugar', meaning: 'đường', phonetic: '/ˈʃʊɡər/', pos: 'n', example: 'No sugar in my coffee, please.', exampleVi: 'Không đường trong cà phê, xin cảm ơn.' },
        { word: 'cream', meaning: 'kem', phonetic: '/kriːm/', pos: 'n', example: 'Would you like cream with that?', exampleVi: 'Bạn có muốn thêm kem không?' },
        { word: 'iced', meaning: 'đá', phonetic: '/aɪst/', pos: 'adj', example: 'I prefer iced coffee in summer.', exampleVi: 'Tôi thích cà phê đá vào mùa hè.' },
        { word: 'mocha', meaning: 'cà phê mô-ca', phonetic: '/ˈmɒkə/', pos: 'n', example: 'A mocha combines coffee and chocolate.', exampleVi: 'Mocha kết hợp cà phê và sô-cô-la.' },
        { word: 'aroma', meaning: 'hương thơm', phonetic: '/əˈroʊmə/', pos: 'n', example: 'The aroma of fresh coffee is wonderful.', exampleVi: 'Hương thơm cà phê mới tuyệt vời.' },
        { word: 'grind', meaning: 'xay', phonetic: '/ɡraɪnd/', pos: 'v', example: 'We grind the beans fresh every day.', exampleVi: 'Chúng tôi xay hạt mới mỗi ngày.' },
        { word: 'sweetener', meaning: 'chất tạo ngọt', phonetic: '/ˈswiːtnər/', pos: 'n', example: 'Would you like a sweetener?', exampleVi: 'Bạn có muốn chất tạo ngọt không?' },
        { word: 'takeout', meaning: 'mang đi', phonetic: '/ˈteɪkaʊt/', pos: 'n', example: 'Is this for here or takeout?', exampleVi: 'Dùng tại đây hay mang đi?' },
        { word: 'ceramic', meaning: 'sứ', phonetic: '/səˈræmɪk/', pos: 'adj', example: 'I prefer a ceramic mug.', exampleVi: 'Tôi thích ly sứ hơn.' },
        { word: 'flavor', meaning: 'hương vị', phonetic: '/ˈfleɪvər/', pos: 'n', example: 'What flavor would you like?', exampleVi: 'Bạn muốn hương vị gì?' },
        { word: 'refill', meaning: 'rót thêm', phonetic: '/ˈriːfɪl/', pos: 'v', example: 'Can I get a refill, please?', exampleVi: 'Cho tôi rót thêm được không?' },
        { word: 'syrup', meaning: 'xi-rô', phonetic: '/ˈsɪrəp/', pos: 'n', example: 'Add some caramel syrup.', exampleVi: 'Thêm xi-rô caramel.' },
        { word: 'teapot', meaning: 'ấm trà', phonetic: '/ˈtiːpɒt/', pos: 'n', example: 'Bring a teapot of green tea.', exampleVi: 'Mang một ấm trà xanh.' },
        { word: 'herbal', meaning: 'thảo mộc', phonetic: '/ˈhɜːrbl/', pos: 'adj', example: 'I prefer herbal tea.', exampleVi: 'Tôi thích trà thảo mộc.' },
        { word: 'smoothie', meaning: 'sinh tố', phonetic: '/ˈsmuːði/', pos: 'n', example: 'I ordered a mango smoothie.', exampleVi: 'Tôi gọi một ly sinh tố xoài.' },
        { word: 'cozy', meaning: 'ấm cúng', phonetic: '/ˈkoʊzi/', pos: 'adj', example: 'This cafe is very cozy.', exampleVi: 'Quán cafe này rất ấm cúng.' },
        { word: 'ambiance', meaning: 'không khí', phonetic: '/ˈæmbiəns/', pos: 'n', example: 'The ambiance here is relaxing.', exampleVi: 'Không khí ở đây rất thư giãn.' },
        { word: 'matcha', meaning: 'trà xanh Nhật', phonetic: '/ˈmætʃə/', pos: 'n', example: 'Matcha latte is my favorite.', exampleVi: 'Latte trà xanh là yêu thích của tôi.' },
        { word: 'muffin', meaning: 'bánh muffin', phonetic: '/ˈmʌfɪn/', pos: 'n', example: 'I will have a blueberry muffin.', exampleVi: 'Tôi sẽ lấy một cái bánh muffin việt quất.' },
        { word: 'croissant', meaning: 'bánh sừng bò', phonetic: '/krwɑːˈsɒ̃/', pos: 'n', example: 'A fresh croissant for breakfast.', exampleVi: 'Một chiếc bánh sừng bò mới cho bữa sáng.' },
        { word: 'whipped', meaning: 'đánh bông', phonetic: '/wɪpt/', pos: 'adj', example: 'Add whipped cream on top.', exampleVi: 'Thêm kem đánh bông lên trên.' },
      ]
    },
    {
      id: 'ielts', name: 'IELTS', icon: 'fa-graduation-cap', color: '#06b6d4',
      words: [
        { word: 'academic', meaning: 'học thuật', phonetic: '/ˌækəˈdemɪk/', pos: 'adj', example: 'She has an academic background in science.', exampleVi: 'Cô ấy có nền tảng học thuật về khoa học.' },
        { word: 'research', meaning: 'nghiên cứu', phonetic: '/rɪˈsɜːrtʃ/', pos: 'n', example: 'The research was published last month.', exampleVi: 'Nghiên cứu được công bố tháng trước.' },
        { word: 'hypothesis', meaning: 'giả thuyết', phonetic: '/haɪˈpɒθəsɪs/', pos: 'n', example: 'The hypothesis was proven correct.', exampleVi: 'Giả thuyết đã được chứng minh đúng.' },
        { word: 'conclusion', meaning: 'kết luận', phonetic: '/kənˈkluːʒn/', pos: 'n', example: 'In conclusion, the data supports the theory.', exampleVi: 'Kết luận, dữ liệu hỗ trợ lý thuyết.' },
        { word: 'evidence', meaning: 'bằng chứng', phonetic: '/ˈevɪdəns/', pos: 'n', example: 'There is strong evidence to support this claim.', exampleVi: 'Có bằng chứng mạnh mẽ hỗ trợ tuyên bố này.' },
        { word: 'analyze', meaning: 'phân tích', phonetic: '/ˈænəlaɪz/', pos: 'v', example: 'We need to analyze the data carefully.', exampleVi: 'Chúng ta cần phân tích dữ liệu cẩn thận.' },
        { word: 'significant', meaning: 'đáng kể', phonetic: '/sɪɡˈnɪfɪkənt/', pos: 'adj', example: 'There was a significant increase.', exampleVi: 'Có sự tăng trưởng đáng kể.' },
        { word: 'contribute', meaning: 'đóng góp', phonetic: '/kənˈtrɪbjuːt/', pos: 'v', example: 'Many factors contribute to success.', exampleVi: 'Nhiều yếu tố đóng góp vào thành công.' },
        { word: 'phenomenon', meaning: 'hiện tượng', phonetic: '/fɪˈnɒmɪnən/', pos: 'n', example: 'This is a natural phenomenon.', exampleVi: 'Đây là hiện tượng tự nhiên.' },
        { word: 'perspective', meaning: 'quan điểm', phonetic: '/pərˈspektɪv/', pos: 'n', example: 'From a different perspective, the situation looks better.', exampleVi: 'Từ quan điểm khác, tình hình trông tốt hơn.' },
        { word: 'methodology', meaning: 'phương pháp luận', phonetic: '/ˌmeθəˈdɒlədʒi/', pos: 'n', example: 'The methodology used was rigorous.', exampleVi: 'Phương pháp luận được sử dụng rất chặt chẽ.' },
        { word: 'sustainable', meaning: 'bền vững', phonetic: '/səˈsteɪnəbl/', pos: 'adj', example: 'We need sustainable development.', exampleVi: 'Chúng ta cần phát triển bền vững.' },
        { word: 'controversy', meaning: 'tranh cãi', phonetic: '/ˈkɒntrəvɜːrsi/', pos: 'n', example: 'The topic sparked controversy.', exampleVi: 'Chủ đề gây ra tranh cãi.' },
        { word: 'elaborate', meaning: 'trình bày chi tiết', phonetic: '/ɪˈlæbəreɪt/', pos: 'v', example: 'Could you elaborate on that point?', exampleVi: 'Bạn có thể trình bày chi tiết về điểm đó?' },
        { word: 'fluctuate', meaning: 'dao động', phonetic: '/ˈflʌktʃueɪt/', pos: 'v', example: 'Prices fluctuate throughout the year.', exampleVi: 'Giá cả dao động trong suốt năm.' },
        { word: 'tendency', meaning: 'xu hướng', phonetic: '/ˈtendənsi/', pos: 'n', example: 'There is a tendency to overeat.', exampleVi: 'Có xu hướng ăn quá nhiều.' },
        { word: 'impact', meaning: 'tác động', phonetic: '/ˈɪmpækt/', pos: 'n', example: 'Climate change has a huge impact.', exampleVi: 'Biến đổi khí hậu có tác động lớn.' },
        { word: 'demonstrate', meaning: 'chứng minh', phonetic: '/ˈdemənstreɪt/', pos: 'v', example: 'The experiment demonstrates the theory.', exampleVi: 'Thí nghiệm chứng minh lý thuyết.' },
        { word: 'inequality', meaning: 'bất bình đẳng', phonetic: '/ˌɪnɪˈkwɒləti/', pos: 'n', example: 'Income inequality is a global issue.', exampleVi: 'Bất bình đẳng thu nhập là vấn đề toàn cầu.' },
        { word: 'infrastructure', meaning: 'cơ sở hạ tầng', phonetic: '/ˈɪnfrəstrʌktʃər/', pos: 'n', example: 'The country needs better infrastructure.', exampleVi: 'Đất nước cần cơ sở hạ tầng tốt hơn.' },
        { word: 'consequently', meaning: 'do đó', phonetic: '/ˈkɒnsɪkwentli/', pos: 'adv', example: 'He failed the exam; consequently, he had to retake it.', exampleVi: 'Anh ấy trượt kỳ thi; do đó phải thi lại.' },
        { word: 'demographic', meaning: 'nhân khẩu học', phonetic: '/ˌdeməˈɡræfɪk/', pos: 'adj', example: 'Demographic changes affect the economy.', exampleVi: 'Thay đổi nhân khẩu học ảnh hưởng đến kinh tế.' },
        { word: 'paradigm', meaning: 'mô hình', phonetic: '/ˈpærədaɪm/', pos: 'n', example: 'A new paradigm in education has emerged.', exampleVi: 'Một mô hình mới trong giáo dục đã xuất hiện.' },
        { word: 'empirical', meaning: 'thực nghiệm', phonetic: '/ɪmˈpɪrɪkl/', pos: 'adj', example: 'The theory is based on empirical evidence.', exampleVi: 'Lý thuyết dựa trên bằng chứng thực nghiệm.' },
        { word: 'coherent', meaning: 'mạch lạc', phonetic: '/koʊˈhɪrənt/', pos: 'adj', example: 'Write a coherent essay.', exampleVi: 'Viết một bài luận mạch lạc.' },
        { word: 'ambiguous', meaning: 'mơ hồ', phonetic: '/æmˈbɪɡjuəs/', pos: 'adj', example: 'The instructions were ambiguous.', exampleVi: 'Hướng dẫn rất mơ hồ.' },
        { word: 'prevalent', meaning: 'phổ biến', phonetic: '/ˈprevələnt/', pos: 'adj', example: 'Obesity is prevalent in developed countries.', exampleVi: 'Béo phì phổ biến ở các nước phát triển.' },
        { word: 'constraint', meaning: 'hạn chế', phonetic: '/kənˈstreɪnt/', pos: 'n', example: 'Budget constraints limited the project.', exampleVi: 'Hạn chế ngân sách giới hạn dự án.' },
        { word: 'feasible', meaning: 'khả thi', phonetic: '/ˈfiːzəbl/', pos: 'adj', example: 'Is this plan feasible?', exampleVi: 'Kế hoạch này có khả thi không?' },
        { word: 'diverse', meaning: 'đa dạng', phonetic: '/daɪˈvɜːrs/', pos: 'adj', example: 'We have a diverse team.', exampleVi: 'Chúng tôi có một đội ngũ đa dạng.' },
      ]
    },
    {
      id: 'toeic', name: 'TOEIC', icon: 'fa-building', color: '#ec4899',
      words: [
        { word: 'invoice', meaning: 'hóa đơn', phonetic: '/ˈɪnvɔɪs/', pos: 'n', example: 'Please send the invoice by email.', exampleVi: 'Vui lòng gửi hóa đơn qua email.' },
        { word: 'shipment', meaning: 'lô hàng', phonetic: '/ˈʃɪpmənt/', pos: 'n', example: 'The shipment will arrive next week.', exampleVi: 'Lô hàng sẽ đến tuần sau.' },
        { word: 'inventory', meaning: 'hàng tồn kho', phonetic: '/ˈɪnvəntɔːri/', pos: 'n', example: 'We need to check the inventory.', exampleVi: 'Chúng ta cần kiểm tra hàng tồn kho.' },
        { word: 'warranty', meaning: 'bảo hành', phonetic: '/ˈwɒrənti/', pos: 'n', example: 'The product has a one-year warranty.', exampleVi: 'Sản phẩm có bảo hành một năm.' },
        { word: 'refund', meaning: 'hoàn tiền', phonetic: '/ˈriːfʌnd/', pos: 'n', example: 'I would like a refund, please.', exampleVi: 'Tôi muốn được hoàn tiền.' },
        { word: 'headquarters', meaning: 'trụ sở chính', phonetic: '/ˈhedkwɔːrtərz/', pos: 'n', example: 'The headquarters is in New York.', exampleVi: 'Trụ sở chính ở New York.' },
        { word: 'annual', meaning: 'hàng năm', phonetic: '/ˈænjuəl/', pos: 'adj', example: 'The annual report was published.', exampleVi: 'Báo cáo hàng năm đã được công bố.' },
        { word: 'comply', meaning: 'tuân thủ', phonetic: '/kəmˈplaɪ/', pos: 'v', example: 'You must comply with the regulations.', exampleVi: 'Bạn phải tuân thủ quy định.' },
        { word: 'vendor', meaning: 'nhà cung cấp', phonetic: '/ˈvendər/', pos: 'n', example: 'We selected a new vendor.', exampleVi: 'Chúng tôi chọn nhà cung cấp mới.' },
        { word: 'acquisition', meaning: 'mua lại', phonetic: '/ˌækwɪˈzɪʃn/', pos: 'n', example: 'The acquisition was completed last month.', exampleVi: 'Thương vụ mua lại hoàn thành tháng trước.' },
        { word: 'liability', meaning: 'trách nhiệm pháp lý', phonetic: '/ˌlaɪəˈbɪləti/', pos: 'n', example: 'The company denied any liability.', exampleVi: 'Công ty từ chối mọi trách nhiệm pháp lý.' },
        { word: 'merger', meaning: 'sáp nhập', phonetic: '/ˈmɜːrdʒər/', pos: 'n', example: 'The merger created a larger company.', exampleVi: 'Việc sáp nhập tạo ra công ty lớn hơn.' },
        { word: 'audit', meaning: 'kiểm toán', phonetic: '/ˈɔːdɪt/', pos: 'n', example: 'The annual audit found no issues.', exampleVi: 'Kiểm toán hàng năm không phát hiện vấn đề.' },
        { word: 'subsidiary', meaning: 'công ty con', phonetic: '/səbˈsɪdiəri/', pos: 'n', example: 'They opened a subsidiary in Asia.', exampleVi: 'Họ mở công ty con ở châu Á.' },
        { word: 'dividend', meaning: 'cổ tức', phonetic: '/ˈdɪvɪdend/', pos: 'n', example: 'Shareholders received a dividend.', exampleVi: 'Cổ đông nhận được cổ tức.' },
        { word: 'procurement', meaning: 'mua sắm', phonetic: '/prəˈkjʊərmənt/', pos: 'n', example: 'The procurement department handles purchases.', exampleVi: 'Bộ phận mua sắm xử lý các đơn hàng.' },
        { word: 'lease', meaning: 'hợp đồng thuê', phonetic: '/liːs/', pos: 'n', example: 'We signed a five-year lease.', exampleVi: 'Chúng tôi ký hợp đồng thuê năm năm.' },
        { word: 'tariff', meaning: 'thuế quan', phonetic: '/ˈtærɪf/', pos: 'n', example: 'New tariffs were imposed on imports.', exampleVi: 'Thuế quan mới áp dụng cho hàng nhập khẩu.' },
        { word: 'quota', meaning: 'hạn ngạch', phonetic: '/ˈkwoʊtə/', pos: 'n', example: 'The sales team exceeded their quota.', exampleVi: 'Đội bán hàng vượt hạn ngạch.' },
        { word: 'commodity', meaning: 'hàng hóa', phonetic: '/kəˈmɒdəti/', pos: 'n', example: 'Oil is a valuable commodity.', exampleVi: 'Dầu là hàng hóa có giá trị.' },
        { word: 'reimburse', meaning: 'hoàn trả', phonetic: '/ˌriːɪmˈbɜːrs/', pos: 'v', example: 'The company will reimburse travel expenses.', exampleVi: 'Công ty sẽ hoàn trả chi phí đi lại.' },
        { word: 'transaction', meaning: 'giao dịch', phonetic: '/trænˈzækʃn/', pos: 'n', example: 'Each transaction is recorded.', exampleVi: 'Mỗi giao dịch đều được ghi lại.' },
        { word: 'brochure', meaning: 'tờ rơi', phonetic: '/broʊˈʃʊr/', pos: 'n', example: 'Please take a brochure.', exampleVi: 'Vui lòng lấy một tờ rơi.' },
        { word: 'wholesale', meaning: 'bán sỉ', phonetic: '/ˈhoʊlseɪl/', pos: 'adj', example: 'We buy at wholesale prices.', exampleVi: 'Chúng tôi mua với giá sỉ.' },
        { word: 'retail', meaning: 'bán lẻ', phonetic: '/ˈriːteɪl/', pos: 'adj', example: 'The retail price is higher.', exampleVi: 'Giá bán lẻ cao hơn.' },
        { word: 'voucher', meaning: 'phiếu giảm giá', phonetic: '/ˈvaʊtʃər/', pos: 'n', example: 'Use this voucher for a discount.', exampleVi: 'Dùng phiếu giảm giá này để được chiết khấu.' },
        { word: 'shareholder', meaning: 'cổ đông', phonetic: '/ˈʃerhoʊldər/', pos: 'n', example: 'Shareholders approved the plan.', exampleVi: 'Cổ đông phê duyệt kế hoạch.' },
        { word: 'itinerary', meaning: 'lịch trình', phonetic: '/aɪˈtɪnəreri/', pos: 'n', example: 'Here is the business itinerary.', exampleVi: 'Đây là lịch trình công tác.' },
        { word: 'forthcoming', meaning: 'sắp tới', phonetic: '/ˌfɔːrθˈkʌmɪŋ/', pos: 'adj', example: 'Details will be in the forthcoming report.', exampleVi: 'Chi tiết sẽ có trong báo cáo sắp tới.' },
        { word: 'allocate', meaning: 'phân bổ', phonetic: '/ˈæləkeɪt/', pos: 'v', example: 'We need to allocate more resources.', exampleVi: 'Chúng ta cần phân bổ thêm nguồn lực.' },
      ]
    }
  ],

  phrases: [
    { en: 'How are you doing?', vi: 'Bạn có khỏe không?', topic: 'communication', level: 'beginner' },
    { en: 'Nice to meet you.', vi: 'Rất vui được gặp bạn.', topic: 'communication', level: 'beginner' },
    { en: 'Could you repeat that?', vi: 'Bạn có thể nhắc lại được không?', topic: 'communication', level: 'beginner' },
    { en: 'I would like to order.', vi: 'Tôi muốn gọi món.', topic: 'restaurant', level: 'beginner' },
    { en: 'Can I have the bill, please?', vi: 'Cho tôi hóa đơn được không?', topic: 'restaurant', level: 'beginner' },
    { en: 'Where is the nearest station?', vi: 'Trạm gần nhất ở đâu?', topic: 'travel', level: 'beginner' },
    { en: 'I have a meeting at 3 PM.', vi: 'Tôi có cuộc họp lúc 3 giờ chiều.', topic: 'work', level: 'beginner' },
    { en: 'The deadline is next Friday.', vi: 'Hạn chót là thứ Sáu tới.', topic: 'work', level: 'beginner' },
    { en: 'Could you please send me the report?', vi: 'Bạn vui lòng gửi cho tôi báo cáo?', topic: 'work', level: 'intermediate' },
    { en: 'I apologize for the inconvenience.', vi: 'Tôi xin lỗi vì sự bất tiện.', topic: 'communication', level: 'intermediate' },
    { en: 'In my opinion, this is a great idea.', vi: 'Theo ý kiến tôi, đây là ý tưởng tuyệt vời.', topic: 'communication', level: 'intermediate' },
    { en: 'Can I get a latte with oat milk?', vi: 'Cho tôi một ly latte sữa yến mạch được không?', topic: 'cafe', level: 'intermediate' },
    { en: 'I would like to check in, please.', vi: 'Tôi muốn làm thủ tục nhận phòng.', topic: 'travel', level: 'intermediate' },
    { en: 'Do you have any vegetarian options?', vi: 'Bạn có món chay nào không?', topic: 'restaurant', level: 'intermediate' },
    { en: 'The flight has been delayed by two hours.', vi: 'Chuyến bay bị trì hoãn hai tiếng.', topic: 'travel', level: 'intermediate' },
    { en: 'We need to discuss the budget allocation.', vi: 'Chúng ta cần thảo luận phân bổ ngân sách.', topic: 'work', level: 'advanced' },
    { en: 'Could you elaborate on that point?', vi: 'Bạn có thể trình bày chi tiết hơn?', topic: 'ielts', level: 'advanced' },
    { en: 'The data suggests a significant trend.', vi: 'Dữ liệu cho thấy xu hướng đáng kể.', topic: 'ielts', level: 'advanced' },
    { en: 'The shipment is expected to arrive by Friday.', vi: 'Lô hàng dự kiến đến vào thứ Sáu.', topic: 'toeic', level: 'advanced' },
    { en: 'We should schedule a follow-up meeting.', vi: 'Chúng ta nên lên lịch họp tiếp theo.', topic: 'work', level: 'intermediate' },
    { en: 'What time does the cafe open?', vi: 'Quán cafe mở cửa lúc mấy giờ?', topic: 'cafe', level: 'beginner' },
    { en: 'I really appreciate your help.', vi: 'Tôi thực sự đánh giá cao sự giúp đỡ của bạn.', topic: 'communication', level: 'intermediate' },
    { en: 'Let me introduce you to my colleague.', vi: 'Để tôi giới thiệu bạn với đồng nghiệp.', topic: 'work', level: 'intermediate' },
    { en: 'This restaurant has excellent reviews.', vi: 'Nhà hàng này có đánh giá rất tốt.', topic: 'restaurant', level: 'intermediate' },
    { en: 'Is this seat taken?', vi: 'Chỗ này có ai ngồi chưa?', topic: 'cafe', level: 'beginner' },
  ],

  sentences: [
    { en: 'The quick brown fox jumps over the lazy dog.', vi: 'Con cáo nâu nhanh nhẹn nhảy qua con chó lười.', topic: 'general' },
    { en: 'Practice makes perfect, so keep trying every day.', vi: 'Luyện tập tạo nên sự hoàn hảo, hãy tiếp tục cố gắng mỗi ngày.', topic: 'general' },
    { en: 'Learning a new language opens doors to new opportunities.', vi: 'Học một ngôn ngữ mới mở ra cánh cửa cho những cơ hội mới.', topic: 'general' },
    { en: 'Good morning everyone, today we will discuss the quarterly results.', vi: 'Chào buổi sáng mọi người, hôm nay chúng ta sẽ thảo luận kết quả quý.', topic: 'work' },
    { en: 'Could you please pass the salt and pepper?', vi: 'Bạn vui lòng đưa giúp muối và tiêu?', topic: 'restaurant' },
    { en: 'The weather forecast says it will rain tomorrow afternoon.', vi: 'Dự báo thời tiết nói rằng ngày mai chiều sẽ mưa.', topic: 'general' },
    { en: 'I have been studying English for three years now.', vi: 'Tôi đã học tiếng Anh được ba năm rồi.', topic: 'general' },
    { en: 'Excuse me, could you tell me how to get to the museum?', vi: 'Xin lỗi, bạn có thể chỉ cho tôi đường đến bảo tàng?', topic: 'travel' },
    { en: 'The company plans to expand into international markets next year.', vi: 'Công ty dự định mở rộng sang thị trường quốc tế năm sau.', topic: 'work' },
    { en: 'She recommended a wonderful book about personal development.', vi: 'Cô ấy giới thiệu một cuốn sách tuyệt vời về phát triển bản thân.', topic: 'communication' },
    { en: 'The research indicates that regular exercise improves mental health.', vi: 'Nghiên cứu chỉ ra rằng tập thể dục đều đặn cải thiện sức khỏe tinh thần.', topic: 'ielts' },
    { en: 'All employees must attend the safety training session next Monday.', vi: 'Tất cả nhân viên phải tham dự buổi đào tạo an toàn vào thứ Hai tới.', topic: 'toeic' },
    { en: 'Would you like your coffee with milk or black?', vi: 'Bạn muốn cà phê có sữa hay đen?', topic: 'cafe' },
    { en: 'The hotel offers complimentary breakfast for all guests.', vi: 'Khách sạn cung cấp bữa sáng miễn phí cho tất cả khách.', topic: 'travel' },
    { en: 'Technology is changing the way we communicate with each other.', vi: 'Công nghệ đang thay đổi cách chúng ta giao tiếp với nhau.', topic: 'general' },
  ],

  translationExercises: [
    // ===== COMMUNICATION — Giao Tiếp Hàng Ngày (16 sentences) =====
    // --- Beginner (6) ---
    {
      en: "Hello, how are you today?",
      vi: "Xin chào, hôm nay bạn có khỏe không?",
      topic: "communication",
      level: "beginner",
      altTranslations: [
        "Chào bạn, hôm nay bạn thế nào?",
        "Xin chào, bạn khỏe không hôm nay?",
        "Chào, hôm nay bạn có khỏe không?"
      ],
      grammar: "Câu hỏi thăm sức khỏe cơ bản. 'How are you' là cách hỏi thăm phổ biến nhất trong tiếng Anh, thường dùng khi gặp mặt.",
      keyVocab: [
        { word: "how", meaning: "như thế nào", note: "Từ để hỏi trạng thái, cách thức" },
        { word: "today", meaning: "hôm nay", note: "Trạng từ chỉ thời gian hiện tại" }
      ],
      contexts: [
        "👋 Gặp đồng nghiệp ở hành lang buổi sáng",
        "🏪 Chào người quen ở cửa hàng"
      ]
    },
    {
      en: "Thank you very much for your help.",
      vi: "Cảm ơn bạn rất nhiều vì sự giúp đỡ.",
      topic: "communication",
      level: "beginner",
      altTranslations: [
        "Cảm ơn rất nhiều vì đã giúp đỡ.",
        "Xin cảm ơn bạn nhiều vì sự hỗ trợ.",
        "Rất cảm ơn bạn đã giúp đỡ."
      ],
      grammar: "'Thank you very much' là cách cảm ơn trang trọng hơn 'thanks'. 'For your help' dùng giới từ 'for' để chỉ lý do cảm ơn.",
      keyVocab: [
        { word: "thank", meaning: "cảm ơn", note: "Động từ bày tỏ lòng biết ơn" },
        { word: "help", meaning: "sự giúp đỡ", note: "Danh từ không đếm được khi chỉ sự hỗ trợ chung" }
      ],
      contexts: [
        "🤝 Ai đó giúp bạn mang đồ nặng",
        "💼 Đồng nghiệp hỗ trợ bạn hoàn thành công việc"
      ]
    },
    {
      en: "Excuse me, can you help me?",
      vi: "Xin lỗi, bạn có thể giúp tôi được không?",
      topic: "communication",
      level: "beginner",
      altTranslations: [
        "Xin lỗi, bạn giúp tôi được không?",
        "Làm ơn, bạn có thể giúp tôi không?",
        "Xin phép, bạn có thể hỗ trợ tôi không?"
      ],
      grammar: "'Excuse me' dùng để thu hút sự chú ý một cách lịch sự. 'Can you' dùng để yêu cầu ai đó làm gì (ít trang trọng hơn 'could you').",
      keyVocab: [
        { word: "excuse me", meaning: "xin lỗi (để xin phép)", note: "Khác với 'sorry' — dùng khi muốn nhờ vả hoặc xin chú ý" },
        { word: "help", meaning: "giúp đỡ", note: "Động từ, theo sau bởi tân ngữ trực tiếp" }
      ],
      contexts: [
        "🗺️ Hỏi đường người lạ trên phố",
        "🏬 Nhờ nhân viên trong cửa hàng"
      ]
    },
    {
      en: "Nice to meet you. My name is Lan.",
      vi: "Rất vui được gặp bạn. Tên tôi là Lan.",
      topic: "communication",
      level: "beginner",
      altTranslations: [
        "Rất vui được gặp bạn. Tôi tên là Lan.",
        "Hân hạnh được gặp bạn. Tôi là Lan.",
        "Rất vui gặp bạn. Mình tên Lan."
      ],
      grammar: "'Nice to meet you' là cách chào hỏi khi gặp ai lần đầu. 'My name is...' là cách tự giới thiệu tên cơ bản nhất.",
      keyVocab: [
        { word: "nice", meaning: "vui, tốt đẹp", note: "Tính từ thường dùng trong giao tiếp thân thiện" },
        { word: "meet", meaning: "gặp", note: "Động từ bất quy tắc: meet - met - met" }
      ],
      contexts: [
        "🤝 Gặp gỡ đối tác kinh doanh lần đầu",
        "🎉 Được giới thiệu với bạn mới tại buổi tiệc"
      ]
    },
    {
      en: "I am sorry, I do not understand.",
      vi: "Xin lỗi, tôi không hiểu.",
      topic: "communication",
      level: "beginner",
      altTranslations: [
        "Tôi xin lỗi, tôi không hiểu.",
        "Xin lỗi, tôi chưa hiểu.",
        "Xin lỗi, mình không hiểu."
      ],
      grammar: "'I am sorry' dùng để xin lỗi hoặc tỏ sự tiếc nuối. 'Do not understand' là thì hiện tại đơn phủ định — dùng trợ động từ 'do not' trước động từ nguyên mẫu.",
      keyVocab: [
        { word: "sorry", meaning: "xin lỗi", note: "Tính từ biểu đạt sự hối tiếc hoặc xin lỗi" },
        { word: "understand", meaning: "hiểu", note: "Động từ trạng thái, không dùng ở dạng tiếp diễn" }
      ],
      contexts: [
        "🗣️ Khi người nước ngoài nói quá nhanh",
        "📞 Khi nghe điện thoại không rõ"
      ]
    },
    {
      en: "See you tomorrow. Have a good evening!",
      vi: "Hẹn gặp lại ngày mai. Chúc buổi tối vui vẻ!",
      topic: "communication",
      level: "beginner",
      altTranslations: [
        "Gặp lại bạn ngày mai. Chúc tối vui!",
        "Mai gặp lại nhé. Chúc buổi tối tốt lành!",
        "Hẹn gặp ngày mai. Tối vui vẻ nhé!"
      ],
      grammar: "'See you tomorrow' là cách nói tạm biệt thân mật, rút gọn từ 'I will see you tomorrow'. 'Have a good evening' là lời chúc khi chia tay buổi tối.",
      keyVocab: [
        { word: "see you", meaning: "hẹn gặp lại", note: "Cách nói tạm biệt thân mật, không cần chủ ngữ 'I'" },
        { word: "evening", meaning: "buổi tối", note: "Khoảng thời gian từ 6 giờ chiều đến khi đi ngủ" }
      ],
      contexts: [
        "👋 Rời văn phòng cuối ngày",
        "🍽️ Chia tay bạn bè sau bữa tối"
      ]
    },
    // --- Intermediate (5) ---
    {
      en: "I would like to apologize for the misunderstanding earlier.",
      vi: "Tôi muốn xin lỗi về sự hiểu lầm trước đó.",
      topic: "communication",
      level: "intermediate",
      altTranslations: [
        "Tôi xin lỗi vì sự hiểu nhầm lúc nãy.",
        "Cho tôi xin lỗi về chuyện hiểu lầm trước đó.",
        "Tôi muốn xin lỗi vì đã có sự hiểu lầm."
      ],
      grammar: "'Would like to' là cách nói lịch sự hơn 'want to'. 'Apologize for' luôn đi với giới từ 'for' + danh từ/danh động từ để chỉ lý do xin lỗi.",
      keyVocab: [
        { word: "apologize", meaning: "xin lỗi", note: "Động từ trang trọng, dùng 'apologize for + N/V-ing'" },
        { word: "misunderstanding", meaning: "sự hiểu lầm", note: "Danh từ, gốc từ 'misunderstand'" }
      ],
      contexts: [
        "📧 Gửi email xin lỗi sau khi nhầm lẫn thông tin",
        "🤝 Gặp lại đồng nghiệp sau một cuộc tranh luận"
      ]
    },
    {
      en: "Could you please speak a little more slowly?",
      vi: "Bạn có thể nói chậm hơn một chút được không?",
      topic: "communication",
      level: "intermediate",
      altTranslations: [
        "Làm ơn nói chậm lại một chút được không?",
        "Bạn vui lòng nói chậm hơn được không?",
        "Bạn có thể nói từ từ hơn một chút không?"
      ],
      grammar: "'Could you please' là cấu trúc yêu cầu rất lịch sự. 'A little more slowly' dùng trạng từ so sánh hơn 'more slowly' với 'a little' làm giảm mức độ yêu cầu.",
      keyVocab: [
        { word: "slowly", meaning: "chậm", note: "Trạng từ, dạng so sánh hơn: more slowly" },
        { word: "could", meaning: "có thể", note: "Trợ động từ dùng trong yêu cầu lịch sự, trang trọng hơn 'can'" }
      ],
      contexts: [
        "🗣️ Nói chuyện với người bản xứ nói quá nhanh",
        "📱 Trong cuộc gọi video quốc tế"
      ]
    },
    {
      en: "I really appreciate you taking the time to explain that.",
      vi: "Tôi thực sự đánh giá cao việc bạn dành thời gian giải thích điều đó.",
      topic: "communication",
      level: "intermediate",
      altTranslations: [
        "Tôi rất cảm kích vì bạn đã bỏ thời gian giải thích.",
        "Cảm ơn bạn nhiều vì đã dành thời gian giải thích điều đó.",
        "Tôi thật sự trân trọng việc bạn giải thích cho tôi."
      ],
      grammar: "'Appreciate + V-ing/danh từ' — động từ 'appreciate' theo sau bởi danh động từ (gerund) hoặc danh từ, không dùng 'appreciate + to V'. 'Taking the time' là danh động từ.",
      keyVocab: [
        { word: "appreciate", meaning: "đánh giá cao, trân trọng", note: "Không dùng dạng tiếp diễn; theo sau bởi V-ing hoặc N" },
        { word: "take the time", meaning: "dành thời gian", note: "Cụm động từ, ý chỉ sự cố gắng dành ra thời gian" }
      ],
      contexts: [
        "👨‍🏫 Sau khi giáo viên giảng bài kỹ lưỡng",
        "💼 Khi sếp hướng dẫn bạn quy trình mới"
      ]
    },
    {
      en: "Would you mind if I opened the window?",
      vi: "Bạn có phiền nếu tôi mở cửa sổ không?",
      topic: "communication",
      level: "intermediate",
      altTranslations: [
        "Bạn có ngại không nếu tôi mở cửa sổ?",
        "Tôi mở cửa sổ bạn có phiền không?",
        "Cho tôi mở cửa sổ được không ạ?"
      ],
      grammar: "'Would you mind if I + quá khứ đơn' là cấu trúc xin phép rất lịch sự. Lưu ý: 'opened' dùng thì quá khứ (giả định) sau 'if', không phải hiện tại.",
      keyVocab: [
        { word: "mind", meaning: "phiền, ngại", note: "Khi trả lời: 'No, I don't mind' = đồng ý, 'Yes' = phiền" },
        { word: "window", meaning: "cửa sổ", note: "Danh từ đếm được" }
      ],
      contexts: [
        "🏢 Trong phòng họp hơi nóng",
        "🚌 Trên xe buýt muốn có gió mát"
      ]
    },
    {
      en: "Let me know if there is anything else I can do for you.",
      vi: "Hãy cho tôi biết nếu có điều gì khác tôi có thể giúp bạn.",
      topic: "communication",
      level: "intermediate",
      altTranslations: [
        "Nói cho tôi biết nếu bạn cần gì thêm nhé.",
        "Cho tôi biết nếu tôi có thể giúp gì thêm.",
        "Bạn cứ nói nếu cần tôi giúp thêm gì nhé."
      ],
      grammar: "'Let me know' là mệnh lệnh thức nhẹ nhàng. 'If there is anything else' dùng mệnh đề điều kiện loại 1. 'I can do for you' là mệnh đề quan hệ rút gọn.",
      keyVocab: [
        { word: "let me know", meaning: "cho tôi biết", note: "Cụm cố định, dùng rất phổ biến trong giao tiếp và email" },
        { word: "anything else", meaning: "điều gì khác", note: "Dùng trong câu hỏi và câu điều kiện" }
      ],
      contexts: [
        "📧 Kết thúc email hỗ trợ khách hàng",
        "🏨 Nhân viên lễ tân nói với khách"
      ]
    },
    // --- Advanced (5) ---
    {
      en: "I completely understand your concern, and I assure you we will address it promptly.",
      vi: "Tôi hoàn toàn hiểu mối lo ngại của bạn, và tôi đảm bảo chúng tôi sẽ giải quyết ngay.",
      topic: "communication",
      level: "advanced",
      altTranslations: [
        "Tôi hiểu rõ sự lo lắng của bạn, và tôi cam kết sẽ xử lý sớm.",
        "Tôi hoàn toàn thấu hiểu mối quan tâm của bạn, và đảm bảo sẽ giải quyết kịp thời.",
        "Tôi rất hiểu lo ngại của bạn và cam đoan sẽ xử lý nhanh chóng."
      ],
      grammar: "'I assure you (that)' là cấu trúc đảm bảo trang trọng. 'Address' ở đây dùng như động từ nghĩa là 'giải quyết' (không phải danh từ 'địa chỉ'). 'Promptly' là trạng từ trang trọng nghĩa là 'nhanh chóng'.",
      keyVocab: [
        { word: "assure", meaning: "đảm bảo, cam đoan", note: "Cấu trúc: assure + người + that + mệnh đề" },
        { word: "address", meaning: "giải quyết", note: "Nghĩa động từ trang trọng, khác nghĩa 'địa chỉ'" },
        { word: "promptly", meaning: "ngay lập tức, kịp thời", note: "Trạng từ dùng trong ngữ cảnh chuyên nghiệp" }
      ],
      contexts: [
        "📞 Nhân viên chăm sóc khách hàng xử lý khiếu nại",
        "💼 Họp với đối tác khi có vấn đề phát sinh"
      ]
    },
    {
      en: "With all due respect, I believe there might be a more effective approach.",
      vi: "Với tất cả sự tôn trọng, tôi tin rằng có thể có cách tiếp cận hiệu quả hơn.",
      topic: "communication",
      level: "advanced",
      altTranslations: [
        "Thưa anh/chị, tôi nghĩ có thể có phương pháp hiệu quả hơn.",
        "Xin phép được nói, tôi cho rằng có cách tiếp cận tốt hơn.",
        "Tôi rất tôn trọng ý kiến đó, nhưng tôi nghĩ có hướng tiếp cận hiệu quả hơn."
      ],
      grammar: "'With all due respect' là cụm mở đầu trang trọng khi muốn phản bác lịch sự. 'There might be' dùng 'might' để diễn đạt khả năng — nhẹ nhàng hơn 'there is'. 'A more effective approach' là so sánh hơn với tính từ dài.",
      keyVocab: [
        { word: "with all due respect", meaning: "với tất cả sự tôn trọng", note: "Cụm cố định, thường đi trước ý kiến phản bác" },
        { word: "approach", meaning: "cách tiếp cận, phương pháp", note: "Danh từ hoặc động từ, rất phổ biến trong ngữ cảnh chuyên nghiệp" }
      ],
      contexts: [
        "🏢 Phản bác ý kiến sếp trong cuộc họp một cách tế nhị",
        "📊 Đề xuất phương án khác với đối tác"
      ]
    },
    {
      en: "I would be grateful if you could forward the relevant documents at your earliest convenience.",
      vi: "Tôi sẽ rất biết ơn nếu bạn có thể chuyển tiếp các tài liệu liên quan sớm nhất có thể.",
      topic: "communication",
      level: "advanced",
      altTranslations: [
        "Tôi rất biết ơn nếu bạn gửi các tài liệu liên quan khi thuận tiện nhất.",
        "Rất mong bạn chuyển tài liệu liên quan khi bạn có thể.",
        "Tôi sẽ cảm kích nếu bạn gửi các tài liệu liên quan sớm nhất."
      ],
      grammar: "'I would be grateful if you could' là cấu trúc yêu cầu cực kỳ lịch sự, dùng 'would + be' ở mệnh đề chính và 'could' ở mệnh đề if. 'At your earliest convenience' là cụm trang trọng nghĩa 'khi nào bạn tiện nhất'.",
      keyVocab: [
        { word: "grateful", meaning: "biết ơn", note: "Tính từ, trang trọng hơn 'thankful'" },
        { word: "forward", meaning: "chuyển tiếp", note: "Động từ thường dùng với email và tài liệu" },
        { word: "at your earliest convenience", meaning: "sớm nhất khi thuận tiện", note: "Cụm cố định trong văn phòng và email trang trọng" }
      ],
      contexts: [
        "📧 Email yêu cầu tài liệu từ đối tác nước ngoài",
        "📋 Yêu cầu hồ sơ từ bộ phận khác"
      ]
    },
    {
      en: "It has come to my attention that there have been some discrepancies in the recent report.",
      vi: "Tôi đã nhận thấy rằng có một số sai lệch trong báo cáo gần đây.",
      topic: "communication",
      level: "advanced",
      altTranslations: [
        "Tôi được biết rằng có một số điểm không nhất quán trong báo cáo gần đây.",
        "Tôi phát hiện có vài sự khác biệt trong báo cáo mới nhất.",
        "Tôi nhận ra có một số sai sót trong bản báo cáo gần đây."
      ],
      grammar: "'It has come to my attention that' là cụm mở đầu trang trọng trong thư từ kinh doanh để nêu vấn đề. 'There have been' dùng thì hiện tại hoàn thành để chỉ việc xảy ra gần đây và còn liên quan.",
      keyVocab: [
        { word: "discrepancy", meaning: "sai lệch, không khớp", note: "Danh từ đếm được, số nhiều: discrepancies" },
        { word: "come to one's attention", meaning: "được ai đó nhận thấy", note: "Cụm trang trọng dùng trong thư từ công việc" }
      ],
      contexts: [
        "📊 Quản lý phát hiện lỗi trong báo cáo tài chính",
        "📧 Email chính thức yêu cầu kiểm tra lại dữ liệu"
      ]
    },
    {
      en: "I sincerely hope we can reach a mutually beneficial agreement.",
      vi: "Tôi chân thành hy vọng chúng ta có thể đạt được thỏa thuận đôi bên cùng có lợi.",
      topic: "communication",
      level: "advanced",
      altTranslations: [
        "Tôi thật lòng mong chúng ta đạt được thỏa thuận cùng có lợi.",
        "Tôi hy vọng hai bên sẽ đạt được thỏa thuận có lợi cho cả hai.",
        "Tôi chân thành mong muốn đạt thỏa thuận đôi bên cùng thắng."
      ],
      grammar: "'I sincerely hope' — trạng từ 'sincerely' bổ nghĩa cho động từ 'hope'. 'Mutually beneficial' là cụm tính từ: 'mutually' (trạng từ) bổ nghĩa cho 'beneficial' (tính từ), nghĩa là 'có lợi cho cả hai bên'.",
      keyVocab: [
        { word: "sincerely", meaning: "chân thành", note: "Trạng từ, cũng dùng kết thúc thư: 'Yours sincerely'" },
        { word: "mutually beneficial", meaning: "đôi bên cùng có lợi", note: "Cụm tính từ rất phổ biến trong đàm phán kinh doanh" }
      ],
      contexts: [
        "🤝 Kết thúc buổi đàm phán hợp đồng",
        "📧 Email tổng kết sau cuộc họp với đối tác"
      ]
    },

    // ===== RESTAURANT — Nhà Hàng & Cafe (16 sentences) =====
    // --- Beginner (6) ---
    {
      en: "Can I see the menu, please?",
      vi: "Cho tôi xem thực đơn được không?",
      topic: "restaurant",
      level: "beginner",
      altTranslations: [
        "Tôi có thể xem thực đơn không?",
        "Làm ơn cho tôi xem menu.",
        "Vui lòng cho tôi xem thực đơn."
      ],
      grammar: "'Can I' là cách xin phép thông dụng. 'Please' đặt cuối câu hoặc sau chủ ngữ để tăng lịch sự.",
      keyVocab: [
        { word: "menu", meaning: "thực đơn", note: "Danh từ đếm được, phát âm /ˈmenjuː/" },
        { word: "please", meaning: "làm ơn, vui lòng", note: "Thêm vào câu yêu cầu để lịch sự hơn" }
      ],
      contexts: [
        "🍽️ Ngồi vào bàn tại nhà hàng",
        "☕ Đến quán cafe mới"
      ]
    },
    {
      en: "I would like a glass of water, please.",
      vi: "Cho tôi một ly nước, làm ơn.",
      topic: "restaurant",
      level: "beginner",
      altTranslations: [
        "Tôi muốn một ly nước, vui lòng.",
        "Làm ơn cho tôi một cốc nước.",
        "Cho tôi xin một ly nước."
      ],
      grammar: "'I would like' (viết tắt: I'd like) là cách gọi món lịch sự hơn 'I want'. 'A glass of' là lượng từ dùng cho đồ uống.",
      keyVocab: [
        { word: "would like", meaning: "muốn (lịch sự)", note: "Lịch sự hơn 'want', dùng trong nhà hàng và giao tiếp" },
        { word: "a glass of", meaning: "một ly", note: "Lượng từ dùng cho chất lỏng: a glass of water/juice" }
      ],
      contexts: [
        "🍽️ Gọi đồ uống khi chờ món chính",
        "☀️ Thời tiết nóng, cần nước uống ngay"
      ]
    },
    {
      en: "Is this dish spicy?",
      vi: "Món này có cay không?",
      topic: "restaurant",
      level: "beginner",
      altTranslations: [
        "Món ăn này cay không?",
        "Món này có vị cay không?",
        "Đồ ăn này cay không ạ?"
      ],
      grammar: "Câu hỏi Yes/No với 'is': đảo động từ 'is' lên trước chủ ngữ 'this dish'. 'Spicy' là tính từ mô tả vị cay.",
      keyVocab: [
        { word: "dish", meaning: "món ăn", note: "Danh từ đếm được, cũng có nghĩa là 'đĩa'" },
        { word: "spicy", meaning: "cay", note: "Tính từ, mức độ: mild (nhẹ) → spicy (cay) → very spicy (rất cay)" }
      ],
      contexts: [
        "🌶️ Hỏi về món ăn khi không chịu được cay",
        "🍜 Gọi món ở nhà hàng Thái hoặc Ấn Độ"
      ]
    },
    {
      en: "The food is delicious. I really enjoy it.",
      vi: "Đồ ăn ngon. Tôi rất thích.",
      topic: "restaurant",
      level: "beginner",
      altTranslations: [
        "Đồ ăn rất ngon. Tôi rất thưởng thức.",
        "Món ăn ngon lắm. Tôi rất thích.",
        "Đồ ăn ngon quá. Tôi thích lắm."
      ],
      grammar: "'The food is delicious' dùng thì hiện tại đơn mô tả cảm nhận hiện tại. 'Enjoy' + danh từ/đại từ tân ngữ (it), không dùng 'enjoy to do'.",
      keyVocab: [
        { word: "delicious", meaning: "ngon", note: "Tính từ, mạnh hơn 'good' hoặc 'tasty'" },
        { word: "enjoy", meaning: "thưởng thức, thích", note: "Động từ, theo sau bởi N hoặc V-ing, không dùng 'enjoy to V'" }
      ],
      contexts: [
        "🍲 Khen ngợi đồ ăn với bồi bàn",
        "👨‍🍳 Nói với bạn bè về bữa ăn ngon"
      ]
    },
    {
      en: "Can I have the bill, please?",
      vi: "Cho tôi hóa đơn được không?",
      topic: "restaurant",
      level: "beginner",
      altTranslations: [
        "Tôi xin thanh toán.",
        "Vui lòng cho tôi hóa đơn.",
        "Cho tôi tính tiền được không?"
      ],
      grammar: "'Can I have' là cách yêu cầu thông dụng và lịch sự. 'The bill' (UK) = 'the check' (US) — hóa đơn thanh toán.",
      keyVocab: [
        { word: "bill", meaning: "hóa đơn", note: "Tiếng Anh Anh dùng 'bill', tiếng Anh Mỹ dùng 'check'" },
        { word: "have", meaning: "có, nhận", note: "Ở đây nghĩa là 'được nhận, được đưa cho'" }
      ],
      contexts: [
        "🧾 Khi ăn xong muốn thanh toán",
        "💳 Khi vội cần tính tiền nhanh"
      ]
    },
    {
      en: "A table for two, please.",
      vi: "Bàn cho hai người, làm ơn.",
      topic: "restaurant",
      level: "beginner",
      altTranslations: [
        "Cho tôi bàn hai người.",
        "Cho chúng tôi một bàn cho hai người.",
        "Một bàn hai người, vui lòng."
      ],
      grammar: "Câu yêu cầu rút gọn (ellipsis), đầy đủ: 'I would like a table for two, please'. Trong giao tiếp nhà hàng, nói ngắn gọn là tự nhiên.",
      keyVocab: [
        { word: "table for two", meaning: "bàn cho hai người", note: "Cấu trúc cố định: table for + số người" }
      ],
      contexts: [
        "🍽️ Đến nhà hàng cùng bạn",
        "💑 Đi ăn tối với người yêu"
      ]
    },
    // --- Intermediate (5) ---
    {
      en: "Do you have any vegetarian options on the menu?",
      vi: "Bạn có món chay nào trong thực đơn không?",
      topic: "restaurant",
      level: "intermediate",
      altTranslations: [
        "Thực đơn có món chay nào không?",
        "Nhà hàng có phục vụ đồ ăn chay không?",
        "Có lựa chọn chay nào trong menu không?"
      ],
      grammar: "'Do you have any' là câu hỏi về sự tồn tại. 'Any' dùng trong câu hỏi thay vì 'some'. 'Vegetarian options' — 'vegetarian' là tính từ bổ nghĩa cho 'options'.",
      keyVocab: [
        { word: "vegetarian", meaning: "chay, người ăn chay", note: "Tính từ hoặc danh từ, vegan = thuần chay (không dùng bất kỳ sản phẩm động vật nào)" },
        { word: "option", meaning: "lựa chọn, sự lựa chọn", note: "Danh từ đếm được, số nhiều: options" }
      ],
      contexts: [
        "🥗 Khi ăn kiêng hoặc ăn chay",
        "🌱 Đi ăn cùng bạn ăn chay"
      ]
    },
    {
      en: "Could you recommend a local specialty that I should try?",
      vi: "Bạn có thể giới thiệu món đặc sản địa phương nào tôi nên thử không?",
      topic: "restaurant",
      level: "intermediate",
      altTranslations: [
        "Bạn có thể gợi ý món đặc sản nào nên thử không?",
        "Nhờ bạn giới thiệu món đặc trưng địa phương.",
        "Có món đặc sản nào bạn khuyên tôi nên thử không?"
      ],
      grammar: "'Could you recommend' là cách hỏi ý kiến lịch sự. 'That I should try' là mệnh đề quan hệ bổ nghĩa cho 'a local specialty'. 'Should' gợi ý sự nên làm.",
      keyVocab: [
        { word: "recommend", meaning: "giới thiệu, đề xuất", note: "Cấu trúc: recommend + N hoặc recommend + that + S + V(nguyên mẫu)" },
        { word: "specialty", meaning: "đặc sản, món đặc biệt", note: "US: specialty, UK: speciality" }
      ],
      contexts: [
        "🗺️ Du khách hỏi bồi bàn về món địa phương",
        "🍽️ Lần đầu đến nhà hàng mới"
      ]
    },
    {
      en: "I am allergic to peanuts, so could you check if this dish contains any?",
      vi: "Tôi bị dị ứng đậu phộng, bạn có thể kiểm tra món này có chứa không?",
      topic: "restaurant",
      level: "intermediate",
      altTranslations: [
        "Tôi dị ứng lạc, bạn kiểm tra giúp món này có lạc không?",
        "Tôi bị dị ứng với đậu phộng, nhờ bạn xem món này có không.",
        "Tôi không ăn được đậu phộng vì dị ứng, bạn kiểm tra giúp nhé?"
      ],
      grammar: "'I am allergic to + N' là cách nói bị dị ứng. 'So' nối hai mệnh đề với nghĩa 'vì vậy'. 'If this dish contains any' là mệnh đề danh từ làm tân ngữ cho 'check'.",
      keyVocab: [
        { word: "allergic", meaning: "dị ứng", note: "Tính từ, cấu trúc: be allergic to + N" },
        { word: "contain", meaning: "chứa, bao gồm", note: "Động từ trạng thái, không dùng dạng tiếp diễn" }
      ],
      contexts: [
        "⚠️ Thông báo dị ứng khi gọi món",
        "🥜 Nhờ nhân viên kiểm tra thành phần món ăn"
      ]
    },
    {
      en: "We would like to split the bill, if that is possible.",
      vi: "Chúng tôi muốn chia hóa đơn, nếu được.",
      topic: "restaurant",
      level: "intermediate",
      altTranslations: [
        "Chúng tôi muốn thanh toán riêng, nếu có thể.",
        "Cho chúng tôi tách hóa đơn ra được không?",
        "Chúng tôi muốn tính tiền riêng, nếu được ạ."
      ],
      grammar: "'Split the bill' là cách nói 'chia hóa đơn' — mỗi người trả phần mình. 'If that is possible' là mệnh đề điều kiện lịch sự ở cuối câu.",
      keyVocab: [
        { word: "split", meaning: "chia, tách", note: "Động từ bất quy tắc: split - split - split" },
        { word: "bill", meaning: "hóa đơn", note: "UK: bill, US: check" }
      ],
      contexts: [
        "👥 Đi ăn nhóm, mỗi người muốn trả phần mình",
        "🍕 Ăn với đồng nghiệp sau giờ làm"
      ]
    },
    {
      en: "Excuse me, I ordered the grilled chicken, but I received the steak instead.",
      vi: "Xin lỗi, tôi đã gọi gà nướng, nhưng tôi nhận được bít tết thay vì thế.",
      topic: "restaurant",
      level: "intermediate",
      altTranslations: [
        "Xin lỗi, tôi gọi gà nướng nhưng lại nhận được bò bít tết.",
        "Cho tôi hỏi, tôi đã order gà nướng nhưng được phục vụ bít tết.",
        "Xin lỗi, món tôi gọi là gà nướng, không phải bít tết."
      ],
      grammar: "'I ordered' dùng thì quá khứ đơn vì hành động gọi món đã xảy ra. 'But' nối hai ý đối lập. 'Instead' đặt cuối câu nghĩa là 'thay vào đó'.",
      keyVocab: [
        { word: "order", meaning: "gọi món, đặt hàng", note: "Động từ, quá khứ: ordered" },
        { word: "instead", meaning: "thay vào đó", note: "Trạng từ, thường đặt cuối câu" }
      ],
      contexts: [
        "😕 Nhận nhầm món ở nhà hàng",
        "🍽️ Phản ánh lịch sự với bồi bàn"
      ]
    },
    // --- Advanced (5) ---
    {
      en: "The presentation of the dish is exquisite, and the flavors complement each other beautifully.",
      vi: "Cách trình bày món ăn rất tinh tế, và các hương vị bổ trợ nhau tuyệt đẹp.",
      topic: "restaurant",
      level: "advanced",
      altTranslations: [
        "Món ăn được trình bày tinh xảo, và các vị hòa quyện hoàn hảo.",
        "Cách bài trí món ăn rất đẹp mắt, và hương vị kết hợp tuyệt vời.",
        "Phần trình bày tinh tế, hương vị hài hòa bổ trợ lẫn nhau."
      ],
      grammar: "'The presentation of the dish' — danh từ trừu tượng 'presentation' chỉ cách trình bày. 'Complement each other' nghĩa là bổ trợ lẫn nhau (khác 'compliment' = khen). 'Beautifully' là trạng từ bổ nghĩa cho động từ 'complement'.",
      keyVocab: [
        { word: "exquisite", meaning: "tinh tế, tinh xảo", note: "Tính từ cấp cao hơn 'beautiful', dùng mô tả nghệ thuật, ẩm thực" },
        { word: "complement", meaning: "bổ trợ, bổ sung", note: "Khác 'compliment' (khen ngợi). Complement = bổ sung cho hoàn chỉnh" }
      ],
      contexts: [
        "⭐ Đánh giá nhà hàng cao cấp trên mạng",
        "🍷 Nói chuyện với đầu bếp về món ăn"
      ]
    },
    {
      en: "I must say, the wine pairing you suggested was absolutely spot on.",
      vi: "Phải nói rằng, cách kết hợp rượu vang bạn gợi ý hoàn toàn chính xác.",
      topic: "restaurant",
      level: "advanced",
      altTranslations: [
        "Tôi phải nói, rượu vang bạn đề xuất kết hợp rất đúng.",
        "Phải công nhận, việc chọn rượu bạn gợi ý thật chuẩn xác.",
        "Cặp đôi rượu vang bạn giới thiệu hoàn hảo tuyệt đối."
      ],
      grammar: "'I must say' là cụm mở đầu nhấn mạnh. 'Wine pairing' là thuật ngữ ẩm thực chỉ việc kết hợp rượu phù hợp với món ăn. 'Spot on' là thành ngữ nghĩa 'chính xác tuyệt đối'.",
      keyVocab: [
        { word: "pairing", meaning: "sự kết hợp", note: "Danh từ, thường dùng trong ẩm thực: food/wine pairing" },
        { word: "spot on", meaning: "chính xác, chuẩn", note: "Thành ngữ thường dùng trong tiếng Anh Anh" }
      ],
      contexts: [
        "🍷 Khen sommelier ở nhà hàng cao cấp",
        "🥂 Bữa tối thưởng rượu vang"
      ]
    },
    {
      en: "We would appreciate it if you could accommodate our dietary restrictions for the group dinner.",
      vi: "Chúng tôi sẽ rất biết ơn nếu bạn có thể đáp ứng các yêu cầu về chế độ ăn cho bữa tối nhóm.",
      topic: "restaurant",
      level: "advanced",
      altTranslations: [
        "Chúng tôi cảm kích nếu nhà hàng đáp ứng được các hạn chế về ăn uống cho tiệc nhóm.",
        "Rất mong nhà hàng có thể phục vụ phù hợp chế độ ăn kiêng cho nhóm chúng tôi.",
        "Chúng tôi biết ơn nếu bạn điều chỉnh thực đơn theo yêu cầu ăn kiêng của nhóm."
      ],
      grammar: "'We would appreciate it if you could' là cấu trúc yêu cầu lịch sự nhất. 'Accommodate' ở đây nghĩa là 'đáp ứng, thích ứng'. 'Dietary restrictions' là cụm danh từ chỉ hạn chế về ăn uống.",
      keyVocab: [
        { word: "accommodate", meaning: "đáp ứng, điều chỉnh cho phù hợp", note: "Động từ, cũng nghĩa 'chứa' (phòng accommodate 10 người)" },
        { word: "dietary restrictions", meaning: "hạn chế về chế độ ăn", note: "Cụm danh từ dùng khi nói về dị ứng, ăn kiêng, tôn giáo" }
      ],
      contexts: [
        "📧 Email đặt bàn nhóm có người ăn chay, dị ứng",
        "🏢 Tổ chức tiệc công ty với nhiều yêu cầu ăn uống"
      ]
    },
    {
      en: "The chef has crafted a seasonal tasting menu that showcases locally sourced ingredients.",
      vi: "Đầu bếp đã tạo ra một thực đơn thử theo mùa trưng bày các nguyên liệu địa phương.",
      topic: "restaurant",
      level: "advanced",
      altTranslations: [
        "Bếp trưởng đã thiết kế menu thử mùa dùng nguyên liệu có nguồn gốc địa phương.",
        "Đầu bếp sáng tạo thực đơn thử mùa giới thiệu nguyên liệu tại địa phương.",
        "Bếp trưởng đã chuẩn bị menu thử nghiệm theo mùa với nguyên liệu từ địa phương."
      ],
      grammar: "'Has crafted' dùng thì hiện tại hoàn thành vì kết quả còn liên quan. 'Tasting menu' là thuật ngữ ẩm thực (menu nhiều món nhỏ để thử). 'Locally sourced' — quá khứ phân từ 'sourced' dùng làm tính từ, bổ nghĩa bởi trạng từ 'locally'.",
      keyVocab: [
        { word: "craft", meaning: "tạo ra (với kỹ năng)", note: "Động từ hàm ý sự khéo léo, nghệ thuật" },
        { word: "tasting menu", meaning: "thực đơn thử", note: "Thuật ngữ fine dining — nhiều món nhỏ để trải nghiệm" },
        { word: "locally sourced", meaning: "nguồn gốc địa phương", note: "Cụm tính từ dùng nhiều trong ẩm thực hiện đại" }
      ],
      contexts: [
        "🌟 Nhà hàng Michelin giới thiệu menu đặc biệt",
        "📝 Viết đánh giá nhà hàng cao cấp"
      ]
    },
    {
      en: "Given the exceptional quality of the cuisine, I believe the price is entirely justified.",
      vi: "Với chất lượng ẩm thực xuất sắc, tôi tin rằng mức giá hoàn toàn xứng đáng.",
      topic: "restaurant",
      level: "advanced",
      altTranslations: [
        "Xét chất lượng đồ ăn tuyệt hảo, tôi nghĩ giá cả hoàn toàn hợp lý.",
        "Dựa trên chất lượng ẩm thực xuất sắc, giá cả là hoàn toàn xứng đáng.",
        "Với chất lượng món ăn vượt trội như vậy, mức giá là hoàn toàn chính đáng."
      ],
      grammar: "'Given' ở đây là giới từ nghĩa 'xét rằng, với'. 'Entirely justified' — trạng từ 'entirely' bổ nghĩa cho tính từ 'justified' (quá khứ phân từ dùng làm tính từ).",
      keyVocab: [
        { word: "exceptional", meaning: "xuất sắc, ngoại lệ", note: "Tính từ cấp cao, mạnh hơn 'excellent'" },
        { word: "justified", meaning: "xứng đáng, có lý", note: "Tính từ/quá khứ phân từ, dùng khi biện minh cho điều gì" }
      ],
      contexts: [
        "💰 Thảo luận về giá cả nhà hàng cao cấp",
        "⭐ Viết review cho nhà hàng fine dining"
      ]
    },

    // ===== TRAVEL — Du Lịch & Khách Sạn (16 sentences) =====
    // --- Beginner (6) ---
    {
      en: "Excuse me, where is the nearest train station?",
      vi: "Xin lỗi, ga tàu gần nhất ở đâu?",
      topic: "travel",
      level: "beginner",
      altTranslations: [
        "Xin lỗi, trạm xe lửa gần nhất ở đâu?",
        "Cho tôi hỏi, nhà ga gần nhất ở chỗ nào?",
        "Làm ơn chỉ giúp ga tàu gần đây nhất."
      ],
      grammar: "'Where is' là câu hỏi về vị trí. 'The nearest' dùng so sánh nhất (superlative) của 'near' để hỏi cái gần nhất.",
      keyVocab: [
        { word: "nearest", meaning: "gần nhất", note: "So sánh nhất của 'near': near - nearer - nearest" },
        { word: "train station", meaning: "ga tàu", note: "Cũng dùng: railway station (UK)" }
      ],
      contexts: [
        "🗺️ Du khách hỏi đường trên phố",
        "🚆 Tìm phương tiện giao thông công cộng"
      ]
    },
    {
      en: "I would like to check in, please. I have a reservation.",
      vi: "Tôi muốn làm thủ tục nhận phòng. Tôi có đặt phòng.",
      topic: "travel",
      level: "beginner",
      altTranslations: [
        "Cho tôi nhận phòng. Tôi đã đặt phòng trước.",
        "Tôi muốn check-in. Tôi có đặt trước.",
        "Tôi muốn đăng ký nhận phòng. Tôi đã đặt phòng."
      ],
      grammar: "'Check in' là cụm động từ (phrasal verb) nghĩa nhận phòng khách sạn hoặc làm thủ tục bay. 'I have a reservation' dùng thì hiện tại đơn cho sự thật hiện tại.",
      keyVocab: [
        { word: "check in", meaning: "nhận phòng, làm thủ tục", note: "Phrasal verb; danh từ: check-in (có gạch nối)" },
        { word: "reservation", meaning: "đặt phòng, đặt chỗ", note: "Danh từ, cũng dùng 'booking' (phổ biến ở UK)" }
      ],
      contexts: [
        "🏨 Đến quầy lễ tân khách sạn",
        "✈️ Làm thủ tục tại quầy check-in sân bay"
      ]
    },
    {
      en: "How much does a taxi to the airport cost?",
      vi: "Taxi đến sân bay giá bao nhiêu?",
      topic: "travel",
      level: "beginner",
      altTranslations: [
        "Đi taxi ra sân bay hết bao nhiêu tiền?",
        "Giá taxi đến sân bay là bao nhiêu?",
        "Từ đây đi taxi đến sân bay tốn bao nhiêu?"
      ],
      grammar: "'How much does... cost?' là cấu trúc hỏi giá. 'How much' hỏi số lượng/giá tiền. 'A taxi to the airport' — giới từ 'to' chỉ đích đến.",
      keyVocab: [
        { word: "how much", meaning: "bao nhiêu (tiền)", note: "Dùng hỏi giá hoặc số lượng không đếm được" },
        { word: "cost", meaning: "tốn, giá", note: "Động từ bất quy tắc: cost - cost - cost" }
      ],
      contexts: [
        "🚕 Hỏi giá taxi tại khách sạn",
        "✈️ Chuẩn bị ra sân bay"
      ]
    },
    {
      en: "What time does the bus leave?",
      vi: "Xe buýt khởi hành lúc mấy giờ?",
      topic: "travel",
      level: "beginner",
      altTranslations: [
        "Xe buýt đi lúc mấy giờ?",
        "Mấy giờ xe buýt chạy?",
        "Xe buýt xuất phát lúc mấy giờ?"
      ],
      grammar: "'What time' hỏi thời gian cụ thể. 'Does the bus leave' — dùng trợ động từ 'does' vì chủ ngữ 'the bus' là ngôi thứ ba số ít.",
      keyVocab: [
        { word: "leave", meaning: "khởi hành, rời đi", note: "Động từ bất quy tắc: leave - left - left" },
        { word: "bus", meaning: "xe buýt", note: "Danh từ đếm được, số nhiều: buses" }
      ],
      contexts: [
        "🚌 Hỏi tại bến xe buýt",
        "🗺️ Lên kế hoạch di chuyển khi du lịch"
      ]
    },
    {
      en: "Can you show me on the map?",
      vi: "Bạn có thể chỉ trên bản đồ không?",
      topic: "travel",
      level: "beginner",
      altTranslations: [
        "Bạn chỉ trên bản đồ giúp tôi được không?",
        "Bạn có thể chỉ trên bản đồ cho tôi?",
        "Làm ơn chỉ trên bản đồ giúp tôi."
      ],
      grammar: "'Show me' dùng hai tân ngữ: 'me' (tân ngữ gián tiếp) + 'on the map' (bổ ngữ chỉ vị trí). 'Can you' là cách hỏi yêu cầu thông thường.",
      keyVocab: [
        { word: "show", meaning: "chỉ, cho xem", note: "Động từ, cấu trúc: show + người + vật/nơi" },
        { word: "map", meaning: "bản đồ", note: "Danh từ đếm được" }
      ],
      contexts: [
        "🗺️ Khi bị lạc ở thành phố lạ",
        "📱 Nhờ người địa phương chỉ đường"
      ]
    },
    {
      en: "I need to exchange some money. Where can I do that?",
      vi: "Tôi cần đổi tiền. Tôi có thể đổi ở đâu?",
      topic: "travel",
      level: "beginner",
      altTranslations: [
        "Tôi muốn đổi tiền. Đổi ở đâu được?",
        "Tôi cần đổi ngoại tệ. Ở đâu tôi có thể đổi?",
        "Cho tôi hỏi, chỗ đổi tiền ở đâu?"
      ],
      grammar: "'Need to + V' diễn đạt sự cần thiết. 'Exchange money' là cụm động từ nghĩa đổi tiền. 'Where can I do that' — 'that' thay thế cho 'exchange money'.",
      keyVocab: [
        { word: "exchange", meaning: "đổi, trao đổi", note: "Động từ và danh từ, money exchange = quầy đổi tiền" },
        { word: "money", meaning: "tiền", note: "Danh từ không đếm được" }
      ],
      contexts: [
        "💱 Vừa đến sân bay nước ngoài",
        "🏦 Tìm quầy đổi tiền ở khu du lịch"
      ]
    },
    // --- Intermediate (5) ---
    {
      en: "My flight has been delayed. Could you help me rebook for the next available flight?",
      vi: "Chuyến bay của tôi bị hoãn. Bạn có thể giúp tôi đặt lại chuyến bay tiếp theo không?",
      topic: "travel",
      level: "intermediate",
      altTranslations: [
        "Chuyến bay bị trễ. Bạn giúp tôi đổi sang chuyến kế tiếp được không?",
        "Chuyến bay của tôi bị delay. Nhờ bạn đặt lại chuyến bay gần nhất.",
        "Chuyến bay bị hoãn rồi. Bạn có thể đặt lại chuyến tiếp theo giúp tôi không?"
      ],
      grammar: "'Has been delayed' là thì hiện tại hoàn thành bị động — nhấn mạnh kết quả (chuyến bay bị hoãn), không cần nêu ai gây ra. 'Rebook' có tiền tố 're-' nghĩa 'đặt lại'.",
      keyVocab: [
        { word: "delay", meaning: "hoãn, trì hoãn", note: "Động từ và danh từ; bị động: be delayed" },
        { word: "rebook", meaning: "đặt lại", note: "Tiền tố 're-' = lại: rebook, reschedule, rearrange" }
      ],
      contexts: [
        "✈️ Tại quầy hãng bay khi chuyến bị hoãn",
        "📞 Gọi điện cho hãng hàng không"
      ]
    },
    {
      en: "Is breakfast included in the room rate, or is it charged separately?",
      vi: "Bữa sáng có bao gồm trong giá phòng không, hay tính phí riêng?",
      topic: "travel",
      level: "intermediate",
      altTranslations: [
        "Giá phòng có bao gồm bữa sáng không, hay phải trả thêm?",
        "Bữa sáng có kèm theo giá phòng hay tính riêng?",
        "Ăn sáng miễn phí hay phải trả thêm tiền?"
      ],
      grammar: "'Is included in' là bị động của 'include'. 'Or' nối hai lựa chọn. 'Charged separately' — bị động: 'is it charged separately' (có bị tính riêng không).",
      keyVocab: [
        { word: "include", meaning: "bao gồm", note: "Động từ, bị động: be included in" },
        { word: "room rate", meaning: "giá phòng", note: "Cụm danh từ khách sạn, cũng dùng: room price" },
        { word: "separately", meaning: "riêng biệt", note: "Trạng từ, gốc: separate (tính từ)" }
      ],
      contexts: [
        "🏨 Hỏi lễ tân khi nhận phòng",
        "📧 Email hỏi khách sạn trước khi đặt phòng"
      ]
    },
    {
      en: "Could you recommend a good place to visit that is not too touristy?",
      vi: "Bạn có thể giới thiệu một nơi đẹp để tham quan mà không quá đông khách du lịch không?",
      topic: "travel",
      level: "intermediate",
      altTranslations: [
        "Bạn có thể gợi ý chỗ nào tham quan ít khách du lịch không?",
        "Có nơi nào đẹp mà ít du khách bạn khuyên tôi nên đến không?",
        "Nhờ bạn giới thiệu điểm tham quan nào vắng khách du lịch."
      ],
      grammar: "'That is not too touristy' là mệnh đề quan hệ hạn định. 'Touristy' là tính từ thông tục nghĩa 'đầy khách du lịch, mang tính du lịch quá'.",
      keyVocab: [
        { word: "visit", meaning: "tham quan, thăm", note: "Động từ + danh từ trực tiếp, không cần giới từ" },
        { word: "touristy", meaning: "đông khách du lịch (hơi tiêu cực)", note: "Tính từ thông tục, ám chỉ nơi quá thương mại hóa" }
      ],
      contexts: [
        "🗣️ Hỏi người dân địa phương về địa điểm ít ai biết",
        "🏨 Nhờ nhân viên khách sạn gợi ý"
      ]
    },
    {
      en: "I would like to extend my stay for two more nights, if the room is available.",
      vi: "Tôi muốn ở thêm hai đêm nữa, nếu phòng còn trống.",
      topic: "travel",
      level: "intermediate",
      altTranslations: [
        "Tôi muốn kéo dài thời gian ở thêm hai đêm, nếu có phòng.",
        "Cho tôi gia hạn thêm hai đêm nếu phòng còn trống.",
        "Tôi muốn ở lại thêm hai đêm nữa, nếu được."
      ],
      grammar: "'Extend my stay' là cách nói trang trọng để xin ở thêm. 'For two more nights' — 'more' đặt sau số lượng. 'If the room is available' là mệnh đề điều kiện loại 1.",
      keyVocab: [
        { word: "extend", meaning: "kéo dài, gia hạn", note: "Động từ, danh từ: extension" },
        { word: "available", meaning: "có sẵn, còn trống", note: "Tính từ, dùng nhiều trong đặt phòng và lịch hẹn" }
      ],
      contexts: [
        "🏨 Tại quầy lễ tân muốn ở thêm",
        "📞 Gọi điện cho khách sạn"
      ]
    },
    {
      en: "The view from our hotel room is breathtaking; you can see the entire coastline.",
      vi: "Khung cảnh từ phòng khách sạn đẹp đến ngạt thở; bạn có thể thấy toàn bộ đường bờ biển.",
      topic: "travel",
      level: "intermediate",
      altTranslations: [
        "Tầm nhìn từ phòng khách sạn tuyệt đẹp; có thể nhìn thấy cả bờ biển.",
        "View từ phòng khách sạn đẹp mê hồn; nhìn được toàn bộ đường biển.",
        "Cảnh nhìn từ phòng khách sạn ngoạn mục; bạn có thể ngắm cả bờ biển."
      ],
      grammar: "Dùng dấu chấm phẩy (;) nối hai mệnh đề có liên quan chặt chẽ. 'Breathtaking' là tính từ ghép (breath + taking) nghĩa 'đẹp ngạt thở'. 'The entire coastline' — 'entire' nhấn mạnh toàn bộ.",
      keyVocab: [
        { word: "breathtaking", meaning: "ngoạn mục, đẹp đến ngạt thở", note: "Tính từ ghép, mạnh hơn 'beautiful' hoặc 'amazing'" },
        { word: "coastline", meaning: "đường bờ biển", note: "Danh từ ghép: coast + line" }
      ],
      contexts: [
        "📸 Chia sẻ ảnh du lịch với bạn bè",
        "✍️ Viết đánh giá khách sạn"
      ]
    },
    // --- Advanced (5) ---
    {
      en: "Due to the volcanic eruption, all flights have been grounded until further notice.",
      vi: "Do núi lửa phun trào, tất cả các chuyến bay bị đình chỉ cho đến khi có thông báo mới.",
      topic: "travel",
      level: "advanced",
      altTranslations: [
        "Vì núi lửa phun, mọi chuyến bay bị tạm dừng đến khi có thông báo thêm.",
        "Do phun trào núi lửa, toàn bộ chuyến bay bị cấm cho đến có thông báo mới.",
        "Tất cả chuyến bay bị hủy vì núi lửa phun trào, cho đến khi có thông báo khác."
      ],
      grammar: "'Due to' là cụm giới từ chỉ nguyên nhân (trang trọng hơn 'because of'). 'Have been grounded' là hiện tại hoàn thành bị động. 'Until further notice' là cụm cố định nghĩa 'cho đến khi có thông báo mới'.",
      keyVocab: [
        { word: "volcanic eruption", meaning: "phun trào núi lửa", note: "Cụm danh từ, volcanic (adj) + eruption (n)" },
        { word: "grounded", meaning: "bị đình chỉ (máy bay)", note: "Trong hàng không: grounded = không được cất cánh" },
        { word: "until further notice", meaning: "cho đến khi có thông báo mới", note: "Cụm cố định trong thông báo chính thức" }
      ],
      contexts: [
        "📢 Thông báo tại sân bay khi có sự cố",
        "📰 Tin tức về gián đoạn hàng không"
      ]
    },
    {
      en: "I would like to file a formal complaint regarding the unsatisfactory condition of the room.",
      vi: "Tôi muốn gửi khiếu nại chính thức về tình trạng phòng không đạt yêu cầu.",
      topic: "travel",
      level: "advanced",
      altTranslations: [
        "Tôi muốn khiếu nại chính thức về điều kiện phòng không đạt tiêu chuẩn.",
        "Tôi muốn nộp đơn phản ánh chính thức về tình trạng phòng không tốt.",
        "Tôi muốn gửi đơn khiếu nại về phòng không đáp ứng tiêu chuẩn."
      ],
      grammar: "'File a complaint' là cụm cố định nghĩa 'gửi/nộp khiếu nại'. 'Regarding' là giới từ trang trọng hơn 'about'. 'Unsatisfactory' — tiền tố 'un-' phủ định + 'satisfactory' (đạt yêu cầu).",
      keyVocab: [
        { word: "file a complaint", meaning: "nộp đơn khiếu nại", note: "Cụm cố định, 'file' ở đây là động từ nghĩa 'nộp'" },
        { word: "unsatisfactory", meaning: "không đạt yêu cầu", note: "Tính từ trang trọng, mạnh hơn 'not good'" },
        { word: "regarding", meaning: "về, liên quan đến", note: "Giới từ trang trọng hơn 'about'" }
      ],
      contexts: [
        "🏨 Nói với quản lý khách sạn về phòng dơ",
        "📧 Gửi email khiếu nại chính thức"
      ]
    },
    {
      en: "The guided tour provides invaluable insights into the historical significance of this ancient temple.",
      vi: "Chuyến tham quan có hướng dẫn cung cấp những hiểu biết vô giá về ý nghĩa lịch sử của ngôi đền cổ này.",
      topic: "travel",
      level: "advanced",
      altTranslations: [
        "Tour có hướng dẫn viên mang đến cái nhìn sâu sắc vô giá về giá trị lịch sử của ngôi đền cổ.",
        "Chuyến tham quan có người dẫn cho ta hiểu biết quý giá về tầm quan trọng lịch sử của đền cổ này.",
        "Tour có hướng dẫn giúp hiểu sâu về ý nghĩa lịch sử vô giá của ngôi đền cổ."
      ],
      grammar: "'Guided tour' — 'guided' là quá khứ phân từ dùng như tính từ. 'Invaluable' nghĩa 'vô giá' (KHÔNG phải 'không có giá trị' — đây là lỗi hay nhầm). 'Historical significance' — cụm danh từ với tính từ + danh từ.",
      keyVocab: [
        { word: "invaluable", meaning: "vô giá, cực kỳ quý giá", note: "LƯU Ý: invaluable = rất có giá trị (ngược với 'valueless' = không giá trị)" },
        { word: "insight", meaning: "hiểu biết sâu sắc", note: "Danh từ, cấu trúc: insight into + N" },
        { word: "significance", meaning: "ý nghĩa, tầm quan trọng", note: "Danh từ, tính từ: significant" }
      ],
      contexts: [
        "🏛️ Viết blog du lịch về di tích lịch sử",
        "📖 Đánh giá tour trên TripAdvisor"
      ]
    },
    {
      en: "Travelers are strongly advised to purchase comprehensive travel insurance before departing.",
      vi: "Du khách được khuyến cáo mạnh mẽ nên mua bảo hiểm du lịch toàn diện trước khi khởi hành.",
      topic: "travel",
      level: "advanced",
      altTranslations: [
        "Khách du lịch nên mua bảo hiểm du lịch toàn diện trước khi đi.",
        "Du khách được khuyên nên mua bảo hiểm du lịch đầy đủ trước chuyến đi.",
        "Hành khách được khuyến cáo mua bảo hiểm du lịch trọn gói trước khi khởi hành."
      ],
      grammar: "'Are strongly advised to' là bị động của 'advise' + trạng từ 'strongly' nhấn mạnh. 'Comprehensive' nghĩa 'toàn diện'. 'Before departing' — giới từ 'before' + V-ing.",
      keyVocab: [
        { word: "comprehensive", meaning: "toàn diện, bao quát", note: "Tính từ, dùng nhiều trong IELTS và kinh doanh" },
        { word: "travel insurance", meaning: "bảo hiểm du lịch", note: "Cụm danh từ ghép" },
        { word: "depart", meaning: "khởi hành", note: "Động từ trang trọng hơn 'leave'" }
      ],
      contexts: [
        "📋 Hướng dẫn du lịch trên website đại lý",
        "⚠️ Cảnh báo du lịch từ đại sứ quán"
      ]
    },
    {
      en: "Despite the language barrier, the warmth and hospitality of the locals made our trip unforgettable.",
      vi: "Mặc dù có rào cản ngôn ngữ, sự ấm áp và hiếu khách của người dân địa phương đã làm chuyến đi của chúng tôi khó quên.",
      topic: "travel",
      level: "advanced",
      altTranslations: [
        "Dù bất đồng ngôn ngữ, lòng nhiệt tình và mến khách của người địa phương khiến chuyến đi không thể quên.",
        "Bất chấp rào cản ngôn ngữ, sự nồng hậu của người dân bản địa đã tạo nên chuyến đi đáng nhớ.",
        "Dù có rào cản về ngôn ngữ, sự thân thiện và hiếu khách của người dân đã làm chuyến đi thật đặc biệt."
      ],
      grammar: "'Despite + N' là giới từ chỉ sự nhượng bộ (tương tự 'in spite of'). 'Language barrier' là cụm danh từ cố định. 'Unforgettable' — tiền tố 'un-' + 'forgettable' = không thể quên.",
      keyVocab: [
        { word: "despite", meaning: "mặc dù, bất chấp", note: "Giới từ, theo sau bởi danh từ/V-ing (KHÔNG theo sau bởi mệnh đề)" },
        { word: "hospitality", meaning: "lòng hiếu khách", note: "Danh từ không đếm được, rất quan trọng trong ngành du lịch" },
        { word: "unforgettable", meaning: "không thể quên", note: "Tính từ, un + forget + able" }
      ],
      contexts: [
        "📝 Viết blog du lịch chia sẻ trải nghiệm",
        "🗣️ Kể về chuyến du lịch với bạn bè"
      ]
    },

    // ===== WORK — Công Việc & Văn Phòng (16 sentences) =====
    // --- Beginner (5) ---
    {
      en: "I have a meeting at ten o'clock this morning.",
      vi: "Tôi có cuộc họp lúc mười giờ sáng nay.",
      topic: "work",
      level: "beginner",
      altTranslations: [
        "Tôi có cuộc họp lúc 10 giờ sáng.",
        "Sáng nay tôi có họp lúc 10 giờ.",
        "Tôi có một cuộc hẹn họp lúc mười giờ sáng nay."
      ],
      grammar: "'Have a meeting' là cách nói có cuộc họp. 'At ten o'clock' — giới từ 'at' dùng cho giờ cụ thể. 'This morning' — 'this' + thời gian = thời gian gần đây.",
      keyVocab: [
        { word: "meeting", meaning: "cuộc họp", note: "Danh từ đếm được, have/attend/hold a meeting" },
        { word: "o'clock", meaning: "giờ đúng", note: "Chỉ dùng với giờ chẵn: 10 o'clock (không nói 10:30 o'clock)" }
      ],
      contexts: [
        "📅 Kiểm tra lịch trình buổi sáng",
        "💬 Nói với đồng nghiệp về lịch của mình"
      ]
    },
    {
      en: "Please send me the file by email.",
      vi: "Vui lòng gửi cho tôi tệp qua email.",
      topic: "work",
      level: "beginner",
      altTranslations: [
        "Làm ơn gửi file cho tôi qua email.",
        "Nhờ bạn gửi tài liệu qua email cho tôi.",
        "Bạn vui lòng gửi file cho tôi bằng email."
      ],
      grammar: "'Please + V nguyên mẫu' là câu yêu cầu lịch sự. 'Send me the file' dùng hai tân ngữ: gián tiếp (me) + trực tiếp (the file). 'By email' — 'by' chỉ phương thức.",
      keyVocab: [
        { word: "send", meaning: "gửi", note: "Động từ bất quy tắc: send - sent - sent" },
        { word: "file", meaning: "tệp, tài liệu", note: "Danh từ đếm được, dùng cho tài liệu giấy hoặc điện tử" }
      ],
      contexts: [
        "📧 Yêu cầu đồng nghiệp gửi tài liệu",
        "💼 Trong cuộc họp cần tệp để xem xét"
      ]
    },
    {
      en: "The deadline is next Friday. We need to finish on time.",
      vi: "Hạn chót là thứ Sáu tới. Chúng ta cần hoàn thành đúng hạn.",
      topic: "work",
      level: "beginner",
      altTranslations: [
        "Deadline là thứ Sáu tuần sau. Chúng ta phải hoàn thành đúng giờ.",
        "Hạn nộp là thứ Sáu tới. Cần làm xong đúng hạn.",
        "Hạn chót là thứ Sáu sau. Phải hoàn thành kịp thời."
      ],
      grammar: "'The deadline is' + thời gian — câu trần thuật đơn giản. 'Need to + V' diễn đạt sự cần thiết. 'On time' (đúng giờ) khác 'in time' (kịp lúc).",
      keyVocab: [
        { word: "deadline", meaning: "hạn chót", note: "Danh từ, meet the deadline = hoàn thành đúng hạn" },
        { word: "on time", meaning: "đúng giờ, đúng hạn", note: "Khác 'in time' (kịp lúc, còn thời gian)" }
      ],
      contexts: [
        "📋 Nhắc nhóm về hạn chót dự án",
        "💻 Lập kế hoạch làm việc trong tuần"
      ]
    },
    {
      en: "Can I take a day off tomorrow?",
      vi: "Tôi có thể nghỉ phép ngày mai không?",
      topic: "work",
      level: "beginner",
      altTranslations: [
        "Ngày mai tôi xin nghỉ được không?",
        "Tôi có thể xin nghỉ một ngày vào ngày mai không?",
        "Cho tôi nghỉ ngày mai được không?"
      ],
      grammar: "'Take a day off' là cụm cố định nghĩa 'nghỉ một ngày'. 'Can I' dùng xin phép thông thường (trong môi trường thân thiện).",
      keyVocab: [
        { word: "day off", meaning: "ngày nghỉ", note: "Cụm danh từ, số nhiều: days off" },
        { word: "take off", meaning: "nghỉ (ngày/tuần)", note: "Phrasal verb, take a day/week off" }
      ],
      contexts: [
        "🤒 Khi bị ốm cần nghỉ ngơi",
        "📅 Muốn nghỉ để giải quyết việc cá nhân"
      ]
    },
    {
      en: "I will finish the report before lunch.",
      vi: "Tôi sẽ hoàn thành báo cáo trước bữa trưa.",
      topic: "work",
      level: "beginner",
      altTranslations: [
        "Tôi sẽ làm xong báo cáo trước giờ ăn trưa.",
        "Báo cáo sẽ xong trước bữa trưa.",
        "Tôi sẽ hoàn tất báo cáo trước trưa."
      ],
      grammar: "'Will + V nguyên mẫu' diễn đạt ý định trong tương lai. 'Before + N/V-ing' — giới từ chỉ thời gian 'trước khi'. 'Finish' + tân ngữ trực tiếp.",
      keyVocab: [
        { word: "finish", meaning: "hoàn thành", note: "Động từ, cũng dùng: complete (trang trọng hơn)" },
        { word: "report", meaning: "báo cáo", note: "Danh từ đếm được và động từ" }
      ],
      contexts: [
        "💻 Cam kết với sếp về tiến độ",
        "📊 Lên kế hoạch công việc buổi sáng"
      ]
    },
    // --- Intermediate (6) ---
    {
      en: "I would like to schedule a follow-up meeting to discuss the project timeline.",
      vi: "Tôi muốn sắp xếp một cuộc họp tiếp theo để thảo luận về tiến độ dự án.",
      topic: "work",
      level: "intermediate",
      altTranslations: [
        "Tôi muốn lên lịch họp tiếp để bàn về lịch trình dự án.",
        "Cho tôi đặt lịch họp tiếp theo để thảo luận timeline dự án.",
        "Tôi muốn hẹn họp lại để bàn về thời gian thực hiện dự án."
      ],
      grammar: "'Schedule' ở đây dùng như động từ nghĩa 'lên lịch'. 'Follow-up' là tính từ ghép (có gạch nối) nghĩa 'tiếp theo, theo dõi'. 'To discuss' — 'to + V' chỉ mục đích.",
      keyVocab: [
        { word: "schedule", meaning: "lên lịch, sắp xếp", note: "Phát âm UK: /ˈʃedjuːl/, US: /ˈskedʒuːl/" },
        { word: "follow-up", meaning: "tiếp theo, theo dõi", note: "Tính từ ghép, danh từ: a follow-up" },
        { word: "timeline", meaning: "tiến độ, lịch trình", note: "Danh từ phổ biến trong quản lý dự án" }
      ],
      contexts: [
        "📧 Email nội bộ đề xuất họp lại",
        "📅 Sau cuộc họp đầu tiên cần bàn thêm"
      ]
    },
    {
      en: "Could you prepare a presentation summarizing the key findings from the research?",
      vi: "Bạn có thể chuẩn bị bài thuyết trình tóm tắt những phát hiện chính từ nghiên cứu không?",
      topic: "work",
      level: "intermediate",
      altTranslations: [
        "Nhờ bạn làm bài thuyết trình tổng hợp kết quả nghiên cứu chính.",
        "Bạn chuẩn bị slide tóm tắt các phát hiện quan trọng từ nghiên cứu giúp tôi nhé?",
        "Bạn có thể soạn bài thuyết trình tóm lược kết quả nghiên cứu không?"
      ],
      grammar: "'Summarizing' là hiện tại phân từ dùng làm bổ ngữ mô tả cho 'presentation'. 'Key findings' — 'key' là tính từ nghĩa 'chính, quan trọng'. 'From the research' — giới từ 'from' chỉ nguồn gốc.",
      keyVocab: [
        { word: "presentation", meaning: "bài thuyết trình", note: "Danh từ, give/make/prepare a presentation" },
        { word: "summarize", meaning: "tóm tắt", note: "Động từ, danh từ: summary" },
        { word: "findings", meaning: "phát hiện, kết quả", note: "Danh từ thường dùng ở số nhiều trong nghiên cứu" }
      ],
      contexts: [
        "📊 Sếp giao nhiệm vụ chuẩn bị báo cáo",
        "🏢 Chuẩn bị cho cuộc họp ban lãnh đạo"
      ]
    },
    {
      en: "I need to delegate some tasks to the junior staff to meet the deadline.",
      vi: "Tôi cần ủy quyền một số nhiệm vụ cho nhân viên cấp dưới để kịp hạn chót.",
      topic: "work",
      level: "intermediate",
      altTranslations: [
        "Tôi cần phân công một số việc cho nhân viên mới để đáp ứng deadline.",
        "Tôi phải giao bớt công việc cho nhân viên cấp thấp hơn để hoàn thành đúng hạn.",
        "Tôi cần chia sẻ nhiệm vụ cho nhân viên junior để kịp tiến độ."
      ],
      grammar: "'Delegate tasks to someone' — cấu trúc: delegate + vật + to + người. 'To meet the deadline' — 'to + V' chỉ mục đích. 'Junior staff' — 'junior' là tính từ chỉ cấp bậc thấp hơn.",
      keyVocab: [
        { word: "delegate", meaning: "ủy quyền, phân công", note: "Động từ: /ˈdelɪɡeɪt/, Danh từ (người đại diện): /ˈdelɪɡət/" },
        { word: "junior", meaning: "cấp dưới, ít kinh nghiệm hơn", note: "Tính từ, ngược lại: senior" }
      ],
      contexts: [
        "📋 Quản lý dự án phân chia công việc",
        "⏰ Khi workload quá tải cần phân bổ lại"
      ]
    },
    {
      en: "The team has made significant progress on the marketing campaign this quarter.",
      vi: "Đội ngũ đã đạt được tiến bộ đáng kể trong chiến dịch marketing quý này.",
      topic: "work",
      level: "intermediate",
      altTranslations: [
        "Nhóm đã có tiến triển lớn trong chiến dịch tiếp thị quý này.",
        "Team đã tiến bộ đáng kể với chiến dịch marketing trong quý.",
        "Đội đã đạt được nhiều tiến bộ quan trọng về chiến dịch tiếp thị quý này."
      ],
      grammar: "'Has made progress' dùng thì hiện tại hoàn thành vì tiến bộ đến hiện tại. 'Make progress' là collocation cố định (không dùng 'do progress'). 'This quarter' — 'quarter' nghĩa quý (3 tháng).",
      keyVocab: [
        { word: "significant", meaning: "đáng kể, quan trọng", note: "Tính từ, danh từ: significance" },
        { word: "progress", meaning: "tiến bộ, tiến triển", note: "Danh từ không đếm được, collocation: make progress" },
        { word: "campaign", meaning: "chiến dịch", note: "Danh từ, marketing/advertising/election campaign" }
      ],
      contexts: [
        "📊 Báo cáo tiến độ trong cuộc họp quý",
        "📧 Email cập nhật tiến độ cho ban giám đốc"
      ]
    },
    {
      en: "Let us brainstorm some ideas before we finalize the proposal.",
      vi: "Hãy cùng động não một số ý tưởng trước khi chúng ta hoàn thiện đề xuất.",
      topic: "work",
      level: "intermediate",
      altTranslations: [
        "Hãy cùng nghĩ ý tưởng trước khi hoàn tất đề xuất.",
        "Chúng ta nên brainstorm trước khi chốt bản đề xuất.",
        "Hãy cùng trao đổi ý tưởng trước khi finalize đề xuất nhé."
      ],
      grammar: "'Let us + V nguyên mẫu' dùng đề nghị làm gì cùng nhau. 'Brainstorm' là động từ nghĩa 'động não, nghĩ ý tưởng'. 'Before we finalize' — mệnh đề trạng ngữ chỉ thời gian.",
      keyVocab: [
        { word: "brainstorm", meaning: "động não, nghĩ ý tưởng", note: "Động từ và danh từ, rất phổ biến trong môi trường làm việc" },
        { word: "finalize", meaning: "hoàn thiện, chốt", note: "Động từ, nghĩa hoàn tất bước cuối cùng" },
        { word: "proposal", meaning: "đề xuất, đề án", note: "Danh từ, submit/approve/reject a proposal" }
      ],
      contexts: [
        "💡 Bắt đầu cuộc họp sáng tạo",
        "📝 Giai đoạn đầu lên ý tưởng cho dự án mới"
      ]
    },
    {
      en: "I will be working from home tomorrow, but I will be available online.",
      vi: "Ngày mai tôi sẽ làm việc từ nhà, nhưng tôi sẽ sẵn sàng trực tuyến.",
      topic: "work",
      level: "intermediate",
      altTranslations: [
        "Mai tôi làm việc tại nhà, nhưng vẫn có mặt online.",
        "Ngày mai tôi work from home, nhưng vẫn online được.",
        "Tôi sẽ làm việc ở nhà ngày mai, nhưng có thể liên lạc qua mạng."
      ],
      grammar: "'Will be working' dùng thì tương lai tiếp diễn — diễn tả hành động sẽ đang diễn ra vào thời điểm tương lai. 'Work from home' (WFH) là cụm phổ biến. 'Available' nghĩa 'sẵn sàng, có thể liên lạc'.",
      keyVocab: [
        { word: "work from home", meaning: "làm việc từ nhà", note: "Cụm phổ biến, viết tắt: WFH" },
        { word: "available", meaning: "sẵn sàng, có thể liên lạc", note: "Tính từ, dùng nhiều trong lịch làm việc" }
      ],
      contexts: [
        "💬 Nhắn nhóm chat công ty",
        "📧 Thông báo cho sếp về lịch làm việc ngày mai"
      ]
    },
    // --- Advanced (5) ---
    {
      en: "We need to streamline our workflow to improve efficiency and reduce unnecessary overhead costs.",
      vi: "Chúng ta cần tinh gọn quy trình làm việc để cải thiện hiệu suất và giảm chi phí chung không cần thiết.",
      topic: "work",
      level: "advanced",
      altTranslations: [
        "Chúng ta cần tối ưu hóa quy trình để nâng cao hiệu quả và cắt giảm chi phí phát sinh không cần thiết.",
        "Cần tinh giản quy trình làm việc nhằm tăng hiệu suất và giảm chi phí không cần thiết.",
        "Phải tinh gọn workflow để cải thiện năng suất và loại bỏ chi phí overhead thừa."
      ],
      grammar: "'Streamline' là động từ nghĩa 'tinh gọn, tối ưu hóa'. 'To improve... and reduce...' — hai động từ nguyên mẫu nối bằng 'and' cùng chỉ mục đích. 'Overhead costs' là thuật ngữ kinh doanh chỉ chi phí chung/gián tiếp.",
      keyVocab: [
        { word: "streamline", meaning: "tinh gọn, tối ưu hóa", note: "Động từ, gốc từ 'stream' (dòng chảy) + 'line' (đường)" },
        { word: "efficiency", meaning: "hiệu suất", note: "Danh từ, tính từ: efficient" },
        { word: "overhead costs", meaning: "chi phí chung, chi phí gián tiếp", note: "Thuật ngữ kế toán: tiền thuê, điện, quản lý..." }
      ],
      contexts: [
        "📊 Họp ban giám đốc về cải tiến quy trình",
        "📋 Đề xuất cải cách hoạt động công ty"
      ]
    },
    {
      en: "I would like to bring to your attention that the current budget allocation may not be sustainable in the long run.",
      vi: "Tôi muốn lưu ý rằng phân bổ ngân sách hiện tại có thể không bền vững trong dài hạn.",
      topic: "work",
      level: "advanced",
      altTranslations: [
        "Tôi muốn nhấn mạnh rằng cách phân bổ ngân sách hiện nay có thể không duy trì được lâu dài.",
        "Xin lưu ý rằng ngân sách phân bổ hiện tại có thể không bền vững về lâu về dài.",
        "Tôi muốn đề cập rằng phân bổ ngân sách hiện hành có thể không khả thi dài hạn."
      ],
      grammar: "'Bring to your attention' là cụm cố định nghĩa 'đưa ra sự chú ý của ai'. 'May not be sustainable' — 'may' chỉ khả năng, 'sustainable' (bền vững). 'In the long run' là thành ngữ nghĩa 'về lâu dài'.",
      keyVocab: [
        { word: "bring to attention", meaning: "lưu ý, đề cập", note: "Cụm cố định trang trọng, dùng trong họp và email" },
        { word: "sustainable", meaning: "bền vững", note: "Tính từ, rất phổ biến trong kinh doanh và IELTS" },
        { word: "in the long run", meaning: "về lâu dài", note: "Thành ngữ, ngược lại: in the short run (ngắn hạn)" }
      ],
      contexts: [
        "📊 Báo cáo tài chính cho ban giám đốc",
        "💰 Cảnh báo về tình hình ngân sách"
      ]
    },
    {
      en: "The board of directors has unanimously approved the strategic restructuring plan.",
      vi: "Hội đồng quản trị đã nhất trí phê duyệt kế hoạch tái cơ cấu chiến lược.",
      topic: "work",
      level: "advanced",
      altTranslations: [
        "Ban giám đốc đã đồng ý nhất trí thông qua kế hoạch tái cấu trúc chiến lược.",
        "Hội đồng quản trị đã phê duyệt đồng thuận kế hoạch cơ cấu lại chiến lược.",
        "HĐQT đã thống nhất phê duyệt kế hoạch tái cơ cấu mang tính chiến lược."
      ],
      grammar: "'Board of directors' là cụm danh từ chỉ hội đồng quản trị. 'Unanimously' là trạng từ nghĩa 'nhất trí' — bổ nghĩa cho 'approved'. 'Strategic restructuring plan' — chuỗi tính từ + danh từ.",
      keyVocab: [
        { word: "unanimously", meaning: "nhất trí, đồng lòng", note: "Trạng từ, tính từ: unanimous" },
        { word: "restructuring", meaning: "tái cơ cấu", note: "Danh từ, gốc: restructure (re + structure)" },
        { word: "board of directors", meaning: "hội đồng quản trị", note: "Cụm danh từ, viết tắt: BOD, HĐQT" }
      ],
      contexts: [
        "📢 Thông báo nội bộ công ty",
        "📰 Thông cáo báo chí của tập đoàn"
      ]
    },
    {
      en: "Cross-functional collaboration between departments is essential to driving innovation.",
      vi: "Sự hợp tác liên phòng ban là thiết yếu để thúc đẩy đổi mới sáng tạo.",
      topic: "work",
      level: "advanced",
      altTranslations: [
        "Phối hợp liên bộ phận giữa các phòng ban là cần thiết để thúc đẩy sáng tạo.",
        "Sự cộng tác đa chức năng giữa các bộ phận là điều kiện tiên quyết cho đổi mới.",
        "Hợp tác liên phòng ban đóng vai trò thiết yếu trong việc thúc đẩy sáng tạo."
      ],
      grammar: "'Cross-functional' là tính từ ghép (có gạch nối) nghĩa 'liên chức năng'. 'Is essential to + V-ing' — 'to' ở đây là giới từ, theo sau bởi V-ing (không phải to + V nguyên mẫu). 'Driving innovation' — 'drive' nghĩa 'thúc đẩy'.",
      keyVocab: [
        { word: "cross-functional", meaning: "liên chức năng, liên phòng ban", note: "Tính từ ghép, rất phổ biến trong quản trị hiện đại" },
        { word: "essential", meaning: "thiết yếu, cần thiết", note: "Tính từ, cấu trúc: essential to/for + N/V-ing" },
        { word: "innovation", meaning: "đổi mới sáng tạo", note: "Danh từ, động từ: innovate, tính từ: innovative" }
      ],
      contexts: [
        "🏢 Diễn đàn về văn hóa doanh nghiệp",
        "📊 Bài thuyết trình về chiến lược công ty"
      ]
    },
    {
      en: "Given the current market volatility, I recommend that we adopt a more conservative investment strategy.",
      vi: "Xét tình hình thị trường biến động hiện tại, tôi khuyên chúng ta nên áp dụng chiến lược đầu tư thận trọng hơn.",
      topic: "work",
      level: "advanced",
      altTranslations: [
        "Với biến động thị trường hiện nay, tôi đề xuất chúng ta áp dụng chiến lược đầu tư bảo thủ hơn.",
        "Trước tình hình thị trường bất ổn, tôi khuyến nghị áp dụng phương pháp đầu tư thận trọng hơn.",
        "Do thị trường đang biến động, tôi gợi ý chúng ta chọn chiến lược đầu tư an toàn hơn."
      ],
      grammar: "'Given' ở đây là giới từ nghĩa 'xét rằng'. 'I recommend that we adopt' — cấu trúc subjunctive: sau 'recommend that', động từ dùng nguyên mẫu (adopt, không phải adopts). 'More conservative' là so sánh hơn của tính từ dài.",
      keyVocab: [
        { word: "volatility", meaning: "sự biến động", note: "Danh từ, thường dùng trong tài chính: market volatility" },
        { word: "conservative", meaning: "thận trọng, bảo thủ", note: "Tính từ, trong đầu tư: ít rủi ro" },
        { word: "adopt", meaning: "áp dụng, chấp nhận", note: "Động từ, cũng nghĩa 'nhận nuôi'" }
      ],
      contexts: [
        "💹 Họp ban đầu tư thảo luận chiến lược",
        "📈 Tư vấn tài chính cho khách hàng"
      ]
    },

    // ===== TOEIC — Kinh Doanh TOEIC (16 sentences) =====
    // --- Beginner (5) ---
    {
      en: "The invoice must be paid within thirty days.",
      vi: "Hóa đơn phải được thanh toán trong vòng ba mươi ngày.",
      topic: "toeic",
      level: "beginner",
      altTranslations: [
        "Hóa đơn cần thanh toán trong 30 ngày.",
        "Phải thanh toán hóa đơn trong vòng 30 ngày.",
        "Hóa đơn phải trả trong thời hạn 30 ngày."
      ],
      grammar: "'Must be paid' là câu bị động với động từ khuyết thiếu 'must'. 'Within thirty days' — 'within' nghĩa 'trong vòng' + khoảng thời gian.",
      keyVocab: [
        { word: "invoice", meaning: "hóa đơn", note: "Danh từ, thường dùng trong giao dịch B2B" },
        { word: "within", meaning: "trong vòng", note: "Giới từ chỉ khoảng thời gian hoặc phạm vi" }
      ],
      contexts: [
        "📄 Điều khoản thanh toán trên hóa đơn",
        "📧 Nhắc nhở khách hàng thanh toán"
      ]
    },
    {
      en: "The shipment will arrive by the end of the week.",
      vi: "Lô hàng sẽ đến vào cuối tuần.",
      topic: "toeic",
      level: "beginner",
      altTranslations: [
        "Hàng sẽ được giao trước cuối tuần.",
        "Lô hàng sẽ tới trước cuối tuần này.",
        "Đơn hàng sẽ đến vào cuối tuần."
      ],
      grammar: "'Will arrive' diễn đạt dự kiến tương lai. 'By the end of the week' — 'by' nghĩa 'trước/vào lúc', 'the end of' + khoảng thời gian.",
      keyVocab: [
        { word: "shipment", meaning: "lô hàng, chuyến hàng", note: "Danh từ, gốc: ship (vận chuyển)" },
        { word: "by the end of", meaning: "vào cuối, trước cuối", note: "Cụm giới từ chỉ thời hạn" }
      ],
      contexts: [
        "📦 Thông báo cho khách hàng về đơn hàng",
        "🚚 Email cập nhật trạng thái giao hàng"
      ]
    },
    {
      en: "All employees are required to attend the training session.",
      vi: "Tất cả nhân viên được yêu cầu tham dự buổi đào tạo.",
      topic: "toeic",
      level: "beginner",
      altTranslations: [
        "Mọi nhân viên bắt buộc phải dự buổi tập huấn.",
        "Tất cả nhân viên phải tham gia buổi đào tạo.",
        "Toàn bộ nhân viên phải tham dự phiên đào tạo."
      ],
      grammar: "'Are required to + V' là bị động của 'require', nghĩa 'được yêu cầu phải'. 'Attend' + tân ngữ trực tiếp (không cần giới từ).",
      keyVocab: [
        { word: "required", meaning: "bắt buộc, yêu cầu", note: "Quá khứ phân từ dùng làm tính từ, gốc: require" },
        { word: "training session", meaning: "buổi đào tạo", note: "Cụm danh từ, session = buổi/phiên" }
      ],
      contexts: [
        "📢 Thông báo nội bộ công ty",
        "📋 Lịch đào tạo nhân sự"
      ]
    },
    {
      en: "Please confirm your order by replying to this email.",
      vi: "Vui lòng xác nhận đơn hàng bằng cách trả lời email này.",
      topic: "toeic",
      level: "beginner",
      altTranslations: [
        "Xin hãy xác nhận đơn hàng bằng cách reply email này.",
        "Nhờ bạn xác nhận order bằng cách phản hồi email này.",
        "Hãy xác nhận đơn đặt hàng qua trả lời email này."
      ],
      grammar: "'By + V-ing' chỉ cách thức/phương tiện. 'Confirm your order' — 'confirm' + tân ngữ trực tiếp. 'Replying to' — 'reply' luôn đi với giới từ 'to'.",
      keyVocab: [
        { word: "confirm", meaning: "xác nhận", note: "Động từ, danh từ: confirmation" },
        { word: "reply to", meaning: "trả lời, phản hồi", note: "Phrasal verb, luôn dùng giới từ 'to'" }
      ],
      contexts: [
        "📧 Email xác nhận đơn hàng tự động",
        "🛒 Quy trình mua hàng trực tuyến"
      ]
    },
    {
      en: "The product comes with a two-year warranty.",
      vi: "Sản phẩm đi kèm bảo hành hai năm.",
      topic: "toeic",
      level: "beginner",
      altTranslations: [
        "Sản phẩm có bảo hành 2 năm.",
        "Sản phẩm được bảo hành trong hai năm.",
        "Sản phẩm này kèm theo bảo hành 2 năm."
      ],
      grammar: "'Comes with' là cụm động từ nghĩa 'đi kèm với'. 'A two-year warranty' — số + gạch nối + danh từ = tính từ ghép (year không có 's' khi dùng làm tính từ).",
      keyVocab: [
        { word: "warranty", meaning: "bảo hành", note: "Danh từ, warranty period = thời gian bảo hành" },
        { word: "come with", meaning: "đi kèm với", note: "Phrasal verb, dùng khi mô tả sản phẩm/dịch vụ" }
      ],
      contexts: [
        "🛍️ Nhân viên giới thiệu sản phẩm cho khách",
        "📦 Thông tin trên bao bì sản phẩm"
      ]
    },
    // --- Intermediate (6) ---
    {
      en: "The quarterly sales figures have exceeded our initial projections by fifteen percent.",
      vi: "Doanh số bán hàng hàng quý đã vượt dự kiến ban đầu mười lăm phần trăm.",
      topic: "toeic",
      level: "intermediate",
      altTranslations: [
        "Số liệu doanh thu quý đã vượt 15% so với dự báo ban đầu.",
        "Doanh số quý đã cao hơn 15% so với mục tiêu ban đầu.",
        "Kết quả bán hàng quý vượt kỳ vọng ban đầu 15%."
      ],
      grammar: "'Have exceeded' dùng thì hiện tại hoàn thành — nhấn mạnh kết quả đến hiện tại. 'Exceed by + số' — 'by' chỉ mức chênh lệch. 'Initial projections' — 'initial' (ban đầu) + 'projections' (dự báo).",
      keyVocab: [
        { word: "exceed", meaning: "vượt quá", note: "Động từ, danh từ: excess" },
        { word: "projection", meaning: "dự báo, dự kiến", note: "Danh từ, cũng dùng: forecast, estimate" },
        { word: "quarterly", meaning: "hàng quý", note: "Tính từ/trạng từ, quarter = quý (3 tháng)" }
      ],
      contexts: [
        "📊 Báo cáo doanh số trong cuộc họp quý",
        "📈 Email gửi cổ đông về kết quả kinh doanh"
      ]
    },
    {
      en: "The contract stipulates that either party may terminate the agreement with ninety days written notice.",
      vi: "Hợp đồng quy định rằng bất kỳ bên nào cũng có thể chấm dứt thỏa thuận với thông báo bằng văn bản chín mươi ngày.",
      topic: "toeic",
      level: "intermediate",
      altTranslations: [
        "Hợp đồng quy định hai bên đều có thể chấm dứt thỏa thuận với thông báo 90 ngày bằng văn bản.",
        "Theo hợp đồng, mỗi bên có quyền hủy thỏa thuận nếu thông báo trước 90 ngày bằng văn bản.",
        "Hợp đồng ghi rõ mỗi bên có thể chấm dứt hợp đồng khi báo trước 90 ngày bằng văn bản."
      ],
      grammar: "'Stipulates that' — 'stipulate' là động từ pháp lý nghĩa 'quy định'. 'Either party' — 'either' dùng cho hai bên, nghĩa 'bất kỳ bên nào'. 'Written notice' — 'written' (quá khứ phân từ) dùng như tính từ.",
      keyVocab: [
        { word: "stipulate", meaning: "quy định (trong hợp đồng)", note: "Động từ pháp lý, trang trọng hơn 'state' hay 'say'" },
        { word: "terminate", meaning: "chấm dứt", note: "Động từ trang trọng, danh từ: termination" },
        { word: "written notice", meaning: "thông báo bằng văn bản", note: "Cụm pháp lý cố định" }
      ],
      contexts: [
        "📑 Đọc điều khoản hợp đồng",
        "⚖️ Tư vấn pháp lý về hợp đồng"
      ]
    },
    {
      en: "We need to diversify our supply chain to mitigate potential risks.",
      vi: "Chúng ta cần đa dạng hóa chuỗi cung ứng để giảm thiểu rủi ro tiềm ẩn.",
      topic: "toeic",
      level: "intermediate",
      altTranslations: [
        "Chúng ta phải đa dạng hóa nguồn cung để giảm rủi ro có thể xảy ra.",
        "Cần đa dạng chuỗi cung ứng nhằm hạn chế các rủi ro tiềm năng.",
        "Chúng ta nên mở rộng nguồn cung cấp để giảm thiểu rủi ro."
      ],
      grammar: "'Diversify' nghĩa 'đa dạng hóa'. 'Supply chain' là chuỗi cung ứng. 'To mitigate' — 'to + V' chỉ mục đích. 'Potential risks' — 'potential' (tiềm ẩn) là tính từ bổ nghĩa cho 'risks'.",
      keyVocab: [
        { word: "diversify", meaning: "đa dạng hóa", note: "Động từ, danh từ: diversification" },
        { word: "supply chain", meaning: "chuỗi cung ứng", note: "Thuật ngữ kinh doanh quan trọng" },
        { word: "mitigate", meaning: "giảm thiểu", note: "Động từ trang trọng hơn 'reduce'" }
      ],
      contexts: [
        "📋 Họp chiến lược kinh doanh",
        "📊 Phân tích rủi ro doanh nghiệp"
      ]
    },
    {
      en: "The marketing department has allocated a significant portion of the budget to digital advertising.",
      vi: "Phòng marketing đã phân bổ một phần đáng kể ngân sách cho quảng cáo kỹ thuật số.",
      topic: "toeic",
      level: "intermediate",
      altTranslations: [
        "Bộ phận tiếp thị đã dành phần lớn ngân sách cho quảng cáo trực tuyến.",
        "Phòng marketing đã cấp phần ngân sách đáng kể cho quảng cáo digital.",
        "Bộ phận marketing phân bổ ngân sách lớn vào quảng cáo kỹ thuật số."
      ],
      grammar: "'Has allocated' dùng hiện tại hoàn thành. 'Allocate + N + to + N' — phân bổ cái gì cho cái gì. 'A significant portion of' — cụm chỉ số lượng 'một phần đáng kể của'.",
      keyVocab: [
        { word: "allocate", meaning: "phân bổ", note: "Động từ, danh từ: allocation" },
        { word: "portion", meaning: "phần", note: "Danh từ, tương tự: share, part" },
        { word: "digital advertising", meaning: "quảng cáo kỹ thuật số", note: "Cụm danh từ, bao gồm: social media ads, Google ads..." }
      ],
      contexts: [
        "💰 Báo cáo ngân sách marketing",
        "📊 Họp lên kế hoạch chi tiêu quảng cáo"
      ]
    },
    {
      en: "Customer feedback indicates that our after-sales service needs substantial improvement.",
      vi: "Phản hồi khách hàng cho thấy dịch vụ hậu mãi của chúng ta cần cải thiện đáng kể.",
      topic: "toeic",
      level: "intermediate",
      altTranslations: [
        "Ý kiến khách hàng cho thấy dịch vụ sau bán hàng cần cải tiến nhiều.",
        "Phản hồi từ khách hàng chỉ ra rằng dịch vụ hậu mãi cần được nâng cấp đáng kể.",
        "Khách hàng phản hồi rằng chất lượng dịch vụ sau bán cần được cải thiện lớn."
      ],
      grammar: "'Indicates that' — 'indicate' nghĩa 'cho thấy, chỉ ra'. 'After-sales service' là cụm danh từ ghép (có gạch nối) nghĩa 'dịch vụ hậu mãi'. 'Substantial improvement' — 'substantial' mạnh hơn 'significant'.",
      keyVocab: [
        { word: "indicate", meaning: "cho thấy, chỉ ra", note: "Động từ, danh từ: indication" },
        { word: "after-sales service", meaning: "dịch vụ hậu mãi", note: "Cụm danh từ ghép, bao gồm: bảo hành, hỗ trợ kỹ thuật..." },
        { word: "substantial", meaning: "đáng kể, lớn", note: "Tính từ, mạnh hơn 'significant'" }
      ],
      contexts: [
        "📊 Phân tích khảo sát khách hàng",
        "🏢 Họp cải thiện chất lượng dịch vụ"
      ]
    },
    {
      en: "Due to unforeseen circumstances, the annual shareholders meeting has been postponed indefinitely.",
      vi: "Do tình huống không lường trước, cuộc họp cổ đông hàng năm đã bị hoãn vô thời hạn.",
      topic: "toeic",
      level: "intermediate",
      altTranslations: [
        "Vì tình huống bất ngờ, đại hội cổ đông thường niên đã bị hoãn vô thời hạn.",
        "Do hoàn cảnh ngoài dự kiến, họp cổ đông hàng năm bị dời lại không xác định thời gian.",
        "Bởi tình huống không thể lường trước, cuộc họp cổ đông niên đã bị hoãn lại."
      ],
      grammar: "'Due to + N' chỉ nguyên nhân. 'Unforeseen' — tiền tố 'un-' + 'foreseen' (lường trước) = không lường trước. 'Has been postponed' là hiện tại hoàn thành bị động. 'Indefinitely' nghĩa 'vô thời hạn'.",
      keyVocab: [
        { word: "unforeseen", meaning: "không lường trước", note: "Tính từ, gốc: foresee (dự đoán trước)" },
        { word: "postpone", meaning: "hoãn lại", note: "Động từ, trang trọng hơn 'delay'" },
        { word: "indefinitely", meaning: "vô thời hạn", note: "Trạng từ, gốc: indefinite (không xác định)" }
      ],
      contexts: [
        "📢 Thông báo chính thức của công ty",
        "📧 Email gửi cổ đông về sự thay đổi lịch"
      ]
    },
    // --- Advanced (5) ---
    {
      en: "The audit revealed several material discrepancies in the financial statements that require immediate rectification.",
      vi: "Cuộc kiểm toán phát hiện nhiều sai lệch trọng yếu trong báo cáo tài chính cần được sửa chữa ngay lập tức.",
      topic: "toeic",
      level: "advanced",
      altTranslations: [
        "Kiểm toán cho thấy một số khác biệt đáng kể trong báo cáo tài chính cần khắc phục ngay.",
        "Cuộc kiểm toán phát hiện nhiều sai sót quan trọng trong báo cáo tài chính cần chỉnh sửa tức thì.",
        "Kết quả kiểm toán cho thấy có nhiều sai lệch lớn trong sổ sách tài chính cần sửa ngay."
      ],
      grammar: "'Material discrepancies' — 'material' ở đây là tính từ nghĩa 'trọng yếu, quan trọng' (không phải 'vật liệu'). 'That require' là mệnh đề quan hệ. 'Rectification' là danh từ trang trọng nghĩa 'sửa chữa'.",
      keyVocab: [
        { word: "audit", meaning: "kiểm toán", note: "Danh từ và động từ, auditor = kiểm toán viên" },
        { word: "material", meaning: "trọng yếu (kế toán)", note: "Tính từ chuyên ngành, khác nghĩa 'vật liệu'" },
        { word: "rectification", meaning: "sự sửa chữa, khắc phục", note: "Danh từ trang trọng, động từ: rectify" }
      ],
      contexts: [
        "📊 Báo cáo kiểm toán nội bộ",
        "⚖️ Thông báo cho ban giám đốc về vấn đề tài chính"
      ]
    },
    {
      en: "In light of the merger, all existing contracts will be subject to renegotiation under the new corporate entity.",
      vi: "Trong bối cảnh sáp nhập, tất cả hợp đồng hiện có sẽ phải đàm phán lại dưới pháp nhân doanh nghiệp mới.",
      topic: "toeic",
      level: "advanced",
      altTranslations: [
        "Xét đến việc sáp nhập, mọi hợp đồng hiện tại sẽ được đàm phán lại theo pháp nhân mới.",
        "Do sáp nhập, tất cả hợp đồng cũ sẽ phải thương lượng lại với thực thể công ty mới.",
        "Trong bối cảnh sáp nhập, các hợp đồng hiện hành sẽ cần được đàm phán lại."
      ],
      grammar: "'In light of' là cụm giới từ nghĩa 'xét đến, trong bối cảnh'. 'Be subject to' nghĩa 'chịu sự, phải'. 'Renegotiation' — tiền tố 're-' + negotiation = đàm phán lại. 'Corporate entity' = pháp nhân doanh nghiệp.",
      keyVocab: [
        { word: "in light of", meaning: "trong bối cảnh, xét đến", note: "Cụm giới từ trang trọng" },
        { word: "merger", meaning: "sáp nhập", note: "Danh từ, M&A = Mergers and Acquisitions" },
        { word: "corporate entity", meaning: "pháp nhân doanh nghiệp", note: "Thuật ngữ pháp lý kinh doanh" }
      ],
      contexts: [
        "📑 Thông báo pháp lý sau sáp nhập công ty",
        "⚖️ Luật sư tư vấn về hậu quả pháp lý của sáp nhập"
      ]
    },
    {
      en: "The board has resolved to issue additional shares to raise capital for the overseas expansion.",
      vi: "Hội đồng quản trị đã quyết định phát hành thêm cổ phiếu để huy động vốn cho việc mở rộng ra nước ngoài.",
      topic: "toeic",
      level: "advanced",
      altTranslations: [
        "HĐQT đã quyết nghị phát hành thêm cổ phần để gọi vốn cho mở rộng quốc tế.",
        "Hội đồng quản trị đã thông qua việc phát hành cổ phiếu bổ sung để huy động vốn mở rộng nước ngoài.",
        "Ban quản trị đã quyết định phát hành thêm cổ phiếu nhằm huy động vốn mở rộng ra thị trường quốc tế."
      ],
      grammar: "'Has resolved to + V' là cấu trúc trang trọng nghĩa 'đã quyết định'. 'Issue shares' — 'issue' nghĩa 'phát hành' (cổ phiếu). 'To raise capital' — mục đích: 'raise' (huy động) + 'capital' (vốn).",
      keyVocab: [
        { word: "resolve", meaning: "quyết nghị, quyết định", note: "Động từ trang trọng trong nghị quyết HĐQT" },
        { word: "issue shares", meaning: "phát hành cổ phiếu", note: "Cụm tài chính, issue = phát hành" },
        { word: "raise capital", meaning: "huy động vốn", note: "Cụm tài chính cố định" }
      ],
      contexts: [
        "📊 Biên bản họp hội đồng quản trị",
        "📰 Thông cáo cho nhà đầu tư"
      ]
    },
    {
      en: "The due diligence process uncovered several regulatory compliance issues that must be addressed before the acquisition can proceed.",
      vi: "Quá trình thẩm định phát hiện một số vấn đề tuân thủ quy định cần được giải quyết trước khi thương vụ mua lại có thể tiến hành.",
      topic: "toeic",
      level: "advanced",
      altTranslations: [
        "Thẩm định cho thấy nhiều vấn đề về tuân thủ pháp luật cần xử lý trước khi tiến hành mua lại.",
        "Quá trình due diligence phát hiện các vấn đề tuân thủ pháp quy cần khắc phục trước khi thương vụ mua bán diễn ra.",
        "Trong quá trình thẩm định, đã phát hiện nhiều vấn đề tuân thủ cần giải quyết trước khi hoàn tất thương vụ."
      ],
      grammar: "'Due diligence' là thuật ngữ pháp lý/tài chính nghĩa 'thẩm định'. 'Uncovered' — quá khứ đơn của 'uncover' (phát hiện). 'Regulatory compliance' = tuân thủ quy định. 'Before the acquisition can proceed' — mệnh đề trạng ngữ thời gian.",
      keyVocab: [
        { word: "due diligence", meaning: "thẩm định", note: "Thuật ngữ M&A, quá trình kiểm tra trước khi mua/đầu tư" },
        { word: "regulatory compliance", meaning: "tuân thủ quy định pháp luật", note: "Cụm danh từ rất phổ biến trong kinh doanh quốc tế" },
        { word: "acquisition", meaning: "thương vụ mua lại", note: "Danh từ, M&A = Mergers & Acquisitions" }
      ],
      contexts: [
        "⚖️ Báo cáo thẩm định cho nhà đầu tư",
        "📋 Họp pháp lý về thương vụ mua lại"
      ]
    },
    {
      en: "Stakeholders have expressed concerns about the declining profit margins despite a substantial increase in revenue.",
      vi: "Các bên liên quan đã bày tỏ lo ngại về biên lợi nhuận giảm mặc dù doanh thu tăng đáng kể.",
      topic: "toeic",
      level: "advanced",
      altTranslations: [
        "Các bên hữu quan lo ngại về lợi nhuận biên giảm dù doanh thu tăng mạnh.",
        "Các cổ đông bày tỏ quan ngại về biên lợi nhuận sụt giảm bất chấp doanh thu tăng đáng kể.",
        "Các stakeholder đã nêu lo ngại về tỷ suất lợi nhuận giảm trong khi doanh thu tăng mạnh."
      ],
      grammar: "'Have expressed concerns about' — hiện tại hoàn thành + cụm 'express concerns about + N'. 'Despite + N' chỉ sự nhượng bộ (mặc dù). 'Declining' — hiện tại phân từ dùng làm tính từ.",
      keyVocab: [
        { word: "stakeholder", meaning: "bên liên quan", note: "Danh từ, bao gồm: cổ đông, nhân viên, khách hàng, đối tác" },
        { word: "profit margin", meaning: "biên lợi nhuận", note: "Thuật ngữ tài chính, = (doanh thu - chi phí) / doanh thu" },
        { word: "despite", meaning: "mặc dù, bất chấp", note: "Giới từ, theo sau bởi N/V-ing (KHÔNG theo sau bởi mệnh đề)" }
      ],
      contexts: [
        "📊 Đại hội cổ đông thường niên",
        "📈 Phân tích tài chính doanh nghiệp"
      ]
    },

    // ===== IELTS — Học Thuật IELTS (16 sentences) =====
    // --- Beginner (5) ---
    {
      en: "Many people believe that education is the key to success.",
      vi: "Nhiều người tin rằng giáo dục là chìa khóa dẫn đến thành công.",
      topic: "ielts",
      level: "beginner",
      altTranslations: [
        "Nhiều người cho rằng giáo dục là chìa khóa thành công.",
        "Đa số mọi người nghĩ rằng giáo dục là yếu tố quan trọng nhất cho thành công.",
        "Nhiều người tin giáo dục chính là chìa khóa để thành công."
      ],
      grammar: "'Many people believe that' là cách mở đầu phổ biến trong bài luận IELTS. 'The key to + N' — 'to' là giới từ (không phải to + V nguyên mẫu). 'Education' là danh từ không đếm được.",
      keyVocab: [
        { word: "education", meaning: "giáo dục", note: "Danh từ không đếm được, tính từ: educational" },
        { word: "the key to", meaning: "chìa khóa để, yếu tố quan trọng", note: "Cụm cố định, 'to' là giới từ, theo sau bởi N" }
      ],
      contexts: [
        "📝 Viết bài luận IELTS Task 2",
        "🗣️ Nói về chủ đề giáo dục trong IELTS Speaking"
      ]
    },
    {
      en: "The chart shows that the population has increased steadily over the past decade.",
      vi: "Biểu đồ cho thấy dân số đã tăng đều đặn trong thập kỷ qua.",
      topic: "ielts",
      level: "beginner",
      altTranslations: [
        "Biểu đồ cho thấy dân số tăng ổn định trong 10 năm qua.",
        "Biểu đồ thể hiện dân số đã tăng đều trong suốt thập kỷ qua.",
        "Theo biểu đồ, dân số tăng liên tục trong mười năm qua."
      ],
      grammar: "'The chart shows that' là cách mở đầu mô tả biểu đồ (IELTS Task 1). 'Has increased steadily' — hiện tại hoàn thành + trạng từ. 'Over the past decade' — 'over' chỉ khoảng thời gian.",
      keyVocab: [
        { word: "chart", meaning: "biểu đồ", note: "Danh từ, các loại: bar chart, pie chart, line chart" },
        { word: "steadily", meaning: "đều đặn, ổn định", note: "Trạng từ, tính từ: steady" },
        { word: "decade", meaning: "thập kỷ (10 năm)", note: "Danh từ đếm được" }
      ],
      contexts: [
        "📊 Viết bài IELTS Writing Task 1",
        "📈 Mô tả xu hướng trong báo cáo"
      ]
    },
    {
      en: "There are both advantages and disadvantages to living in a big city.",
      vi: "Có cả ưu điểm và nhược điểm khi sống ở thành phố lớn.",
      topic: "ielts",
      level: "beginner",
      altTranslations: [
        "Sống ở thành phố lớn có cả mặt thuận lợi và bất lợi.",
        "Cuộc sống thành phố lớn có cả ưu và nhược điểm.",
        "Có cả lợi ích và hạn chế khi sống tại thành phố lớn."
      ],
      grammar: "'There are both... and...' — cấu trúc 'both...and' nối hai danh từ song song. 'To living' — 'to' là giới từ, theo sau bởi V-ing (gerund).",
      keyVocab: [
        { word: "advantage", meaning: "ưu điểm, lợi thế", note: "Danh từ đếm được, ngược lại: disadvantage" },
        { word: "disadvantage", meaning: "nhược điểm, bất lợi", note: "Danh từ đếm được" }
      ],
      contexts: [
        "📝 Bài luận IELTS dạng advantages/disadvantages",
        "🗣️ IELTS Speaking Part 3 về cuộc sống đô thị"
      ]
    },
    {
      en: "In recent years, technology has changed the way people communicate.",
      vi: "Trong những năm gần đây, công nghệ đã thay đổi cách mọi người giao tiếp.",
      topic: "ielts",
      level: "beginner",
      altTranslations: [
        "Những năm gần đây, công nghệ làm thay đổi cách con người giao tiếp.",
        "Gần đây, công nghệ đã biến đổi phương thức giao tiếp của mọi người.",
        "Trong thời gian gần đây, công nghệ đã thay đổi cách mà con người giao tiếp với nhau."
      ],
      grammar: "'In recent years' là cụm trạng ngữ thời gian thường dùng với thì hiện tại hoàn thành. 'Has changed' — hiện tại hoàn thành nhấn mạnh sự thay đổi đến hiện tại. 'The way people communicate' — 'the way' + mệnh đề = cách mà...",
      keyVocab: [
        { word: "in recent years", meaning: "trong những năm gần đây", note: "Cụm trạng ngữ, thường dùng với hiện tại hoàn thành" },
        { word: "technology", meaning: "công nghệ", note: "Danh từ, thường không đếm được khi chỉ công nghệ nói chung" }
      ],
      contexts: [
        "📝 Mở bài luận IELTS về công nghệ",
        "🗣️ Thảo luận về tác động của công nghệ"
      ]
    },
    {
      en: "It is commonly argued that governments should invest more in public transportation.",
      vi: "Người ta thường cho rằng chính phủ nên đầu tư nhiều hơn vào giao thông công cộng.",
      topic: "ielts",
      level: "beginner",
      altTranslations: [
        "Nhiều ý kiến cho rằng chính phủ cần đầu tư thêm vào phương tiện giao thông công cộng.",
        "Mọi người thường tranh luận rằng nhà nước nên chi nhiều hơn cho giao thông công cộng.",
        "Quan điểm phổ biến là chính phủ nên tăng đầu tư cho giao thông công."
      ],
      grammar: "'It is commonly argued that' là câu bị động vô nhân xưng — cách viết học thuật, tránh nêu cụ thể ai nói. 'Should invest more in' — 'should' gợi ý, 'invest in' luôn đi với giới từ 'in'.",
      keyVocab: [
        { word: "invest", meaning: "đầu tư", note: "Động từ, cấu trúc: invest in + N" },
        { word: "public transportation", meaning: "giao thông công cộng", note: "US: transportation, UK: transport" }
      ],
      contexts: [
        "📝 Bài luận IELTS về vai trò của chính phủ",
        "🗣️ Thảo luận chính sách công"
      ]
    },
    // --- Intermediate (6) ---
    {
      en: "While some people argue that social media brings people closer together, others contend that it leads to isolation.",
      vi: "Trong khi một số người cho rằng mạng xã hội đưa mọi người lại gần nhau hơn, những người khác khẳng định nó dẫn đến sự cô lập.",
      topic: "ielts",
      level: "intermediate",
      altTranslations: [
        "Một số người cho rằng mạng xã hội kết nối mọi người, nhưng số khác cho rằng nó gây ra sự cô đơn.",
        "Có người nghĩ mạng xã hội giúp mọi người gần nhau hơn, nhưng có người cho rằng nó dẫn đến cô lập.",
        "Dù có người nói mạng xã hội kéo mọi người lại gần, nhiều người lại cho rằng nó gây cô lập."
      ],
      grammar: "'While' mở đầu mệnh đề nhượng bộ. 'Argue that' vs 'contend that' — hai cách nói 'cho rằng' (contend trang trọng hơn). 'Leads to' — cụm cố định nghĩa 'dẫn đến'.",
      keyVocab: [
        { word: "contend", meaning: "khẳng định, cho rằng", note: "Động từ trang trọng, dùng nhiều trong bài luận" },
        { word: "isolation", meaning: "sự cô lập", note: "Danh từ, tính từ: isolated" },
        { word: "lead to", meaning: "dẫn đến", note: "Phrasal verb, lead - led - led" }
      ],
      contexts: [
        "📝 Thân bài IELTS dạng discussion essay",
        "🗣️ IELTS Speaking Part 3 tranh luận hai mặt"
      ]
    },
    {
      en: "The graph illustrates a dramatic decline in biodiversity over the last fifty years.",
      vi: "Biểu đồ minh họa sự suy giảm mạnh mẽ về đa dạng sinh học trong năm mươi năm qua.",
      topic: "ielts",
      level: "intermediate",
      altTranslations: [
        "Đồ thị cho thấy sự giảm sút đáng kể về đa dạng sinh học trong 50 năm qua.",
        "Biểu đồ thể hiện đa dạng sinh học đã giảm mạnh trong suốt 50 năm gần đây.",
        "Theo biểu đồ, đa dạng sinh học suy giảm nghiêm trọng trong nửa thế kỷ qua."
      ],
      grammar: "'Illustrates' dùng thì hiện tại đơn vì biểu đồ là sự thật hiện tại. 'A dramatic decline in' — cấu trúc: decline/increase in + N. 'Over the last fifty years' — 'over' + khoảng thời gian, dùng với hiện tại hoàn thành hoặc quá khứ đơn.",
      keyVocab: [
        { word: "illustrate", meaning: "minh họa", note: "Động từ, dùng nhiều trong mô tả biểu đồ IELTS Task 1" },
        { word: "dramatic", meaning: "đáng kể, ấn tượng", note: "Tính từ, mạnh hơn 'significant'" },
        { word: "biodiversity", meaning: "đa dạng sinh học", note: "Danh từ ghép: bio (sinh) + diversity (đa dạng)" }
      ],
      contexts: [
        "📊 IELTS Writing Task 1 mô tả biểu đồ",
        "📝 Bài luận về môi trường"
      ]
    },
    {
      en: "It can be argued that urbanization has both positive and negative effects on the environment.",
      vi: "Có thể cho rằng đô thị hóa có cả tác động tích cực và tiêu cực lên môi trường.",
      topic: "ielts",
      level: "intermediate",
      altTranslations: [
        "Có thể lập luận rằng quá trình đô thị hóa vừa có mặt tốt vừa có mặt xấu đối với môi trường.",
        "Người ta có thể cho rằng đô thị hóa ảnh hưởng cả tích cực lẫn tiêu cực đến môi trường.",
        "Có thể nói đô thị hóa tạo ra cả lợi ích và tác hại cho môi trường."
      ],
      grammar: "'It can be argued that' — cấu trúc bị động vô nhân xưng, phổ biến trong văn học thuật. 'Both positive and negative effects' — 'both...and' nối hai tính từ song song. 'On the environment' — 'effect/impact on + N'.",
      keyVocab: [
        { word: "urbanization", meaning: "đô thị hóa", note: "Danh từ, quá trình: nông thôn → thành thị" },
        { word: "effect", meaning: "tác động, ảnh hưởng", note: "Danh từ, cấu trúc: effect on + N (khác 'affect' — động từ)" }
      ],
      contexts: [
        "📝 Bài luận IELTS về đô thị hóa",
        "🎓 Thảo luận trong lớp học thuật"
      ]
    },
    {
      en: "Research suggests that children who read regularly tend to perform better academically.",
      vi: "Nghiên cứu cho thấy trẻ em đọc sách thường xuyên có xu hướng học tập tốt hơn.",
      topic: "ielts",
      level: "intermediate",
      altTranslations: [
        "Nghiên cứu chỉ ra rằng trẻ đọc sách đều đặn thường có kết quả học tập tốt hơn.",
        "Các nghiên cứu gợi ý rằng trẻ em hay đọc sách có thành tích học tập cao hơn.",
        "Theo nghiên cứu, trẻ em đọc nhiều sách có kết quả học hành tốt hơn."
      ],
      grammar: "'Research suggests that' — mở đầu bằng dẫn chứng nghiên cứu. 'Children who read regularly' — mệnh đề quan hệ 'who read regularly' bổ nghĩa cho 'children'. 'Tend to + V' nghĩa 'có xu hướng'.",
      keyVocab: [
        { word: "suggest", meaning: "gợi ý, cho thấy", note: "Động từ, trong ngữ cảnh học thuật: suggest = chỉ ra" },
        { word: "tend to", meaning: "có xu hướng", note: "Cụm động từ, theo sau bởi V nguyên mẫu" },
        { word: "academically", meaning: "về mặt học thuật", note: "Trạng từ, gốc: academic" }
      ],
      contexts: [
        "📝 Dẫn chứng trong bài luận IELTS",
        "📚 Thảo luận về giáo dục trẻ em"
      ]
    },
    {
      en: "The increasing prevalence of remote work has significantly altered traditional employment patterns.",
      vi: "Sự phổ biến ngày càng tăng của làm việc từ xa đã thay đổi đáng kể các mô hình việc làm truyền thống.",
      topic: "ielts",
      level: "intermediate",
      altTranslations: [
        "Xu hướng làm việc từ xa ngày càng phổ biến đã biến đổi đáng kể các hình thức làm việc truyền thống.",
        "Việc làm từ xa ngày càng phổ biến đã ảnh hưởng lớn đến mô hình việc làm cũ.",
        "Sự gia tăng phổ biến của làm việc từ xa đã làm thay đổi lớn thị trường lao động truyền thống."
      ],
      grammar: "'The increasing prevalence of' — cụm danh từ phức: 'increasing' (tăng) + 'prevalence' (sự phổ biến) + 'of' (của). 'Has significantly altered' — hiện tại hoàn thành + trạng từ 'significantly' đặt giữa trợ động từ và động từ chính.",
      keyVocab: [
        { word: "prevalence", meaning: "sự phổ biến", note: "Danh từ, tính từ: prevalent" },
        { word: "alter", meaning: "thay đổi, biến đổi", note: "Động từ, trang trọng hơn 'change'" },
        { word: "employment patterns", meaning: "mô hình việc làm", note: "Cụm danh từ học thuật" }
      ],
      contexts: [
        "📝 Bài luận IELTS về thay đổi trong công việc",
        "🎓 Nghiên cứu về xu hướng lao động"
      ]
    },
    {
      en: "Furthermore, the correlation between poverty and limited access to healthcare has been well documented.",
      vi: "Hơn nữa, mối tương quan giữa nghèo đói và hạn chế tiếp cận chăm sóc sức khỏe đã được ghi nhận rõ ràng.",
      topic: "ielts",
      level: "intermediate",
      altTranslations: [
        "Ngoài ra, mối liên hệ giữa đói nghèo và thiếu tiếp cận y tế đã được nghiên cứu kỹ.",
        "Thêm vào đó, sự tương quan giữa nghèo khó và hạn chế về dịch vụ y tế đã được chứng minh.",
        "Hơn thế, mối quan hệ giữa nghèo đói và khó tiếp cận y tế đã được ghi nhận đầy đủ."
      ],
      grammar: "'Furthermore' là trạng từ liên kết (linking adverb) dùng thêm luận điểm. 'The correlation between A and B' — cấu trúc cố định. 'Has been well documented' — hiện tại hoàn thành bị động + trạng từ 'well'.",
      keyVocab: [
        { word: "furthermore", meaning: "hơn nữa", note: "Trạng từ liên kết, trang trọng hơn 'also' hoặc 'besides'" },
        { word: "correlation", meaning: "mối tương quan", note: "Danh từ, cấu trúc: correlation between A and B" },
        { word: "well documented", meaning: "được ghi nhận đầy đủ", note: "Cụm tính từ, nghĩa có nhiều bằng chứng ủng hộ" }
      ],
      contexts: [
        "📝 Phát triển luận điểm trong bài luận IELTS",
        "📊 Nghiên cứu về bất bình đẳng xã hội"
      ]
    },
    // --- Advanced (5) ---
    {
      en: "The empirical evidence overwhelmingly supports the hypothesis that climate change is primarily driven by anthropogenic factors.",
      vi: "Bằng chứng thực nghiệm hỗ trợ áp đảo cho giả thuyết rằng biến đổi khí hậu chủ yếu do các yếu tố nhân tạo.",
      topic: "ielts",
      level: "advanced",
      altTranslations: [
        "Các bằng chứng thực nghiệm ủng hộ mạnh mẽ giả thuyết biến đổi khí hậu chủ yếu do con người gây ra.",
        "Bằng chứng từ thực nghiệm hoàn toàn ủng hộ giả thuyết biến đổi khí hậu do nhân tạo.",
        "Các dữ liệu thực nghiệm hỗ trợ đầy đủ cho quan điểm biến đổi khí hậu xuất phát từ hoạt động con người."
      ],
      grammar: "'Overwhelmingly' — trạng từ nhấn mạnh mức độ mạnh. 'Is primarily driven by' — bị động + trạng từ 'primarily' (chủ yếu). 'Anthropogenic factors' — thuật ngữ khoa học nghĩa 'yếu tố do con người gây ra'.",
      keyVocab: [
        { word: "empirical", meaning: "thực nghiệm", note: "Tính từ, empirical evidence = bằng chứng từ thí nghiệm/quan sát" },
        { word: "anthropogenic", meaning: "do con người gây ra", note: "Tính từ khoa học, gốc: anthropo (con người) + genic (sinh ra)" },
        { word: "overwhelmingly", meaning: "áp đảo, rất mạnh mẽ", note: "Trạng từ nhấn mạnh mức độ" }
      ],
      contexts: [
        "📝 Bài luận IELTS về biến đổi khí hậu",
        "🎓 Nghiên cứu khoa học về môi trường"
      ]
    },
    {
      en: "A nuanced understanding of the socioeconomic determinants of health is crucial for developing effective public health policies.",
      vi: "Sự hiểu biết sâu sắc về các yếu tố quyết định kinh tế xã hội đối với sức khỏe là rất quan trọng để phát triển chính sách y tế công cộng hiệu quả.",
      topic: "ielts",
      level: "advanced",
      altTranslations: [
        "Hiểu biết đa chiều về các yếu tố kinh tế-xã hội quyết định sức khỏe rất quan trọng cho việc xây dựng chính sách y tế hiệu quả.",
        "Cần có sự hiểu biết tinh tế về các nhân tố kinh tế xã hội ảnh hưởng đến sức khỏe để xây dựng chính sách y tế công hiệu quả.",
        "Sự thấu hiểu sâu sắc về yếu tố kinh tế-xã hội tác động lên sức khỏe là then chốt cho chính sách y tế cộng đồng."
      ],
      grammar: "'A nuanced understanding of' — 'nuanced' (tinh tế, nhiều sắc thái) bổ nghĩa cho 'understanding'. 'Socioeconomic determinants' — cụm danh từ học thuật. 'Is crucial for + V-ing' — 'crucial for' chỉ sự quan trọng.",
      keyVocab: [
        { word: "nuanced", meaning: "tinh tế, nhiều sắc thái", note: "Tính từ cấp cao, dùng nhiều trong văn học thuật" },
        { word: "socioeconomic", meaning: "kinh tế xã hội", note: "Tính từ ghép: socio (xã hội) + economic (kinh tế)" },
        { word: "determinant", meaning: "yếu tố quyết định", note: "Danh từ, dùng nhiều trong y học và xã hội học" }
      ],
      contexts: [
        "📝 Bài luận IELTS về y tế công cộng",
        "🎓 Nghiên cứu về bất bình đẳng sức khỏe"
      ]
    },
    {
      en: "The proliferation of misinformation on digital platforms poses an unprecedented challenge to democratic institutions.",
      vi: "Sự lan tràn thông tin sai lệch trên các nền tảng kỹ thuật số đặt ra thách thức chưa từng có đối với các thể chế dân chủ.",
      topic: "ielts",
      level: "advanced",
      altTranslations: [
        "Thông tin sai lệch lan rộng trên nền tảng số tạo ra thách thức chưa có tiền lệ cho các thể chế dân chủ.",
        "Sự gia tăng tin giả trên mạng xã hội đặt ra thách thức lớn chưa từng thấy cho nền dân chủ.",
        "Tin sai lệch tràn lan trên các nền tảng số đang thách thức nghiêm trọng các thiết chế dân chủ."
      ],
      grammar: "'The proliferation of' — danh từ nghĩa 'sự lan tràn, gia tăng nhanh'. 'Poses a challenge to' — cụm cố định: pose (đặt ra) + challenge (thách thức) + to (đối với). 'Unprecedented' — tiền tố 'un-' + 'precedented' = chưa từng có.",
      keyVocab: [
        { word: "proliferation", meaning: "sự lan tràn, gia tăng", note: "Danh từ, động từ: proliferate" },
        { word: "misinformation", meaning: "thông tin sai lệch", note: "Danh từ, khác disinformation (cố ý) và misinformation (vô ý)" },
        { word: "unprecedented", meaning: "chưa từng có tiền lệ", note: "Tính từ, gốc: precedent (tiền lệ)" }
      ],
      contexts: [
        "📝 Bài luận IELTS về truyền thông và dân chủ",
        "🎓 Nghiên cứu về tác động của mạng xã hội"
      ]
    },
    {
      en: "Notwithstanding the methodological limitations, the findings of this study provide compelling evidence for the efficacy of the proposed intervention.",
      vi: "Bất chấp những hạn chế về phương pháp, kết quả của nghiên cứu này cung cấp bằng chứng thuyết phục về hiệu quả của biện pháp can thiệp được đề xuất.",
      topic: "ielts",
      level: "advanced",
      altTranslations: [
        "Mặc dù có hạn chế về phương pháp luận, kết quả nghiên cứu đưa ra bằng chứng mạnh mẽ về tính hiệu quả của phương pháp can thiệp.",
        "Dù có giới hạn về phương pháp, nghiên cứu này cho thấy bằng chứng đáng tin cậy về hiệu quả của biện pháp đề xuất.",
        "Bất kể hạn chế phương pháp, kết quả nghiên cứu cho thấy bằng chứng rõ ràng về hiệu quả của giải pháp can thiệp."
      ],
      grammar: "'Notwithstanding' là giới từ/liên từ trang trọng nghĩa 'bất chấp' (ngang 'despite' nhưng học thuật hơn). 'Compelling evidence' — 'compelling' nghĩa 'thuyết phục'. 'Efficacy' khác 'efficiency': efficacy = hiệu quả (đạt mục tiêu), efficiency = hiệu suất (tối ưu nguồn lực).",
      keyVocab: [
        { word: "notwithstanding", meaning: "bất chấp, mặc dù", note: "Giới từ rất trang trọng, dùng trong văn học thuật và pháp lý" },
        { word: "compelling", meaning: "thuyết phục, hấp dẫn", note: "Tính từ, compelling evidence = bằng chứng thuyết phục" },
        { word: "efficacy", meaning: "hiệu quả (đạt mục tiêu)", note: "Danh từ, khác efficiency (hiệu suất)" }
      ],
      contexts: [
        "📝 Phần kết luận nghiên cứu khoa học",
        "🎓 Bài luận IELTS yêu cầu phân tích nghiên cứu"
      ]
    },
    {
      en: "In synthesizing the existing literature, it becomes evident that a paradigm shift is necessary to address the multifaceted nature of global inequality.",
      vi: "Khi tổng hợp các tài liệu hiện có, rõ ràng rằng cần có sự thay đổi mô hình để giải quyết bản chất đa chiều của bất bình đẳng toàn cầu.",
      topic: "ielts",
      level: "advanced",
      altTranslations: [
        "Tổng hợp các nghiên cứu hiện có cho thấy cần chuyển đổi mô hình tư duy để đối phó với tính chất đa diện của bất bình đẳng toàn cầu.",
        "Qua việc tổng hợp tài liệu, có thể thấy rằng cần thay đổi cách tiếp cận để giải quyết vấn đề bất bình đẳng toàn cầu phức tạp.",
        "Khi xem xét tổng quan các tài liệu, rõ ràng cần có sự chuyển đổi mô hình để xử lý bản chất phức hợp của bất bình đẳng toàn cầu."
      ],
      grammar: "'In synthesizing' — giới từ 'in' + V-ing chỉ hành động 'trong quá trình'. 'It becomes evident that' — cấu trúc chủ ngữ giả 'it' + tính từ + mệnh đề that. 'Paradigm shift' là thuật ngữ học thuật nổi tiếng. 'Multifaceted' — tính từ ghép: multi (nhiều) + faceted (mặt).",
      keyVocab: [
        { word: "synthesize", meaning: "tổng hợp", note: "Động từ, danh từ: synthesis" },
        { word: "paradigm shift", meaning: "thay đổi mô hình tư duy", note: "Thuật ngữ học thuật do Thomas Kuhn đưa ra" },
        { word: "multifaceted", meaning: "đa chiều, đa diện", note: "Tính từ ghép, multi + faceted (nhiều mặt)" }
      ],
      contexts: [
        "📝 Phần tổng quan tài liệu trong luận văn",
        "🎓 Bài luận IELTS Writing Task 2 band 8-9"
      ]
    }
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
    return topicId ? this.phrases.filter(p => p.topic === topicId) : this.phrases;
  },
  getRandomPhrases(count, topicId) {
    const pool = this.getPhrasesByTopic(topicId);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
  },
  getRandomSentences(count, topicId) {
    let pool = topicId ? this.sentences.filter(s => s.topic === topicId) : this.sentences;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
  }
};
