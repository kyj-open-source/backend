import { JobsService } from "./jobs.service";
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    saveJob(jobId: string): Promise<{
        jobId: string;
        userId: string;
        savedAt: Date;
    }>;
    deleteJob(jobId: string): Promise<void>;
}
