'use client';

import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-border transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label="Toggle dark mode"
    >
      <Sun
        size={18}
        className={`transition-all duration-300 text-primary ${
          theme === 'dark' ? 'opacity-0 rotate-90 scale-0 absolute inset-0 m-auto' : 'opacity-100 rotate-0 scale-100'
        }`}
      />
      <Moon
        size={18}
        className={`transition-all duration-300 text-primary ${
          theme === 'light' ? 'opacity-0 -rotate-90 scale-0 absolute inset-0 m-auto' : 'opacity-100 rotate-0 scale-100'
        }`}
      />
    </button>
  );
}
