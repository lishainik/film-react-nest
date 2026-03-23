import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Films, FilmsSchema } from 'src/films/schema/films.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Films.name, schema: FilmsSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
