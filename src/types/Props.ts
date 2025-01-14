import React from 'react';
import {
    CategoryDto,
    PresenterDto,
    LocationDto,
    EventDto,
    BaseItemDto,
} from './Dtos';

export interface BaseProps extends BaseItemDto {
    onEdit: () => void;
    onDelete: () => void;
    children?: React.ReactNode;
}

export interface ListComponentProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

// Item props
export interface CategoryItemProps extends CategoryDto, BaseProps {}
export interface PresenterItemProps extends PresenterDto, BaseProps {}
export interface LocationItemProps extends LocationDto, BaseProps {}

export interface EventItemProps extends EventDto, BaseProps {}

// Form props
export interface BaseFormProps<T> {
    initialValues?: Partial<T>;
    onSubmit: (values: T) => void;
}

export type ItemFormProps = BaseFormProps<{
    id: string;
    name: string;
    description: string;
}>;

export type LocationFormProps = BaseFormProps<LocationDto>;
export type EventFormProps = BaseFormProps<EventDto> & {
    categories: CategoryDto[];
    locations: LocationDto[];
    presenters: PresenterDto[];
};

export interface AppPreviewProps {
    id: string;
    name: string;
    logo: string;
    start: string;
    end: string;
    isFavorite: boolean;
    onToggleFavorite: (id: string) =>  Promise<void>;
}

export interface EventContentProps {
    id: string;
    name: string;
    start: string;
    end: string;
    location: string;
    isFavorite: boolean;
    onClick: () => void;
    onToggleFavorite: (id: string) => Promise<void>;
}

export interface EventDetailsProps {
    event: {
        id: string;
        name: string;
        start: string;
        end: string;
        locationId: string;
        categoryId: string;
        presenterIds: string[];
        description?: string;
    };
    favorites: string[];
    onBack: () => void;
    onToggleFavorite: (id: string) => Promise<void>;
}
