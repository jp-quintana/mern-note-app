import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from 'hooks/useAuthContext';

const ProtectedRoutes = ({ needAuth }) => {
  const { isAuthorized } = useAuthContext();

  switch (needAuth) {
    case true: {
      if (isAuthorized) {
        return <Outlet />;
      } else {
        return <Navigate to="/login" />;
      }
    }
    case undefined: {
      if (!isAuthorized) {
        return <Outlet />;
      } else {
        return <Navigate to="/" />;
      }
    }
  }
};

export default ProtectedRoutes;
