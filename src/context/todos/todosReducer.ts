import {TodoInterface} from '../../interfaces/AppInterfaces';

type ActionsTypes = 'SET_TODOS';

interface TodoAction {
  type: ActionsTypes;
  payload: TodoState;
}

export interface TodoState {
  data: TodoInterface[];
  loading: boolean;
  error: string;
}

export const TodosReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        data: [...action.payload.data],
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};
