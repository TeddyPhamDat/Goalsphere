import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | GoalSphere",
  description: "Điều khoản sử dụng dịch vụ của GoalSphere - Website tin tức bóng đá",
};

export default function TermsPage() {
  return (
    <main className="container-app py-8">
      <article className="max-w-4xl mx-auto card p-8">
        <h1 className="text-4xl font-bold text-[var(--navy)] mb-6">Terms of Service</h1>
        <p className="text-zinc-600 mb-8">Có hiệu lực từ: {new Date().toLocaleDateString('vi-VN')}</p>

        <section className="prose prose-lg max-w-none space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">1. Chấp nhận điều khoản</h2>
            <p className="text-zinc-700 leading-relaxed">
              Bằng cách truy cập và sử dụng website GoalSphere, bạn đồng ý tuân thủ các điều khoản và điều kiện này. 
              Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng website của chúng tôi.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">2. Mô tả dịch vụ</h2>
            <p className="text-zinc-700 leading-relaxed">
              GoalSphere cung cấp:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700 mt-3">
              <li>Tin tức bóng đá cập nhật hàng ngày</li>
              <li>Lịch thi đấu và kết quả trực tiếp</li>
              <li>Bảng xếp hạng các giải đấu</li>
              <li>Thống kê và phân tích bóng đá</li>
              <li>Nội dung giải trí về thể thao</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">3. Quyền sở hữu trí tuệ</h2>
            <p className="text-zinc-700 leading-relaxed">
              Tất cả nội dung trên GoalSphere bao gồm văn bản, hình ảnh, logo, thiết kế đều thuộc quyền sở hữu của GoalSphere 
              hoặc được cấp phép hợp pháp. Nghiêm cấm sao chép, phân phối hoặc sử dụng nội dung mà không có sự cho phép bằng văn bản.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">4. Hành vi người dùng</h2>
            <p className="text-zinc-700 leading-relaxed mb-3">Khi sử dụng website, bạn KHÔNG được:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li>Đăng tải nội dung vi phạm pháp luật, xúc phạm, hoặc không phù hợp</li>
              <li>Gửi spam hoặc nội dung quảng cáo không được phép</li>
              <li>Cố gắng hack hoặc phá hoại hệ thống website</li>
              <li>Sử dụng bot hoặc công cụ tự động để truy cập website</li>
              <li>Click gian lận vào quảng cáo</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">5. Quảng cáo</h2>
            <p className="text-zinc-700 leading-relaxed">
              Website sử dụng Google AdSense và các dịch vụ quảng cáo khác. 
              Chúng tôi không chịu trách nhiệm về nội dung của các quảng cáo bên thứ ba. 
              Nghiêm cấm click gian lận vào quảng cáo.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">6. Tuyên bố miễn trừ trách nhiệm</h2>
            <p className="text-zinc-700 leading-relaxed">
              GoalSphere cung cấp thông tin "nguyên trạng" mà không có bất kỳ bảo đảm nào. 
              Chúng tôi không chịu trách nhiệm về:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700 mt-3">
              <li>Độ chính xác tuyệt đối của thông tin</li>
              <li>Sự gián đoạn dịch vụ</li>
              <li>Mất dữ liệu hoặc thiệt hại gián tiếp</li>
              <li>Nội dung từ các liên kết bên ngoài</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">7. Thay đổi điều khoản</h2>
            <p className="text-zinc-700 leading-relaxed">
              Chúng tôi có quyền thay đổi điều khoản này bất cứ lúc nào. 
              Việc tiếp tục sử dụng website sau khi thay đổi có nghĩa là bạn chấp nhận các điều khoản mới.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">8. Luật áp dụng</h2>
            <p className="text-zinc-700 leading-relaxed">
              Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. 
              Mọi tranh chấp sẽ được giải quyết tại tòa án có thẩm quyền.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">9. Liên hệ</h2>
            <p className="text-zinc-700 leading-relaxed">
              Nếu có câu hỏi về điều khoản sử dụng, liên hệ:
            </p>
            <div className="bg-zinc-50 p-4 rounded-lg mt-3">
              <p className="text-zinc-700"><strong>Email:</strong> legal@goalsphere.com</p>
              <p className="text-zinc-700"><strong>Website:</strong> https://goalsphere.vercel.app</p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
