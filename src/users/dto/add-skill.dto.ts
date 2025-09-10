/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsUUID } from "class-validator";

export class AddSkillDto {
  @IsUUID()
  @IsNotEmpty()
  skillId: string;
}
