import { BaseItemDto } from './BaseItemDto';

export interface EventDto extends BaseItemDto {
    locationId: string;
    categoryId: string;
    start: string;
    end: string;
    presenterIds: string[];
}
