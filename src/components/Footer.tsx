export default function Footer() {
  return (
    <footer className="mt-10 border-t border-zinc-200 py-6 text-sm text-zinc-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© GoalSphere 2025</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-[#1E293B]">Twitter</a>
          <a href="#" className="hover:text-[#1E293B]">Facebook</a>
          <a href="#" className="hover:text-[#1E293B]">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
