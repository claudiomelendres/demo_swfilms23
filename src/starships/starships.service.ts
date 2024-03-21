import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StarshipsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  starShips: string[] = ['Millennium Falcon', 'X-Wing', 'TIE Fighter', 'Y-Wing', 'A-Wing', 'Slave I', 'Imperial Shuttle', 'EF76 Nebulon-B escort frigate', 'Calamari Cruiser', 'Home One', 'Executor', 'Rebel transport'];

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


  create(createStarshipDto: CreateStarshipDto) {
    return 'This action adds a new starship';
  }

  findAll() {
    return `This action returns all starships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} starship`;
  }

  update(id: number, updateStarshipDto: UpdateStarshipDto) {
    return `This action updates a #${id} starship`;
  }

  remove(id: number) {
    return `This action removes a #${id} starship`;
  }
}
