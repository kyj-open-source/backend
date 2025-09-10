import { PrismaService } from "prisma/prisma.service";
export declare class SearchService {
    private prisma;
    constructor(prisma: PrismaService);
    searchAll(query: string): Promise<{
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
