import * as auth from 'firebase/auth';
import {
  createContext,
  FC,
  PropsWithChildren, useContext,
  useEffect,
  useState,
} from 'react'
import app from '../../../configurations/firebase'

interface AuthContextProps {
  user: auth.User | null;
  hydrated: boolean;
  setUser: (user: auth.User | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({ user: null, setUser: () => {}, hydrated: false });

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<auth.User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    return auth.getAuth(app).onAuthStateChanged((user) => {
      setUser(user);
      setHydrated(true);
    });
  })

  return <AuthContext.Provider value={{ user, setUser, hydrated }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider;
