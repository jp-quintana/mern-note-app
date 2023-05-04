import { useContext } from 'react';

import AuthContext from '../context/auth/auth-context';

export const useAuthContext = () => {
  return useContext(AuthContext);
};
