import type { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { media } from '../styles/breakpoints';
import { red } from '../styles/colors';

const Wrapper = styled.div`
  display: flex;
  width: calc(100% - 60px); /* Margin of 30px on each side */
  margin: 40px auto;
  border: ${red} 1px solid;
  border-radius: 5px;

  @media ${media.tablet} {
    width: 750px;
  }

  @media ${media.cinema} {
    width: 50vw;
    margin: 2.5vw auto;
    border: ${red} 0.0625vw solid;
    border-radius: 0.3125vw;
  }
`;

const Text = styled.span`
  color: ${red};
  font-size: 20px;
  margin: 0;
  text-align: center;
  padding: 20px;
  word-break: break-word;

  @media ${media.cinema} {
    font-size: 1.75vw;
    padding: 1.25vw;
  }
`;

type ErrorProps = {
  children: ReactNode;
};

const Error: FC<ErrorProps> = ({ children }) => (
  <Wrapper>
    <Text>{JSON.stringify(children)}</Text>
  </Wrapper>
);

export default Error;
