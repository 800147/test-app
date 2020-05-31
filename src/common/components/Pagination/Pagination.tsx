import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { stringify } from 'query-string';

import { ComponentProps } from '../../types';
import './Pagination.css';

interface PaginationProps extends ComponentProps {
    isLastPage?: boolean,
    urlParams: { page?: number },
};

export const Pagination: React.FC<PaginationProps> = ({ isLastPage, urlParams, className }) => {
    const { page = 1 } = urlParams;

    const nextUrl = useMemo(
        () => `?${stringify({...urlParams, page: page + 1})}`,
        [urlParams, page]
    );

    const prevUrl = useMemo(
        () => `?${stringify({...urlParams, page: page - 1})}`,
        [urlParams, page]
    );

    return (
        <div className={`Pagination ${className}`}>
            {
                page > 1 ?
                    <Link className="Pagination-Link" to={prevUrl}>{'<<'}</Link> :
                    <span className="Pagination-Link Pagination-Link_disabled">{'<<'}</span>
            }
            <span className="Pagination-Page">page {page}</span>
            {
                !isLastPage ?
                    <Link className="Pagination-Link" to={nextUrl}>{'>>'}</Link> :
                    <span className="Pagination-Link Pagination-Link_disabled">{'>>'}</span>
            }
        </div>
    );
};
