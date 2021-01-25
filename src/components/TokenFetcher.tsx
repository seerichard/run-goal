import { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Error from './Error';
import { getTokens } from '../api';
import { ReactComponent as Puff } from '../images/puff.svg';
import { media } from '../styles/breakpoints';
import { white, dark1 } from '../styles/colors';
import { getTokensUrl } from '../url';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Puffer = styled(Puff)`
  width: 150px;
  height: 150px;
  margin-top: 100px;

  @media ${media.cinema} {
    width: 9.375vw;
    height: 9.375vw;
    margin-top: 6.25vw;
  }
`;

const Text = styled.span`
  color: ${white};
  font-size: 28px;
  margin: 0;
  margin-top: 50px;
  text-align: center;

  @media ${media.cinema} {
    font-size: 1.75vw;
    margin-top: 3.125vw;
  }
`;

const TryAgain = styled.button`
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
  width: 150px;

  @media ${media.cinema} {
    height: 2.5vw;
    border-radius: 0.125vw;
    font-size: 1vw;
    width: 9.375vw;
  }
`;

type Props = {
  code: string;
};

const options = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  errorRetryCount: 0,
};

const clearUrl = () => {
  const url = window.location.href;
  window.location.href = url.split('?')[0];
};

const TokenFetcher: FC<Props> = ({ code }) => {
  const url = getTokensUrl({ code });
  const { data, error } = useSWR(url, getTokens, options);

  if (error) {
    return (
      <Wrapper>
        <Error>{error}</Error>
        <TryAgain onClick={clearUrl}>Try again</TryAgain>
      </Wrapper>
    );
  }

  if (data) {
    // Redirect after three seconds. The redirect occurs too quickly otherwise
    setTimeout(() => clearUrl(), 3000);
  }

  return (
    <Wrapper>
      <Puffer />
      <Text>Linking account...</Text>
      {data && <Text>Success!</Text>}
    </Wrapper>
  );
};

export default TokenFetcher;
