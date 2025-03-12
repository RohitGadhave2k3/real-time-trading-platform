import { createSlice } from '@reduxjs/toolkit';

const getInitialDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    return JSON.parse(savedMode);
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState = {
  darkMode: getInitialDarkMode(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
      
      // Update document class for Tailwind dark mode
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer; 