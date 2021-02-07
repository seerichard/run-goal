import type { FC } from 'react';
import useSWR from 'swr';
import Card from './Card';
import { getQuotes } from '../../api';
import { getQuotesUrl } from '../../url';

// SWR options
const options = {
  revalidateOnFocus: false,
  errorRetryCount: 3,
};

const Motivation: FC = () => {
  const { isValidating, data = [] } = useSWR(getQuotesUrl, getQuotes, options);

  if (isValidating) return <div>Loading</div>;

  const length = data?.length ?? 1;
  const randomNumber = Math.floor(Math.random() * length);
  const randomQuote = data[randomNumber] ?? {};
  // const { text = '', author = '' } = randomQuote;

  console.log(data);
  console.log(data?.length);

  console.log(randomQuote);

  return (
    <Card
      title="Motivation"
      data={{ [randomQuote.text]: '', '': randomQuote.author }}
    />
  );
};

export default Motivation;
