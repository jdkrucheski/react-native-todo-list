import Realm from 'realm';
import {PreferencesInterface} from '../interfaces/AppInterfaces';
import {databaseOptionsPreferences, PREFERENCES_SCHEMA} from '.';

export const startPreferences = (): Promise<
  Realm.Results<PreferencesInterface & Realm.Object>
> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptionsPreferences)
      .then(realm => {
        realm.write(() => {
          realm.create(PREFERENCES_SCHEMA, {
            _id: new Realm.BSON.ObjectId(),
            name: 'Humano',
          });
          const Colors =
            realm.objects<PreferencesInterface>(PREFERENCES_SCHEMA);
          resolve(Colors);
        });
      })
      .catch(error => reject(error));
  });

export const getPreferences = (): Promise<
  Realm.Results<PreferencesInterface & Realm.Object>
> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptionsPreferences)
      .then(realm => {
        realm.write(() => {
          const Colors =
            realm.objects<PreferencesInterface>(PREFERENCES_SCHEMA);
          resolve(Colors);
        });
      })
      .catch(error => reject(error));
  });

export const editName = (id: string, name: string) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOptionsPreferences)
      .then(realm => {
        realm.write(() => {
          const updatingTodo = realm.objectForPrimaryKey<PreferencesInterface>(
            PREFERENCES_SCHEMA,
            new Realm.BSON.ObjectId(id),
          );
          if (updatingTodo) {
            updatingTodo.name = name;
          }
          // Agregar los demás parámetros que quiera modificar.
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const editAccentColor = (id: string, selectedColor: string) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOptionsPreferences)
      .then(realm => {
        realm.write(() => {
          const updatingTodo = realm.objectForPrimaryKey<PreferencesInterface>(
            PREFERENCES_SCHEMA,
            new Realm.BSON.ObjectId(id),
          );
          if (updatingTodo) {
            updatingTodo.selectedColor = selectedColor;
          }
          // Agregar los demás parámetros que quiera modificar.
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const editAccentLanguage = (id: string, selectedLanguage: string) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOptionsPreferences)
      .then(realm => {
        realm.write(() => {
          const updatingTodo = realm.objectForPrimaryKey<PreferencesInterface>(
            PREFERENCES_SCHEMA,
            new Realm.BSON.ObjectId(id),
          );
          if (updatingTodo) {
            updatingTodo.selectedLanguage = selectedLanguage;
          }
          // Agregar los demás parámetros que quiera modificar.
          resolve();
        });
      })
      .catch(error => reject(error));
  });
