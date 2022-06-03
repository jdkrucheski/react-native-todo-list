import Realm from 'realm';
import {ThemeInterface} from '../interfaces/AppInterfaces';
import {databaseOptionsTheme, THEME_SCHEMA} from '.';

export const startThemes = (
  initialThemes: ThemeInterface,
): Promise<Realm.Results<ThemeInterface & Realm.Object>> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptionsTheme)
      .then(realm => {
        realm.write(() => {
          realm.create(THEME_SCHEMA, initialThemes);
          const Colors = realm.objects<ThemeInterface>(THEME_SCHEMA);
          resolve(Colors);
        });
      })
      .catch(error => reject(error));
  });

export const getThemes = (): Promise<
  Realm.Results<ThemeInterface & Realm.Object>
> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptionsTheme)
      .then(realm => {
        realm.write(() => {
          const Colors = realm.objects<ThemeInterface>(THEME_SCHEMA);
          resolve(Colors);
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

// export const editColor = (id: string, name: string) =>
//   new Promise<void>((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           const updatingTodo = realm.objectForPrimaryKey<TodoListInterface>(
//             TODOLIST_SCHEMA,
//             new Realm.BSON.ObjectId(id),
//           );
//           if (updatingTodo) {
//             updatingTodo.name = name;
//           }
//           // Agregar los demás parámetros que quiera modificar.
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });
