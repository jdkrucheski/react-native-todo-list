import {PreferencesInterface} from '../interfaces/AppInterfaces';
import {
  editPreferences,
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

export const editPreferencesService = async (
  id: string,
  name: string,
  selectedColor: string,
) => {
  try {
    await editPreferences(id, name, selectedColor);
    const preferences = await getPreferencesService();
    return preferences;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
    return 'Ocurrió un error';
  }
};
