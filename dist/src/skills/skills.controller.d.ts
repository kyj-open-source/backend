import { SkillsService } from "./skills.service";
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    searchSkills(query: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
    }[]>;
}
