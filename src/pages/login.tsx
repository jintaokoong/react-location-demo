// login page component
import { Link } from 'react-location';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import useLogin from '../hooks/use-login';

const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

type Value = z.infer<typeof loginSchema>;

const Login = () => {
  const { register, formState, handleSubmit } = useForm<Value>();
  const { loading, error, onSubmit } = useLogin();
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <br />
        <input type={'email'} autoComplete={'email'} {...register('email')} />
        <br />
        {formState.errors.email && <p>{formState.errors.email.message}</p>}
        <label>Password</label>
        <br />
        <input
          type={'password'}
          autoComplete={'password'}
          {...register('password')}
        />
        <br />
        {formState.errors.password && (
          <p>{formState.errors.password.message}</p>
        )}
        {error && <p>{error.message}</p>}
        <input disabled={loading} type="submit" value="Login" />
      </form>
      <Link to={'/register'}>Register</Link>
    </div>
  );
};

export default Login;
