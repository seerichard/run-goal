import { FC } from 'react';
import Form from './Form';

const getCodeParam = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('code');

  return codeParam;
};

const App: FC = () => {
  const code = getCodeParam();

  return code ? <div>Wow the code is: {code}</div> : <Form />;
};

export default App;
