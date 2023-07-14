import { Injectable } from '@nestjs/common';
import { Challenge } from './challenge.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}
  findAll(): Promise<Challenge[]> {
    return this.challengeRepository.find();
  }
}
