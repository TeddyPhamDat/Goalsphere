import Link from "next/link";
import { getNews } from "@/lib/cms";
import Image from "next/image";

export const metadata = {
  title: "News | GoalSphere",
  description: "Tin tức bóng đá mới nhất.",
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="container-app py-6">
      <h1 className="text-2xl font-semibold mb-4 text-[var(--navy)]">News</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((n) => (
          <Link key={n.slug} href={`/news/${n.slug}`} className="card card-hover overflow-hidden">
            <div className="relative h-40">
              <Image
                src={n.thumbnail.url}
                alt={n.title}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold line-clamp-2">{n.title}</h3>
              <p className="text-sm text-zinc-600 line-clamp-2">{n.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
