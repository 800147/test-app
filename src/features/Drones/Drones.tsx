import React, { FC, useMemo, useCallback } from 'react';
import { stringify } from 'query-string';
import { Checkbox } from 'primereact/checkbox';
import { useHistory } from 'react-router-dom';

import { Drone } from './components/Drone/Drone';
import { DronesStateType } from './redux/reducer';
import { DronesUrlParams } from './Drones.container';
import { Page } from '../../common/components/Page/Page';
import { Error } from '../../common/components/Error/Error';
import { ButtonLink } from '../../common/components/ButtonLink/ButtonLink';
import { dronePatch, droneCreate, droneDelete } from './redux/actions'
import { Pagination } from '../../common/components/Pagination/Pagination';
import { PAGE_SIZE } from './redux/actions';
import { NewDronePopup } from './components/NewDronePopup/NewDronePopup';
import './Drones.css';

interface DronesProps {
    dronesState: DronesStateType,
    urlParams: DronesUrlParams,
    dronePatch: typeof dronePatch,
    droneCreate: typeof droneCreate,
    droneDelete: typeof droneDelete,
    refreshDronesList: () => void,
};

export const Drones: FC<DronesProps> = ({
    dronesState: { data, loading, error, inited },
    urlParams,
    dronePatch,
    droneCreate,
    droneDelete,
    refreshDronesList,
}) => {
    const { create, favoritesOnly } = urlParams;

    const history = useHistory();

    const newUrl = useMemo(() => `?${stringify({ ...urlParams, create: true })}`, [urlParams]);

    const onFavoritesFilterChange = useCallback(() => {
        if (urlParams.favoritesOnly) {
            const { favoritesOnly, ...newParams } = urlParams;
            newParams.page = 1;
            history.replace(`?${stringify(newParams)}`);

            return;
        }

        history.replace(`?${stringify({ ...urlParams, favoritesOnly: true, page: 1 })}`);
    }, [urlParams, history]);

    return (
        <Page title="Drones" className="Drones" loading={loading}>
            <div className="Drones-Filters">
                <Checkbox inputId="favoriteDrones" onChange={onFavoritesFilterChange} checked={favoritesOnly}></Checkbox>
                <label htmlFor="favoriteDrones" className="p-checkbox-label">Only favorite</label>
            </div>
            {
                error &&
                    <Error className="Drones-Error">{String(error)}</Error>
            }
            {
                data.map(({ id, name, isFavorite }) => (
                    <Drone
                        className="Drones-Drone"
                        key={id}
                        id={id}
                        name={name}
                        loading={loading}
                        error={error}
                        isFavorite={isFavorite}
                        dronePatch={dronePatch}
                        droneDelete={droneDelete}
                        refreshDronesList={refreshDronesList}
                    />
                ))
            }
            {
                inited && data && !data.length &&
                    <div className="Drones-Empty">Nothing here</div>
            }
            <div className="Drones-Footer">
                <Pagination urlParams={urlParams} isLastPage={!data || data.length < PAGE_SIZE} />
                <ButtonLink to={newUrl} className="Drones-NewButton" icon="pi pi-plus">New drone</ButtonLink>
            </div>
            {
                create &&
                    <NewDronePopup
                        urlParams={urlParams}
                        droneCreate={droneCreate}
                        loading={loading}
                        error={error}
                        refreshDronesList={refreshDronesList}
                    />
            }
        </Page>
    );
};
