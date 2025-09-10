import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserSkills(userId: string) {
    const userSkills = await this.prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true },
    });

    return userSkills.map((userSkill) => userSkill.skill);
  }

  async addSkillToUser(userId: string, skillId: string) {
    // Check if the user already has this skill
    const existingSkill = await this.prisma.userSkill.findUnique({
      where: { userId_skillId: { userId, skillId } },
    });

    if (existingSkill) {
      throw new ConflictException("User already has this skill.");
    }

    return this.prisma.userSkill.create({
      data: {
        userId,
        skillId,
        status: "PROFICIENT",
      },
    });
  }

  removeSkillFromUser(userId: string, skillId: string) {
    return this.prisma.userSkill.delete({
      where: {
        userId_skillId: {
          userId,
          skillId,
        },
      },
    });
  }
}
