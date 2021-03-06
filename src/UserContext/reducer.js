import { userContext } from './store';
import {
  SET_USER,
  SET_WORKSPACE,
  SET_IS_LOADING,
  UPDATE_WORKSPACE,
  SET_ACTIVE_WORKSPACE,
  ADD_TODO_PENDING,
  ADD_TODO_OVERDUE,
  ADD_TODO_COMPLETED,
  ADD_TODO_PROGRESS,
  SET_IS_SIGNEDIN,
  SET_ACTIVITY,
} from './actions.type';

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_IS_SIGNEDIN:
      return { ...state, isSignedIn: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_WORKSPACE:
      return { ...state, workspace: action.payload };
    case UPDATE_WORKSPACE:
      return { ...state, workspace: [...state.workspace, action.payload] };
    case SET_ACTIVE_WORKSPACE:
      return { ...state, activeWorkspace: action.payload };
    case SET_ACTIVITY:
      return { ...state, activity: action.payload };
    case ADD_TODO_PENDING:
      return { ...state, todos: { ...state.todos, pending: action.payload } };
    case ADD_TODO_PROGRESS:
      return {
        ...state,
        todos: { ...state.todos, progress: action.payload },
      };
    case ADD_TODO_COMPLETED:
      return {
        ...state,
        todos: { ...state.todos, completed: action.payload },
      };
    case ADD_TODO_OVERDUE:
      return { ...state, todos: { ...state.todos, overdue: action.payload } };

    default:
      return state;
  }
};
