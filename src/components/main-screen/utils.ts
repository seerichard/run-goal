import differenceInDays from 'date-fns/differenceInDays';
import type { Activity } from '../../types/activity';

// FYI returns a string, not a number
export const convertTo2DP = (number: number): string => number.toFixed(2);

export const runningTime = (movingTime: number): string => {
  // Time
  const hours = Math.floor(movingTime / 3600);
  const minutes = Math.floor((movingTime % 3600) / 60);

  return `${hours}h ${minutes}m`;
};

export const averageDistance = (
  totalDistanceMetres: number,
  runs: number,
): number => totalDistanceMetres / runs / 100;

export const kmPerWeek = (remainingKm: number): number => {
  // Difference in days between today and 1st January 2022
  const diff = differenceInDays(new Date(2022, 0, 1), Date.now());

  // Required distance per day to complete goal
  const kmPerDay = remainingKm / diff;

  // Required distance per week to complete goal
  return kmPerDay * 7;
};

export const averagePace = (runData: Activity[], runs: number): string => {
  // In metres per second
  const averageOfaverageSpeeds =
    runData?.reduce((acc, { average_speed }) => acc + average_speed, 0) / runs;

  // 1 second per metre = 16.6666667 minutes per km
  const minutesPerKm = 16.6666667;

  const pace = minutesPerKm / averageOfaverageSpeeds;
  const mins = Math.floor(pace);
  const secs = Math.round((pace - mins) * 60);

  return `${mins}:${secs} / km`;
};

export const timeToCompleteGoal = (
  runData: Activity[],
  runs: number,
  remainingKm: number,
): string => {
  // In metres per second
  const averageOfAverageSpeeds =
    runData?.reduce((acc, { average_speed }) => acc + average_speed, 0) / runs;

  // 1 second per metre = 16.6666667 minutes per km
  const minutesPerKm = 16.6666667;

  const pace = minutesPerKm / averageOfAverageSpeeds;
  const totalTimeMinutes = remainingKm * pace;
  const rawHours = totalTimeMinutes / 60;
  const hours = Math.round(rawHours);
  const minutes = Math.round((rawHours - Math.floor(rawHours)) * 60);

  return `${hours}h ${minutes}m`;
};
