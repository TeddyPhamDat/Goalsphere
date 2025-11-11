"use client";

export default function ShareButtons({ title }: { title: string }) {
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: typeof window !== 'undefined' ? window.location.href : '' });
      } catch {}
    } else {
      if (typeof window !== 'undefined') navigator.clipboard?.writeText(window.location.href);
      alert("Link copied");
    }
  };
  return (
    <button onClick={share} className="text-sm px-3 py-1 rounded border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50">
      Share
    </button>
  );
}
