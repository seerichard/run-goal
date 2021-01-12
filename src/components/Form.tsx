import { FC } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  clientId: string;
  clientSecret: string;
};

const Form: FC = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, errors, handleSubmit } = useForm<FormValues>();

  const onSubmit = ({ clientId, clientSecret }: FormValues) => {
    localStorage.setItem('clientId', clientId);
    localStorage.setItem('clientSecret', clientSecret);

    const redirectUrl = window.location.href;

    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=activity:read_all`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Client Id</label>
      <input name="clientId" ref={register({ required: true })} />
      {errors.clientId && 'Please enter a Client Id'}

      <label>Client Secret</label>
      <input name="clientSecret" ref={register({ required: true })} />
      {errors.clientSecret && 'Please enter a Client Secret'}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
