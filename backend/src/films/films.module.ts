import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Films, FilmsSchema } from './schema/films.schema';
import { FilmsRepository } from '../repository/films,repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Films.name, schema: FilmsSchema }]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
})
export class FilmsModule {}
