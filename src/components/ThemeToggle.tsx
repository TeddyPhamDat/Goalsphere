"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setDark(stored === "dark");
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const val = next ? "dark" : "light";
    localStorage.setItem("theme", val);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button onClick={toggle} className="ml-4 text-sm px-3 py-1 rounded border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50">
      {dark ? "Light" : "Dark"}
    </button>
  );
}
