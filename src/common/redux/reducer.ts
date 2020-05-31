import { combineReducers } from 'redux';

import { dronesReducer, DronesStateType } from '../../features/Drones/redux/reducer';

export const reducer = combineReducers({
    drones: dronesReducer,
});

export interface StateType {
    drones: DronesStateType,
};
