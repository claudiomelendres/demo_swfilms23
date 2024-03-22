import { Injectable } from '@nestjs/common';
import { CreateStartshipDto } from './dto/create-startship.dto';
import { UpdateStartshipDto } from './dto/update-startship.dto';

@Injectable()
export class StartshipsService {

  starShips: string[] = ['Millennium Falcon', 'X-Wing', 'TIE Fighter',
    'Y-Wing', 'A-Wing', 'Slave I', 'Imperial Shuttle',
    'EF76 Nebulon-B escort frigate', 'Calamari Cruiser',
    'Home One', 'Executor', 'Rebel transport'];


  createStarship(starship: string) {
    if (starship.length <= 2) {
      throw new Error('Starship name is too short must be at least 2 characters');
    }

    this.starShips.push(starship);
    return starship;
  }


  create(createStartshipDto: CreateStartshipDto) {
    return 'This action adds a new startship';
  }

  findAll() {
    return `This action returns all startships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} startship`;
  }

  update(id: number, updateStartshipDto: UpdateStartshipDto) {
    return `This action updates a #${id} startship`;
  }

  remove(id: number) {
    return `This action removes a #${id} startship`;
  }
}
