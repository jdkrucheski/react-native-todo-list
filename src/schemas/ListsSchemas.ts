import Realm from 'realm';
import {TodoListInterface} from '../interfaces/AppInterfaces';
import {databaseOptions, TODOLIST_SCHEMA} from '.';

export const insertTodoList = (name: string) =>
  new Promise<void>((resolve, reject) => {
    const newList = {
      _id: new Realm.BSON.ObjectId(),
      name,
      deleted: false,
    };
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(TODOLIST_SCHEMA, newList);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const getAllLists = (): Promise<
  Realm.Results<TodoListInterface & Realm.Object>
> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const Lists = realm
            .objects<TodoListInterface>(TODOLIST_SCHEMA)
            .filtered('deleted == false');
          resolve(Lists);
        });
      })
      .catch(error => reject(error));
  });

export const getListsByIdList = (
  listId: string,
): Promise<TodoListInterface & Realm.Object> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const todoList = realm.objectForPrimaryKey<TodoListInterface>(
            TODOLIST_SCHEMA,
            new Realm.BSON.ObjectId(listId),
          );
          todoList
            ? resolve(todoList)
            : reject(`No se encontró nada con el ID:${listId}`);
        });
      })
      .catch(error => reject(error));
  });

export const deleteTodoList = (listId: string) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const deletingTodoList = realm.objectForPrimaryKey<TodoListInterface>(
            TODOLIST_SCHEMA,
            new Realm.BSON.ObjectId(listId),
          );
          deletingTodoList && (deletingTodoList.deleted = true); // Soft delete
          // realm.delete(deletingTodoList) // Hard delete
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const editTodoList = (id: string, name: string) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const updatingTodo = realm.objectForPrimaryKey<TodoListInterface>(
            TODOLIST_SCHEMA,
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
