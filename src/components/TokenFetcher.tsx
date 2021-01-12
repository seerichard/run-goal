import { FC, useEffect } from 'react';
import { getTokens } from '../api';

type Props = {
  code: string;
};

const TokenFetcher: FC<Props> = ({ code }) => {
  useEffect(() => {
    getTokens(code).catch((error) =>
      console.log('Something happened fetching the token :(', error),
    );
  }, []);

  return <div>Token Fetcher Component</div>;
};

export default TokenFetcher;
