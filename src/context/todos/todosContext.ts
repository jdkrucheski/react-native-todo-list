import {createContext} from 'react';
import {TodoInterface} from '../../interfaces/AppInterfaces';
import {TodoState} from './todosReducer';

interface TodosContextProps {
  loading: boolean;
  data: TodoInterface[];
  setTodos: (todos: TodoState) => void;
}

export const TodosContext = createContext({} as TodosContextProps);
