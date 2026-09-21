import { useState, useEffect } from 'react';

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('sketchbook-theme');
  if (saved === 'dark') return true;
  if (saved === 'light') return false;
  return document.documentElement.classList.contains('dark');
}

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

  const setTheme = (dark: boolean) => {
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark', 'blueprint-mode');
      localStorage.setItem('sketchbook-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark', 'blueprint-mode');
      localStorage.setItem('sketchbook-theme', 'light');
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: { isDark: dark } }));
  };

  const toggleTheme = () => {
    setTheme(!isDark);
  };

  useEffect(() => {
    // Ensure initial DOM state matches isDark
    if (isDark) {
      document.documentElement.classList.add('dark', 'blueprint-mode');
    } else {
      document.documentElement.classList.remove('dark', 'blueprint-mode');
    }

    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<{ isDark?: boolean }>;
      if (custom.detail && typeof custom.detail.isDark === 'boolean') {
        setIsDark(custom.detail.isDark);
      } else {
        const darkActive = document.documentElement.classList.contains('dark');
        setIsDark(darkActive);
      }
    };

    window.addEventListener('themechange', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('themechange', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [isDark]);

  return { isDark, toggleTheme, setTheme };
}
