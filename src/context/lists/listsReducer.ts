import {TodoInterface, TodoListInterface} from '../../interfaces/AppInterfaces';

type ActionsTypes = 'SET_LISTS';

interface ListAction {
  type: ActionsTypes;
  payload: ListState;
}

export interface ListState {
  data: TodoListInterface[] | TodoInterface;
  loading: boolean;
  error: string;
}

export const ListsReducer = (state: ListState, action: ListAction) => {
  switch (action.type) {
    case 'SET_LISTS':
      return {
        data: action.payload.data,
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};
