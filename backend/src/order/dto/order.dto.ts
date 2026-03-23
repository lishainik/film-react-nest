import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TicketDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class OrderDto {
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}
