import AdSlot from "@/components/AdSlot";
import { getNewsBySlug, getNews } from "@/lib/cms";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import RelatedPosts from "@/components/RelatedPosts";
import { jsonLdArticle, breadcrumbJsonLd } from "@/lib/seo";
import Image from "next/image";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  return {
    title: article ? `${article.title} | GoalSphere` : "News | GoalSphere",
    description: article?.excerpt ?? "Bài viết bóng đá từ GoalSphere",
  };
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return notFound();

  const articleJsonLd = jsonLdArticle({
    url: `https://goalsphere.vercel.app/news/${article.slug}`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published,
  });

  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: "https://goalsphere.vercel.app/" },
    { name: "News", url: "https://goalsphere.vercel.app/news" },
    { name: article.title, url: `https://goalsphere.vercel.app/news/${article.slug}` },
  ]);

  return (
    <main className="container-app py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <article className="lg:col-span-8 space-y-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
        
        {/* Featured Image */}
        {article.thumbnail?.url && (
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        )}

        <div className="card p-6 space-y-4">
          <h1 className="text-3xl font-bold text-[var(--navy)] leading-tight">{article.title}</h1>
          
          <div className="flex items-center justify-between text-sm text-zinc-600 pb-4 border-b">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(article.published).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <ShareButtons title={article.title} />
          </div>

          {/* Excerpt */}
          <p className="text-lg text-zinc-700 font-medium italic border-l-4 border-[var(--navy)] pl-4">
            {article.excerpt}
          </p>

          {/* Inline Ad */}
          <div className="flex justify-center my-6">
            <AdSlot size="300x250" />
          </div>

          {/* Article Content */}
          {article.content ? (
            <div className="prose prose-lg max-w-none">
              {/* Split content by paragraphs and render - show first 5 paragraphs */}
              {article.content.split('\n\n').slice(0, 5).map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-zinc-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              
              {/* Show "Read more" if content is longer than 5 paragraphs */}
              {article.content.split('\n\n').length > 5 && (
                <details className="mt-6">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 py-3 px-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <span>📖 Đọc thêm ({article.content.split('\n\n').length - 5} đoạn còn lại)</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-zinc-200">
                    {article.content.split('\n\n').slice(5).map((paragraph, idx) => (
                      <p key={idx + 5} className="mb-4 text-zinc-800 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </details>
              )}
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-zinc-600 italic">Nội dung đang được cập nhật...</p>
            </div>
          )}

          {/* Bottom Ad */}
          <div className="flex justify-center my-6 pt-6 border-t">
            <AdSlot size="728x90" />
          </div>
        </div>

        <RelatedPosts slug={article.slug} />
      </article>
      
      <aside className="lg:col-span-4 space-y-6">
        <div className="sticky top-20">
          <AdSlot size="300x600" className="w-[300px]" />
        </div>
      </aside>
    </main>
  );
}
