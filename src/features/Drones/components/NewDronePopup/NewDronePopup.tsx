import React, { FC, useMemo, useCallback, FormEvent, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { Spinner } from '../../../../common/components/Spinner/Spinner';
import { ComponentProps } from '../../../../common/types';
import { DronesUrlParams } from '../../Drones.container';
import { droneCreate } from '../../redux/actions';
import './NewDronePopup.css';

interface NewDronePopupProps extends ComponentProps {
    urlParams: DronesUrlParams,
    droneCreate: typeof droneCreate,
    loading: boolean,
    error: null | Error,
    refreshDronesList: () => void,
};

const footer = (
    <div className="NewDronePopup-Footer">
        <Button label="Create" icon="pi pi-check" type="submit" form="newDroneForm" />
    </div>
);

export const NewDronePopup: FC<NewDronePopupProps> = ({
    className,
    urlParams,
    droneCreate,
    loading,
    error,
    refreshDronesList,
}) => {
    const [ name, setName ] = useState('');

    const [ waitToClose, setWaitToClose ] = useState(false);

    const history = useHistory();

    const closeUrl = useMemo(
        () => {
            const { create, ...restParams } = urlParams;

            return `?${stringify(restParams)}`;
        },
        [urlParams]
    );

    const close = useCallback(() => history.replace(closeUrl), [closeUrl, history]);

    const onSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();

        droneCreate({ name });
        setWaitToClose(true);
    }, [name, droneCreate, setWaitToClose]);

    const onNameChange = useCallback((event: FormEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }, [setName]);

    useEffect(() => {
        if (waitToClose && !loading) {
            setWaitToClose(false);
            close();
            if (!error) {
                refreshDronesList();
            }
        }
    }, [waitToClose, loading, setWaitToClose, close, refreshDronesList, error]);

    return (
        <Dialog
            className={`NewDronePopup ${className}`}
            header="New drone"
            footer={footer}
            onHide={close}
            visible
            modal
        >
            { waitToClose && <Spinner /> }
            <form onSubmit={onSubmit} id="newDroneForm">
                <span className="p-float-label">
                    <InputText className="NewDronePopup-Name" id="newDroneFormName" value={name} onChange={onNameChange} />
                    <label htmlFor="newDroneFormName">Drone name</label>
                </span>
            </form>
        </Dialog>
    );
};
