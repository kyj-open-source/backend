import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async saveJobForUser(userId: string, jobId: string) {
    try {
      return await this.prisma.savedJob.create({
        data: { userId, jobId },
      });
    } catch (error) {
      // Handles the case where the job is already saved
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException("Job is already saved by this user.");
      }
      throw error;
    }
  }

  async unsaveJobForUser(userId: string, jobId: string) {
    try {
      await this.prisma.savedJob.delete({
        where: { userId_jobId: { userId, jobId } },
      });
    } catch (error) {
      // Handles the case where the saved job record does not exist
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException("Saved job not found for this user.");
      }
      throw error;
    }
  }

  async getSavedJobs(userId: string) {
    return this.prisma.savedJob.findMany({
      where: { userId },
      include: { job: true },
    });
  }
}
