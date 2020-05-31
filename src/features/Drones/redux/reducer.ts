import { Action, handleActions } from 'redux-actions';

import {
    DRONES_SET,
    DRONE_DATA_SET,
    DronesSetPayload,
    DroneDataSetPayload,
} from './actions';

export interface DronesStateType {
    inited: boolean,
    loading: boolean,
    error: null | Error,
    page: number,
    data: Array<DroneType>,
    filters: {
        isFavorite?: boolean,
    }
};

export interface DroneType {
    id: number,
    name: string,
    isFavorite: boolean,
};

const initialState:DronesStateType = {
    inited: false,
    loading: false,
    error: null,
    page: 1,
    data: [],
    filters: {},
};

export const dronesReducer = handleActions<DronesStateType, any>({
    [DRONES_SET]: (state: DronesStateType, { payload }: Action<DronesSetPayload>): DronesStateType => Object.assign({}, state, payload),
    [DRONE_DATA_SET]: (state: DronesStateType, { payload }: Action<DroneDataSetPayload>): DronesStateType => {
        const { data } = state;
        const index = data.findIndex(({ id }) => id === payload.id);

        if (index === -1) {
            return state;
        }

        const newData = [...data];
        newData[index] = payload;

        return Object.assign({}, state, { data: newData })
    },
}, initialState);
