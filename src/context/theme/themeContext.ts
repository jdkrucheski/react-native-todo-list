import {createContext} from 'react';
import {ThemeInterface} from './themeProvider';

interface ThemeContextProps {
  theme: ThemeInterface;
  setDarkTheme: () => void;
  setLightTheme: () => void;
  // setCustomTheme: () => void;
  globalStyles: any;
}

export const ThemeContext = createContext({} as ThemeContextProps);
