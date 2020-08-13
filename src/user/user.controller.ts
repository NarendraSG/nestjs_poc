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
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserService } from './user.service';
import { User } from './../db/model/user';
import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'Success', type: [User] })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getUsers(): Promise<Array<User>> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Success', type: User })
  @ApiNotFoundResponse({ description: 'User Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getUser(@Param('id') userId: Types.ObjectId): Promise<User> {
    const user: User = await this.userService.getUser(userId);
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
  @ApiCreatedResponse({ description: 'Success', type: User })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.addUser(user);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async updateUser(
    @Param('id') userId: Types.ObjectId,
    @Body() user: Partial<User>,
  ): Promise<any> {
    const updatesUser = await this.userService.updateUser(userId, user);
    if (!updatesUser) {
      throw new NotFoundException('User not found');
    }

    return;
  }

  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'User Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Delete(':id')
  async deleteUser(@Param('id') userId: Types.ObjectId): Promise<any> {
    const deletedUser = await this.userService.deleteUser(userId);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return;
  }
}
