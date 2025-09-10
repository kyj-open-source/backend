import { PrismaService } from "prisma/prisma.service";
export declare class SkillsService {
    private prisma;
    constructor(prisma: PrismaService);
    search(query: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
    }[]>;
}
