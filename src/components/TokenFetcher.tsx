import { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Error from './Error';
import { getTokens } from '../api';
import { ReactComponent as Puff } from '../images/puff.svg';
import { media } from '../styles/breakpoints';
import { white } from '../styles/colors';
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

type Props = {
  code: string;
};

const options = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  errorRetryCount: 0,
};

// const url = 'https://type.fit/api/quotes';

// const fetcher = async () => {
//   const res = await fetch(url);
//   console.log('RES:', res);
//   // If the status code is not in the range 200-299,
//   // we still try to parse and throw it.
//   if (res.ok) {
//     const error = new Error(
//       'An error occurred while fetching the data.',
//     );
//     // Attach extra info to the error object.
//     error.info = await res.json();
//     error.status = res.status;
//     // return 'What the fuck';
//     throw error;
//   }
//   return res.json();
// };

// const fetcher = async () => {
//   const response = await fetch(url);
//   return await response.json();
// };

const TokenFetcher: FC<Props> = ({ code }) => {
  const url = getTokensUrl({ code });
  const { data, error } = useSWR(url, getTokens, options);

  if (error) return <Error>{error}</Error>;

  if (data) {
    // Redirect after three seconds. The redirect occurs too quickly otherwise
    setTimeout(() => {
      const url = window.location.href;
      window.location.href = url.split('?')[0];
    }, 3000);
  }

  return (
    <Wrapper>
      <Puffer />
      <Text>Linking account...</Text>
      <Text>Data: {data}</Text>
      <Text>Error: {error}</Text>
    </Wrapper>
  );
};

export default TokenFetcher;
