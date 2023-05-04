import { useReducer, useEffect } from 'react';
import axios from 'axios';

import AuthContext from './auth-context';

import setAuthToken from '../../utils/setAuthToken';

const initialState = {
  authIsReady: false,
  token: localStorage.getItem('token'),
  isAuthorized: false,
  user: null,
};

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_USER': {
      console.log('in LOAD_USER', payload);
      return {
        ...state,
        authIsReady: true,
        isAuthorized: true,
        user: payload.user,
      };
    }
    case 'AUTH_ERROR': {
      return {
        authIsReady: true,
        token: null,
        isAuthorized: false,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));

    (async () => {
      try {
        const res = await axios.get('/api/user');
        dispatch({ type: 'LOAD_USER', payload: res.data });
      } catch (err) {
        dispatch({ type: 'AUTH_ERROR' });
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
