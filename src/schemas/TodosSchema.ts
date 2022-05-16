import Realm from 'realm';
import {
  Status,
  TodoInterface,
  TodoListInterface,
} from '../interfaces/AppInterfaces';
import {databaseOptions, TODOLIST_SCHEMA, TODO_SCHEMA} from '.';

export const insertNewTodo = (listId: string, name: string) =>
  new Promise<void>((resolve, reject) => {
    const newTodo = {
      _id: new Realm.BSON.ObjectId(),
      name,
      deleted: false,
      notes: '',
      status: 'open' as Status,
    };
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const updatingTodoList = realm.objectForPrimaryKey<TodoListInterface>(
            TODOLIST_SCHEMA,
            new Realm.BSON.ObjectId(listId),
          );
          updatingTodoList?.todos &&
            (updatingTodoList.todos = [...updatingTodoList.todos, newTodo]);
          resolve();
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

export const getTodoById = (
  todoId: string,
): Promise<TodoInterface & Realm.Object> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const todo = realm.objectForPrimaryKey<TodoInterface>(
            TODO_SCHEMA,
            new Realm.BSON.ObjectId(todoId),
          );
          todo
            ? resolve(todo)
            : reject(`No se encontró nada con el ID:${todoId}`);
        });
      })
      .catch(error => reject(error));
  });

export const done = (listId: string) =>
  new Promise<TodoListInterface & Realm.Object>((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const doingTodo = realm.objectForPrimaryKey<TodoInterface>(
            TODO_SCHEMA,
            new Realm.BSON.ObjectId(listId),
          );
          doingTodo &&
            (doingTodo.status === 'open'
              ? (doingTodo.status = 'closed')
              : (doingTodo.status = 'open'));
          doingTodo && resolve(doingTodo);
        });
      })
      .catch(error => reject(error));
  });

export const updateTodo = (todo: TodoInterface) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const updatingTodo = realm.objectForPrimaryKey<TodoInterface>(
            TODO_SCHEMA,
            new Realm.BSON.ObjectId(todo._id.toString()),
          );
          if (updatingTodo) {
            updatingTodo.name = todo.name;
            updatingTodo.notes = todo.notes;
            updatingTodo.status = todo.status;
          }
          // Agregar los demás parámetros que quiera modificar.
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteTodoById = (todoId: string) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const todo = realm.objectForPrimaryKey<TodoInterface>(
            TODO_SCHEMA,
            new Realm.BSON.ObjectId(todoId),
          );
          realm.delete(todo); // Hard delete
          resolve();
        });
      })
      .catch(error => reject(error));
  });
