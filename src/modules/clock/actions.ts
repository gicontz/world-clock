import React, { useReducer } from 'react';
import { clock } from './reducer';
import { defaultState } from '../../providers/clock';
import { Actions, ClockPosition, ClockState, ClockTypes, TCreateClock } from './types';
import { Layout } from 'react-grid-layout';

const initialState: ClockState = defaultState.store;

export const useClock = (): [ClockState, React.Dispatch<ClockTypes>] => {
    const [state, dispatch] = useReducer(clock, initialState);
    return [state, dispatch];
};

export const setDateTime = (dispatch: React.Dispatch<ClockTypes>) => {
    dispatch({ type: Actions.SET_DATE_TIME, payload: new Date() });
};

export const setupClock = (data: ClockPosition, dispatch: React.Dispatch<ClockTypes>) => {
    dispatch({ type: Actions.CREATE_NEW_CLOCK_START, payload: data });
}

export const createClock = (data: TCreateClock, dispatch: React.Dispatch<ClockTypes>) => {
    dispatch({ type: Actions.CREATE_NEW_CLOCK_FULFILLED, payload: data });
}

export const deleteClock = (data: ClockPosition, dispatch: React.Dispatch<ClockTypes>) => {
    dispatch({ type: Actions.DELETE_CLOCK, payload: data });
}

export const changeLayout = (data: Layout[], dispatch: React.Dispatch<ClockTypes>) => {
    dispatch({ type: Actions.CHANGE_LAYOUT, payload: data });
}