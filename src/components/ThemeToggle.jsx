import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa6';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = window.localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark'; // Dark mode by default
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme];
}

export function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="btn-icon-wrapper cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <FaSun className="h-4 w-4 text-amber-500/80 transition-colors duration-300 hover:text-amber-400" />
      ) : (
        <FaMoon className="h-4 w-4 text-indigo-500/80 transition-colors duration-300 hover:text-indigo-600" />
      )}
    </button>
  );
}
