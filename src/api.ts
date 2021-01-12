import {
  CLIENT_ID,
  CLIENT_SECRET,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  FIRST_NAME,
  LAST_NAME,
} from './constants';

type Token = (code: string) => Promise<void>;

// This fetches the Access and Refresh tokens required to pull athlete data
export const getTokens: Token = async (code: string) => {
  const clientId = localStorage.getItem(CLIENT_ID);
  const clientSecret = localStorage.getItem(CLIENT_SECRET);

  const response = await fetch(
    `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`,
    {
      method: 'POST',
    },
  );

  const data = await response.json();
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

type VoidReturn = () => Promise<void>;

export const refreshToken: VoidReturn = async () => {
  const clientId = localStorage.getItem(CLIENT_ID);
  const clientSecret = localStorage.getItem(CLIENT_SECRET);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  const response = await fetch(
    `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
    {
      method: 'POST',
    },
  );

  const data = await response.json();
  const { access_token } = data;

  localStorage.setItem(ACCESS_TOKEN, access_token);
};

export const getActivities: VoidReturn = async () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const RUN = 'Run';

  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&per_page=200`,
  );

  const data = await response.json();
  const runData = data.filter(({ type }: { type: string }) => type === RUN);

  return runData;
};
