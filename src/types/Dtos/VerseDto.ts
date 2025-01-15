import { EventDto, LocationDto, CategoryDto, PresenterDto } from '..';

export interface VerseDto {
    id: string;
    name: string;
    description: string;
    start: string;
    end: string;
    logo: string;
    map: string;

    events: EventDto[];
    locations: LocationDto[];
    categories: CategoryDto[];
    presenters: PresenterDto[];
}
