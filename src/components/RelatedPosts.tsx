import Link from "next/link";
import { news } from "@/lib/mockData";

export default function RelatedPosts({ slug, limit = 4 }: { slug: string; limit?: number }) {
  const related = news.filter(n => n.slug !== slug).slice(0, limit);
  return (
    <aside className="card p-4 space-y-3">
      <h3 className="font-semibold text-[var(--navy)]">Bạn cũng có thể thích</h3>
      <ul className="space-y-2">
        {related.map(r => (
          <li key={r.id}>
            <Link href={`/news/${r.slug}`} className="nav-link">{r.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
