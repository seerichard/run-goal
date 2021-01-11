import { FC } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  clientId: string;
  clientSecret: string;
};

const App: FC = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, errors, handleSubmit } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Client Id</label>
      <input name="clientId" ref={register({ required: true })} />
      {errors.clientId && 'Please enter a Client Id'}

      <label>Client Secret</label>
      <input name="clientSecret" ref={register({ required: true })} />
      {errors.clientSecret && 'Please enter a Client Secret'}

      <input type="submit" />
    </form>
  );
};

export default App;
