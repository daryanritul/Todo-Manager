import React, { useReducer } from 'react';
import App from './App';
import reducer from './UserContext/reducer';
import { userContext } from './UserContext/store';

const initialState = {
  user: {
    email: '',
    uid: '',
  },
  isSignedIn: false,
  workspace: [],
  todos: {
    pending: [],
    progress: [],
    completed: [],
    overdue: [],
  },
  isLoading: false,
  activeWorkspace: null,
  activity: [],
};
export default function RootApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{ state: state, dispatch }}>
      <App />
    </userContext.Provider>
  );
}
