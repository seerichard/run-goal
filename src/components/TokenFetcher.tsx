import { FC, useEffect } from 'react';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  FIRST_NAME,
  LAST_NAME,
} from '../constants';

type Token = (code: string) => Promise<void>;

// This fetches the Access and Refresh tokens required to pull athlete data
const getTokens: Token = async (code: string) => {
  const clientId = localStorage.getItem(CLIENT_ID);
  const clientSecret = localStorage.getItem(CLIENT_SECRET);

  const fetchResponse = await fetch(
    `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`,
    {
      method: 'POST',
    },
  );

  const data = await fetchResponse.json();
  const {
    access_token,
    refresh_token,
    athlete: { firstname, lastname },
  } = data;

  localStorage.setItem(ACCESS_TOKEN, access_token);
  localStorage.setItem(REFRESH_TOKEN, refresh_token);
  localStorage.setItem(FIRST_NAME, firstname);
  localStorage.setItem(LAST_NAME, lastname);

  const url = window.location.href;

  window.location.href = url.split('?')[0];
};

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
