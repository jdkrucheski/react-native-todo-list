import {Theme} from '@react-navigation/native';
import React, {useEffect, useReducer, useState} from 'react';
import {Appearance, AppState, StyleSheet, useColorScheme} from 'react-native';
import {DarkTheme, LightTheme} from '../../themes/Themes';
import {ThemeContext} from './themeContext';
import {ThemeReducer} from './themeReducer';

type themeNames = 'light' | 'dark';

export interface ThemeInterface extends Theme {
  themeNames: themeNames;
  dark: boolean;
  colors: {
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
  const [accentColor, setAccentColor] = useState('#F56D91');

  const colorSchema = useColorScheme();
  const [theme, dispatch] = useReducer(
    ThemeReducer,
    colorSchema === 'dark' ? DarkTheme : LightTheme,
  );

  useEffect(() => {
    const changeTheme = AppState.addEventListener('change', status => {
      if (status === 'active') {
        Appearance.getColorScheme() === 'light'
          ? setLightTheme()
          : setDarkTheme();
      }
    });
    return () => changeTheme.remove();
  }, []);

  const setDarkTheme = () => {
    dispatch({type: 'SET_DARK_THEME', payload: DarkTheme});
  };

  const setLightTheme = () => {
    dispatch({type: 'SET_LIGHT_THEME', payload: LightTheme});
  };

  const setColor = (color: string) => {
    setAccentColor(color);
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
      backgroundColor: accentColor,
    },
    btn: {
      width: 130,
      height: 60,
      borderRadius: 8,
      marginHorizontal: 10,
      backgroundColor: accentColor,
      justifyContent: 'center',
      shadowColor: accentColor,
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
        accentColor,
        setColor,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
