import Link from "next/link";
import { getNews } from "@/lib/cms";
import Image from "next/image";
import AdSlot from "@/components/AdSlot";
import TopScorersWidget from "@/components/TopScorersWidget";

export const metadata = { 
  title: "Trending | GoalSphere - Tin Tức & Xu Hướng Bóng Đá", 
  description: "Theo dõi tin tức thịnh hành, video hot nhất, cầu thủ được quan tâm và thống kê nổi bật trong thế giới bóng đá" 
};

export default async function TrendingPage() {
  const news = await getNews();
  const hotNews = news.slice(0, 1)[0]; // Tin HOT nhất
  const trendingNews = news.slice(1, 7); // 6 tin trending
  const latestNews = news.slice(7, 13); // 6 tin mới nhất

  return (
    <main className="container-app py-6">
      {/* Hero Banner */}
      <div className="flex justify-center mb-6">
        <AdSlot size="728x90" />
      </div>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--navy)]">Trending Now</h1>
        <p className="text-zinc-600">Những gì đang hot nhất trong thế giới bóng đá</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* HOT NEWS - Big Featured */}
          {hotNews && (
            <Link href={`/news/${hotNews.slug}`} className="card card-hover overflow-hidden group">
              <div className="relative h-[400px]">
                <Image
                  src={hotNews.thumbnail.url}
                  alt={hotNews.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full font-bold text-sm">
                  HOT NHẤT
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{hotNews.title}</h2>
                  <p className="text-gray-200 line-clamp-2">{hotNews.excerpt}</p>
                </div>
              </div>
            </Link>
          )}

          {/* Ad Between Content */}
          <div className="flex justify-center">
            <AdSlot size="728x90" />
          </div>

          {/* Trending News Grid */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">
              Đang Thịnh Hành
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {trendingNews.map((n, idx) => (
                <Link 
                  key={n.slug} 
                  href={`/news/${n.slug}`} 
                  className="card card-hover overflow-hidden group flex gap-4 p-0"
                >
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={n.thumbnail.url}
                      alt={n.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="128px"
                    />
                    <div className="absolute top-2 left-2 bg-[var(--navy)] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-center">
                    <h3 className="font-semibold line-clamp-2 text-[var(--navy)] group-hover:text-blue-600 transition-colors">
                      {n.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(n.published).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Latest News */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">
              Mới Nhất
            </h2>
            <div className="space-y-4">
              {latestNews.map((n) => (
                <Link 
                  key={n.slug} 
                  href={`/news/${n.slug}`} 
                  className="card card-hover p-4 flex gap-4 group"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={n.thumbnail.url}
                      alt={n.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                      {n.title}
                    </h3>
                    <p className="text-sm text-zinc-600 line-clamp-2">{n.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Ad */}
          <div className="sticky top-20 space-y-6">
            <AdSlot size="300x600" className="w-[300px]" />
            
            {/* Top Scorers */}
            <div className="card p-5">
              <h3 className="text-lg font-bold text-[var(--navy)] mb-4">
                Top Ghi Bàn
              </h3>
              <TopScorersWidget />
            </div>

            {/* Popular Tags */}
            <div className="card p-5">
              <h3 className="text-lg font-bold text-[var(--navy)] mb-4">
                Chủ Đề Hot
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Premier League', 'La Liga', 'Champions League', 'World Cup', 'Transfer', 'Highlights', 'Messi', 'Ronaldo', 'Haaland', 'Neymar'].map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-zinc-100 hover:bg-[var(--navy)] hover:text-white rounded-full text-sm cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Stats */}
            <div className="card p-5">
              <h3 className="text-lg font-bold text-[var(--navy)] mb-4">
                Thống Kê
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600">Tin tức hôm nay</span>
                  <span className="font-bold text-[var(--navy)]">{news.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600">Lượt xem</span>
                  <span className="font-bold text-[var(--navy)]">1.2M+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600">Người theo dõi</span>
                  <span className="font-bold text-[var(--navy)]">250K+</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
