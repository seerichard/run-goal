import type { FC } from 'react';
import type { Activity } from '../../types/activity';
import Goal from './Goal';
import Card from './Card';
import {
  convertTo2DP,
  runningTime,
  averageDistance,
  kmPerWeek,
  averagePace,
  timeToCompleteGoal,
} from './utils';

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

  return (
    <>
      <Goal totalDistance={convertTo2DP(totalDistanceKm)} />
      <Card
        title="Year To Date"
        data={{
          'Runs': runs,
          'Time': runningTime(movingTime),
          'Elevation Gain': `${convertTo2DP(elevationGain)}m`,
        }}
        first={true}
      />
      <Card
        title="Stats"
        data={{
          'Remaining Km': `${convertTo2DP(remainingKm)}km`,
          'Avg distance per run': `${convertTo2DP(
            averageDistance(totalDistanceMetres, runs),
          )}km`,
          'Avg pace': averagePace(runData, runs),
          'Avg Km per week to complete': `${convertTo2DP(
            kmPerWeek(remainingKm),
          )}km`,
          'Time to complete': timeToCompleteGoal(runData, runs, remainingKm),
        }}
      />
    </>
  );
};

export default Info;
