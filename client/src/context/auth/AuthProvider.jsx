import { useReducer } from 'react';

import AuthContext from './auth-context';

const initialState = {
  authIsReady: false,
  isAuthorized: false,
  user: null,
};

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_USER': {
      return {
        ...state,
        authIsReady: true,
        isAuthorized: true,
        user: payload,
      };
    }
    // case 'SIGNUP_SUCCESS': {
    //   return {
    //     ...state,
    //   };
    // }
    case 'AUTH_ERROR':
    case 'LOGOUT': {
      return {
        authIsReady: true,
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

  console.log(state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
