import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Films } from 'src/films/schema/films.schema';
import { TicketDto } from './dto/order.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Films.name) private FilmsModel: Model<Films>) {}

  async order(tickets: TicketDto[]) {
    const result = [];

    for (const ticket of tickets) {
      const film = await this.FilmsModel.findOne({ id: ticket.film }).exec();
      if (!film) {
        throw new BadRequestException('Фильм не найден');
      }

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) {
        throw new BadRequestException('Сеанс не найден');
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seatKey)) {
        throw new BadRequestException(`${seatKey} уже занято`);
      }

      await this.FilmsModel.updateOne(
        {
          id: ticket.film,
          'schedule.id': ticket.session,
        },
        { $push: { 'schedule.$.taken': seatKey } },
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

      return result;
    }
  }
}
