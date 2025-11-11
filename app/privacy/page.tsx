import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GoalSphere",
  description: "Chính sách bảo mật và quyền riêng tư của GoalSphere - Website tin tức bóng đá hàng đầu",
};

export default function PrivacyPage() {
  return (
    <main className="container-app py-8">
      <article className="max-w-4xl mx-auto card p-8">
        <h1 className="text-4xl font-bold text-[var(--navy)] mb-6">Privacy Policy</h1>
        <p className="text-zinc-600 mb-8">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>

        <section className="prose prose-lg max-w-none space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">1. Giới thiệu</h2>
            <p className="text-zinc-700 leading-relaxed">
              GoalSphere ("chúng tôi", "của chúng tôi") cam kết bảo vệ quyền riêng tư của người dùng. 
              Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn 
              khi bạn sử dụng website GoalSphere.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">2. Thông tin chúng tôi thu thập</h2>
            <p className="text-zinc-700 leading-relaxed mb-3">
              Chúng tôi có thể thu thập các loại thông tin sau:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li><strong>Thông tin tự động:</strong> Địa chỉ IP, loại trình duyệt, hệ điều hành, thời gian truy cập</li>
              <li><strong>Cookies:</strong> Chúng tôi sử dụng cookies để cải thiện trải nghiệm người dùng</li>
              <li><strong>Dữ liệu phân tích:</strong> Google Analytics để hiểu hành vi người dùng</li>
              <li><strong>Quảng cáo:</strong> Google AdSense để hiển thị quảng cáo phù hợp</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li>Cải thiện nội dung và trải nghiệm website</li>
              <li>Phân tích xu hướng và hành vi người dùng</li>
              <li>Hiển thị quảng cáo phù hợp thông qua Google AdSense</li>
              <li>Bảo vệ website khỏi spam và các hoạt động gian lận</li>
              <li>Tuân thủ các yêu cầu pháp lý</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">4. Google AdSense và Cookies</h2>
            <p className="text-zinc-700 leading-relaxed mb-3">
              Website này sử dụng Google AdSense để hiển thị quảng cáo. Google sử dụng cookies để:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li>Hiển thị quảng cáo dựa trên lượt truy cập trước đó của bạn</li>
              <li>Tối ưu hóa hiệu suất quảng cáo</li>
              <li>Ngăn chặn gian lận quảng cáo</li>
            </ul>
            <p className="text-zinc-700 leading-relaxed mt-3">
              Bạn có thể tắt quảng cáo được cá nhân hóa tại{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Google Ads Settings
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">5. Chia sẻ thông tin với bên thứ ba</h2>
            <p className="text-zinc-700 leading-relaxed">
              Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. 
              Tuy nhiên, chúng tôi có thể chia sẻ thông tin với:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700 mt-3">
              <li><strong>Google AdSense:</strong> Để hiển thị quảng cáo</li>
              <li><strong>Google Analytics:</strong> Để phân tích dữ liệu website</li>
              <li><strong>Các nhà cung cấp dịch vụ:</strong> Hosting, CDN, bảo mật</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">6. Bảo mật thông tin</h2>
            <p className="text-zinc-700 leading-relaxed">
              Chúng tôi sử dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin của bạn, bao gồm:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700 mt-3">
              <li>Mã hóa SSL/HTTPS</li>
              <li>Tường lửa và bảo mật server</li>
              <li>Giám sát và phát hiện xâm nhập</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">7. Quyền của người dùng</h2>
            <p className="text-zinc-700 leading-relaxed">
              Bạn có quyền:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700 mt-3">
              <li>Truy cập và xem thông tin chúng tôi có về bạn</li>
              <li>Yêu cầu xóa thông tin cá nhân</li>
              <li>Từ chối cookies (lưu ý: một số tính năng có thể không hoạt động)</li>
              <li>Phản đối việc xử lý dữ liệu của bạn</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">8. Cookies và công nghệ theo dõi</h2>
            <p className="text-zinc-700 leading-relaxed mb-3">
              Chúng tôi sử dụng các loại cookies sau:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li><strong>Cookies cần thiết:</strong> Để website hoạt động bình thường</li>
              <li><strong>Cookies phân tích:</strong> Google Analytics để hiểu cách người dùng sử dụng website</li>
              <li><strong>Cookies quảng cáo:</strong> Google AdSense để hiển thị quảng cáo phù hợp</li>
            </ul>
            <p className="text-zinc-700 leading-relaxed mt-3">
              Bạn có thể quản lý cookies trong cài đặt trình duyệt của mình.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">9. Liên kết đến website khác</h2>
            <p className="text-zinc-700 leading-relaxed">
              Website của chúng tôi có thể chứa liên kết đến các website khác. 
              Chúng tôi không chịu trách nhiệm về chính sách bảo mật của các website đó. 
              Vui lòng đọc chính sách bảo mật của họ trước khi cung cấp thông tin cá nhân.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">10. Thay đổi chính sách</h2>
            <p className="text-zinc-700 leading-relaxed">
              Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. 
              Mọi thay đổi sẽ được đăng trên trang này với ngày cập nhật mới.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">11. Liên hệ</h2>
            <p className="text-zinc-700 leading-relaxed">
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ:
            </p>
            <div className="bg-zinc-50 p-4 rounded-lg mt-3">
              <p className="text-zinc-700"><strong>Email:</strong> privacy@goalsphere.com</p>
              <p className="text-zinc-700"><strong>Website:</strong> https://goalsphere.vercel.app</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-8">
            <p className="text-blue-900">
              <strong>Lưu ý quan trọng:</strong> Bằng cách sử dụng website GoalSphere, 
              bạn đồng ý với chính sách bảo mật này và việc thu thập, sử dụng thông tin như đã mô tả.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
