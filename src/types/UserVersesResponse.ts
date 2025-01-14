import { VersePreviewDto } from "./Dtos/VersePreviewDto";

export interface UserVersesResponse {
    verses: VersePreviewDto[];
    favorites: VersePreviewDto[];
}