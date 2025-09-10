import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  search(query: string) {
    return this.prisma.skill.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 10,
    });
  }
}
