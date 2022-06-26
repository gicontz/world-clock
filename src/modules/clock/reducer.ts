import update from 'immutability-helper';
import { defaultState } from '../../providers/clock';
import { Actions, ClockPosition, ClockState, ClockTypes } from './types';

export function clock(state = defaultState.store, action: ClockTypes): ClockState {
    switch (action.type) {
        case Actions.CREATE_NEW_CLOCK_START: {
            const indx = state.clocks.findIndex(({ position }) => position === action.payload);

            return update(state, {
                clocks: {
                    [indx]: {
                        $merge: { timeZone: 'Asia/Singapore', position: action.payload, editMode: true }
                    }
                }
            })
        }
        case Actions.CREATE_NEW_CLOCK_FULFILLED: {
            const indx = state.clocks.findIndex(({ position }) => position === action.payload.position);

            return update(state, {
                clocks: {
                    [indx]: {
                        $merge: { ...action.payload, editMode: false }
                    }
                }
            })
        }
        case Actions.DELETE_CLOCK: {
            const indx = state.clocks.findIndex(({ position }) => position === action.payload);
            return update(state, {
                clocks: {
                    [indx]: {
                        $merge: { timeZone: null, position: action.payload , editMode: false }
                    }
                }
            })
        }
        case Actions.SET_DATE_TIME: {
            return {
                ...state,
                dateTime: action.payload,
            }
        }
        case Actions.CHANGE_LAYOUT: {
            const layout = action.payload;
            
            return update(state, {
                clocks: {
                    $set: [...layout.map(({ x }, i) => ({
                        timeZone: state.clocks[i].timeZone,
                        position: x as ClockPosition,
                        editMode: state.clocks[i].editMode
                    }))]
                }
            })
        }
        default: 
            return state;
    }
}