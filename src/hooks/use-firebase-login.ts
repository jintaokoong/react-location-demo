import * as auth from 'firebase/auth';
import app from '../configurations/firebase';
import { useCallback } from 'react';

interface UseFirebaseLoginOption {
  onBegin: () => void;
  onSuccess: (user: auth.UserCredential) => void;
  onError: (error: Error) => void;
  onSettled: () => void;
}

const useFirebaseLogin = (options: UseFirebaseLoginOption) => {
  return useCallback(
    (email: string, password: string) => {
      options.onBegin();
      auth
        .signInWithEmailAndPassword(auth.getAuth(app), email, password)
        .then(options.onSuccess)
        .catch(options.onError)
        .finally(options.onSettled);
    },
    [options.onSuccess, options.onError, options.onBegin, options.onSettled],
  );
};

export default useFirebaseLogin;
