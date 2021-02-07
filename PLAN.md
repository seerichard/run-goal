# The Plan

## Work to be done

- Need a good name - Run Goal?
- CRA with TypeScript
- TypeScript - Find one online - use professional-ts one
- Styled Components
- Linting - AirBnb
- Deploy to GitHub Pages
- PWA style
  - Configure app manifest
  - Find an app icon
  - Running stick figure?
- Hook into Strava API
- Authentication and persistent login? Might have to store token in local storage/cookie
- React Router for auth process to get access and refresh token
- Fetch data using basic fetch , react-query , swr ?
- Clean data and store payload in React Context
- May need some animation library - start without one
- App shortcuts?
- Fun animation using accelerometer? https://www.youtube.com/watch?v=ppwagkhrZJs&ab_channel=Fireship

## Info to display

- x / 1000km run this year
- Last 3 runs
- Time required based on average pace
- Average number of km a week to complete goal
- Top 3 runs (distance)
- Elevation (total?)
- Average pace
- Total time running

## TODO

- Remove eslint-disable in Form.tsx
- Link to Strava docs
- Is there a way to safely store the client id and secret locally? - Required to refresh access token
- Look into Web Vitals
- Look into polyline
- Improve types and add error types for API calls
- Stop zooming in on input entry
- Doc on how to deploy
- Doc on how to get Client Id and Client Secret
- Add commit hash to app
- Save run data to give instant stale result
- Pass the bearer?
- Move body css stylings from createGlobalStyle to index.html
- Possibly memo data
- Decode polyline and display map
- Does <Info /> runData calculations need optional chaining?
- Add a footer
