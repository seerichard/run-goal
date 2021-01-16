import { FC } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { authorizeUrl } from '../url';
import { ReactComponent as Dog } from '../images/dog.svg';
import { media } from '../styles/breakpoints';
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

  @media ${media.cinema} {
    width: 12.5vw;
    margin-top: 2.5vw;
  }
`;

const Title = styled.h1`
  color: ${white};
  font-size: 40px;
  margin: 0;
  margin-top: -30px; /* To negate the height of the svg */
  text-align: center;

  @media ${media.cinema} {
    font-size: 2.5vw;
    margin-top: -1.875vw;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px); /* Margin of 30px on each side */
  box-sizing: border-box;
  margin-top: 40px;

  @media ${media.tablet} {
    width: 400px;
  }

  @media ${media.cinema} {
    width: 25vw;
    margin-top: 2.5vw;
  }
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

  // Hide the number arrows in the number field
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

  @media ${media.cinema} {
    border: ${grey1} 0.0625vw solid;
    border-radius: 0.125vw;
    height: 2.5vw;
    margin-bottom: 0.9375vw;
    padding-left: 1.25vw;
    font-size: 1vw;

    &:focus {
      border: ${white} 0.0625vw solid;
    }
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

  @media ${media.cinema} {
    height: 2.5vw;
    border-radius: 0.125vw;
    font-size: 1vw;
  }
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

    window.location.href = authorizeUrl({ clientId, redirectUrl });
  };

  return (
    <Wrapper>
      <div>
        <Doggy />
        <Title>Run Goal</Title>
      </div>
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
