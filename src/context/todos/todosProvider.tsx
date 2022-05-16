import React, {useReducer} from 'react';
import {TodosContext} from './todosContext';
import {TodosReducer, TodoState} from './todosReducer';

const INITIAL_STATE = {
  data: [],
  loading: true,
  error: '',
};

export const TodosProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(TodosReducer, INITIAL_STATE);

  const setTodos = (newState: TodoState) => {
    dispatch({type: 'SET_TODOS', payload: newState});
  };

  return (
    <TodosContext.Provider
      value={{
        ...state,
        setTodos,
      }}>
      {children}
    </TodosContext.Provider>
  );
};
