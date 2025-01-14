import React from 'react';
import BaseItem from './BaseItem';
import { PresenterItemProps } from '../../../types';

export const PresenterItem: React.FC<PresenterItemProps> = (props) => {
    return <BaseItem {...props} />;
};
