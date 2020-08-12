import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TestMiddleware } from './../middleware/test.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TestMiddleware)
      .exclude({ path: 'user', method: RequestMethod.POST })
      .forRoutes({ path: 'user', method: RequestMethod.ALL });
  }
}
