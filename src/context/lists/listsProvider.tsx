import React, {useReducer} from 'react';
import {ListsContext} from './listsContext';
import {ListsReducer, ListState} from './listsReducer';

const INITIAL_STATE = {
  data: [],
  loading: true,
  error: '',
};
export const ListsProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(ListsReducer, INITIAL_STATE);

  const setLists = (newState: ListState) => {
    dispatch({type: 'SET_LISTS', payload: newState});
  };

  return (
    <ListsContext.Provider
      value={{
        ...state,
        setLists,
      }}>
      {children}
    </ListsContext.Provider>
  );
};
