import {createContext} from 'react';
import {TodoListInterface} from '../../interfaces/AppInterfaces';
import {ListState} from './listsReducer';

interface ListsContextProps {
  loading: boolean;
  data: TodoListInterface[];
  setLists: (lists: ListState) => void;
}

export const ListsContext = createContext({} as ListsContextProps);
