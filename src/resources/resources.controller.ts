import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ResourcesService } from "./resources.service";

@Controller("resources")
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post(":resourceId/save")
  @HttpCode(HttpStatus.CREATED)
  save(
    // @Param("userId") userId: string,
    @Param("resourceId") resourceId: string
  ) {
    const userId = "58d0816f-88d6-424a-8438-429c74f9a6e2"; // example user id
    return this.resourcesService.saveResource(userId, resourceId);
  }

  @Delete(":resourceId/unsave")
  @HttpCode(HttpStatus.NO_CONTENT)
  unsave(
    // @Param("userId") userId: string,
    @Param("resourceId") resourceId: string
  ) {
    const userId = "58d0816f-88d6-424a-8438-429c74f9a6e2"; // example user id
    return this.resourcesService.unsaveResource(userId, resourceId);
  }

  @Get("saved/:userId")
  @HttpCode(HttpStatus.OK)
  getSaved(@Param("userId") userId: string) {
    return this.resourcesService.getSavedResources(userId);
  }
}
