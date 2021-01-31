import type { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/breakpoints';
import { grey1 } from '../../styles/colors';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 300px;
  margin-top: 60px;
  border: 1px solid ${grey1};
  border-radius: 3px;

  @media ${media.cinema} {
    margin-top: 3.75vw;
  }
`;

const Title = styled.span`
  color: ${grey1};
  border-bottom: 1px solid ${grey1};
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const Content = styled.div`
  color: ${grey1};
  padding: 10px;
  font-size: 14px;
`;

type CardProps = {
  title: string;
  children: ReactNode;
};

const Card: FC<CardProps> = ({ title, children }) => (
  <CardWrapper>
    <Title>{title}</Title>
    <Content>{children}</Content>
  </CardWrapper>
);

export default Card;
