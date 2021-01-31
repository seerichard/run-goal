import type { FC } from 'react';
import type { Activity } from '../../types/activity';
import Goal from './Goal';
import Card from './Card';

type InfoProps = {
  runData: Activity[];
};

const Info: FC<InfoProps> = ({ runData }) => {
  const runs = runData.length;
  const movingTime = runData.reduce(
    (acc, { moving_time }) => acc + moving_time,
    0,
  );

  const h = Math.floor(movingTime / 3600);
  const m = Math.floor((movingTime % 3600) / 60);

  const elevationGain = runData.reduce(
    (acc, { total_elevation_gain }) => acc + total_elevation_gain,
    0,
  );

  return (
    <>
      <Goal runData={runData} />
      <Card
        title="Year To Date"
        data={{
          'Runs': runs,
          'Time': `${h}h ${m}m`,
          'Elevation Gain': `${elevationGain}m`,
        }}
      />
    </>
  );
};

export default Info;
