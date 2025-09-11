import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./search.service";
import { IsNotEmpty, IsString } from "class-validator";

class SearchQueryDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async performSearch(@Query() query: SearchQueryDto) {
    return this.searchService.searchAll(query.q);
  }
}
