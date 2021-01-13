type GetTokensProps = {
  clientId: string;
  clientSecret: string;
  code: string;
};

/**
 * Gets the initial refresh and access tokens when app is first authorised
 */
export const getTokensUrl = ({
  clientId,
  clientSecret,
  code,
}: GetTokensProps): string =>
  `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`;

type RefreshTokenProps = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

/**
 * Refreshes the access token.
 * Best to call before fetching activities to ensure the access token has not expired
 */
export const refreshTokenUrl = ({
  clientId,
  clientSecret,
  refreshToken,
}: RefreshTokenProps): string =>
  `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;

type GetActivitiesProps = {
  accessToken: string;
};

/**
 * Gets all activities logged in Strava for the year 2021.
 * This includes all non running activities.
 * Page limit set to 200 as that seems to be the maximum
 */
export const getActivitiesUrl = ({
  accessToken,
}: GetActivitiesProps): string => {
  // Current time - convert to seconds. Strava does not seem to accept milliseconds
  const BEFORE = Date.now() / 1000;

  //  January 1, 2021 12:00:00 AM
  const AFTER = 1609459200;

  // Setting to 200 activities per call. Seems to be the max amount
  // Look into pagination when I've done over 200 activities in a year
  return `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&before=${BEFORE}&after=${AFTER}&per_page=200`;
};
