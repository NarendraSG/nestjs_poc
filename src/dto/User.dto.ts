import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsInt,
  Max,
  Min,
} from 'class-validator';

export class CreateUser {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsInt()
  @Max(100)
  @Min(5)
  age: number;

  @ApiProperty({ required: true })
  @IsPhoneNumber('IN')
  phone: string;
}

export class UpdateUser {
  @ApiProperty({ required: false })
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsInt()
  @Max(100)
  @Min(5)
  age: number;

  @ApiProperty({ required: false })
  @IsPhoneNumber('IN')
  phone: string;
}
