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
    return this.challengeRepository
      .createQueryBuilder('challenge')
      .leftJoinAndSelect('challenge.targets', 'target')
      .leftJoinAndSelect('target.pkmn', 'pkmn')
      .where('challenge.id = :challengeId', { challengeId: id })
      .orderBy({
        'pkmn.dexNumber': 'ASC',
        'pkmn.variance': 'ASC',
        'pkmn.variantName': 'ASC',
      })
      .getOne();
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
