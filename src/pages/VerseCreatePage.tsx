import React, { useState } from 'react';
import { createVerse } from '../services';
import { useNavigate } from 'react-router-dom';
import { VerseCreateForm } from '../components';
import { VerseCreateEditDto } from '../types';

export function VerseCreatePage() {
    const navigate = useNavigate();

    const handleSubmit = async (verse: VerseCreateEditDto) => {
        try {
            const res = await createVerse(verse);
            console.log('Verse successfully created');

            navigate('/verses');
        } catch (error) {
            console.error('Failed to create Verse:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Create a New Verse</h1>
            <VerseCreateForm onSubmit={handleSubmit} />
        </div>
    );
}
