import type { FC } from 'react';
import differenceInDays from 'date-fns/differenceInDays';
import type { Activity } from '../../types/activity';
import Goal from './Goal';
import Card from './Card';

// FYI returns a string, not a number
const convertTo2DP = (number: number) => number.toFixed(2);

const runningTime = (movingTime: number): string => {
  // Time
  const hours = Math.floor(movingTime / 3600);
  const minutes = Math.floor((movingTime % 3600) / 60);

  return `${hours}h ${minutes}m`;
};

const kmPerWeek = (remainingKm: number): number => {
  // Difference in days between today and 1st January 2022
  const diff = differenceInDays(new Date(2022, 0, 1), Date.now());

  // Required distance per day to complete goal
  const kmPerDay = remainingKm / diff;

  // Required distance per week to complete goal
  return kmPerDay * 7;
};

const averagePace = (runData: Activity[], runs: number): string => {
  // In metres per second
  const averageOfaverageSpeeds =
    runData?.reduce((acc, { average_speed }) => acc + average_speed, 0) / runs;

  // 1 second per metre = 16.6666667 minutes per km
  const minutesPerKm = 16.6666667;

  const pace = minutesPerKm / averageOfaverageSpeeds;
  const min = Math.floor(pace);
  const secs = Math.round((pace - min) * 60);

  return `${min}:${secs} / km`;
};

type InfoProps = {
  runData: Activity[];
};

const Info: FC<InfoProps> = ({ runData }) => {
  const runs = runData.length;

  // Add all runs up
  const totalDistanceMetres =
    runData?.reduce((acc, { distance }) => acc + distance, 0) / 10;

  // Convert to Km
  const totalDistanceKm = totalDistanceMetres / 100;

  // Runs
  const movingTime = runData.reduce(
    (acc, { moving_time }) => acc + moving_time,
    0,
  );

  // Elevation Gain
  const elevationGain = runData.reduce(
    (acc, { total_elevation_gain }) => acc + total_elevation_gain,
    0,
  );

  // Km remaining to complete goal
  const remainingKm = 1000 - totalDistanceMetres / 100;

  /**
   * Metres per second * 60
   * Metres per minute 180.42    819.58
   *
   * 3 m/s / 1000
   * 0.003 km/s * 60
   * 0.18 km/m * 60
   * 944.22 Remaining km / 10.8 km/h
   * 87.43 Remaining h
   */

  // console.log('totalDistanceMetres:', totalDistanceMetres);

  return (
    <>
      <Goal totalDistance={convertTo2DP(totalDistanceKm)} />
      <Card
        title="Year To Date"
        data={{
          'Runs': runs,
          'Time': runningTime(movingTime),
          'Elevation Gain': `${elevationGain}m`,
        }}
        first={true}
      />
      <Card
        title="Stats"
        data={{
          'Remaining Km': `${convertTo2DP(remainingKm)}km`,
          'Avg Km per week to complete': `${convertTo2DP(
            kmPerWeek(remainingKm),
          )}km`,
          'Avg pace': averagePace(runData, runs),
        }}
      />
    </>
  );
};

export default Info;
