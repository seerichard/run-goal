import type { FC } from 'react';
import type { Activity } from '../../types/activity';
import Goal from './Goal';

type InfoProps = {
  runData: Activity[];
};

const Info: FC<InfoProps> = ({ runData }) => <Goal runData={runData} />;

export default Info;
