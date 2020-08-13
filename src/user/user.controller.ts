import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UsePipes,
  ValidationPipe,
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
import { CreateUser, UpdateUser } from './../dto/User.dto';

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

    throw new NotFoundException('User not found');
  }

  @Post()
  @ApiCreatedResponse({ description: 'Success', type: User })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() user: CreateUser): Promise<User> {
    return this.userService.addUser(user);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async updateUser(
    @Param('id') userId: Types.ObjectId,
    @Body() user: UpdateUser,
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
