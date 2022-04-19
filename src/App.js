import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { auth } from './fireabse/config';
import Auth from './Screens/Auth/Auth';
import Home from './Screens/Home/Home';
import {
  SET_IS_LOADING,
  SET_IS_SIGNEDIN,
  SET_USER,
} from './UserContext/actions.type';
import { userContext } from './UserContext/store';

function App() {
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    dispatch({ type: SET_IS_LOADING, payload: true });
    const susbcriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: SET_USER,
          payload: { email: user.email, uid: user.uid },
        });
        dispatch({ type: SET_IS_SIGNEDIN, payload: true });
        dispatch({ type: SET_IS_LOADING, payload: false });
      } else {
        dispatch({ type: SET_IS_LOADING, payload: false });
        dispatch({ type: SET_IS_SIGNEDIN, payload: false });
        dispatch({
          type: SET_USER,
          payload: { email: null, uid: null },
        });
      }
    });
    return susbcriber;
  }, []);

  return <>{state.isSignedIn ? <Home /> : <Auth />}</>;
}

export default App;
