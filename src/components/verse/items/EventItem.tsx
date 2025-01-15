import React from 'react';
import {
    EventItemProps,
    CategoryDto,
    LocationDto,
    PresenterDto,
} from '../../../types';
import { formatDate } from '../../../utils';

interface EnhancedEventItemProps extends EventItemProps {
    categories: CategoryDto[];
    locations: LocationDto[];
    presenters: PresenterDto[];
}

export const EventItem: React.FC<EnhancedEventItemProps> = (props) => {
    const {
        name,
        description,
        locationId,
        categoryId,
        presenterIds,
        start,
        end,
        onEdit,
        onDelete,
        categories,
        locations,
        presenters,
    } = props;

    const locationName =
        locations.find((location) => location.id === locationId)?.name ||
        'Unknown Location';
    const categoryName =
        categories.find((category) => category.id === categoryId)?.name ||
        'Unknown Category';
    const presenterNames = presenterIds
        .map((id) => presenters.find((presenter) => presenter.id === id)?.name)
        .filter(Boolean)
        .join(', ');

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="text-sm text-gray-500">{description}</p>
                <div className="text-sm mt-4 space-y-2">
                    <p>
                        <strong>Location:</strong> {locationName}
                    </p>
                    <p>
                        <strong>Category:</strong> {categoryName}
                    </p>
                    <p>
                        <strong>Presenters:</strong> {presenterNames || 'None'}
                    </p>
                    <p>
                        <strong>Start:</strong> {formatDate(start)}
                    </p>
                    <p>
                        <strong>End:</strong> {formatDate(end)}
                    </p>
                </div>
                <div className="card-actions justify-end mt-4">
                    <button onClick={onEdit} className="btn btn-sm btn-primary">
                        Edit
                    </button>
                    <button onClick={onDelete} className="btn btn-sm btn-error">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
