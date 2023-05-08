import { createContext } from 'react';

const AuthContext = createContext({
  authIsReady: false,
  token: null,
  user: null,
});

export default AuthContext;
