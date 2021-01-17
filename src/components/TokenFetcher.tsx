import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { getTokens } from '../api';
import { ReactComponent as Puff } from '../images/puff.svg';
import { media } from '../styles/breakpoints';
import { white } from '../styles/colors';

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

const TokenFetcher: FC<Props> = ({ code }) => {
  useEffect(() => {
    getTokens(code).catch((error) =>
      console.log('Something happened fetching the token :(', error),
    );
  }, []);

  return (
    <Wrapper>
      <Puffer />
      <Text>Linking account...</Text>
    </Wrapper>
  );
};

export default TokenFetcher;
