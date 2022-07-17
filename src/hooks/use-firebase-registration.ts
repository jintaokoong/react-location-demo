import { useCallback } from 'react';
import * as auth from 'firebase/auth';
import app from '../configurations/firebase';

interface UseFirebaseRegistrationOption {
  onBegin: () => void;
  onSuccess: (user: auth.UserCredential) => void;
  onError: (error: Error) => void;
  onSettled: () => void;
}

const useFirebaseRegistration = (options: UseFirebaseRegistrationOption) => {
  return useCallback(
    (email: string, password: string) => {
      options.onBegin();
      auth
        .createUserWithEmailAndPassword(auth.getAuth(app), email, password)
        .then(options.onSuccess)
        .catch(options.onError);
    },
    [options.onSuccess, options.onError, options.onBegin],
  );
};

export default useFirebaseRegistration;
