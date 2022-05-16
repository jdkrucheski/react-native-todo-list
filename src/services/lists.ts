import {TodoListInterface} from '../interfaces/AppInterfaces';
import {
  deleteTodoList,
  editTodoList,
  getAllLists,
  insertTodoList,
} from '../schemas/ListsSchemas';

export const newList = async (name: string) => {
  try {
    await insertTodoList(name);
    const lists = await getLists();
    return lists;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};

export const getLists = async () => {
  try {
    const lists = await getAllLists();
    const listsArray: TodoListInterface[] = lists.map(l => l);
    return listsArray;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};

export const editList = async (id: string, name: string) => {
  try {
    await editTodoList(id, name);
    const lists = await getLists();
    return lists;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};

export const deleteList = async (id: string) => {
  try {
    await deleteTodoList(id);
    const lists = await getLists();
    return lists;
  } catch (error) {
    // TODO: Manejar mejor el error
    console.log(error);
  }
};
