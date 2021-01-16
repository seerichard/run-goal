import { FC, useState, useEffect } from 'react';
import { refreshToken, getRuns } from '../api';
import { Activity } from '../types';

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
    </div>
  );
};

export default MainScreen;
