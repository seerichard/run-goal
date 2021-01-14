type Athlete = {
  id: number;
  resource_state: number;
};

type Map = {
  id: string;
  summary_polyline: string;
  resource_state: number;
};

/**
 * Type declarations are known to be basic and serve the purpose of simple type
 * checking as most variables are not used for any calculation
 * Variables were taken from an API call to the /activities endpoint
 */
export type Activity = {
  resource_state: number;
  athlete: Athlete;
  name: string;
  distance: number; // Metres
  moving_time: number; // Seconds
  elapsed_time: number; // Seconds
  total_elevation_gain: number; // Metres
  type: string; // Can be improved to be an enum of accepted activity types
  workout_type: null; // Example docs have null
  id: number;
  external_id: string;
  upload_id: number;
  start_date: string; // Date type instead? Get type complaints against mock data with Date
  start_date_local: string; // Date type instead? Get type complaints against mock data with Date
  timezone: string; // Not sure this is correct
  utc_offset: number;
  start_latlng: [number, number];
  end_latlng: [number, number];
  location_city: null; // Example docs have null
  location_state: null; // Example docs have null
  location_country: null; // Example docs have null
  start_latitude: number;
  start_longitude: number;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string; // Can be improved to be an enum of accepted visibility types
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: boolean;
  upload_id_str: string;
  average_speed: number;
  max_speed: number;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
};
