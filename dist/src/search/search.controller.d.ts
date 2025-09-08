import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    performSearch(query: string): Promise<{
        jobs: {
            id: string;
            title: string;
            companyName: string;
            location: string;
        }[];
        resources: never[];
    }>;
}
