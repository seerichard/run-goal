import { FC, useEffect } from 'react';
import { refreshToken, getActivities } from '../api';

const MainScreen: FC = () => {
  useEffect(() => {
    refreshToken().catch((error) =>
      console.log('Something happened refreshing the token :(', error),
    );
    getActivities().catch((error) =>
      console.log('Something happened getting activities :(', error),
    );
  }, []);

  return <div>Display!</div>;
};

export default MainScreen;
