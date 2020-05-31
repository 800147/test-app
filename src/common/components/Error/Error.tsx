import React, { FC } from 'react';
import { Toolbar } from 'primereact/toolbar';

import { ComponentProps } from '../../types';
import './Error.css';

export const Error: FC<ComponentProps> = ({ className, children }) => (
    <Toolbar className={`Error ${className}`}>
        { children }
    </Toolbar>
);
