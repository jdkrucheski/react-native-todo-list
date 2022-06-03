import {ThemeInterface} from '../interfaces/AppInterfaces';
import {getThemes, startThemes} from '../schemas/ColorsSchemas';

export const defaultColors = {
  accent: '#8d9bce', //'#8D8DAA', //#D885A3 ', //#F56D91', //'#F7F5F2',
  primary: '#121216',
  secondary: '#2a2b33',
  white: '#fff',
  neutral: 'rgba(255, 255, 255, 0.5)',
};

const initialThemes: ThemeInterface = {
  isTheFirstOpening: true,
  colors: [
    {
      name: 'light',
      selected: false,
      accent: defaultColors.accent,
      primary: defaultColors.primary,
      secondary: defaultColors.secondary,
      neutral: defaultColors.neutral,
      white: defaultColors.white,
    },
    {
      name: 'dark',
      selected: true,
      accent: defaultColors.accent,
      primary: defaultColors.primary,
      secondary: defaultColors.secondary,
      neutral: defaultColors.neutral,
      white: defaultColors.white,
    },
  ],
};

// export const startThemesService = async () => {
//   try {
//     await startThemes(initialThemes);
//     const colors = await getThemesService();
//     return colors;
//   } catch (error) {
//     // TODO: Manejar mejor el error
//     console.log(error);
//   }
// };

export const getThemesService = async () => {
  try {
    const status = await getThemes();
    status.length > 0 ? console.log('Iniciados') : console.log('Sin iniciar');
    if (status.length > 0) {
      return status;
    }
    const theme = await startThemes(initialThemes);
    return theme;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};

// export const editColor = async (id: string, name: string) => {
//   try {
//     await editTodoList(id, name);
//     const lists = await getLists();
//     return lists;
//   } catch (error) {
//     // TODO: Manejar mejor el error
//     console.log(error);
//   }
// };

// export const deleteList = async (id: string) => {
//   try {
//     await deleteTodoList(id);
//     const lists = await getLists();
//     return lists;
//   } catch (error) {
//     // TODO: Manejar mejor el error
//     console.log(error);
//   }
// };
