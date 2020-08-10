import { Injectable } from '@nestjs/common';
import { User } from './dto/user';
import { CreateUser } from './dto';

@Injectable()
export class UserService {
  private users: Array<User>;
  private counter: number;
  constructor() {
    this.users = [];
    this.counter = 0;
  }

  getUsers(): Array<User> {
    return this.users;
  }

  getUser(id: number): User {
    const pos: number = this.users.map(u => u.id).indexOf(id);
    return pos === -1 ? null : this.users[pos];
  }

  addUser(user: CreateUser): void {
    const { name, age, email, phone = '' } = user;
    const userObj = {
      id: this.counter++,
      name,
      age,
      email,
      phone,
    };

    this.users.push(userObj);
  }
}
