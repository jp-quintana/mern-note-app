import { useContext } from 'react';

import AuthContext from 'context/auth/auth-context';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
