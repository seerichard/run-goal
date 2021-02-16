import type { FC } from 'react';
import styled, { css } from 'styled-components';
import { media } from '../styles/breakpoints';
import { grey1 } from '../styles/colors';

export const height = css`
  min-height: calc(100vh - 60px);

  @media ${media.cinema} {
    min-height: calc(100vh - 3.75vw);
  }
`;

const Wrapper = styled.div`
  color: ${grey1};
  height: 60px;
  padding: 20px;
  font-size: 12px;

  @media ${media.cinema} {
    height: 3.75vw;
    padding: 1.25vw;
    font-size: 0.75vw;
  }
`;

const Footer: FC = () => (
  <Wrapper>© {new Date().getFullYear()} Richard See </Wrapper>
);

export default Footer;
