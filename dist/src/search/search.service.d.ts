import { PrismaService } from 'prisma/prisma.service';
export declare class SearchService {
    private prisma;
    constructor(prisma: PrismaService);
    searchAll(query: string): Promise<{
        jobs: {
            id: string;
            title: string;
            companyName: string;
            location: string;
        }[];
        resources: never[];
    }>;
}
