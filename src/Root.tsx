import React, { FunctionComponent } from 'react';
import MainView from './views/MainView';
import { ThemeProvider } from 'styled-components';
import ClockProvider from './providers/clock';
import { useClock } from './modules/clock/actions';
import themes from './styles/theme/themes';

const Root: FunctionComponent = () => {
  const [store, dispatch] = useClock();

  return (
      <ClockProvider.Provider value={{ store, dispatch }}>
        <ThemeProvider theme={store.theme == 'dark' ? themes.dark : themes.default}>
          <MainView />
        </ThemeProvider>
      </ClockProvider.Provider>
  )
}

export default Root;
