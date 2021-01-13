import { FC, useEffect } from 'react';
import { refreshToken, getRuns } from '../api';

const MainScreen: FC = () => {
  useEffect(() => {
    refreshToken().catch((error) =>
      console.log('Something happened refreshing the token :(', error),
    );
    getRuns().catch((error) =>
      console.log('Something happened getting activities :(', error),
    );
  }, []);

  return <div>Display!</div>;
};

export default MainScreen;
