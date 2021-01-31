import { FC, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Error from '../Error';
import Info from './Info';
import { refreshToken, getRuns } from '../../api';
import { ReactComponent as Puff } from '../../images/puff.svg';
import { media } from '../../styles/breakpoints';
import { refreshTokenUrl, getActivitiesUrl } from '../../url';

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

// SWR options
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

  return (
    <Wrapper>
      <Info runData={runData} />
    </Wrapper>
  );
};

export default MainScreen;
