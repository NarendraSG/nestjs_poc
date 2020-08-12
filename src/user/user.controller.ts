import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User, CreateUser } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<Array<User>> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<User> {
    const user: User = this.userService.getUser(parseInt(userId, 10));
    if (user) {
      return user;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  @Post()
  async createUser(@Body() user: CreateUser): Promise<any> {
    return this.userService.addUser(user);
  }

  @Put()
  async updateUser(): Promise<any> {}

  @Delete()
  async deleteUser(): Promise<any> {}
}
