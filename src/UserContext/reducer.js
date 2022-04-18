import { userContext } from './store';
import {
  SET_USER,
  SET_WORKSPACE,
  ADD_TODO,
  IS_SIGNEDIN,
  IS_LOADING,
  SET_IS_LOADING,
  UPDATE_WORKSPACE,
} from './actions.type';

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_WORKSPACE:
      return { ...state, workspace: action.payload };
    case UPDATE_WORKSPACE:
      return { ...state, workspace: [...state.workspace, action.payload] };
    default:
      return state;
  }
};
