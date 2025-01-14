import React from 'react';
import BaseItem from './BaseItem';
import { CategoryItemProps } from '../../../types';

export const CategoryItem: React.FC<CategoryItemProps> = (props) => {
    return <BaseItem {...props} />;
};
