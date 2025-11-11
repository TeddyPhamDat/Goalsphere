import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E293B] text-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-wide">GoalSphere</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-[#FACC15] transition-colors">Home</Link>
          <Link href="/news" className="hover:text-[#FACC15] transition-colors">News</Link>
          <Link href="/matches" className="hover:text-[#FACC15] transition-colors">Matches</Link>
          <Link href="/standings" className="hover:text-[#FACC15] transition-colors">Standings</Link>
          <Link href="/trending" className="hover:text-[#FACC15] transition-colors">Trending</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
