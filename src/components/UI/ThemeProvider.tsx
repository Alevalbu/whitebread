'use client';

import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setTheme('light')}>🌞</button>
      <button onClick={() => setTheme('dark')}>🌙</button>
    </div>
  );
}