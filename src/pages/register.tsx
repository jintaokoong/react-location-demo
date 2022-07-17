import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useRegister from '../hooks/use-register';

const registrationSchema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(1),
    confirm: z.string().min(1),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

type Value = z.infer<typeof registrationSchema>;

const Register = () => {
  const { register, handleSubmit } = useForm<Value>({});
  const { onSubmit, loading, error } = useRegister<Value>();
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <br />
        <input {...register('email')} />
        <br />
        <label>Password</label>
        <br />
        <input type={'password'} {...register('password')} />
        <br />
        <label>Confirm Password</label>
        <br />
        <input type={'password'} {...register('confirm')} />
        <br />
        {error && <p>{error.message}</p>}
        <input disabled={loading} type="submit" value={'Register'} />
      </form>
    </div>
  );
};

export default Register;
