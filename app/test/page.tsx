import { getNews, getNewsBySlug, NewsArticle } from "@/lib/cms";

export default async function TestPage() {
  let allNews: NewsArticle[] = [];
  let testArticle: NewsArticle | null = null;
  let error: string | null = null;

  try {
    // Test 1: Get all news
    allNews = await getNews();
    
    // Test 2: Get first news by slug
    if (allNews.length > 0) {
      const firstSlug = allNews[0].slug;
      testArticle = await getNewsBySlug(firstSlug);
    }
  } catch (e: any) {
    error = e.message;
  }

  return (
    <main className="container-app py-6">
      <h1 className="text-2xl font-bold mb-4">Hygraph API Test</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Test 1: All News */}
      <section className="card p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">📋 All News ({allNews.length} items)</h2>
        <div className="space-y-2">
          {allNews.length > 0 ? (
            allNews.slice(0, 5).map((n) => (
              <div key={n.slug} className="border-b pb-2">
                <div className="font-semibold">Title: {n.title}</div>
                <div className="text-sm text-zinc-600">Slug: {n.slug}</div>
                <div className="text-sm text-zinc-600">Published: {n.published}</div>
                <div className="text-sm text-zinc-600">
                  Thumbnail: {n.thumbnail?.url ? '✅ Yes' : '❌ No'}
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-600">No news found</p>
          )}
        </div>
      </section>

      {/* Test 2: Single News */}
      {testArticle && (
        <section className="card p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">📰 Single Article Test</h2>
          <div className="space-y-2">
            <div><strong>Title:</strong> {testArticle.title}</div>
            <div><strong>Slug:</strong> {testArticle.slug}</div>
            <div><strong>Excerpt:</strong> {testArticle.excerpt}</div>
            <div><strong>Published:</strong> {testArticle.published}</div>
            <div><strong>Thumbnail:</strong> {testArticle.thumbnail?.url ? '✅ Yes' : '❌ No'}</div>
            <div><strong>Content:</strong> {testArticle.content ? '✅ Yes' : '❌ No'}</div>
            {testArticle.content && (
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold">View Content</summary>
                <pre className="bg-zinc-100 p-4 rounded mt-2 overflow-auto text-xs whitespace-pre-wrap">
                  {testArticle.content.substring(0, 500)}...
                </pre>
              </details>
            )}
          </div>
        </section>
      )}

      {/* Test 3: Query Info */}
      <section className="card p-6">
        <h2 className="text-xl font-bold mb-4">🔍 Query Info</h2>
        <div className="space-y-2">
          <div><strong>Endpoint:</strong> {process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT}</div>
          <div><strong>Token:</strong> {process.env.HYGRAPH_API_TOKEN ? '✅ Set' : '❌ Not set'}</div>
        </div>
      </section>

      {/* Test Links */}
      <section className="card p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">🔗 Test Links</h2>
        <div className="space-y-2">
          {allNews.slice(0, 5).map((n) => (
            <div key={n.slug}>
              <a 
                href={`/news/${n.slug}`}
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Test: {n.slug}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
