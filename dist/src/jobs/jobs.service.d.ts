import { PrismaService } from "prisma/prisma.service";
export declare class JobsService {
    private prisma;
    constructor(prisma: PrismaService);
    saveJobForUser(userId: string, jobId: string): Promise<{
        jobId: string;
        userId: string;
        savedAt: Date;
    }>;
    unsaveJobForUser(userId: string, jobId: string): Promise<void>;
}
