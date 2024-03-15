import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { FilmMedia } from './entities/film-media.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  imports: [TypeOrmModule.forFeature([Film, FilmMedia]), AuthModule],
  exports: [FilmsService, TypeOrmModule]
})
export class FilmsModule { }
