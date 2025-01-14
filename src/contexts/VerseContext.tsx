import React, { createContext, useState } from 'react';
import { VerseDto } from '../types';

export interface VerseContextValue {
    verse: VerseDto | null;
    updateVerse: (verse: VerseDto) => void;
    cleanUp: () => void;
}

export const VerseContext = createContext<VerseContextValue | undefined>(
    undefined,
);

export const VerseProvider = ({ children }) => {
    const [verse, setVerse] = useState<VerseDto | null>(null);

    const updateVerse = (verse: VerseDto) => {
        setVerse(verse);
        console.log('Verse updated:', verse);
    };

    const cleanUp = () => {
        setVerse(null);
        console.log('Verse сleared.:', verse);
    };

    return (
        <VerseContext.Provider value={{ verse, updateVerse, cleanUp }}>
            {children}
        </VerseContext.Provider>
    );
};
