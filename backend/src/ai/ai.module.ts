import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { VectorSearchService } from './knowledge/vector-search.service';

@Module({
  controllers: [AiController],
  providers: [AiService, VectorSearchService],
  exports: [AiService, VectorSearchService],
})
export class AiModule {}
