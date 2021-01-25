/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getTokensUrl, refreshTokenUrl, getActivitiesUrl } from './url';
import { Authorize, Refresh, Activity } from './types';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  FIRST_NAME,
  LAST_NAME,
} from './constants';

// Fix any
type Token = (code: string) => any;

/**
 * Fetch initial user access token, refresh token, first name and last name
 * then store in local storage.
 * Once completed, clear url and push user to home
 */
export const getTokens: Token = async (code: string) => {
  const response = await fetch(getTokensUrl({ code }), {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();

    throw error;
  }

  const data: Authorize = await response.json();
  const {
    access_token,
    refresh_token,
    athlete: { firstname, lastname },
  } = data;

  access_token && localStorage.setItem(ACCESS_TOKEN, access_token);
  refresh_token && localStorage.setItem(REFRESH_TOKEN, refresh_token);
  localStorage.setItem(FIRST_NAME, firstname);
  localStorage.setItem(LAST_NAME, lastname);

  return true;
};

type VoidReturn = () => Promise<void>;

/**
 * Refresh the access token and store in local storage
 */
export const refreshToken: VoidReturn = async () => {
  const clientId = localStorage.getItem(CLIENT_ID)!;
  const clientSecret = localStorage.getItem(CLIENT_SECRET)!;
  const refreshToken = localStorage.getItem(REFRESH_TOKEN)!;

  const response = await fetch(
    refreshTokenUrl({
      clientId,
      clientSecret,
      refreshToken,
    }),
    {
      method: 'POST',
    },
  );

  // Add data type
  const data: Refresh = await response.json();
  const { access_token } = data;

  localStorage.setItem(ACCESS_TOKEN, access_token);
};

type Runs = () => Promise<Activity[]>;

/**
 * Return an array of Run activities
 */
export const getRuns: Runs = async () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)!;
  const RUN = 'Run';

  const response = await fetch(getActivitiesUrl({ accessToken }));

  const data: Activity[] = await response.json();

  // Filter out all non run activities
  const runData = data.filter(({ type }: { type: string }) => type === RUN);

  return runData;
};
