import { useCallback, useState } from 'react';
import useFirebaseRegistration from './use-firebase-registration';

interface RegisterData {
  email: string;
  password: string;
}

const useRegister = <T extends RegisterData>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const register = useFirebaseRegistration({
    onBegin: () => setLoading(true),
    onSuccess: () => {
      setError(null);
    },
    onError: (error: Error) => {
      setError(error);
    },
    onSettled: () => setLoading(false),
  });
  const onSubmit = useCallback(
    (values: RegisterData) => {
      register(values.email, values.password);
    },
    [register],
  );

  return {
    onSubmit,
    loading,
    error,
  };
};

export default useRegister;
