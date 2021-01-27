import { FC, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Error from './Error';
import { refreshToken, getRuns } from '../api';
import { ReactComponent as Puff } from '../images/puff.svg';
import { media } from '../styles/breakpoints';
import { grey1 } from '../styles/colors';
import { refreshTokenUrl, getActivitiesUrl } from '../url';

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

const options = {
  revalidateOnFocus: false,
  errorRetryCount: 3,
};

const MainScreen: FC = () => {
  // The date needed to be memoized as /activities kept getting called as
  // the date updated
  // Current time - convert to seconds. Strava does not seem to accept milliseconds
  const currentTime = useMemo(() => Math.floor(Date.now() / 1000), []);

  const tokenUrl = useCallback(() => refreshTokenUrl(), []);
  const activitiesUrl = useCallback(() => getActivitiesUrl(currentTime), []);

  const { error: refreshTokenError } = useSWR(tokenUrl, refreshToken, options);

  const { data: runData = [], error: runError, isValidating } = useSWR(
    activitiesUrl,
    getRuns,
    options,
  );

  if (refreshTokenError) {
    return <Error>{refreshTokenError}</Error>;
  }

  if (runError) {
    return <Error>{runError}</Error>;
  }

  if (isValidating) {
    return (
      <Wrapper>
        <Puffer />
      </Wrapper>
    );
  }

  const totalDistanceKm =
    runData?.reduce((acc, curr) => acc + curr.distance, 0) / 10;

  const totalDistance2Dp =
    Math.round(totalDistanceKm + Number.EPSILON * 100) / 100;

  return (
    <Wrapper>
      <Circle>
        <Text direction={Direction.RIGHT}>{totalDistance2Dp}</Text>
        <Line />
        <Text direction={Direction.LEFT}>1000</Text>
      </Circle>
    </Wrapper>
  );
};

export default MainScreen;
