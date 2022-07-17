import * as auth from 'firebase/auth';
import app from '../configurations/firebase';
import { useCallback } from 'react';

const useFirebaseLogout = () => {
  return useCallback(() => {
    return auth.signOut(auth.getAuth(app));
  }, []);
};

export default useFirebaseLogout;
