import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  private counter: number;
  constructor() {
    this.counter = 0;
  }
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`
    Counter: ${this.counter++}
    `);
    next();
  }
}
