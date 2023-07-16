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
    return this.challengeRepository.find({
      relations: { pkmns: true },
      order: {
        pkmns: {
          dexNumber: 'ASC',
          variance: 'ASC',
          variantName: 'ASC',
        },
      },
    });
  }

  find(id: number): Promise<Challenge | null> {
    return this.challengeRepository.findOne({
      where: { id: id },
      relations: { pkmns: true },
      order: {
        pkmns: {
          dexNumber: 'ASC',
          variance: 'ASC',
          variantName: 'ASC',
        },
      },
    });
  }
}
