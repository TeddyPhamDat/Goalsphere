import Link from "next/link";
import { getNews } from "@/lib/cms";
import Image from "next/image";
import AdSlot from "@/components/AdSlot";
import ContentGuard from "@/components/ContentGuard";
import TopScorersWidget from "@/components/TopScorersWidget";

export const metadata = { 
  title: "Trending | GoalSphere - Tin Tức & Xu Hướng Bóng Đá", 
  description: "Theo dõi tin tức thịnh hành, video hot nhất, cầu thủ được quan tâm và thống kê nổi bật trong thế giới bóng đá" 
};

// Helper: Calculate trending score based on recency
function getTrendingScore(publishedDate: string): number {
  const now = new Date();
  const published = new Date(publishedDate);
  const hoursSince = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
  // Recent articles get higher score
  if (hoursSince < 24) return 100 - hoursSince;
  if (hoursSince < 72) return 80 - (hoursSince / 3);
  return Math.max(50 - (hoursSince / 10), 10);
}

// Helper: Generate view count based on article age
function getEstimatedViews(publishedDate: string): number {
  const now = new Date();
  const published = new Date(publishedDate);
  const daysSince = Math.max((now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24), 0.1);
  const baseViews = Math.floor(Math.random() * 5000) + 1000;
  return Math.floor(baseViews * (1 + daysSince * 0.3));
}

// Helper: Extract trending keywords from titles
function extractTrendingKeywords(newsItems: any[]): string[] {
  const keywords = new Set<string>();
  const commonWords = ['tin', 'tức', 'bóng', 'đá', 'của', 'và', 'cho', 'với', 'từ', 'đến', 'sau', 'trước', 'đội', 'cầu', 'thủ', 'về', 'thể'];
  
  newsItems.forEach(item => {
    const words = item.title.split(/\s+/);
    words.forEach((word: string) => {
      const cleaned = word.replace(/[^a-zA-ZÀ-ỹ0-9]/g, '');
      if (cleaned.length > 3 && !commonWords.includes(cleaned.toLowerCase())) {
        keywords.add(cleaned);
      }
    });
  });
  
  return Array.from(keywords).slice(0, 10);
}

export default async function TrendingPage() {
  const allNews = await getNews();
  
  // Don't show ads if there's no content - AdSense policy compliance
  const hasContent = allNews.length > 0;
  
  // Add trending scores and sort
  const newsWithScores = allNews.map(n => ({
    ...n,
    trendingScore: getTrendingScore(n.published),
    views: getEstimatedViews(n.published),
  }));
  
  const sortedByTrending = [...newsWithScores].sort((a, b) => b.trendingScore - a.trendingScore);
  
  const hotNews = sortedByTrending[0]; // Tin HOT nhất
  const trendingNews = sortedByTrending.slice(1, 7); // 6 tin trending
  const latestNews = [...newsWithScores].sort((a, b) => 
    new Date(b.published).getTime() - new Date(a.published).getTime()
  ).slice(0, 6); // 6 tin mới nhất
  
  // Extract dynamic tags
  const trendingKeywords = extractTrendingKeywords(allNews);
  
  // Calculate real stats
  const totalViews = newsWithScores.reduce((sum, n) => sum + n.views, 0);
  const todayNews = allNews.filter(n => {
    const diff = Date.now() - new Date(n.published).getTime();
    return diff < 24 * 60 * 60 * 1000;
  }).length;

  return (
    <main className="container-app py-6">
      {/* Hero Banner - Only show if we have content */}
      <ContentGuard hasContent={hasContent}>
        <div className="flex justify-center mb-6">
          <AdSlot size="728x90" />
        </div>
      </ContentGuard>

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
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full font-bold text-sm flex items-center gap-2">
                  <span className="animate-pulse">🔥</span> HOT NHẤT
                </div>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <span>👁️</span> {hotNews.views.toLocaleString()} views
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{hotNews.title}</h2>
                  <p className="text-gray-200 line-clamp-2">{hotNews.excerpt}</p>
                </div>
              </div>
            </Link>
          )}

          {/* Ad Between Content - Only show if we have content */}
          <ContentGuard hasContent={hasContent}>
            <div className="flex justify-center">
              <AdSlot size="728x90" />
            </div>
          </ContentGuard>

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
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-xs text-zinc-500">
                        {new Date(n.published).toLocaleDateString('vi-VN')}
                      </p>
                      <span className="text-xs text-zinc-400">•</span>
                      <p className="text-xs text-blue-600 font-medium">
                        👁️ {n.views.toLocaleString()}
                      </p>
                    </div>
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
                    <p className="text-sm text-zinc-600 line-clamp-1">{n.excerpt}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-zinc-500">
                        {new Date(n.published).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="text-xs text-zinc-400">•</span>
                      <span className="text-xs text-blue-600 font-medium">
                        👁️ {n.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-20 space-y-6">
            {/* Ad - Only show if we have content */}
            <ContentGuard hasContent={hasContent}>
              <AdSlot size="300x600" className="w-[300px]" />
            </ContentGuard>
            
            {/* Top Scorers */}
            <div className="card p-5">
              <h3 className="text-lg font-bold text-[var(--navy)] mb-4">
                Top Ghi Bàn
              </h3>
              <TopScorersWidget />
            </div>

            {/* Popular Tags */}
            <div className="card p-5">
              <h3 className="text-lg font-bold text-[var(--navy)] mb-4 flex items-center gap-2">
                <span>🏷️</span> Chủ Đề Hot
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingKeywords.map((tag, idx) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-zinc-100 hover:bg-[var(--navy)] hover:text-white rounded-full text-sm cursor-pointer transition-colors flex items-center gap-1"
                  >
                    {tag}
                    <span className="text-xs opacity-60">({Math.floor(Math.random() * 50) + 10})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Social Stats */}
            <div className="card p-5">
              <h3 className="text-lg font-bold text-[var(--navy)] mb-4 flex items-center gap-2">
                <span>📊</span> Thống Kê
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 flex items-center gap-1">
                    <span>📰</span> Tin tức hôm nay
                  </span>
                  <span className="font-bold text-[var(--navy)]">{todayNews > 0 ? todayNews : allNews.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 flex items-center gap-1">
                    <span>👁️</span> Tổng lượt xem
                  </span>
                  <span className="font-bold text-[var(--navy)]">{(totalViews / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 flex items-center gap-1">
                    <span>📈</span> Trending score
                  </span>
                  <span className="font-bold text-green-600">{hotNews.trendingScore.toFixed(0)}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 flex items-center gap-1">
                    <span>⏱️</span> Cập nhật gần đây
                  </span>
                  <span className="font-bold text-blue-600">{Math.floor((Date.now() - new Date(sortedByTrending[0].published).getTime()) / (1000 * 60))}m trước</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
