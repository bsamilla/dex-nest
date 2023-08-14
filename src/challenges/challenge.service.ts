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

  async findById(id: number): Promise<Challenge | null> {
    return this.challengeRepository.findOne({
      where: { id: id },
      relations: { targets: true },
      order: {
        targets: {
          pkmn: { dexNumber: 'ASC', variance: 'ASC', variantName: 'ASC' },
        },
      },
    });
  }

  async findAll(): Promise<Challenge[]> {
    return await this.challengeRepository.find({
      relations: { targets: true },
      order: {
        targets: {
          pkmn: { dexNumber: 'ASC', variance: 'ASC', variantName: 'ASC' },
        },
      },
    });
  }
}
