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

export const editPreferences = (
  id: string,
  name: string,
  selectedColor: string,
) =>
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
            updatingTodo.selectedColor = selectedColor;
          }
          // Agregar los demás parámetros que quiera modificar.
          resolve();
        });
      })
      .catch(error => reject(error));
  });

// export const getColorByIdt = (
//   listId: string,
// ): Promise<TodoListInterface & Realm.Object> =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           const todoList = realm.objectForPrimaryKey<TodoListInterface>(
//             TODOLIST_SCHEMA,
//             new Realm.BSON.ObjectId(listId),
//           );
//           todoList
//             ? resolve(todoList)
//             : reject(`No se encontró nada con el ID:${listId}`);
//         });
//       })
//       .catch(error => reject(error));
//   });

// export const deleteColor = (listId: string) =>
//   new Promise<void>((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           const deletingTodoList = realm.objectForPrimaryKey<TodoListInterface>(
//             TODOLIST_SCHEMA,
//             new Realm.BSON.ObjectId(listId),
//           );
//           deletingTodoList && (deletingTodoList.deleted = true); // Soft delete
//           // realm.delete(deletingTodoList) // Hard delete
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });
