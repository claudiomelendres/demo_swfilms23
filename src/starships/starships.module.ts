import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [StarshipsController],
  providers: [StarshipsService],
  imports: [HttpModule],
})
export class StarshipsModule { }
