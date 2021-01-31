import type { FC } from 'react';
import Form from './Form';
import TokenFetcher from './TokenFetcher';
import MainScreen from './main-screen';
import { REFRESH_TOKEN } from '../constants';

const getCodeParam = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('code');

  return codeParam;
};

const App: FC = () => {
  const code = getCodeParam();
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  return refreshToken ? (
    <MainScreen />
  ) : code ? (
    <TokenFetcher code={code} />
  ) : (
    <Form />
  );
};

export default App;
