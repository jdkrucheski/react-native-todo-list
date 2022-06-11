import {TodoInterface} from '../interfaces/AppInterfaces';
import {getListsByIdList} from '../schemas/ListsSchema';
import {
  deleteTodoById,
  done,
  getTodoById,
  insertNewTodo,
  updateTodo,
} from '../schemas/TodosSchema';

export const newTodo = async (listId: string, name: string) => {
  try {
    await insertNewTodo(listId, name);
    const lists = await getTodos(listId);
    return lists;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};

export const getTodos = async (listId: string) => {
  try {
    const res = await getListsByIdList(listId);
    let listsArray: TodoInterface[] = [];
    if (res && res.todos) {
      listsArray = res.todos.map((todo: TodoInterface) => todo);
    }
    return listsArray;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};

export const getTodo = async (id: string) => {
  try {
    const res = await getTodoById(id);
    const listsArray: TodoInterface = {
      _id: res._id,
      name: res.name,
      deleted: res.deleted,
      notes: res.notes,
      status: res.status,
    };
    return listsArray;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};

export const editTodo = async (listId: string, todo: TodoInterface) => {
  try {
    await updateTodo(todo);
    const lists = await getTodos(listId);
    return lists;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};

export const doneTodo = async (listId: string, id: string) => {
  try {
    await done(id);
    const lists = await getTodos(listId);
    return lists;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};

export const deleteTodo = async (listId: string, id: string) => {
  try {
    await deleteTodoById(id);
    const lists = await getTodos(listId);
    return lists;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};
