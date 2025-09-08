import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [SearchModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
