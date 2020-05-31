import React, { FC, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';

import { Drones } from './Drones';
import { DronesStateType } from './redux/reducer';
import { dronesUpdate, DronesUpdatePayload, dronePatch, droneCreate, droneDelete } from './redux/actions';
import { StateType } from '../../common/redux/reducer';

interface DronesContainerProps {
    location: {
        search: string,
    },
    dronesState: DronesStateType,
    dronesUpdate: typeof dronesUpdate,
    dronePatch: typeof dronePatch,
    droneCreate: typeof droneCreate,
    droneDelete: typeof droneDelete,
};

export interface DronesUrlParams {
    page?: number,
    favoritesOnly?: boolean,
    create?: boolean,
}

export const DronesContainer: FC<DronesContainerProps> = ({ dronesState, dronesUpdate, dronePatch, droneCreate, droneDelete, location: { search } }) => {
    const { loading, inited, page, filters: { isFavorite } } = dronesState;

    const urlParams: DronesUrlParams = useMemo(
        () => parse(search, { parseNumbers: true, parseBooleans: true }),
        [search]
    );
    const { page: urlPage = 1, favoritesOnly } = urlParams;

    useEffect(() => {
        if (loading) {
            return;
        }

        const changedFavorites = (favoritesOnly && isFavorite !== true) || (!favoritesOnly && isFavorite !== undefined);

        if (!inited || page !== urlPage || changedFavorites) {
            const params: DronesUpdatePayload = { page: urlPage };

            if (favoritesOnly) {
                params.isFavorite = true;
            }

            dronesUpdate(params);
        }
    }, [inited, loading, dronesUpdate, page, urlPage, favoritesOnly, isFavorite]);

    const refreshDronesList = useCallback(() => {
        dronesUpdate({ page, isFavorite });
    }, [dronesUpdate, page, isFavorite]);

    return (
        <Drones
            urlParams={urlParams}
            dronesState={dronesState}
            dronePatch={dronePatch}
            droneCreate={droneCreate}
            droneDelete={droneDelete}
            refreshDronesList={refreshDronesList}
        />
    );
};

function mapStateToProps(state: StateType) {
    return {
        dronesState: state.drones,
    };
}

const mapDispatchToProps: any = {
    dronesUpdate,
    dronePatch,
    droneCreate,
    droneDelete,
};

export const DronesConnected = connect(mapStateToProps, mapDispatchToProps)(DronesContainer);
