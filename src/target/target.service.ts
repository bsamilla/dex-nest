import { Injectable } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from './target.model';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target)
    private targetRepository: Repository<Target>,
  ) {}

  async findById(targetId: number): Promise<Target | null> {
    return await this.targetRepository.findOne({ where: { id: targetId } });
  }

  async findByChallengeAndPkmn(
    challengeId: number,
    pkmnId: number,
  ): Promise<Target | null> {
    return await this.targetRepository.findOne({
      where: {
        challenge: { id: challengeId },
        pkmn: { id: pkmnId },
      },
    });
  }

  async findTargetsForChallenge(challengeId: number): Promise<Target[]> {
    return await this.targetRepository.find({
      where: [
        {
          challenge: { id: challengeId },
        },
      ],
      relations: { pkmn: true, challenge: true, progress: true },
      order: {
        pkmn: { dexNumber: 'ASC', variance: 'ASC', variantName: 'ASC' },
      },
    });
  }
}
