import { Inject, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {

  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }


  create(createFilmDto: CreateFilmDto) {
    return 'This action adds a new film';
  }

  findAll() {
    return `This action returns all films`;
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
