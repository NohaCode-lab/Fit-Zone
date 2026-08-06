import { create } from 'zustand';

export type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = window.localStorage.getItem('fitzone-theme') as Theme;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  }
  return 'dark'; // Default sleek dark theme
};

const applyThemeClass = (theme: Theme) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  }
};

// Initialize immediately on load
const initialTheme = getInitialTheme();
applyThemeClass(initialTheme);

export const useTheme = create<ThemeState>((set) => ({
  theme: initialTheme,
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('fitzone-theme', nextTheme);
      }
      applyThemeClass(nextTheme);
      return { theme: nextTheme };
    }),
  setTheme: (theme: Theme) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('fitzone-theme', theme);
    }
    applyThemeClass(theme);
    set({ theme });
  },
}));
