import { ConflictException, Injectable } from '@nestjs/common';
import { Trainer } from './trainers.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainer) private trainerRepository: Repository<Trainer>,
  ) {}

  async findByName(trainerName: string): Promise<Trainer | null> {
    return await this.trainerRepository.findOne({
      where: { name: trainerName },
    });
  }

  async createNew(
    trainerName: string,
    hashedPassword: string,
  ): Promise<Trainer | null> {
    if (await this.findByName(trainerName)) {
      throw new ConflictException('Username unavailable');
    }
    const trainer = this.trainerRepository.create({
      name: trainerName,
      password: hashedPassword,
    });
    await this.trainerRepository.save(trainer);
    return trainer;
  }
}
