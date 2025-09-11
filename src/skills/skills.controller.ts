import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from "@nestjs/common";
import { SkillsService } from "./skills.service";

@Controller("skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  searchSkills(@Query("q") query: string) {
    try {
      return this.skillsService.search(query);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to search skills: ${error}`,
      );
    }
  }
}
