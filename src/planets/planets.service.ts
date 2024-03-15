import { Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { PlanetRepository } from './planet.repository';

@Injectable()
export class PlanetsService {

  constructor(private readonly planetRepository: PlanetRepository) { }

  async create(createPlanetDto: CreatePlanetDto) {
    try {
      const planet = this.planetRepository.create(createPlanetDto);
      await this.planetRepository.save(planet);
      return planet;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all planets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planet`;
  }

  update(id: number, updatePlanetDto: UpdatePlanetDto) {
    return `This action updates a #${id} planet`;
  }

  remove(id: number) {
    return `This action removes a #${id} planet`;
  }
}
