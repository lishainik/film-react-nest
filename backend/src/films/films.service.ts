import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<FilmDto[]> {
    return await this.filmsRepository.findAll();
  }

  async findSchedule(id: string) {
    const items = await this.filmsRepository.findSchedule(id);
    if (!items) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }
    return { total: items.length, items };
  }
}
