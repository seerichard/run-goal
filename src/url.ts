type GetTokensProps = {
  clientId: string;
  clientSecret: string;
  code: string;
};

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

export const refreshTokenUrl = ({
  clientId,
  clientSecret,
  refreshToken,
}: RefreshTokenProps): string =>
  `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;

type GetActivitiesProps = {
  accessToken: string;
};

// Setting to 200 activities per call. Seems to be the max amount
// Look into pagination when I've done over 200 activities in a year
export const getActivitiesUrl = ({ accessToken }: GetActivitiesProps): string =>
  `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&per_page=200`;
