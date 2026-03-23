import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Films } from '../films/schema/films.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Films.name) private FilmsModel: Model<Films>) {}

  async findAll(): Promise<Films[]> {
    return this.FilmsModel.find().exec();
  }

  async findById(id: string): Promise<Films> {
    return this.FilmsModel.findOne({ id }).exec();
  }
}
