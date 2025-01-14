import { useContext } from 'react';
import { VerseContext, VerseContextValue } from '../contexts';

export const useVerse = (): VerseContextValue => {
    const context = useContext(VerseContext);
    if (!context) {
        throw new Error('useVerse must be used within a VerseProvider');
    }
    return context;
};