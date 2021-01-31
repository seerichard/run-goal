import type { FC, ReactText } from 'react';
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
    width: 18.75vw;
    margin-top: 3.75vw;
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

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;

  @media ${media.cinema} {
    margin-bottom: 0.1875vw;
  }
`;

interface Data {
  [key: string]: ReactText;
}

const formatData = (data: Data) =>
  Object.entries(data).map((dataPoint) => {
    const [name, value] = dataPoint;

    return (
      <InfoWrapper key={name}>
        <span>{name}</span>
        <span>{value}</span>
      </InfoWrapper>
    );
  });

type CardProps = {
  title: string;
  data: Data;
};

const Card: FC<CardProps> = ({ title, data }) => (
  <CardWrapper>
    <Title>{title}</Title>
    <Content>{formatData(data)}</Content>
  </CardWrapper>
);

export default Card;
