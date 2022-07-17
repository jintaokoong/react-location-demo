import { useAuthContext } from './auth-provider'
import { Navigate } from 'react-location'

const DefaultRoute = () => {
  const { user, hydrated } = useAuthContext();
  console.log(user !== null, hydrated);
  if (!hydrated) return null;
  return user === null ? <Navigate to={'/login'} /> : <Navigate to={'/main'} />;
};

export default DefaultRoute;
