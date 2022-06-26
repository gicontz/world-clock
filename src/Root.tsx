import React, { FunctionComponent } from 'react';
import MainView from './views/MainView';
import { ThemeProvider } from 'styled-components';
import ClockProvider from './providers/clock';
import { useClock } from './modules/clock/actions';

const Root: FunctionComponent = () => {
  const [store, dispatch] = useClock();

  return (
    <ThemeProvider theme={{}}>
      <ClockProvider.Provider value={{ store, dispatch }}>
        <MainView />
      </ClockProvider.Provider>
    </ThemeProvider>
  )
}

export default Root;
