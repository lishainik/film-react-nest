import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './film.entity';
import { Schedule } from './schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepo.find();
  }

  async findSchedule(filmId: string): Promise<Schedule[] | null> {
    const film = await this.filmRepo.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });
    if (!film) {
      return null;
    }
    return film.schedule;
  }

  async findById(filmId: string, sessionId: string): Promise<Schedule | null> {
    return this.scheduleRepo.findOne({
      where: { id: sessionId, filmId },
    });
  }

  async occupySeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<boolean> {
    const schedule = await this.scheduleRepo.findOne({
      where: { id: sessionId, filmId },
    });
    if (!schedule || schedule.taken.includes(seatKey)) {
      return false;
    }
    schedule.taken = [...schedule.taken, seatKey];
    await this.scheduleRepo.save(schedule);
    return true;
  }
}
