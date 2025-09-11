import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchAll(query: string) {
    const userId = "58d0816f-88d6-424a-8438-429c74f9a6e2";

    if (!query) {
      return { jobs: [], resources: [] };
    }

    const [savedJobs, savedResources] = await Promise.all([
      this.prisma.savedJob.findMany({
        where: { userId },
        select: { jobId: true },
      }),
      this.prisma.savedResource.findMany({
        where: { userId },
        select: { resourceId: true },
      }),
    ]);

    //Create sets for faster lookup (O(1) complexity)
    const savedJobIds = new Set(savedJobs.map((job) => job.jobId));
    const savedResourceIds = new Set(
      // eslint-disable-next-line prettier/prettier
      savedResources.map((item) => item.resourceId)
    );

    // Define the search filter to be used for both jobs and resources
    const jobSearchFilter: Prisma.JobWhereInput = {
      OR: [
        { title: { contains: query, mode: Prisma.QueryMode.insensitive } },
        {
          description: { contains: query, mode: Prisma.QueryMode.insensitive },
        },
      ],
    };

    const resourceSearchFilter: Prisma.ResourceWhereInput = {
      OR: [
        { title: { contains: query, mode: Prisma.QueryMode.insensitive } },
        {
          description: { contains: query, mode: Prisma.QueryMode.insensitive },
        },
      ],
    };

    // Step 1: Update the Prisma queries to include related skills
    const [jobs, resources] = await Promise.all([
      this.prisma.job.findMany({
        where: jobSearchFilter,
        take: 20,
        select: {
          id: true,
          title: true,
          companyName: true,
          location: true,
          // This tells Prisma to "JOIN" the job_skills and skills tables
          skills: {
            select: {
              skill: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.resource.findMany({
        where: resourceSearchFilter,
        take: 20,
        select: {
          id: true,
          title: true,
          url: true,
          type: true,
          skills: {
            select: {
              skill: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
    ]);

    // Step 2: Format the data to match the required JSON structure
    const formattedJobs = jobs.map((job) => ({
      ...job,
      skills: job.skills.map((jobSkill) => jobSkill.skill),
      isSaved: savedJobIds.has(job.id),
    }));

    const formattedResources = resources.map((resource) => ({
      ...resource,
      skills: resource.skills.map((resourceSkill) => resourceSkill.skill),
      isSaved: savedResourceIds.has(resource.id),
    }));

    return { jobs: formattedJobs, resources: formattedResources };
  }
}
