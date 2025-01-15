import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    ListComponent,
    VerseEditForm,
    ItemForm,
    LocationForm,
    EventForm,
    CategoryItem,
    PresenterItem,
    LocationItem,
    EventItem,
} from '../components';
import {
    getVerse,
    updateVerse,
    createVerseItem,
    updateVerseItem,
    deleteVerseItem,
} from '../services';

import { VerseCreateEditDto, VerseDto } from '../types';
import { useVerse } from '../hooks';

export function VerseEditPage() {
    const { verse, updateVerseState } = useVerse();

    const [activeItem, setActiveItem] = useState('verse');
    const [editingItem, setEditingItem] = useState<{
        type: string;
        item: any | null;
    }>({
        type: '',
        item: null,
    });

    const { id } = useParams();

    useEffect(() => {
        const getVerses = async () => {
            const data = await getVerse(id);
            updateVerseState(data);
        };

        getVerses();
    }, []);

    const handleEditItem = (type: string, item: any) => {
        setEditingItem({ type, item });
        const dialog = document.getElementById(
            'item-modal',
        ) as HTMLDialogElement;
        dialog?.showModal();
        //setIsFormVisible(true);
    };

    const handleDeleteItem = async (type: string, itemId: string) => {
        if (!verse) return;

        await deleteVerseItem(verse.id, type, itemId);

        updateVerseState({
            ...verse,
            [type]: verse[type].filter((item: any) => item.id !== itemId),
        });
    };

    const handleCreateItem = (type: string) => {
        // item: null - New Item!!!
        setEditingItem({ type, item: null });
        const dialog = document.getElementById(
            'item-modal',
        ) as HTMLDialogElement;
        dialog?.showModal();
        //setIsFormVisible(true);
    };

    const closeDialog = () => {
        const dialog = document.getElementById(
            'item-modal',
        ) as HTMLDialogElement;
        dialog?.close();
    };

    const handleItemFormSubmit = async (item: any) => {
        if (!verse || !editingItem.type) return;

        const type = editingItem.type as keyof Pick<
            VerseDto,
            'categories' | 'events' | 'locations' | 'presenters'
        >;

        try {
            if (item.id) {
                console.log('handleItemFormSubmit.item', item);
                console.log('handleItemFormSubmit.verse', verse);
                await updateVerseItem(verse.id, type, item);

                const updatedItems = verse[type].map((existingItem: any) =>
                    existingItem.id === item.id ? item : existingItem,
                );

                updateVerseState({
                    ...verse,
                    [type]: updatedItems,
                });

                console.log('handleItemFormSubmit.NewVerse', verse);
            } else {
                const newItemId = await createVerseItem(verse.id, type, item);
                item.id = newItemId;

                const updatedItems = [...verse[type], item];

                updateVerseState({
                    ...verse,
                    [type]: updatedItems,
                });
            }

            setEditingItem({ type: '', item: null });
            closeDialog();
        } catch (error) {
            console.error(
                `Failed to ${item.id ? 'update' : 'create'} item:`,
                error,
            );
        }
    };

    const handleVerseSubmit = async (verse: VerseCreateEditDto) => {
        try {
            const res = await updateVerse(id, verse);
            console.log('Verse successfully updated');
        } catch (error) {
            console.error('Failed to create Verse:', error);
        }
    };

    const renderContent = () => {
        if (!verse) return <p>Loading...</p>;

        switch (activeItem) {
            case 'verse':
                return (
                    <VerseEditForm onSubmit={handleVerseSubmit} data={verse} />
                );
            case 'categories':
                return (
                    <div>
                        <button
                            onClick={() => handleCreateItem('categories')}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
                        >
                            Create New Category
                        </button>
                        <ListComponent
                            items={verse?.categories || []}
                            renderItem={(category) => (
                                <CategoryItem
                                    {...category}
                                    onEdit={() =>
                                        handleEditItem('categories', category)
                                    }
                                    onDelete={() =>
                                        handleDeleteItem(
                                            'categories',
                                            category.id,
                                        )
                                    }
                                />
                            )}
                        />
                    </div>
                );
            case 'events':
                return (
                    <div>
                        <button
                            onClick={() => handleCreateItem('events')}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
                        >
                            Create New Event
                        </button>
                        <ListComponent
                            items={verse?.events || []}
                            renderItem={(event) => (
                                <EventItem
                                    {...event}
                                    onEdit={() =>
                                        handleEditItem('events', event)
                                    }
                                    onDelete={() =>
                                        handleDeleteItem('events', event.id)
                                    }
                                    categories={verse?.categories || []}
                                    locations={verse?.locations || []}
                                    presenters={verse?.presenters || []}
                                />
                            )}
                        />
                    </div>
                );
            case 'locations':
                return (
                    <div>
                        <button
                            onClick={() => handleCreateItem('locations')}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
                        >
                            Create New Location
                        </button>
                        <ListComponent
                            items={verse?.locations || []}
                            renderItem={(location) => (
                                <LocationItem
                                    {...location}
                                    onEdit={() =>
                                        handleEditItem('locations', location)
                                    }
                                    onDelete={() =>
                                        handleDeleteItem(
                                            'locations',
                                            location.id,
                                        )
                                    }
                                />
                            )}
                        />
                    </div>
                );
            case 'presenters':
                return (
                    <div>
                        <button
                            onClick={() => handleCreateItem('presenters')}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
                        >
                            Create New Presenter
                        </button>
                        <ListComponent
                            items={verse?.presenters || []}
                            renderItem={(presenter) => (
                                <PresenterItem
                                    {...presenter}
                                    onEdit={() =>
                                        handleEditItem('presenters', presenter)
                                    }
                                    onDelete={() =>
                                        handleDeleteItem(
                                            'presenters',
                                            presenter.id,
                                        )
                                    }
                                />
                            )}
                        />
                    </div>
                );
            default:
                return <div>Select a menu item to see its content</div>;
        }
    };

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full">
                    <div className="flex-none">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Navbar Title</div>
                </div>
                {/* Page content */}
                <div className="p-4">
                    {renderContent()}

                    <dialog
                        id="item-modal"
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">
                                {editingItem.item
                                    ? `Edit ${getSingularType(editingItem.type)}`
                                    : `Create New ${getSingularType(editingItem.type)}`}
                            </h3>
                            <div className="py-4">
                                {editingItem.type === 'categories' && (
                                    <ItemForm
                                        initialValues={
                                            editingItem.item || undefined
                                        }
                                        onSubmit={handleItemFormSubmit}
                                    />
                                )}
                                {editingItem.type === 'presenters' && (
                                    <ItemForm
                                        initialValues={
                                            editingItem.item || undefined
                                        }
                                        onSubmit={handleItemFormSubmit}
                                    />
                                )}
                                {editingItem.type === 'locations' && (
                                    <LocationForm
                                        initialValues={
                                            editingItem.item || undefined
                                        }
                                        onSubmit={handleItemFormSubmit}
                                    />
                                )}

                                {editingItem.type === 'events' && verse && (
                                    <EventForm
                                        initialValues={editingItem.item || {}}
                                        onSubmit={handleItemFormSubmit}
                                        categories={verse.categories}
                                        locations={verse.locations}
                                        presenters={verse.presenters}
                                    />
                                )}
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content */}
                    <li>
                        <a onClick={() => setActiveItem('verse')}>General</a>
                    </li>
                    <li>
                        <a onClick={() => setActiveItem('events')}>Events</a>
                    </li>
                    <li>
                        <a onClick={() => setActiveItem('categories')}>
                            Categories
                        </a>
                    </li>
                    <li>
                        <a onClick={() => setActiveItem('presenters')}>
                            Presenters
                        </a>
                    </li>
                    <li>
                        <a onClick={() => setActiveItem('locations')}>
                            Locations
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

const getSingularType = (type: string) => {
    const singularMap: Record<string, string> = {
        categories: 'Category',
        locations: 'Location',
        events: 'Event',
        presenters: 'Presenter',
    };

    return singularMap[type.toLowerCase()] || type;
};
