import React, { createContext, useState } from 'react';
import { VerseDto } from '../types';

export interface VerseContextValue {
    verse: VerseDto | null;
    updateVerseState: (verse: VerseDto) => void;
    cleanUp: () => void;
}

export const VerseContext = createContext<VerseContextValue | undefined>(
    undefined,
);

export const VerseProvider = ({ children }) => {
    const [verse, setVerse] = useState<VerseDto | null>(null);

    const updateVerseState = (verse: VerseDto) => {
        const sortedEvents = [...verse.events].sort(
            (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
        );
        setVerse({ ...verse, events: sortedEvents });
        console.log('Verse updated with sorted events:', {
            ...verse,
            events: sortedEvents,
        });
    };

    const cleanUp = () => {
        setVerse(null);
        console.log('Verse сleared.:', verse);
    };

    return (
        <VerseContext.Provider value={{ verse, updateVerseState, cleanUp }}>
            {children}
        </VerseContext.Provider>
    );
};
