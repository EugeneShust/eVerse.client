import { BaseItemDto } from './BaseItemDto';

export interface LocationDto extends BaseItemDto {
    coords: LocationCoordsDto;
}

export interface LocationCoordsDto {
    latitude: number;
    longitude: number;
    x: number;
    y: number;
}
