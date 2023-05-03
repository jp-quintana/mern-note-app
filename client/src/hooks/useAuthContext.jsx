import { useContext } from 'react';

import AuthContext from 'context/auth/auth-context';

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
