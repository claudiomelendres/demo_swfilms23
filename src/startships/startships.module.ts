import { Module } from '@nestjs/common';
import { StartshipsService } from './startships.service';
import { StartshipsController } from './startships.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [StartshipsController],
  providers: [StartshipsService],
})
export class StartshipsModule { }
