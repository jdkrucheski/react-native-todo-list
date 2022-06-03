import {Theme} from '@react-navigation/native';
import React, {useEffect, useReducer} from 'react';
import {Appearance, AppState, StyleSheet, useColorScheme} from 'react-native';
import {DarkTheme, LightTheme} from '../../themes/Themes';
import {ThemeContext} from './themeContext';
import {ThemeReducer} from './themeReducer';

type themeNames = 'light' | 'dark' | 'custom';

export interface ThemeInterface extends Theme {
  themeNames: themeNames;
  dark: boolean;
  colors: {
    accent: string;
    primary: string;
    secondary: string;
    tertiary: string;
    neutral: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

export const ThemeProvider = ({children}: any) => {
  const colorSchema = useColorScheme();
  const [theme, dispatch] = useReducer(
    ThemeReducer,
    colorSchema === 'dark' ? DarkTheme : LightTheme,
  );

  useEffect(() => {
    AppState.addEventListener('change', status => {
      if (status === 'active') {
        Appearance.getColorScheme() === 'light'
          ? setLightTheme()
          : setDarkTheme();
      }
    });
  }, []);

  const setDarkTheme = () => {
    dispatch({type: 'SET_DARK_THEME', payload: DarkTheme});
  };

  const setLightTheme = () => {
    dispatch({type: 'SET_LIGHT_THEME', payload: LightTheme});
  };
  const globalStyles = StyleSheet.create({
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      color: theme.colors.notification,
    },
    subTitle: {
      fontSize: 20,
      color: theme.colors.text,
    },
    text: {
      fontSize: 18,
      color: theme.colors.text,
    },
    textInfo: {
      fontSize: 16,
      color: theme.colors.tertiary,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: theme.colors.accent,
    },
    btn: {
      width: 130,
      height: 60,
      borderRadius: 8,
      marginHorizontal: 10,
      backgroundColor: theme.colors.accent,
      justifyContent: 'center',
      shadowColor: theme.colors.accent,
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,
      elevation: 6,
    },
    btnText: {
      textAlign: 'center',
      color: theme.colors.neutral,
      fontSize: 24,
      fontWeight: '500',
    },
    inputText: {
      maxHeight: '60%',
      paddingHorizontal: 10,
      fontSize: 28,
      marginTop: 16,
      borderRadius: 8,
      color: theme.colors.neutral,
      backgroundColor: theme.colors.secondary,
    },
  });

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setDarkTheme,
        setLightTheme,
        globalStyles,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
