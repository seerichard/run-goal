import { FC } from 'react';
import Form from './Form';

const getCodeParam = () => {
  const urlParams = new URLSearchParams(window.location.search);

  console.log('urlParams:', urlParams);
  const codeParam = urlParams.get('code');

  return codeParam;
};

type Token = (code: string) => Promise<void>;

// This fetches the Access and Refresh tokens required to pull athlete data
const getTokens: Token = async (code: string) => {
  const clientId = sessionStorage.getItem('clientId');
  const clientSecret = sessionStorage.getItem('clientSecret');

  const fetchResponse = await fetch(
    `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`,
    {
      method: 'POST',
    },
  );

  const data = await fetchResponse.json();

  localStorage.setItem('accessToken', data.access_token);
  localStorage.setItem('refreshToken', data.refresh_token);

  sessionStorage.removeItem('clientId');
  sessionStorage.removeItem('clientSecret');

  console.log('My tokens!', data);

  const url = window.location.href;

  window.location.href = url.split('?')[0];
};

const App: FC = () => {
  const code = getCodeParam();

  console.log('window hostname:', window.location.hostname);
  console.log('window pathname:', window.location.pathname);

  if (code) {
    getTokens(code)
      .then(() => console.log('Done'))
      .catch(() => console.log('Catching'));
  }

  return code ? <div>Wow the code is: {code}</div> : <Form />;
};

export default App;
