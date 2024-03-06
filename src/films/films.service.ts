import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { PaginationDto } from 'src/helpers/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger('FilmsService');

  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }


  async create(createFilmDto: CreateFilmDto) {

    try {
      const film = this.filmsRepository.create(createFilmDto);
      await this.filmsRepository.save(film);
      return film;

    } catch (error) {
      // console.log(error);
      this.manageDBExeptions(error);
    }


  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 5, skip = 0, order = 'ASC', query } = paginationDto;
    let films: Film[];
    let count: number;
    if (!query) {
      [films, count] = await Promise.all([
        this.filmsRepository.find({
          skip,
          take: limit,
          order: {
            episode_id: order as FindOptionsOrderValue
          }
        }),
        this.filmsRepository.count()
      ]);
      return { films, count };
    } else {
      let films: Film[];
      const queryBuilder = this.filmsRepository.createQueryBuilder('film');
      [films, count] = await queryBuilder
        .where('LOWER(director) like :director', { director: `%${query.toLowerCase()}%` })
        .orWhere('LOWER(title) like :title', { title: `%${query.toLowerCase()}%` })
        .limit(limit)
        .offset(skip)
        .orderBy('episode_id', order as 'ASC' | 'DESC')
        .getManyAndCount();

      return { films, count };
    }


  }

  async findOne(id: string) {

    let film: Film;

    if (isUUID(id)) {
      film = await this.filmsRepository.findOneBy({ id });
    } else {
      film = await this.filmsRepository.findOneBy({ episode_id: +id });
    }


    if (!film) throw new NotFoundException(`Film with id ${id} not found`);
    return film;
  }

  async update(id: string, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmsRepository.preload({
      id,
      ...updateFilmDto
    });

    if (!film) throw new NotFoundException(`Film with id ${id} not found`);
    try {
      return await this.filmsRepository.save(film);
    } catch (error) {
      this.manageDBExeptions(error);
    }

  }

  async remove(id: string) {
    const film = await this.findOne(id);
    await this.filmsRepository.remove(film);
  }

  private manageDBExeptions(error: any) {
    this.logger.error(error.message, error.stack);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Internal Server Error');

  }
}
