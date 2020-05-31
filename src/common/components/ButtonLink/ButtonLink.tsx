import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { ComponentProps } from '../../types';
import './ButtonLink.css';

interface ButtonLinkProps extends ComponentProps, LinkProps {
    icon?: string,
    label?: string,
};

export const ButtonLink: FC<ButtonLinkProps> = ({
    className,
    icon,
    children,
    ...restProps
}) => {
    const iconMod = icon ? 'p-button-text-icon-left' : 'p-button-text-only';

    return (
        <Link className={`ButtonLink p-button p-component ${iconMod} ${className}`} {...restProps}>
            { icon && <span className={`ButtonLink-Icon p-c p-button-icon-left ${icon}`} /> }
            <span className={`ButtonLink-Content p-button-text p-c`}>{ children }</span>
        </Link>
    );
};
