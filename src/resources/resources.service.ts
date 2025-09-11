import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async saveResource(userId: string, resourceId: string) {
    return this.prisma.savedResource.create({
      data: { userId, resourceId },
    });
  }

  async unsaveResource(userId: string, resourceId: string) {
    return this.prisma.savedResource.delete({
      where: { userId_resourceId: { userId, resourceId } },
    });
  }

  async getSavedResources(userId: string) {
    return this.prisma.savedResource.findMany({
      where: { userId },
      include: { resource: true },
    });
  }
}
