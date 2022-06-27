import React, { useReducer } from 'react';
import { clock } from './reducer';
import { defaultState } from '../../providers/clock';
import { Actions, ClockPosition, ClockState, ClockTypes, TCreateClock, TTheme, TTimeZoneApiResponse } from './types';
import { timeZone, TimeZones, TTimeZonelist } from '../../constants/timeZones';
import { Layout } from 'react-grid-layout';
import { api } from '../../helpers/api';

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

export const setTheme = (data: TTheme, dispatch: React.Dispatch<ClockTypes>) => {
    dispatch({ type: Actions.SET_THEME, payload: data });
}

export const getAllTimeZones = async (dispatch: React.Dispatch<ClockTypes>) => {
    const tzs = Object.keys(TimeZones);
    const theTimeZones: Partial<TTimeZonelist> = {};

    await Promise.all(tzs.map(async (tz) => {
        try {
            const { data }: { data: TTimeZoneApiResponse } = await api({
                method: 'get',
                url: `/${tz}`
            });

            theTimeZones[tz as timeZone] = {
                abbrev: data.abbreviation,
                offset: (data.raw_offset + data.dst_offset) / 60,
                timeZone: tz
            }
        } catch (e) {
            //ignore
        }
    }));

    dispatch({ type: Actions.GET_TIME_ZONES, payload: theTimeZones as TTimeZonelist });
}