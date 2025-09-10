import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    performSearch(query: string): Promise<{
        jobs: {
            skills: {
                id: string;
                name: string;
            }[];
            isSaved: boolean;
            id: string;
            title: string;
            companyName: string;
            location: string;
        }[];
        resources: {
            skills: {
                id: string;
                name: string;
            }[];
            isSaved: boolean;
            id: string;
            title: string;
            url: string;
            type: import("@prisma/client").$Enums.ResourceType;
        }[];
    }>;
}
