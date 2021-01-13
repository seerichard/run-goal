import { FC, useState, useEffect } from 'react';
import { refreshToken, getRuns } from '../api';

const MainScreen: FC = () => {
  const [runData, setRunData] = useState<any[]>([]);

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

  const totalDistance: number =
    runData.reduce(
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      (acc, curr) => acc + curr.distance,
      0,
    ) / 10;

  const totalDistanceKm =
    Math.round(totalDistance + Number.EPSILON * 100) / 100;

  return <div>Total Distance Run This Year: {totalDistanceKm}km</div>;
};

export default MainScreen;
