import React, { FC } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

import { ComponentProps } from '../../types';
import './Spinner.css';

export const Spinner: FC<ComponentProps> = ({ className }) => (
    <ProgressSpinner className={`Spinner ${className}`} />
);
