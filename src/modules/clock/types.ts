import { Layout } from 'react-grid-layout';
import { timeZone as TTimeZone, TTimeZonelist } from '../../constants/timeZones';
import { Action } from '../../types/Action';

export enum Actions {
    CREATE_NEW_CLOCK_START = '@clock/CREATE_NEW_CLOCK_START',
    CREATE_NEW_CLOCK_FULFILLED = '@clock/CREATE_NEW_CLOCK_FULFILLED',
    DELETE_CLOCK = '@clock/DELETE_CLOCK',
    SET_DATE_TIME = '@clock/SET_DATE_TIME',
    CHANGE_LAYOUT = '@clock/CHANGE_LAYOUT',
    GET_TIME_ZONES = '@clock/GET_TIME_ZONES',
    SET_THEME = '@clock/SET_THEME',
};

export type ClockPosition =  0 | 1 | 2  | 3;

export type TTheme = 'default' | 'dark';

export type TCreateClock = {
    timeZone: TTimeZone;
    position: ClockPosition;
};

export type TClock = {
    timeZone: TTimeZone | null;
    position: ClockPosition;
    editMode?: boolean;
};

export type TTimeZoneApiResponse = {
    abbreviation: string;
    dst_offset: number;
    raw_offset: number;
}

export interface ClockState {
    clocks: TClock[];
    dateTime: Date;
    timeZones?: TTimeZonelist;
    theme: TTheme;
};

export type CreateNewClockRequest = Action<typeof Actions.CREATE_NEW_CLOCK_START, ClockPosition>;
export type CreateNewClockAction = Action<typeof Actions.CREATE_NEW_CLOCK_FULFILLED, TCreateClock>;
export type SetDateTime = Action<typeof Actions.SET_DATE_TIME, Date>;
export type DeleteClock = Action<typeof Actions.DELETE_CLOCK, ClockPosition>;
export type ChangeLayout = Action<typeof Actions.CHANGE_LAYOUT, Layout[]>;
export type GetTimeZones = Action<typeof Actions.GET_TIME_ZONES, TTimeZonelist>;
export type SetTheme = Action<typeof Actions.SET_THEME, TTheme>

export type ClockTypes = CreateNewClockRequest | CreateNewClockAction | SetDateTime | DeleteClock | ChangeLayout | GetTimeZones | SetTheme;