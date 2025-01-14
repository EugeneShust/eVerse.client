import React from 'react';

export const CategoriesContent = ({ categories, onCategoryClick }) => {
    return (
        <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="space-y-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="border rounded p-4 bg-white cursor-pointer hover:shadow"
                        onClick={() => onCategoryClick(category)}
                    >
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};