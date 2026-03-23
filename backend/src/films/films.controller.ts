import { Controller, Get, Param } from '@nestjs/common';
import { FilmDto } from './dto/films.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}
  @Get()
  async findAll(): Promise<{ total: number; items: FilmDto[] }> {
    const items = await this.filmService.findAll();
    return { total: items.length, items };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    const items = await this.filmService.findById(id);
    return { total: items.length, items };
  }
}
