import React from 'react';
import BaseItem from './BaseItem';
import { LocationItemProps } from '../../../types';

export const LocationItem: React.FC<LocationItemProps> = (props) => {
    return <BaseItem {...props} />;
};
