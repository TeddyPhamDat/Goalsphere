import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | GoalSphere - Về chúng tôi",
  description: "Tìm hiểu về GoalSphere - Nền tảng tin tức bóng đá hàng đầu với thông tin cập nhật, chính xác và đa dạng",
};

export default function AboutPage() {
  return (
    <main className="container-app py-8">
      <article className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="card p-8 mb-8 text-center">
          <h1 className="text-5xl font-bold text-[var(--navy)] mb-4">
            About GoalSphere
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Nền tảng tin tức bóng đá hàng đầu, mang đến thông tin chính xác, nhanh chóng và toàn diện nhất về thế giới bóng đá
          </p>
        </div>

        {/* Mission */}
        <div className="card p-8 mb-8">
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-4">Sứ mệnh của chúng tôi</h2>
          <p className="text-zinc-700 leading-relaxed text-lg mb-4">
            GoalSphere được thành lập với mục tiêu trở thành nguồn tin tức bóng đá đáng tin cậy và toàn diện nhất cho người hâm mộ Việt Nam và quốc tế.
          </p>
          <p className="text-zinc-700 leading-relaxed text-lg">
            Chúng tôi cam kết cung cấp thông tin cập nhật 24/7 về các giải đấu hàng đầu thế giới, 
            từ Premier League, La Liga, Serie A, Bundesliga đến Champions League và các giải đấu khác.
          </p>
        </div>

        {/* What We Offer */}
        <div className="card p-8 mb-8">
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-6">Chúng tôi cung cấp gì?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[var(--navy)] mb-2">Tin tức cập nhật</h3>
              <p className="text-zinc-700">
                Tin tức bóng đá nóng hổi, chuyển nhượng, phỏng vấn độc quyền, và phân tích chuyên sâu
              </p>
            </div>

            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[var(--navy)] mb-2">Lịch thi đấu</h3>
              <p className="text-zinc-700">
                Lịch thi đấu chi tiết của các giải đấu lớn, cập nhật kết quả trận đấu theo thời gian thực
              </p>
            </div>

            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[var(--navy)] mb-2">Bảng xếp hạng</h3>
              <p className="text-zinc-700">
                Bảng xếp hạng cập nhật của tất cả các giải đấu, thống kê cầu thủ và đội bóng
              </p>
            </div>

            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[var(--navy)] mb-2">Trending</h3>
              <p className="text-zinc-700">
                Tin tức thịnh hành, video hot, và những câu chuyện đang được quan tâm nhất
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="card p-8 mb-8">
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-6">Giá trị cốt lõi</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-[var(--navy)] mb-1">Chính xác</h3>
              <p className="text-zinc-700">
                Mọi thông tin đều được kiểm chứng kỹ lưỡng từ nguồn đáng tin cậy
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--navy)] mb-1">Nhanh chóng</h3>
              <p className="text-zinc-700">
                Cập nhật tin tức trong vòng vài phút sau khi sự kiện xảy ra
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--navy)] mb-1">Toàn diện</h3>
              <p className="text-zinc-700">
                Bao quát tất cả các giải đấu lớn trên toàn thế giới
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--navy)] mb-1">Dễ tiếp cận</h3>
              <p className="text-zinc-700">
                Giao diện thân thiện, tương thích mọi thiết bị
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="card p-8 mb-8">
          <h2 className="text-3xl font-bold text-[var(--navy)] mb-4">Đội ngũ của chúng tôi</h2>
          <p className="text-zinc-700 leading-relaxed text-lg mb-4">
            GoalSphere được vận hành bởi đội ngũ biên tập viên và nhà báo thể thao giàu kinh nghiệm, 
            với niềm đam mê vô bờ bến dành cho bóng đá.
          </p>
          <p className="text-zinc-700 leading-relaxed text-lg">
            Chúng tôi làm việc không ngừng nghỉ để mang đến cho bạn những tin tức mới nhất, 
            phân tích sâu sắc và góc nhìn độc đáo về thế giới bóng đá.
          </p>
        </div>

        {/* Contact */}
        <div className="card p-8 bg-gradient-to-r from-[var(--navy)] to-blue-700 text-white">
          <h2 className="text-3xl font-bold mb-4">Liên hệ với chúng tôi</h2>
          <p className="text-lg mb-6">
            Có câu hỏi, góp ý hoặc muốn hợp tác? Chúng tôi luôn sẵn sàng lắng nghe!
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-bold mb-1">Email</p>
              <p>contact@goalsphere.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-bold mb-1">Website</p>
              <p>https://goalsphere.vercel.app</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-bold mb-1">Social Media</p>
              <p>Facebook | Twitter | Instagram</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-bold mb-1">Business</p>
              <p>business@goalsphere.com</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 p-6 bg-zinc-50 rounded-lg">
          <p className="text-zinc-600 text-sm">
            GoalSphere - Nơi đam mê bóng đá được thắp sáng
          </p>
        </div>
      </article>
    </main>
  );
}
