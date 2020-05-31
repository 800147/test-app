import React, { useRef, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/components/menuitem/MenuItem';

import { ComponentProps } from '../../types';

export const Navigation: React.FC<ComponentProps> = ({ className }) => {
    const history = useHistory();

    const menu = useRef<any>(null);

    const items: MenuItem[] = useMemo(() => ([
        {
            label: 'Flight plans',
            items: [
                { label: 'Plans list', icon: 'pi pi-fw pi-list', command: () => history.push('/flight-plans') },
                { label: 'New Plan', icon: 'pi pi-fw pi-plus', command: () => history.push('/flight-plans?create=true') },
            ],
        },
        {
            label: 'Drones',
            items: [
                { label: 'Drones list', icon: 'pi pi-fw pi-list', command: () => history.push('/drones') },
                { label: 'New Drone', icon: 'pi pi-fw pi-plus', command: () => history.push('/drones?create=true') },
            ],
        }
    ]), [history]);

    return (
        <div className={`Navigation ${className}`}>
            <Menu model={items} popup={true} ref={menu} id="popup_menu"/>
            <Button label="Menu" icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup={true}/>
        </div>
    )
};
