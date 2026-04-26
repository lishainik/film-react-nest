import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketDto } from './dto/order.dto';
import { randomUUID } from 'crypto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async order(tickets: TicketDto[]) {
    const result = [];

    for (const ticket of tickets) {
      const session = await this.filmsRepository.findById(
        ticket.film,
        ticket.session,
      );
      if (!session) {
        throw new BadRequestException('Сеанс не найден');
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seatKey)) {
        throw new BadRequestException(`${seatKey} уже занято`);
      }

      await this.filmsRepository.occupySeat(
        ticket.film,
        ticket.session,
        seatKey,
      );

      result.push({
        id: randomUUID(),
        film: ticket.film,
        session: ticket.session,
        daytime: ticket.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
      });
    }

    return result;
  }
}
