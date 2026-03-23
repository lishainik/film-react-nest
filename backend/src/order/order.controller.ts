import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async create(@Body() body: OrderDto) {
    const items = await this.orderService.order(body.tickets);
    return { total: items.length, items };
  }
}
