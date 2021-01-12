import { FC } from 'react';
import Form from './Form';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  FIRST_NAME,
  LAST_NAME,
} from '../constants';

const getCodeParam = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('code');

  return codeParam;
};

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

const App: FC = () => {
  const code = getCodeParam();
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (code) {
    getTokens(code)
      .then(() => console.log('Done'))
      .catch(() => console.log('Catching'));
  }

  return refreshToken ? (
    <div>Token fetched</div>
  ) : code ? (
    <div>Wow the code is: {code}</div>
  ) : (
    <Form />
  );
};

export default App;
