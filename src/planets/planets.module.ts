import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { Planet } from './entities/planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PlanetRepository } from './planet.repository';

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsService, PlanetRepository],
  imports: [
    TypeOrmModule.forFeature([Planet]),
    AuthModule,
  ],
  exports: [
    PlanetsService, TypeOrmModule

  ]

})
export class PlanetsModule { }
