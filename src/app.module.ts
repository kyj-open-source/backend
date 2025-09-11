import { Module } from "@nestjs/common";
import { SearchModule } from "./search/search.module";
import { PrismaModule } from "prisma/prisma.module";
import { SkillsModule } from "./skills/skills.module";
import { UsersModule } from "./users/users.module";
import { JobsModule } from "./jobs/jobs.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ResourcesModule } from "./resources/resources.module";

@Module({
  imports: [
    SearchModule,
    PrismaModule,
    SkillsModule,
    UsersModule,
    JobsModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
