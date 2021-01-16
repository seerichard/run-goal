import { FC } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ReactComponent as Dog } from '../images/dog.svg';
import { white, dark1, dark2, grey1 } from '../styles/colors';
import { CLIENT_ID, CLIENT_SECRET } from '../constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Doggy = styled(Dog)`
  fill: ${white};
  stroke: ${grey1};
  width: 200px;
  margin-top: 40px;
`;

const Title = styled.h1`
  color: ${white};
  font-size: 40px;
  margin: 0;
  margin-top: -30px; /* To negate the height of the svg */
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  margin-top: 40px;
  padding: 30px;
`;

const Input = styled.input`
  padding: 0;
  margin: 0;
  border: ${grey1} 1px solid;
  border-radius: 2px;
  background-color: ${dark2};
  color: ${grey1};
  color: ${white};
  height: 40px;
  margin-bottom: 15px;
  padding-left: 20px;
  font-size: 16px;
  font-family: inherit;

  &:focus {
    outline: none;
    border: ${white} 1px solid;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  padding: 0;
  margin: 0;
  height: 40px;
  border: none;
  border-radius: 2px;
  background-color: ${white};
  color: ${dark1};
  font-size: 16px;
  font-weight: bold;
  font-family: inherit;
`;

type FormValues = {
  clientId: string;
  clientSecret: string;
};

const Form: FC = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, errors, handleSubmit } = useForm<FormValues>();

  const onSubmit = ({ clientId, clientSecret }: FormValues) => {
    localStorage.setItem(CLIENT_ID, clientId);
    localStorage.setItem(CLIENT_SECRET, clientSecret);

    const redirectUrl = window.location.href;

    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=activity:read_all`;
  };

  return (
    <Wrapper>
      <Doggy />
      <Title>Run Goal</Title>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="clientId"
          type="number"
          inputMode="numeric"
          placeholder="Client Id"
          ref={register({ required: true })}
        />
        {errors.clientId && 'Please enter a Client Id'}

        <Input
          name="clientSecret"
          type="password"
          placeholder="Client Secret"
          ref={register({ required: true })}
        />
        {errors.clientSecret && 'Please enter a Client Secret'}

        <SubmitButton type="submit">Submit</SubmitButton>
      </FormWrapper>
    </Wrapper>
  );
};

export default Form;
