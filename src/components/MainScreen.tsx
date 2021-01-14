import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Dog } from '../images/dog.svg';
import { refreshToken, getRuns } from '../api';
import { Activity } from '../types';

const Doggy = styled(Dog)`
  height: 100px;
  color: red;
  background-color: green;
  fill: blue;
  stroke: orange;
`;

const MainScreen: FC = () => {
  const [runData, setRunData] = useState<Activity[]>([]);

  useEffect(() => {
    refreshToken().catch((error) =>
      console.log('Something happened refreshing the token :(', error),
    );

    getRuns()
      .then((res) => setRunData(res))
      .catch((error) =>
        console.log('Something happened getting activities :(', error),
      );
  }, []);

  console.log('runData:', runData);

  const totalDistanceKm =
    runData.reduce((acc, curr) => acc + curr.distance, 0) / 10;

  const totalDistance2Dp =
    Math.round(totalDistanceKm + Number.EPSILON * 100) / 100;

  return (
    <div>
      <div>Total Distance Run This Year: {totalDistance2Dp}km</div>
      <Doggy />
    </div>
  );
};

export default MainScreen;
