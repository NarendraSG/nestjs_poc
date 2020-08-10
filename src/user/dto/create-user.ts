import { ApiProperty } from '@nestjs/swagger';

export class CreateUser {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
}
