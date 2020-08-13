import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './../db/model/user';
import { CreateUser, UpdateUser } from './../dto/User.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getUser(id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  addUser(user: CreateUser): Promise<User> {
    const createUser = new this.userModel(user);
    return createUser.save();
  }

  updateUser(
    id: Types.ObjectId,
    user: Partial<UpdateUser>,
  ): Promise<User | undefined> {
    return this.userModel.findByIdAndUpdate(id, user).exec();
  }

  deleteUser(id: Types.ObjectId): Promise<User | undefined> {
    return this.userModel.findOneAndDelete(id).exec();
  }
}
