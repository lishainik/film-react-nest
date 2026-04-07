import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films,repository';
import { FilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<FilmDto[]> {
    return await this.filmsRepository.findAll();
  }

  async findById(id: string) {
    const film = await this.filmsRepository.findById(id);
    return film?.schedule || [];
  }
}
