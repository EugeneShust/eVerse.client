import React from 'react';
import { ListComponentProps } from '../../types';

export function ListComponent<T extends { id: string }>({ items, renderItem }: ListComponentProps<T>) {
    console.log("ListComponent.items:", items)
    return (
        <div>
            {items.length > 0 ? (
                items.map((item) => (
                    <div key={item.id}>{renderItem(item)}</div>
                ))
            ) : (
                <p>No items available.</p>
            )}
        </div>
    );
}
