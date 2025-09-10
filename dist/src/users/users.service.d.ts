import { PrismaService } from "prisma/prisma.service";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserSkills(userId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
    }[]>;
    addSkillToUser(userId: string, skillId: string): Promise<{
        skillId: string;
        userId: string;
        status: import("@prisma/client").$Enums.UserSkillStatus;
    }>;
    removeSkillFromUser(userId: string, skillId: string): import("@prisma/client").Prisma.Prisma__UserSkillClient<{
        skillId: string;
        userId: string;
        status: import("@prisma/client").$Enums.UserSkillStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
