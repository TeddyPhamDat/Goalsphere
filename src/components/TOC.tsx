export default function TOC({ headings }: { headings: { id: string; text: string }[] }) {
  if (!headings?.length) return null;
  return (
    <nav className="card p-4">
      <h3 className="font-semibold mb-2 text-[var(--navy)]">Mục lục</h3>
      <ul className="space-y-1 text-sm">
        {headings.map(h => (
          <li key={h.id}><a className="nav-link" href={`#${h.id}`}>{h.text}</a></li>
        ))}
      </ul>
    </nav>
  );
}
