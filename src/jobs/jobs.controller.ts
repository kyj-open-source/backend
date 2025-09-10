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
    const uesrId = "d9a8b7c6-e5f4-g3h2-i1j0-k9l8m7n6o5p4"; // example user id
    return this.jobsService.saveJobForUser(uesrId, jobId);
  }

  @Delete(":id/save")
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteJob(@Param("id") jobId: string) {
    const uesrId = "d9a8b7c6-e5f4-g3h2-i1j0-k9l8m7n6o5p4"; // example user id
    return this.jobsService.unsaveJobForUser(uesrId, jobId);
  }
}
