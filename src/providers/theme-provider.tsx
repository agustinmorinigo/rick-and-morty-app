'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function useThemeInternal() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  return {
    theme,
    mounted,
    toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    setLight: () => setTheme('light'),
    setDark: () => setTheme('dark'),
    isLight: theme === 'light',
    isDark: theme === 'dark',
  };
}

const ThemeContext = createContext<ReturnType<typeof useThemeInternal> | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = useThemeInternal();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
