import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { JobsService } from "./jobs.service";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post(":jobId/save")
  @HttpCode(HttpStatus.CREATED)
  saveJob(@Param("jobId") jobId: string) {
    const userId = "58d0816f-88d6-424a-8438-429c74f9a6e2"; // example user id
    return this.jobsService.saveJobForUser(userId, jobId);
  }

  @Delete(":jobId/unsave")
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteJob(@Param("jobId") jobId: string) {
    const userId = "58d0816f-88d6-424a-8438-429c74f9a6e2"; // example user id
    return this.jobsService.unsaveJobForUser(userId, jobId);
  }

  @Get("saved")
  @HttpCode(HttpStatus.OK)
  getSaved() {
    const userId = "58d0816f-88d6-424a-8438-429c74f9a6e2"; // example user id
    return this.jobsService.getSavedJobs(userId);
  }
}
