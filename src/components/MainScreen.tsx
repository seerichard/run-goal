import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { refreshToken, getRuns } from '../api';
import { Activity } from '../types';
import { ReactComponent as Puff } from '../images/puff.svg';
import { media } from '../styles/breakpoints';
import { grey1 } from '../styles/colors';

enum Direction {
  LEFT,
  RIGHT,
}

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

const Circle = styled.div`
  height: 300px;
  width: 300px;
  margin-top: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${grey1} 5px solid;
  border-radius: 50%;
`;

type TextProps = {
  direction: Direction;
};

const Text = styled.span<TextProps>`
  color: ${grey1};
  font-size: 28px;
  font-weight: bold;
  padding-left: ${({ direction }) => direction === Direction.LEFT && '90px'};
  padding-right: ${({ direction }) => direction === Direction.RIGHT && '90px'};
`;

const Line = styled.div`
  position: absolute;
  height: 80px;
  border-right: ${grey1} 5px solid;
  transform: skew(-45deg);
`;

const MainScreen: FC = () => {
  const [runData, setRunData] = useState<Activity[]>([]);

  useEffect(() => {
    setTimeout(() => {
      refreshToken().catch((error) =>
        console.log('Something happened refreshing the token :(', error),
      );

      getRuns()
        .then((res) => setRunData(res))
        .catch((error) =>
          console.log('Something happened getting activities :(', error),
        );
    }, 1000);
  }, []);

  console.log('runData:', runData);

  const totalDistanceKm =
    runData.reduce((acc, curr) => acc + curr.distance, 0) / 10;

  const totalDistance2Dp =
    Math.round(totalDistanceKm + Number.EPSILON * 100) / 100;

  return (
    <Wrapper>
      {!runData?.length ? (
        <Puffer />
      ) : (
        <Circle>
          <Text direction={Direction.RIGHT}>{totalDistance2Dp}</Text>
          <Line />
          <Text direction={Direction.LEFT}>1000</Text>
        </Circle>
      )}
    </Wrapper>
  );
};

export default MainScreen;
