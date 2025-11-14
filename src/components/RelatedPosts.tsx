import Link from "next/link";
import Image from "next/image";
import { getNews } from "@/lib/cms";

export default async function RelatedPosts({ slug, limit = 4 }: { slug: string; limit?: number }) {
  let items = [] as any[];
  try {
    const all = await getNews();
    items = all.filter((n) => n.slug !== slug).slice(0, limit);
  } catch (err) {
    console.error("Failed to load related posts:", err);
    items = [];
  }

  if (items.length === 0) {
    return (
      <aside className="card p-4">
        <h3 className="font-semibold text-[var(--navy)]">Bạn cũng có thể thích</h3>
        <p className="text-sm text-zinc-600 mt-3">Không có bài viết liên quan.</p>
      </aside>
    );
  }

  return (
    <aside className="card p-4">
      <h3 className="font-semibold text-[var(--navy)]">Bạn cũng có thể thích</h3>
      <ul className="space-y-3 mt-3">
        {items.map((r) => (
          <li key={r.slug} className="flex items-center gap-3">
            {r.thumbnail?.url ? (
              <Link href={`/news/${r.slug}`} className="block w-20 h-14 relative shrink-0 overflow-hidden rounded">
                <Image src={r.thumbnail.url} alt={r.title} fill className="object-cover" sizes="80px" />
              </Link>
            ) : (
              <div className="w-20 h-14 bg-zinc-100 rounded flex items-center justify-center text-sm text-zinc-500">No image</div>
            )}

            <div className="flex-1">
              <Link href={`/news/${r.slug}`} className="nav-link font-medium line-clamp-2">
                {r.title}
              </Link>
              <div className="text-xs text-zinc-500 mt-1">{new Date(r.published).toLocaleDateString('vi-VN')}</div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
