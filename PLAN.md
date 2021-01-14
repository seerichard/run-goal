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

- Remove the eslint-disable in App.tsx
- Move the url redirect from API to TokenFetcher component and update comment
- Add types to run data
- Remove eslint-disable in api.ts
- Wrap API calls in try/catch instead of .then()
- Link to Strava docs
- Is there a way to safely store the client id and secret locally? - Required to refresh access token
- Look into Web Vitals
- Try using the Strava npm package https://www.npmjs.com/package/strava-v3
- Look into polyline
