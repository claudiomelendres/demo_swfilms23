import { Module } from '@nestjs/common';
import { StartshipsService } from './startships.service';
import { StartshipsController } from './startships.controller';

@Module({
  controllers: [StartshipsController],
  providers: [StartshipsService],
})
export class StartshipsModule {}
