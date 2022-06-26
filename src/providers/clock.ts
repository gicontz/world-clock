import { createContext, useContext } from 'react';

import { ClockState, ClockTypes } from '../modules/clock/types';

export const defaultState = {
  store: {
    clocks: [{
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
    }],
    dateTime: new Date(),
  } as ClockState,
  dispatch: (a: ClockTypes): void => {},
};

const clockContext = createContext(defaultState);

export const useClockContext = (): typeof defaultState => useContext(clockContext);

export default clockContext;