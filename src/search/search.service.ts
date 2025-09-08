import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchAll(query: string) {
    const jobs = await this.prisma.job.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        companyName: true,
        location: true,
      },
      take: 20,
    });

    // TODO: Implement resource search logic and assign to resources variable
    const resources = [];

    return { jobs, resources };
  }
}
