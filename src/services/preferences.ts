import {PreferencesInterface} from '../interfaces/AppInterfaces';
import {
  editName,
  editAccentColor,
  getPreferences,
  startPreferences,
} from '../schemas/PreferencesSchema';

export const getPreferencesService = async () => {
  let res: PreferencesInterface;
  try {
    const status = await getPreferences();
    if (status.length > 0) {
      res = status[0];
      return res;
    }
    const preferences = await startPreferences();
    res = preferences[0];
    return res;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
    return 'Ocurrió un error';
  }
};

export const editNameService = async (id: string, name: string) => {
  try {
    await editName(id, name);
    const preferences = await getPreferencesService();
    return preferences;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
    return 'Ocurrió un error';
  }
};

export const editAccentColorService = async (
  id: string,
  selectedColor: string,
) => {
  try {
    await editAccentColor(id, selectedColor);
    const preferences = await getPreferencesService();
    return preferences;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
    return 'Ocurrió un error';
  }
};
