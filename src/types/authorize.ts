type Athlete = {
  badge_type_id: number;
  city: string | null;
  country: string | null;
  created_at: string; // Date type instead? Get type complaints against mock data with Date
  firstname: string;
  follower: null;
  friend: null;
  id: number;
  lastname: string;
  premium: boolean;
  profile: string; // URL type instead? Get type complaints against mock data with URL
  profile_medium: string; // URL type instead? Get type complaints against mock data with URL
  resource_state: number;
  sex: 'M' | 'F';
  state: string | null;
  summit: boolean;
  updated_at: string; // Date type instead? Get type complaints against mock data with Date
  username: string | null;
};

export type Authorize = {
  access_token: string;
  athlete: Athlete;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string; // Can be improved
};
