import { useAuthContext } from './auth-provider'
import { Navigate } from 'react-location'
import { FC, PropsWithChildren } from 'react'

const PublicRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user, hydrated } = useAuthContext();
  if (!hydrated) return null;
  return user !== null ? <Navigate to={'/main'} /> : <>{children}</>;
};

export default PublicRoute;
