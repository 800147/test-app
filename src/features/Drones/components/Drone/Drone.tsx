import React, { FC, useCallback, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import { ComponentProps } from '../../../../common/types';
import { dronePatch, droneDelete } from '../../redux/actions';
import './Drone.css';

interface DroneProps extends ComponentProps {
    id: number,
    name: string,
    isFavorite: boolean,
    loading: boolean,
    error: null | Error,
    dronePatch: typeof dronePatch,
    droneDelete: typeof droneDelete,
    refreshDronesList: () => void,
}

export const Drone: FC<DroneProps> = ({ id, name, isFavorite, className, loading, error, dronePatch, droneDelete, refreshDronesList }) => {
    const [waitForRefresh, setWaitForRefresh] = useState(false);

    const favoriteButtonClick = useCallback(() => {
        dronePatch({ id, isFavorite: !isFavorite });
    }, [dronePatch, id, isFavorite]);

    const deleteButtonClick = useCallback(() => {
        droneDelete(id);
        setWaitForRefresh(true);
    }, [droneDelete, id, setWaitForRefresh]);

    useEffect(() => {
        if (waitForRefresh && !loading) {
            setWaitForRefresh(false);

            if (!error) {
                refreshDronesList();
            }
        }
    }, [waitForRefresh, loading, error, refreshDronesList]);

    return (
        <Toolbar className={`Drone ${className}`}>
            <div className="p-toolbar-group-left">
                <span className="Drone-Id">{id}</span>
                <span className="Drone-Name">{name}</span>
            </div>
            <div className="p-toolbar-group-right">
                {
                    isFavorite ?
                        <Button
                            className="Drone-FavoriteButton"
                            onClick={favoriteButtonClick}
                            icon="pi pi-star"
                        /> :
                        <Button
                            className="Drone-FavoriteButton p-button-secondary"
                            onClick={favoriteButtonClick}
                            icon="pi pi-star-o"
                        />
                }
                <Button
                    className="Drone-DeleteButton p-button-secondary"
                    onClick={deleteButtonClick}
                    icon="pi pi-trash"
                />
            </div>
        </Toolbar>
    )
};
