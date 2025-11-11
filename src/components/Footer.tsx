import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 bg-[#1E293B] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-white mb-3">GoalSphere</h3>
            <p className="text-sm text-gray-300 mb-3">
              Nền tảng tin tức bóng đá hàng đầu với thông tin cập nhật 24/7
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-300 hover:text-[#FACC15] transition-colors" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-[#FACC15] transition-colors" aria-label="Twitter">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-[#FACC15] transition-colors" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-[#FACC15] transition-colors" aria-label="YouTube">
                YouTube
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-[#FACC15] transition-colors">Home</Link></li>
              <li><Link href="/news" className="text-gray-300 hover:text-[#FACC15] transition-colors">News</Link></li>
              <li><Link href="/matches" className="text-gray-300 hover:text-[#FACC15] transition-colors">Matches</Link></li>
              <li><Link href="/standings" className="text-gray-300 hover:text-[#FACC15] transition-colors">Standings</Link></li>
              <li><Link href="/trending" className="text-gray-300 hover:text-[#FACC15] transition-colors">Trending</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-[#FACC15] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#FACC15] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-[#FACC15] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-[#FACC15] transition-colors">Terms of Service</Link></li>
              <li><Link href="/dmca" className="text-gray-300 hover:text-[#FACC15] transition-colors">DMCA</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: contact@goalsphere.com</li>
              <li>Business: business@goalsphere.com</li>
              <li>Website: goalsphere.vercel.app</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-300">
          <p>© {new Date().getFullYear()} GoalSphere. All rights reserved.</p>
          <p className="text-xs">
            Made for football fans worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
