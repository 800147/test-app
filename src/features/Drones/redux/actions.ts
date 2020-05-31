import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { stringify } from 'query-string';
import { DroneType } from '../redux/reducer';

export const PAGE_SIZE = 5;

export const DRONES_SET = 'test-project/DRONES_SET';
export const DRONE_DATA_SET = 'test-project/DRONE_DATA_SET';
export const DRONES_UPDATE = 'test-project/DRONES_UPDATE';

export interface DronesSetPayload {
    inited?: boolean,
    loading?: boolean,
    error?: null | Error,
    page?: number,
    data?: Array<any>,
    filters?: {
        isFavorite?: boolean,
    }
};

export const dronesSet = createAction<DronesSetPayload>(DRONES_SET);

export type DroneDataSetPayload = DroneType;

export const droneDataSet = createAction<DroneDataSetPayload>(DRONE_DATA_SET);

export interface DronesUpdatePayload {
    page?: number,
    isFavorite?: boolean,
};

export interface DronesUpdateParams {
    _page?: number,
    _limit?: number,
    isFavorite?: boolean,
};

export const dronesUpdate = (payload: DronesUpdatePayload) => (dispatch: Dispatch) => {
    const { page, isFavorite } = payload;
    const filters = { isFavorite };

    const params:DronesUpdateParams = {};

    if (page !== undefined) {
        params._page = page;
        params._limit = PAGE_SIZE;
    }

    if (isFavorite !== undefined) {
        params.isFavorite = isFavorite;
    }

    dispatch(dronesSet({
        loading: true,
        error: null,
    }));

    fetch(`/drones?${stringify(params)}`, { method: 'GET' })
        .then(
            (res: Response) => {
                if (res.status !== 200) {
                    return Promise.reject(new Error(`Bad request status: ${res.status}`))
                }

                return res.json();
            }
        )
        .then(
            data => dispatch(dronesSet({
                page,
                filters,
                data,
                loading: false,
                inited: true,
            }))
        )
        .catch(
            (error: Error) => {
                console.error(error);

                dispatch(dronesSet({
                    page,
                    filters,
                    error,
                    loading: false,
                    inited: true,
                }))
            }
        );
};

export interface DronesPatchPayload {
    id: number,
    isFavorite: boolean,
};

export const dronePatch = ({ id, isFavorite }: DronesPatchPayload) => (dispatch: Dispatch) => {
    dispatch(dronesSet({
        loading: true,
        error: null,
    }));

    fetch(`/drones/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isFavorite,
        }),
    })
        .then(
            (res: Response) => {
                if (res.status !== 200) {
                    return Promise.reject(new Error(`Bad request status: ${res.status}`))
                }

                return res.json();
            }
        )
        .then((data: DroneType) => {
            dispatch(droneDataSet(data));
        })
        .then(() => {
            dispatch(dronesSet({
                loading: false,
            }));
        })
        .catch(
            (error: Error) => {
                console.error(error);

                dispatch(dronesSet({
                    error,
                    loading: false,
                }))
            }
        );
};

export interface DroneCreatePayload {
    name: string,
};

export const droneCreate = ({ name }: DroneCreatePayload) => (dispatch: Dispatch) => {
    dispatch(dronesSet({
        loading: true,
        error: null,
    }));

    fetch(`/drones`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            isFavorite: false,
        }),
    })
        .then(
            (res: Response) => {
                if (res.status !== 201) {
                    return Promise.reject(new Error(`Bad request status: ${res.status}`))
                }

                return res.json();
            }
        )
        .then(() => {
            dispatch(dronesSet({
                loading: false,
            }));
        })
        .catch(
            (error: Error) => {
                console.error(error);

                dispatch(dronesSet({
                    error,
                    loading: false,
                }))
            }
        );
};

export type DroneDeletePayload = number;

export const droneDelete = (id: DroneDeletePayload) => (dispatch: Dispatch) => {
    dispatch(dronesSet({
        loading: true,
        error: null,
    }));

    fetch(`/drones/${id}`, {
        method: 'DELETE',
    })
        .then(
            (res: Response) => {
                if (res.status !== 200) {
                    return Promise.reject(new Error(`Bad request status: ${res.status}`))
                }

                return res.json();
            }
        )
        .then(() => {
            dispatch(dronesSet({
                loading: false,
            }));
        })
        .catch(
            (error: Error) => {
                console.error(error);

                dispatch(dronesSet({
                    error,
                    loading: false,
                }))
            }
        );
};
