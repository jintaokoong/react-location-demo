import { useAuthContext } from './auth-provider'
import { Navigate  } from 'react-location';
import { FC, PropsWithChildren } from 'react'

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user, hydrated } = useAuthContext();
  if (!hydrated) return null;
  return user === null ? <Navigate to="/login" replace={true} /> : <>{children}</>;
};

export default ProtectedRoute;
