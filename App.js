import React from 'react';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';
import WebFont from 'webfontloader';

const App = () => {
  return (
    <MainProvider>
      <Navigator />
    </MainProvider>
  );
};

export default App;
