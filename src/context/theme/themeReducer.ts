import {ThemeInterface} from './themeProvider';

type actionsTypes = 'SET_LIGHT_THEME' | 'SET_DARK_THEME' | 'SET_CUSTOM_THEME';

interface ThemeAction {
  type: actionsTypes;
  payload: ThemeInterface;
}

export const ThemeReducer = (
  state: ThemeInterface,
  action: ThemeAction,
): ThemeInterface => {
  switch (action.type) {
    case 'SET_LIGHT_THEME':
      return action.payload;
    case 'SET_DARK_THEME':
      return action.payload;
    default:
      return state;
  }
};
