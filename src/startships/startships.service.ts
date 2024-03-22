import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStartshipDto } from './dto/create-startship.dto';
import { UpdateStartshipDto } from './dto/update-startship.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StartshipsService {

  constructor(
    private httpService: HttpService,
  ) { }

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

  async getStarship(id: number) {
    if (id < 2 || id > 32) {
      throw new BadRequestException('Invalid starship id');
    }

    const { data } = await this.httpService.axiosRef({
      url: `https://swapi.dev/api/starships/${id}`,
      method: 'GET'
    });

    if (!data || !data.name || !data.model) {
      throw new InternalServerErrorException();
    }

    console.log(data);
    return data;

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
