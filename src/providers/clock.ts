import { createContext, useContext } from 'react';

import { ClockState, ClockTypes } from '../modules/clock/types';
import { cookies } from '../helpers/cookie';
import { CLOCKS_COOKIE_KEY, THEME_COOKIE_KEY } from '../constants/app';

export const defaultClocks = [
  {
    timeZone: null,
    position: 0,
  }, {
    timeZone: null,
    position: 1,
  }, {
    timeZone: null,
    position: 2,
  }, {
    timeZone: null,
    position: 3,
  }
];

export const defaultState = {
  store: {
    clocks: cookies.get(CLOCKS_COOKIE_KEY) || defaultClocks,
    dateTime: new Date(),
    theme: cookies.get(THEME_COOKIE_KEY) as 'dark' | 'default',
  } as ClockState,
  dispatch: (a: ClockTypes): void => {},
};

const clockContext = createContext(defaultState);

export const useClockContext = (): typeof defaultState => useContext(clockContext);

export default clockContext;