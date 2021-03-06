import type { FC } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/breakpoints';
import { grey1 } from '../../styles/colors';

const Circle = styled.div`
  height: 300px;
  width: 300px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${grey1} 5px solid;
  border-radius: 50%;

  @media ${media.cinema} {
    height: 18.75vw;
    width: 18.75vw;
    margin: 3.75vw auto;
    border: ${grey1} 0.3125vw solid;
  }
`;

enum Direction {
  LEFT,
  RIGHT,
}

type TextProps = {
  direction: Direction;
};

const Text = styled.span<TextProps>`
  color: ${grey1};
  font-size: 28px;
  font-weight: bold;
  padding-left: ${({ direction }) => direction === Direction.LEFT && '90px'};
  padding-right: ${({ direction }) => direction === Direction.RIGHT && '90px'};

  @media ${media.cinema} {
    font-size: 1.75vw;
    padding-left: ${({ direction }) =>
      direction === Direction.LEFT && '5.625vw'};
    padding-right: ${({ direction }) =>
      direction === Direction.RIGHT && '5.625vw'};
  }
`;

const Line = styled.div`
  position: absolute;
  height: 80px;
  border-right: ${grey1} 5px solid;
  transform: skew(-45deg);

  @media ${media.cinema} {
    height: 5vw;
    border-right: ${grey1} 0.3125vw solid;
  }
`;

type InfoProps = {
  totalDistance: string;
};

const Info: FC<InfoProps> = ({ totalDistance }) => (
  <Circle>
    <Text direction={Direction.RIGHT}>{totalDistance}</Text>
    <Line />
    <Text direction={Direction.LEFT}>1000</Text>
  </Circle>
);

export default Info;
