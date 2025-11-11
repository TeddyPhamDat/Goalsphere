import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | GoalSphere - Liên hệ",
  description: "Liên hệ với GoalSphere để hợp tác, góp ý hoặc báo cáo vấn đề. Chúng tôi luôn sẵn sàng lắng nghe!",
};

export default function ContactPage() {
  return (
    <main className="container-app py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-[var(--navy)] mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-zinc-600">
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-[var(--navy)] mb-2">Email</h3>
            <p className="text-zinc-600 mb-2">Liên hệ qua email:</p>
            <a href="mailto:contact@goalsphere.com" className="text-blue-600 hover:underline font-semibold">
              contact@goalsphere.com
            </a>
          </div>

          <div className="card p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-[var(--navy)] mb-2">Business</h3>
            <p className="text-zinc-600 mb-2">Hợp tác kinh doanh:</p>
            <a href="mailto:business@goalsphere.com" className="text-blue-600 hover:underline font-semibold">
              business@goalsphere.com
            </a>
          </div>

          <div className="card p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-[var(--navy)] mb-2">Editorial</h3>
            <p className="text-zinc-600 mb-2">Góp ý nội dung:</p>
            <a href="mailto:editorial@goalsphere.com" className="text-blue-600 hover:underline font-semibold">
              editorial@goalsphere.com
            </a>
          </div>

          <div className="card p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-[var(--navy)] mb-2">Support</h3>
            <p className="text-zinc-600 mb-2">Hỗ trợ kỹ thuật:</p>
            <a href="mailto:support@goalsphere.com" className="text-blue-600 hover:underline font-semibold">
              support@goalsphere.com
            </a>
          </div>
        </div>

        {/* Social Media */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-[var(--navy)] mb-6 text-center">
            Kết nối với chúng tôi
          </h2>
          <div className="flex justify-center gap-6 flex-wrap">
            <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Facebook
            </a>
            <a href="#" className="bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors font-semibold">
              Twitter
            </a>
            <a href="#" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold">
              Instagram
            </a>
            <a href="#" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
              YouTube
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-[var(--navy)] mb-6">
            Câu hỏi thường gặp
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[var(--navy)] mb-2">
                Làm thế nào để đăng ký nhận tin tức?
              </h3>
              <p className="text-zinc-700">
                Hiện tại chúng tôi chưa có tính năng đăng ký email. 
                Bạn có thể theo dõi chúng tôi trên mạng xã hội hoặc đánh dấu website để cập nhật tin tức mới nhất.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--navy)] mb-2">
                Quảng cáo và hợp tác
              </h3>
              <p className="text-zinc-700">
                Để hợp tác quảng cáo hoặc partnership, vui lòng liên hệ qua email: business@goalsphere.com
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--navy)] mb-2">
                Báo cáo lỗi
              </h3>
              <p className="text-zinc-700">
                Nếu bạn phát hiện lỗi hoặc vấn đề kỹ thuật, vui lòng liên hệ support@goalsphere.com với mô tả chi tiết.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--navy)] mb-2">
                Đóng góp nội dung
              </h3>
              <p className="text-zinc-700">
                Nếu bạn muốn đóng góp bài viết hoặc phân tích, hãy gửi email đến editorial@goalsphere.com
              </p>
            </div>
          </div>
        </div>

        {/* Office Info */}
        <div className="card p-8 bg-gradient-to-br from-[var(--navy)] to-blue-800 text-white">
          <h2 className="text-2xl font-bold mb-4">Thông tin công ty</h2>
          <div className="space-y-3">
            <p><strong>Tên:</strong> GoalSphere Media</p>
            <p><strong>Website:</strong> https://goalsphere.vercel.app</p>
            <p><strong>Ngành:</strong> Tin tức & Truyền thông thể thao</p>
            <p><strong>Giờ làm việc:</strong> 24/7 (Hỗ trợ email trong giờ hành chính)</p>
          </div>
        </div>

        {/* Response Time Notice */}
        <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded">
          <p className="text-blue-900">
            <strong>Thời gian phản hồi:</strong> Chúng tôi cố gắng phản hồi mọi email trong vòng 24-48 giờ làm việc. 
            Cảm ơn sự kiên nhẫn của bạn!
          </p>
        </div>
      </div>
    </main>
  );
}
