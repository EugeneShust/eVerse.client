import { FavoriteDto } from "./FavoriteDto";

export interface ProfileDto {
    userId: string;
    avatar: string;
    displayName: string;
    email: string;
    phone: string;

    verses: [];
    favorites: FavoriteDto[];
}
