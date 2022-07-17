import { useCallback, useState } from 'react';
import useFirebaseLogin from './use-firebase-login';

interface LoginData {
  email: string;
  password: string;
}

const useLogin = <T extends LoginData>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const login = useFirebaseLogin({
    onBegin: () => setLoading(true),
    onSuccess: () => {},
    onError: (error) => setError(error),
    onSettled: () => setLoading(false),
  });
  const onSubmit = useCallback(
    (values: T) => {
      login(values.email, values.password);
    },
    [login],
  );
  return { loading, error, onSubmit };
};

export default useLogin;
