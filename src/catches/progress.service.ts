import { BadRequestException, Injectable } from '@nestjs/common';
import { Progress } from './progress.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainersService } from 'src/trainers/trainers.service';
import { PKMNService } from 'src/pkmn/pkmn.service';
import { ChallengeService } from 'src/challenges/challenge.service';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
    private trainerService: TrainersService,
    private pkmnService: PKMNService,
    private challengeService: ChallengeService,
  ) {}

  findAll(trainerId: number, challengeId: number): Promise<Progress[]> {
    return this.progressRepository.find({
      relations: { pkmns: true, trainer: true, challenge: true },
      where: {
        trainer: {
          id: trainerId,
        },
        challenge: {
          id: challengeId,
        },
      },
    });
  }

  async createOrUpdateProgress(
    trainerId: number,
    challengeId: number,
    pkmnId: number,
  ): Promise<Progress | null> {
    const trainer = await this.trainerService.findById(trainerId);
    if (!trainer) {
      throw new BadRequestException('Invalid trainer');
    }
    const challenge = await this.challengeService.findById(challengeId);
    if (!challenge) {
      throw new BadRequestException('Invalid challenge');
    }
    const pkmn = await this.pkmnService.findById(pkmnId);
    if (!pkmn) {
      throw new BadRequestException('Invalid pkmn');
    }
    const progress = await this.progressRepository.findOne({
      where: {
        trainer: trainer,
        challenge: challenge,
      },
      relations: { pkmns: true },
    });
    if (progress) {
      if (progress.pkmns.includes(pkmn)) {
        throw new BadRequestException('Already exists');
      }
      progress.pkmns.push(pkmn);
      return this.progressRepository.save(progress);
    } else {
      const progress = new Progress();
      progress.trainer = trainer;
      progress.challenge = challenge;
      progress.pkmns = [pkmn];
      return this.progressRepository.save(progress);
    }
  }
}
