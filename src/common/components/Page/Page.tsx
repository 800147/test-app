import React, { FC } from 'react';

import { Spinner } from '../Spinner/Spinner';
import { Navigation } from '../Navigation/Navigation';
import { ComponentProps } from '../../types';
import './Page.css';

interface PageProps extends ComponentProps {
    title: string,
    loading?: boolean,
};

export const Page: FC<PageProps> = ({ title, children, className, loading }) => (
    <div className={`Page ${loading ? 'Page_loading' : ''} ${className}`}>
        <Navigation className="Page-Navigation" />
        <h1 className="Page-Title">{ title }</h1>
        <div className="Page-Content">
            { loading && <Spinner className="Page-Spinner" /> }
            { children }
        </div>
    </div>
);
