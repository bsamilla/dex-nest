import { BadRequestException, Injectable } from '@nestjs/common';
import { Progress } from './progress.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainersService } from 'src/trainers/trainers.service';
import { TargetService } from 'src/target/target.service';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
    private trainerService: TrainersService,
    private targetService: TargetService,
  ) {}

  findAllProgressForTrainerAndChallenge(
    trainerId: number,
    challengeId: number,
  ): Promise<Progress[]> {
    return this.progressRepository.find({
      relations: { trainer: true, target: true },
      where: {
        trainer: {
          id: trainerId,
        },
        target: {
          challenge: {
            id: challengeId,
          },
        },
      },
    });
  }

  async createNew(trainerId: number, targetId: number): Promise<Progress> {
    const trainer = await this.trainerService.findById(trainerId);
    if (!trainer) throw new BadRequestException('TRAINER-02000');

    const target = await this.targetService.findById(targetId);
    if (!target) throw new BadRequestException('TARGET-02000');

    try {
      const progress = this.progressRepository.create({
        trainer: trainer,
        target: target,
      });
      await this.progressRepository.save(progress);
      return progress;
    } catch {
      throw new BadRequestException('PROGRESS-23505');
    }
  }

  async getProgressByTargetAndTrainer(
    values: { trainerId: number; targetId: number }[],
  ): Promise<Progress[]> {
    const trainerId = values[0].trainerId;
    const targetIds = values.map((value) => value.targetId);
    return await this.progressRepository
      .createQueryBuilder('progress')
      .where('progress.trainer = :trainerId', { trainerId })
      .leftJoinAndSelect('progress.trainer', 'trainer')
      .leftJoinAndSelect('progress.target', 'target')
      .andWhere('progress.target IN (:...targetIds)', { targetIds })
      .getMany();
  }

  async getMappedProgressByTarget(
    values: { trainerId: number; targetId: number }[],
  ): Promise<any[]> {
    const progresses = await this.getProgressByTargetAndTrainer(values);
    return values.map(
      ({ targetId }) =>
        progresses.filter((progress) => targetId === progress.target.id) ||
        null,
    );
  }
}
