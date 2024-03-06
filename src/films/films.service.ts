import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { DataSource, FindOptionsOrderValue, Repository } from 'typeorm';
import { PaginationDto } from 'src/helpers/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { FilmMedia } from './entities/film-media.entity';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger('FilmsService');

  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,

    @InjectRepository(FilmMedia)
    private filmMediaRepository: Repository<FilmMedia>,

    private dataSource: DataSource
  ) { }


  async create(createFilmDto: CreateFilmDto) {

    try {

      const { medias = [], ...filmsDetails } = createFilmDto;

      const film = this.filmsRepository.create({
        ...filmsDetails,
        medias: medias.map(media =>
          this.filmMediaRepository.create({ url: media.url, type: media.type }))
      }
      );
      await this.filmsRepository.save(film);
      return { ...film, medias };

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
    } else {

      const queryBuilder = this.filmsRepository.createQueryBuilder('film');
      [films, count] = await queryBuilder
        .where('LOWER(director) like :director', { director: `%${query.toLowerCase()}%` })
        .orWhere('LOWER(title) like :title', { title: `%${query.toLowerCase()}%` })
        .leftJoinAndSelect('film.medias', 'media')
        .limit(limit)
        .offset(skip)
        .orderBy('episode_id', order as 'ASC' | 'DESC')
        .getManyAndCount();

    }
    // return { films, count };
    return {
      films: films.map(film => ({ ...film, medias: film.medias.map(media => media.url) })),
      count
    }



  }

  async findOne(id: string) {

    let film: Film;

    if (isUUID(id)) {
      film = await this.filmsRepository.findOne({
        where: { id },
        relations: ['medias']
      });
    } else {
      film = await this.filmsRepository.findOne(
        {
          where: { id },
          relations: ['medias']
        }
      );
    }


    if (!film) throw new NotFoundException(`Film with id ${id} not found`);
    return film;
  }

  async update(id: string, updateFilmDto: UpdateFilmDto) {
    const { medias, ...restFilms } = updateFilmDto;


    const film = await this.filmsRepository.preload({
      id,
      ...updateFilmDto
    });

    if (!film) throw new NotFoundException(`Film with id ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {

      if (medias) {
        await queryRunner.manager.delete(FilmMedia, { film: { id } });
        film.medias = medias.map(media =>
          this.filmMediaRepository.create({ url: media.url, type: media.type }));
      }
      await queryRunner.manager.save(film);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.findOne(id);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
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
