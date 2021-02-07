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
  `https://www.strava.com/api/v3/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=activity:read_all`;

type GetTokensProps = {
  code: string;
};

/**
 * Gets the initial refresh and access tokens when app is first authorised
 */
export const getTokensUrl = ({ code }: GetTokensProps): string => {
  const clientId = localStorage.getItem(CLIENT_ID);
  const clientSecret = localStorage.getItem(CLIENT_SECRET);

  return `https://www.strava.com/api/v3/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`;
};

/**
 * Refreshes the access token.
 * Best to call before fetching activities to ensure the access token has not expired
 */
export const refreshTokenUrl = (): string => {
  const clientId = localStorage.getItem(CLIENT_ID);
  const clientSecret = localStorage.getItem(CLIENT_SECRET);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  return `https://www.strava.com/api/v3/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
};

/**
 * Gets all activities logged in Strava for the year 2021.
 * This includes all non running activities.
 * Page limit set to 200 as that seems to be the maximum
 */
export const getActivitiesUrl = (currentTime: number): string => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  //  January 1, 2021 12:00:00 AM
  const startOfYear = 1609459200;

  // Setting to 200 activities per call. Seems to be the max amount
  // Look into pagination when I've done over 200 activities in a year
  return `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&before=${currentTime}&after=${startOfYear}&per_page=200`;
};

/**
 * Gets an array of motivational quotes
 */
export const getQuotesUrl = 'https://type.fit/api/quotes';
