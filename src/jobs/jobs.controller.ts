import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { JobsService } from "./jobs.service";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post(":id/save")
  @HttpCode(HttpStatus.CREATED)
  saveJob(@Param("id") jobId: string) {
    const uesrId = "58d0816f-88d6-424a-8438-429c74f9a6e2"; // example user id
    return this.jobsService.saveJobForUser(uesrId, jobId);
  }

  @Delete(":id/save")
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteJob(@Param("id") jobId: string) {
    const uesrId = "58d0816f-88d6-424a-8438-429c74f9a6e2"; // example user id
    return this.jobsService.unsaveJobForUser(uesrId, jobId);
  }
}
