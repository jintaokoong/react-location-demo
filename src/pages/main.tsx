import { useEffect, useState } from 'react';
import * as auth from 'firebase/auth';
import app from '../configurations/firebase';
import useFirebaseLogout from '../hooks/use-firebase-logout';

const Main = () => {
  const [user, setUser] = useState<auth.User | null>(null);
  const [loading, setLoading] = useState(false);
  const logout = useFirebaseLogout();
  useEffect(() => {
    const sub = auth.getAuth(app).onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => sub();
  }, []);
  return (
    <div>
      <h1>Main</h1>
      <p>This is the main page</p>
      {user ? <p>Logged in as {user.email}</p> : <p>User not logged in</p>}
      <button
        type={'button'}
        disabled={user == null || loading}
        onClick={() => {
          setLoading(true);
          return logout().then(() => {
            setLoading(false);
          });
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Main;
