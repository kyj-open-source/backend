import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AddSkillDto } from "./dto/add-skill.dto";

@Controller("me")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("skills")
  getMySkills() {
    // In a real app, userId would come from an AuthGuard
    const userId = "d9a8b7c6-e5f4-g3h2-i1j0-k9l8m7n6o5p4"; // Example user ID
    return this.usersService.getUserSkills(userId);
  }

  @Post("skills")
  addSkillToProfile(@Body() addSkillDto: AddSkillDto) {
    const userId = "d9a8b7c6-e5f4-g3h2-i1j0-k9l8m7n6o5p4"; // Example user ID
    return this.usersService.addSkillToUser(userId, addSkillDto.skillId);
  }

  @Delete("skills/:id")
  removeSkillFromProfile(@Param("id") skillId: string) {
    const userId = "d9a8b7c6-e5f4-g3h2-i1j0-k9l8m7n6o5p4"; // Example user ID
    return this.usersService.removeSkillFromUser(userId, skillId);
  }
}
