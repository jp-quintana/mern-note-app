import { useReducer, useEffect } from 'react';
import AuthContext from './auth-context';

const initialState = {
  authIsReady: false,
  token: localStorage.getItem('token'),
  user: null,
};

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case '': {
      return {};
    }

    default: {
      return state;
    }
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
