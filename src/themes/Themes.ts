//'#8D8DAA', //#D885A3 ', //#F56D91', //'#F7F5F2',

const defaultDarkColors = {
  accent: '#F56D91',
  primary: '#121216',
  secondary: '#2a2b33',
  tertiary: 'rgba(255, 255, 255, 0.5)',
  neutral: '#EEEEEE',
};

const defaultLightColors = {
  accent: '#F56D91',
  primary: '#EEEEEE',
  secondary: '#DFDFDE',
  tertiary: 'rgba(0, 0, 0, 0.5)',
  neutral: '#121216',
};

export const LightTheme = {
  themeNames: 'light' as const,
  dark: true,
  colors: {
    accent: defaultLightColors.accent,
    primary: defaultLightColors.primary,
    secondary: defaultLightColors.secondary,
    tertiary: defaultLightColors.tertiary,
    neutral: defaultLightColors.neutral,
    background: defaultLightColors.neutral,
    card: defaultLightColors.primary,
    text: defaultLightColors.neutral,
    border: defaultLightColors.neutral,
    notification: defaultLightColors.primary,
  },
};

export const DarkTheme = {
  themeNames: 'dark' as const,
  dark: true,
  colors: {
    accent: defaultDarkColors.accent,
    primary: defaultDarkColors.primary,
    secondary: defaultDarkColors.secondary,
    tertiary: defaultDarkColors.tertiary,
    neutral: defaultDarkColors.neutral,
    background: defaultDarkColors.neutral,
    card: defaultDarkColors.primary,
    text: defaultDarkColors.neutral,
    border: defaultDarkColors.neutral,
    notification: defaultDarkColors.neutral,
  },
};
