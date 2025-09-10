import { UsersService } from "./users.service";
import { AddSkillDto } from "./dto/add-skill.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMySkills(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
    }[]>;
    addSkillToProfile(addSkillDto: AddSkillDto): Promise<{
        skillId: string;
        userId: string;
        status: import("@prisma/client").$Enums.UserSkillStatus;
    }>;
    removeSkillFromProfile(skillId: string): import("@prisma/client").Prisma.Prisma__UserSkillClient<{
        skillId: string;
        userId: string;
        status: import("@prisma/client").$Enums.UserSkillStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
