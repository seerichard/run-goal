/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getTokensUrl, refreshTokenUrl, getActivitiesUrl } from './url';
import { Authorize, Refresh, Activity } from './types';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  FIRST_NAME,
  LAST_NAME,
} from './constants';

type Token = (code: string) => Promise<Error | true>;

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
    const error: Error = await response.json();

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
  firstname && localStorage.setItem(FIRST_NAME, firstname);
  lastname && localStorage.setItem(LAST_NAME, lastname);

  return true;
};

type RefreshToken = () => Promise<Error | true>;

/**
 * Refresh the access token and store in local storage
 */
export const refreshToken: RefreshToken = async () => {
  const response = await fetch(refreshTokenUrl(), {
    method: 'POST',
  });

  if (!response.ok) {
    const error: Error = await response.json();

    throw error;
  }

  // Add data type
  const data: Refresh = await response.json();
  const { access_token } = data;

  localStorage.setItem(ACCESS_TOKEN, access_token);

  return true;
};

type Runs = () => Promise<Error | Activity[]>;

/**
 * Return an array of Run activities
 */
export const getRuns: Runs = async () => {
  const RUN = 'Run';

  const response = await fetch(getActivitiesUrl());

  if (!response.ok) {
    const error: Error = await response.json();

    throw error;
  }

  const data: Activity[] = await response.json();

  // Filter out all non run activities
  const runData = data?.filter(({ type }: { type: string }) => type === RUN);

  return runData;
};
