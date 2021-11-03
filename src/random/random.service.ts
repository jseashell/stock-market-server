import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
  newRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
