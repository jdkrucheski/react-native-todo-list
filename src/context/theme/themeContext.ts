import {createContext} from 'react';
import {ThemeInterface} from './themeProvider';

interface ThemeContextProps {
  theme: ThemeInterface;
  accentColor: string;
  setDarkTheme: () => void;
  setLightTheme: () => void;
  setColor: (color: string) => void;
  globalStyles: any;
}

export const ThemeContext = createContext({} as ThemeContextProps);
