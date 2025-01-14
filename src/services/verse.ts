import apiClient from '../api/apiClient';
import { VerseCreateEditDto, VerseDto } from '../types';

export async function createVerse(verse: VerseCreateEditDto) {
    return await apiClient.post('/verse/create', verse);
}

export async function getVerse(id): Promise<VerseDto> {
    var response = await apiClient.get<VerseDto>(`/verse/${id}`, {});
    return response.data;
}

export async function updateVerse(id, verse: VerseCreateEditDto) {
    return await apiClient.put(`/verse/${id}`, verse);
}

export async function createVerseItem(verseId: string, type: string, item: any) {
    const response = await apiClient.post(`/verse/${verseId}/${type}`, item);
    return response.data.id;
}

export async function updateVerseItem(verseId: string, type: string, item: any) {
    return await apiClient.put(`/verse/${verseId}/${type}`, item);
}

export async function deleteVerseItem(verseId: string, type: string, itemId: string) {
    return await apiClient.delete(`/verse/${verseId}/${type}/${itemId}`);
}

