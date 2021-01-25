import {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
} from './constants';

type AuthorizeProps = {
  clientId: string;
  redirectUrl: string;
};

/**
 * Creates the URL to redirect the user to authorise this app
 */
export const authorizeUrl = ({
  clientId,
  redirectUrl,
}: AuthorizeProps): string =>
  `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=activity:read_all`;

type GetTokensProps = {
  code: string;
};

/**
 * Gets the initial refresh and access tokens when app is first authorised
 */
export const getTokensUrl = ({ code }: GetTokensProps): string => {
  const clientId = localStorage.getItem(CLIENT_ID);
  const clientSecret = localStorage.getItem(CLIENT_SECRET);

  return `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`;
};

/**
 * Refreshes the access token.
 * Best to call before fetching activities to ensure the access token has not expired
 */
export const refreshTokenUrl = (): string => {
  const clientId = localStorage.getItem(CLIENT_ID);
  const clientSecret = localStorage.getItem(CLIENT_SECRET);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  return `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
};

/**
 * Gets all activities logged in Strava for the year 2021.
 * This includes all non running activities.
 * Page limit set to 200 as that seems to be the maximum
 */
export const getActivitiesUrl = (): string => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  // Current time - convert to seconds. Strava does not seem to accept milliseconds
  const BEFORE = Date.now() / 1000;

  //  January 1, 2021 12:00:00 AM
  const AFTER = 1609459200;

  // Setting to 200 activities per call. Seems to be the max amount
  // Look into pagination when I've done over 200 activities in a year
  return `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&before=${BEFORE}&after=${AFTER}&per_page=200`;
};
