import type { FC, ReactText } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/breakpoints';
import { grey1 } from '../../styles/colors';

const CardWrapper = styled.div<{ first: boolean }>`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: ${({ first }) => !first && '20px'};
  border: 1px solid ${grey1};
  border-radius: 3px;

  @media ${media.cinema} {
    width: 18.75vw;
    margin-top: ${({ first }) => !first && '1.25vw'};
    border: 0.0625vw solid ${grey1};
    border-radius: 0.1875vw;
  }
`;

const Title = styled.span`
  color: ${grey1};
  border-bottom: 1px solid ${grey1};
  padding: 10px;
  font-size: 16px;
  font-weight: bold;

  @media ${media.cinema} {
    border-bottom: 0.0625vw solid ${grey1};
    padding: 0.625vw;
    font-size: 1vw;
  }
`;

const Content = styled.div`
  color: ${grey1};
  padding: 10px;
  font-size: 14px;

  @media ${media.cinema} {
    padding: 0.625vw;
    font-size: 1vw;
  }
`;

const InfoWrapper = styled.div<{ first: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ first }) => (first ? '0' : '6px')};

  @media ${media.cinema} {
    margin-top: ${({ first }) => (first ? '0' : '0.375vw')};
  }
`;

interface Data {
  [key: string]: ReactText;
}

const formatData = (data: Data) =>
  Object.entries(data).map((dataPoint, i) => {
    const [name, value] = dataPoint;

    return (
      <InfoWrapper key={name} first={i === 0}>
        <span>{name}</span>
        <span>{value}</span>
      </InfoWrapper>
    );
  });

type CardProps = {
  title: string;
  data: Data;
  first?: boolean;
};

const Card: FC<CardProps> = ({ title, data, first = false }) => (
  <CardWrapper first={first}>
    <Title>{title}</Title>
    <Content>{formatData(data)}</Content>
  </CardWrapper>
);

export default Card;
